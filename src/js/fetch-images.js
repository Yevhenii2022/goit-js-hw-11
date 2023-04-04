import axios from 'axios';

export class ImagesAPI {
  #API_KEY = '34887030-f3c1ca9c5b1c016c795af66f2';
  #BASE_URL = 'https://pixabay.com/api/';
  page = 1;
  query = null;
  per_page = 40;

  async getImages() {
    const response = await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#API_KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: this.page,
        per_page: this.per_page,
      },
    });

    return response.data;
  }
}

// const win = open('', '', 'width=500,height=250');
// win.document.body.innerHTML = createCountryDetailsMarkup(...);
