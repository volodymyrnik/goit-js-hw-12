import axios from 'axios';

const API_KEY = '48308649-6275080a65400e008e92230b2';

export const fetchSearch = (query, currentPage) => {
  const axiosOptions = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    },
  };
  return axios.get(`https://pixabay.com/api/`, axiosOptions);
};
