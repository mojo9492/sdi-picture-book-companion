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
  let promises = [];
  
  promises[0] = getImageByIdAsync('Desert_Boot.jpeg');
  promises[1] = getImageByIdAsync('ACU_Gore_Tex_Parka.jpeg');
  promises[2] = getImageByIdAsync('ACU_Gore_Tex_Trousers.jpeg');
  promises[3] = getImageByIdAsync('AT_984_G.jpeg');
  promises[4] = getImageByIdAsync('Alternator.jpeg');
  return Promise.all(promises).then(data => {
    return knex('images').del()
    .then(function () {
      // Inserts seed entries
      console.log(data);
      return knex('images').insert([
        {filename: 'Desert_Boot.jpeg', img: data[0], item_id: 1},
        {filename: 'ACU_Gore_Tex_Parka.jpeg', img: data[1], item_id: 2},
        {filename: 'ACU_Gore_Tex_Trousers.jpeg', img: data[2], item_id: 3},
        {filename: 'AT_984_G.jpeg', img: data[3], item_id: 4},
        {filename: 'Alternator.jpeg', img: data[4], item_id: 5}
      ]);
    }).catch(err => {
      console.error(err);
    });;
  });
  // Deletes ALL existing entries
};


// exports.seed = function(knex) {

//   fs.readFileAsync = function (filename) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(filename, (err, buffer) => {
//             if (err) reject(err); else resolve(buffer);
//         });
//      });
//   };
//   // utility function
//   function getImageByIdAsync(filename) {
//     return fs.readFileAsync(`${__dirname}/${filename}`);
//   }
//   return getImageByIdAsync('300.jpeg').then(data => {
//     return knex('images').del()
//     .then(function () {
//       // Inserts seed entries
//       console.log(data);
//       return knex('images').insert([
//         {filename: 'image1.jpeg', img: data, item_id: 1},
//         {filename: 'image2.jpeg', img: data, item_id: 2},
//         {filename: 'image3.jpeg', img: data, item_id: 3},
//         {filename: 'image4.jpeg', img: data, item_id: 4},
//         {filename: 'image5.jpeg', img: data, item_id: 5}
//       ]);
//     });
    
//   }).catch(err => {
//     console.error(err);
//   });    
//   // Deletes ALL existing entries
// };