import axios from 'axios';

export async function serviceImage(optionsObj) {
  // Loading.circle();
  const BASE_URL = 'https://pixabay.com/api/';
  const resp = await axios.get(BASE_URL, {
    params: {
      ...optionsObj,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      key: '37410571-78e708f3fcce6ce73b7e36a87',
      // key: '37410571-78e708f3fcce6ce73b7e36a8',
    },
  });
  return resp.data;
}
