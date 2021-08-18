const express = require('express');
const app = express()
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Hit the / route' })
});

app.get('/search', (req, res) => {
    if (req.query[req.query.type]) {
        //query database and send back results
        console.log('req', req.query.type, req.query[req.query.type]);
        res.status(200).send({ message: 'Hit the /results route' });

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
        res.status(200).send({message: 'you got it '})
    } else {
        res.status(422).send({message: 'you got it'})
    }
})

module.exports = app;
