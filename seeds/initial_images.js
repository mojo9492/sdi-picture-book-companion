const fs = require('fs');
const path = require('path');

exports.seed = function(knex) {

  fs.readFileAsync = function (filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, buffer) => {
            if (err) reject(err); else resolve(buffer);
        });
     });
  };
  // utility function
  function getImageByIdAsync(filename) {
    return fs.readFileAsync(`${__dirname}/${filename}`);
  }
  return getImageByIdAsync('300.jpeg').then(data => {
    return knex('images').del()
    .then(function () {
      // Inserts seed entries
      console.log(data);
      return knex('images').insert([
        {filename: 'image1.jpeg', img: data, item_id: 1},
        {filename: 'image2.jpeg', img: data, item_id: 2},
        {filename: 'image3.jpeg', img: data, item_id: 3},
        {filename: 'image4.jpeg', img: data, item_id: 4},
        {filename: 'image5.jpeg', img: data, item_id: 5}
      ]);
    });
    
  }).catch(err => {
    console.error(err);
  });    
  // Deletes ALL existing entries
};
