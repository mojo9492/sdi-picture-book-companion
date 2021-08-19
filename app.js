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
    if (req.body.item) {
        const new_item = JSON.parse(req.body.item);

        try {
            const insertReturnId = await knex('items')
                .insert(new_item)
                .returning('id');

            const { name, data } = req.files.image;

            const insertImage = await knex('images')
                .insert({ filename: name, img: data, item_id: insertReturnId++ })
                .returning('id');

            console.log('wats this ', insertImage)
            res.status(200).send({ message: 'Yay!' })




            // .then(id => {
            //     const newId = id++
            //     console.log('You are passed insertion')
            //     if (req.files.image) {
            //         const { name, data } = req.file.image;
            //         console.log('You are passed image if check');

            //         knex('images')
            //             .insert({ filename: name, img: data, item_id: newId })
            //             .then(data => {
            //                 console.log('you made it passed image insertion', data)
            //                 res.status(200).send({ message: 'Yay!' })
            //             })

            //     }

            //     res.status(200).send({ message: `Successfully added ${req.body.item.nomenclature}` })

            // })
        } catch (err) {
            res.status(500).send(err)
        }
    } else {
        const error = new Error()
        error.message = 'The server could not process your request';
        res.status(422).send(error)
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


