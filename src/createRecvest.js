// import axios from 'axios';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Notify } from 'notiflix';

// export function createRecvest(value, page, PER_PAGE) {
//   Loading.circle();

//   const BASE_URL = 'https://pixabay.com/api';
//   const API_KEY = '37410571-78e708f3fcce6ce73b7e36a87';
//   return axios
//     .get(
//       `${BASE_URL}?key=${API_KEY}&orientation=horizontal&image_type=photo&safesearch=true&q=${value}&page=${page}&per_page=${PER_PAGE}`
//     )
//     .then(resp => {
//       console.log(resp.data);
//       if (!resp.data.total) {
//         return Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//       }
//       return resp.data;
//     })
//     .catch(err => Notify.failure(`${err.message}`))
//     .finally(Loading.remove(300));
// }
