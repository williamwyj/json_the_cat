const request = require('request');

const breedsURL = 'https://api.thecatapi.com/v1/breeds';
const url = `https://api.thecatapi.com/v1/breeds/search?q=`;

const fetchBreedDescription = function(breedName, callback) {
  let catID = null;
  request(breedsURL, (error, response, body) => {
    const breeds = JSON.parse(body);
    for (const cat of breeds) {
      if (cat.name === breedName) {
        catID = cat.id;
      }
    }
    console.log("test", catID)
    if (catID) {
      request(`${url}${catID}`, (error, response, body) => {
        if (error) {
          callback(error, body);
        } else {
          const data = JSON.parse(body);
          callback(error, data[0].description);
        }
      });
    } else {
      callback('Breed not found', null);
    }
    
  });
};




module.exports = { fetchBreedDescription };

