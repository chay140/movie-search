// UI관련
import {
  fetchData,
  fetchMovieById,
  defaultUrl,
  api_key,
  base_url,
} from "./api.js";

// Elements
const searchInput = document.querySelector("#searchInput");
const movieModal = document.querySelector("#movieModal");
const detailContent = document.querySelector("#movieDetail");
const modalPoster = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalOverview = document.querySelector("#modalOverview");
const modalRelease = document.querySelector("#modalReleaseDate");
const modalRating = document.querySelector("#modalRating");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const removeBookmarkBtn = document.querySelector("#removeBookmarkBtn");

// Flags
let bookmarkShown = false;

// 초기 로딩
export async function loadPage() {
  bookmarkShown = false;

  // 초기 로딩 (1)
  // 데이터 불러와서 저장
  let data = await fetchData(defaultUrl);

  // 카드 영화 리스트에 붙이기
  printMovies(data);
}

// 새로고침
export function handleHeaderClick(event) {
  if (event.target.matches("#pageTitle")) {
    window.location.reload();
  }
}

// 카드 생성 붙이기
export function printMovies(data) {
  const movieList = document.querySelector("#movieList");
  // 붙이기 전 리스트 비우기 (새로고침)
  movieList.innerHTML = ``;

  // 메인 섹션에 카드 붙이기
  for (const datum of data) {
    // 필요한 데이터 저장
    const id = datum.id;
    const poster_path = datum.poster_path;
    const img_url = `https://image.tmdb.org/t/p/original${poster_path}`;
    const rounded_vote_average =
      Math.round(Number(datum.vote_average) * 10) / 10;

    // 카드 생성
    const movieCardDiv = document.createElement("div");
    movieCardDiv.id = id;
    movieCardDiv.className = "movie-card";
    movieCardDiv.innerHTML = `
      <img src="${img_url}" alt="${datum.title}">
			<div class="card-context">
      	<h3>${datum.title}</h3>
      	<p>평점: ${rounded_vote_average}</p>
			</div>
		`;

    // 카드 추가
    movieList.appendChild(movieCardDiv);
  }
}

// 모달 내용 생성 및 오픈
export async function openModal(event) {
  const card = event.target.closest(".movie-card");

  // 카드가 눌렸는지 확인
  if (card) {
    const movieData = await fetchMovieById(card.id);

    // 이미지만 url 생성해서 붙이기
    const poster_path = movieData.poster_path;
    const img_url = `https://image.tmdb.org/t/p/original${poster_path}`;

    // 모달 오픈
    movieModal.classList.toggle("hidden");
    detailContent.scrollTop = 0; // 스크롤바 위에서부터 시작

    // id 바꾸기
    detailContent.id = card.id;

    // 상세페이지 작성
    modalPoster.src = img_url;
    modalPoster.alt = movieData.title;
    modalTitle.textContent = movieData.title;
    modalOverview.textContent = movieData.overview || `제공된 영화 설명이 없습니다.`;
    modalRelease.textContent = movieData.release_date;
    const rounded_vote_average = Math.round(Number(movieData.vote_average) * 10) / 10;
    modalRating.textContent = rounded_vote_average;

    // 모달 오픈시 표시할 버튼
    // 북마크 되어있는지 확인하기
    let bookmarkIds = JSON.parse(window.localStorage.getItem("bookmarkIds"));

    // 북마크가 하나도 저장 안된 경우 -> 북마크 추가
    // 북마크가 몇개 저장되었으나 해당 영화 없는 경우 -> 북마크 추가
    // 북마크가 몇개 저장되어있고 해당 영화가 있는 경우 -> 북마크 제거
    if (bookmarkIds === null || !bookmarkIds.includes(card.id.toString())) {
      removeBookmarkBtn.style.display = "none";
      addBookmarkBtn.style.display = "block";
    } else if (bookmarkIds.includes(card.id.toString())) {
      addBookmarkBtn.style.display = "none";
      removeBookmarkBtn.style.display = "block";
    }
  }
}

// 모달 닫기
export function closeModal(event) {
  if (event.target.matches("#movieModal") || event.target.matches("#close")) {
    movieModal.classList.toggle("hidden");
  }
}

// handle bookmarks
// add bookmark
export function addBookmark() {
  // 버튼 바꾸기
  addBookmarkBtn.style.display = "none";
  removeBookmarkBtn.style.display = "block";

  // local storage에 저장하기
  const movieId = detailContent.id;
  let bookmarkIds =
    JSON.parse(window.localStorage.getItem("bookmarkIds")) || [];

  if (!bookmarkIds.includes(movieId)) {
    bookmarkIds.push(movieId);
  }

  window.localStorage.setItem("bookmarkIds", JSON.stringify(bookmarkIds));
  alert("북마크 추가됨");
}

// remove bookmark
export function removeBookmark() {
  // 버튼 바꾸기
  removeBookmarkBtn.style.display = "none";
  addBookmarkBtn.style.display = "block";

  // local storage에서 지우기
  const movieId = detailContent.id;
  let bookmarkIds = JSON.parse(window.localStorage.getItem("bookmarkIds"));

  if (bookmarkIds.includes(movieId)) {
    const i = bookmarkIds.indexOf(movieId);
    bookmarkIds.splice(i, 1);
  }
  window.localStorage.setItem("bookmarkIds", JSON.stringify(bookmarkIds));

  // 추가사항) 북마크 제거시 모달 닫기
  movieModal.classList.toggle("hidden");

  // 북마크를 모두 제거한 경우
  if (bookmarkIds.length === 0) {
    loadPage();
  } else if (bookmarkShown) {
    // 북마크 보기에 머물렀던 경우
    showBM();
  }

  alert("북마크 취소됨");
}

// 북마크 로드 함수 따로 만들기
export async function showBM() {
  bookmarkShown = true;
  // 북마크 보기
  let bookmarkIds =
    JSON.parse(window.localStorage.getItem("bookmarkIds")) || [];

  let bmResults = await Promise.all(
    bookmarkIds.map(async (id) => {
      return await fetchMovieById(id);
    })
  );

  if (bmResults.length === 0) {
    alert("북마크된 영화가 없습니다!");
  } else {
    printMovies(bmResults);
  }
}

// 영화 검색 함수
export async function searchMovie() {
  bookmarkShown = false;
  // 대소문자 구분
  const input = searchInput.value.toLowerCase();
  let search_url = `${base_url}/search/movie?query=${input}&include_adult=false&language=ko-KR&page=1&api_key=${api_key}`;

  // 아무것도 입력되지 않은 경우 초기 리스트 띄우기
  if (input === "") {
    search_url = defaultUrl;
  }
  let data = await fetchData(search_url);

  // 로드 안될때는 일단 빈 페이지 (페이지 구현 x)
  if (data === null) {
    return;
  }
  // 찾아본거 붙이기
  printMovies(data);
}

// 디바운싱 함수
export function debounce(func, delay) {
  let timer;
  return function () {
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Trottling 함수
function throttle(func, delay) {
  let timer = null;

  return function () {
    const args = arguments;
    if (!timer) {
      func.apply(this, args);
      // 타이머 값 지정
      timer = true;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}

// api event에 대해 throttling 하는 것이 더 나을 수 있음
