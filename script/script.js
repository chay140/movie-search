import {
  loadPage,
  handleHeaderClick,
  openModal,
  closeModal,
  searchMovie,
  addBookmark,
  removeBookmark,
  showBM,
  debounce,
  throttle
} from "./ui.js";

// Elements
const header = document.querySelector("header");
const movieListSection = document.querySelector("section");
const movieModal = document.querySelector("#movieModal");
const searchInput = document.querySelector("#searchInput");
const showBMBtn = document.querySelector("#showBookmark");
const addBookmarkBtn = document.querySelector("#addBookmarkBtn");
const removeBookmarkBtn = document.querySelector("#removeBookmarkBtn");
const bookmarkStatusModal = document.querySelector("#bookmarkStatusModal");

// document.addEventListener("input", () => {
//   if (window.event.keyCode === 13) { 
//     console.log("엔터키 치는 중");
//   }
// })

// 이벤트 리스너들
// 제목 클릭시 새로고침
header.addEventListener("click", handleHeaderClick);

// 북마크 보기
// showBMBtn.addEventListener("click", () => {showBM()});   // 아래와 같은 코드
showBMBtn.addEventListener("click", showBM);

// 영화 상세정보 창 열기
movieListSection.addEventListener("click", openModal);

// 모달 닫기
movieModal.addEventListener("click", closeModal);

// 검색 기능 디바운싱 추가
searchInput.addEventListener("input", debounce(searchMovie, 300));

// 검색 기능 쓰로틀링 추가
// searchInput.addEventListener("input", throttle(searchMovie, 300));

// 북마크 추가
addBookmarkBtn.addEventListener("click", addBookmark);

// 북마크 삭제
removeBookmarkBtn.addEventListener("click", removeBookmark);

// 페이지 구현
loadPage();
