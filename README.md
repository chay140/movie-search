<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=header" />

# 감자의 영화 검색
> TMDB API를 이용한 영화 검색 페이지를 제작했습니다.

**배포 링크** : [chay140/movie-search](https://chay140.github.io/movie-search/)

## 페이지 구성
**헤더**
* 제목 : 클릭시 새로고침
* 영화 검색창 : 영화 실시간 검색
* 북마크 보기 : 저장된 북마크 보여주기 (없는 경우 alert 띄움)

**보디**
* 영화 카드 리스트 : API로 불러온 영화 리스트 포스팅
* 영화 상세보기 모달 : 영화 카드 클릭시 상세보기 제공 역할

## 기능 소개 / 설명
* 영화 검색 (디바운싱)
    *  실시간 검색 가능
    *  대소문자 구분 없음
    *  한국어/영어 검색 가능
* 북마크 기능
    * localStorage를 이용한 북마크 기능
    * 북마크 추가
    * 북마크 제거
    * 북마크 보기
* 상세 정보 모달
    * 영화 카드 클릭시 영화 상세보기 제공
    * 영화 포스터, 평점, 시놉시스, 개봉일자 제공
    * 없는 경우 대체 설명 / 포스터 이미지 제공

## 스크립트 코드 (모듈화) 구성
* script.js : 이벤트 리스너를 모은 파일
* api.js : API call을 실행하는 로직을 구현한 파일
* ui.js : 영화 페이지 로딩 / 영화 카드 생성 등 ui 관련 로직을 구현한 파일
* bookmark.js : 북마크 관련 로직 구현한 파일

## 기술 스택
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black)
![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

<details>
<summary>
  모든 프로젝트 통틀어 사용한 언어 비율
</summary>
  
   [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=chay140)](https://github.com/anuraghazra/github-readme-stats)
   
</details>


### Readme 작성
![markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)

<img src="https://capsule-render.vercel.app/api?type=waving&color=BDBDC8&height=150&section=footer" />
