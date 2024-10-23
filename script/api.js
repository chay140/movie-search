// API 관련
// API 키
export const api_key = "1637473361826aed8a4aeab8642e8b1e";
export const base_url = "https://api.themoviedb.org/3";
export const defaultUrl = `${base_url}/movie/popular?language=ko-KR&page=1&api_key=${api_key}`;

// 데이터 여러개 받아오기
export async function fetchData(apiurl) {
  try {
    const res = await fetch(apiurl);

    // 에러 메세지 생성
    if (!res.ok) {
      // res 메타데이터 말고 body part 저장
      const res_body = await res.json();
      throw new Error(
        `HTTP error! Status: ${res.status} - ${res_body.status_message}`
      );
    }

    const fetchedData = await res.json();
    return fetchedData.results;
  } catch (error) {
    console.warn(error);
    alert(error);
    return null;
  }
}

// 데이터 하나만 받아오기
export async function fetchMovieById(id) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&api_key=${api_key}`;
  try {
    const res = await fetch(movieUrl);

    if (!res.ok) {
      // res 메타데이터 말고 body part 저장
      const res_body = await res.json();
      throw new Error(
        `HTTP error! Status: ${res.status} - ${res_body.status_message}`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("Fetching movie data by id:", error);
    alert(error);
    return null;
  }
}
