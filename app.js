const express = require('express');
const app = express()
const fileUpload = require('express-fileupload')
const knex = require('knex')(require('./knexfile.js').development);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hit the / route' })
});

app.get('/search', (req, res) => {
    const queryType = req.query.type.toLowerCase();
    const queryToSearch = req.query[req.query.type].toLowerCase();
    if (queryToSearch) {
        //query database and send back results
        knex.select('*')
            .from('items')
            // .where('title', 'ilike',`%${req.query.title}%` this does partial search matching 
            .where(queryType, 'ilike', `%${queryToSearch}%`)
            .then(items => {
                if (items.length === 0) { // no results found
                    throw new Error("no results");
                }

                const itemId = items[0].id
                knex.select('*')
                    .from('images')
                    .where('item_id', itemId)
                    .then(imagesData => {
                        res.status(200).send(items)

                        // res.end(imagesData[0].img)
                    })
                //data from api => img api <img src="google.imgsdfskdhfahsfhuudsfh">
            })
            .catch(err =>
                res.status(404).json({
                    message: `No item with '${queryType}' '${queryToSearch}' found`,
                    error: err
                }));
    } else {
        res.status(404)
            .json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
    }
});

app.post('/add', async (req, res) => {
    try {
        const new_item = JSON.parse(req.body.item);
        const insertReturnId = await knex('items')
            .insert(new_item)
            .returning('id');

        const newId = insertReturnId[0];

        const insertImageReturnId = await knex('images')
            .insert({ filename: req.files.image.name, img: req.files.image.data, item_id: newId })
            .returning('id');

        res.status(200).send({ message: `Successfully added item: ${insertReturnId[0]}/${typeof insertReturnId[0]}, image: ${newId}/${typeof newId}` })
    } catch (err) {
        res.status(500).send({ message: 'Server cannot process your request.', err: err.message })
    }
})

app.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id++
    if (req.params.id) {
        knex('images')
            .where({ item_id: idParam })
            .delete('*')
            .then(() => knex('items')
                .where({ id: idParam })
                .delete('*')
                .returning('nomenclature')
                .then(nomenclature => {
                    res.status(200).send({ message: `You have deleted item: ${nomenclature}` })
                }))
    } else {
        res.status(422).send({ message: `id not supplied` })
    }
})

module.exports = app;


