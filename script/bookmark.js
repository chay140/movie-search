// 북마크 관련 변수/함수들
import { printMovies } from "./ui.js";
import { fetchMovieById } from "./api.js";

// 북마크를 감싸는 detailContent도 이곳에서 선언
export const detailContent = document.querySelector("#movieDetail");
export const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
export const removeBookmarkBtn = document.querySelector("#removeBookmarkBtn");

// Flags
let bookmarkShown = false;

export function getBookmarkShown() {
  return bookmarkShown;
}

export function setBookmarkShown(value) {
  bookmarkShown = value;
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
  } else {
    alert("이미 북마크에 추가된 영화입니다");
    return;
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
  } else {
    alert("북마크에 없는 영화입니다");
    return;
  }
  window.localStorage.setItem("bookmarkIds", JSON.stringify(bookmarkIds));

  // 추가사항) 북마크 제거시 모달 닫기
  movieModal.classList.toggle("hidden");

  // 북마크를 모두 제거한 경우
  if (bookmarkIds.length === 0) {
    loadPage();
  } else if (getBookmarkShown()) {
    // 북마크 보기에 머물렀던 경우
    showBM();
  }

  alert("북마크 취소됨");
}

// 북마크 로드 함수 따로 만들기
export async function showBM() {
  setBookmarkShown(true);
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
