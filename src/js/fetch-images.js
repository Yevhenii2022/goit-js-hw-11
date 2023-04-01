import axios from 'axios';

export async function getImages(query) {
  const API_KEY = '34887030-f3c1ca9c5b1c016c795af66f2';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: 1,
        per_page: 40,
      },
    });

    // if (!response.ok) {
    //   throw new Error(response.status);
    // }

    console.log(response.data.hits);
    // return response;
  } catch (error) {
    throw error;
  }
}
