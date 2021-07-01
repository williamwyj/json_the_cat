const request = require('request');
const input = process.argv.slice(2);
let catID = '';
const breedsURL = 'https://api.thecatapi.com/v1/breeds';
const url = `https://api.thecatapi.com/v1/breeds/search?q=`;

request(breedsURL, (error, response, body) => {
  const breeds = JSON.parse(body);
  for (const cat of breeds) {
    if (cat.name === input[0]) {
      catID = cat.id;
    }
  }
  if (catID) {
    request(`${url}${catID}`, (error, response, body) => {
      if (error) {
        console.error(error);
      } else {
        const data = JSON.parse(body);
        console.log(data[0].description);
      }
    });
  } else {
    console.log('Breed not found');
  }
  
});

