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
            .then(data => {
                if (data.length === 0) { // no results found
                    throw new Error("no results");
                }
                res.status(200).json(data);
                console.log('this is the data', data);
            })
            .catch(err =>
                res.status(404).json({
                    message: `No item with '${queryType}' '${queryToSearch}' found`
                }));
    } else {
        res.status(404)
            .json({
                message:
                    'The data you are looking for could not be found. Please try again'
            })
    }
});

app.post('/add', (req, res) => {
    const { name, data } = req.files.pic;
    const errorMsg = 'The server could not process your request'

    if (Object.values(req.body).includes(null) ||
        Object.values(req.body).includes(undefined)) {
        res.status(422).send({ message: errorMsg })
    } else {
        const { nomenclature, common, part, NSN, accounting, category, description } = req.body
        //insert into database
        res.status(200).send()
    }

})

app.delete('/delete/:id', (req, res) => {
    console.log('req.id', req.params.id)
    if (req.params.id) {
        res.status(200).send({ message: 'you got it ' })
    } else {
        res.status(422).send({ message: 'you got it' })
    }
})

module.exports = app;
