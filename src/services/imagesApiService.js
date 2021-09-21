const URL = 'https://pixabay.com/api/';
const KEY = '22485348-da19140f48b52c54df68447da';
const IMAGES_PER_PAGE = 12;

function fetchImages(query, page) {
  return fetch(`${URL}/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${IMAGES_PER_PAGE}`)
  .then(response => {
    if(response.ok) {
       return response.json()
    }
    return Promise.reject(new Error(`There are no images with ${query}`));
  });

}

export { fetchImages };