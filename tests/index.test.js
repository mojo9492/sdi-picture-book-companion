const request = require('supertest');
const app = require('../app.js');
const fs = require('fs');

describe('backend test', () => {

    xdescribe('/', () => {
        it('serves a page', async () => {
            const response = await request(app)
                .get('/')

            expect(response.status).toBe(200)
        });

    });

    describe('/search', () => {

        it('allows a query get request', async () => {
            const queryType = 'nsn'
            const queryNSN = '8430-01-514-5168'
            const response = await request(app)
                .get(`/search?type=${queryType}&${queryType}=${queryNSN}`);

            expect(response.status).toBe(200)
            // expect(response.type).toBe('application/json')
            expect(response.body[0].nsn).toBe(queryNSN)
        })

    });

    xdescribe('/add', () => {
        it('adds a new item', async () => {
            const item = {
                "nomenclature": "Some new item",
                "common": "Some new item",
                "part_number": "",
                "nsn": "7530-01-514-5168",
                "accounting": "",
                "category": "",
                "description": "it a new awesome item",
            }

            const response = await request(app)
                .post('/add')
                .send(item)

            expect(response.status).toBe(200)
        });

        it('adds a new image', done => {
            const imgFile = `${__dirname}/../seeds/dog_300.jpeg`;
            const imgStream = fs.createReadStream(imgFile);

            const req = request(app)
                .post('/add')
                .set('Content-Type', 'application/octet-stream');

            imgStream.on('end', () => req.end(done));
            imgStream.pipe(req, { end: false })
        })

        it('should return 422 if incorrect data is entered', async () => {
            const message = 'The server could not process your request'
            const badItem = {
                nomenclature: true,
                common: 774374,
                part: null,
                NSN: undefined,
                accounting: 772,
                category: true,
                image: null,
                descripiton: ' '
            }

            const response = await request(app)
                .post('/add')
                .send(item)

            expect(response.status).toBe(422)
            expect(response.body.message).toBe(message)

        });
    })

    describe('/update/item/:itemId', () => {
        it('should update records', async () => {
            const updatedItem = {
                "nomenclature": "Some new item",
                "common": "Some new item",
                "part_number": "",
                "nsn": "7530-01-514-000updated-nsn",
                "accounting": "a new accounting code",
                "category": "",
                "description": "it a new awesome item",
            }

            const id = 1;
            const updateResponse = await request(app)
                .post(`/update/item/${id}`)
                .send(updatedItem)

            //knex('users').update(id, newId).update...
            const confirmationMsg = 'You have successfully updated item: '
            expect(updateResponse.status).toBe(200);
            expect(updateResponse.body.message).toContain(confirmationMsg);

        })
    })
    
    xdescribe('/update/images/:itemId', () => {
        const id = 1;
    })

    describe('/delete/:id', () => {
        const itemId = 1

        it('should delete', async () => {
            const deleteResponse = await request(app)
                .delete(`/delete/${itemId}`)

            expect(deleteResponse.status).toBe(200)
            expect(deleteResponse.body.message).toContain('You have deleted item: ')
        });
    });
});
