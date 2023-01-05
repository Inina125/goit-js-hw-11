import axios from 'axios';

async function fetchImages(query, page, per_page) {
  const params = new URLSearchParams({
    key: '29055202-7a11a8de1831679c8600f5be8',
    q: query,
    page: page,
    per_page: per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export default fetchImages;
