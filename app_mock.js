const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(fileUpload());

const PORT = process.env.PORT || 3000;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV]);

app.post('/upload/', async function(req, res) { 
  const item = req.body.item;
  const {name, data} = req.files.pic;
  if (req.body.item) {
   const item = JSON.parse(req.body.item);
   console.log(item.nomenclature);
   const insert_item = {
     nomenclature: item.nomenclature,
     common: item.common,
     part_number: item.part_number,
     nsn: item.nsn,
     accounting: item.accounting,
     category: item.category,
     description: item.description
   }
   await knex.insert(item).into('items');
    knex 
           .select('id')
           .from('items')
           .where('nsn', item.nsn)
           .then(async query_result => {
              if(name && data) {
                await knex.insert({filename: name, img: data, item_id: query_result[0].id}).into('images')
                return res.sendStatus(200);
              } else {
                return res.sendStatus(400)
              }
           })
   } else {
   res.sendStatus(400)
  }
});


app.get('/img/:id', async function(req, res) { 
  const id = req.params.id;

  const img = await knex('images').where({id: id}).first();
  if(img) {
    console.log(img.img);
    res.end(img.img);
  } else {
   res.end('No img with that Id!');
  }
});


app.listen(PORT, () => {
 console.log(`The server is running on ${PORT}`);
});