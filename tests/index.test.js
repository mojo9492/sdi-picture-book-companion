const request = require('supertest'); // 1
const app = require('../app.js') //2


describe('backend test', () => {
    //describe
    it('basic GET request', () => {
        request(app) // 3
            .get('/user')  // 4
            .expect('Content-Type', /json/) // 5
            .expect('Content-Length', '15') // 5
            .expect(200, { name: 'john' }) // 5
            .end(function (err, res) {  // 6
                if (err) throw err;
            });

    });

    describe('/', () => {

        it('serves a page', async () => {
            const response = await request(app)
                .get('/')

            expect(response.status).toBe(200)

        });

    });

    describe('/search', () => {

        it('allows a query get request', async () => {
            const queryType = 'NSN'
            const queryNSN = '62400000272059'
            const response = await request(app)
                .get(`/search?q=${queryType}&${queryType}=${queryNSN}`);

            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body.NSN).toBe(queryNSN)
        })

    });

    describe('/add', () => {
        const imageObject = { image_id: 1 }
        const item = {
            nomenclature: '',
            common: '',
            part: '',
            NSN: '',
            accounting: '',
            category: '',
            image: imageObject,
            descripiton: ''
        }

        it('allows adding of a new item', async () => {
            const response = await request(app)
                .post('/add')
                .send(item)

            expect(response.status).toBe(200)
            expect(response.body.NSN).toBe(item.NSN)
        })

        it('should return 422 if incorrect data is entered', async () => {
            const message = 'The server could not process your request'
            const badItem = {
                nomenclature: 82783274,
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

        })
    })

    describe('/delete/:id', () => {
        const itemId = 1

        it('should delete', async () => {
            const deleteResponse = await request(app)
                .delete(`/delete/${itemId}`)
            const deletionConfirmation = `You have delete item: ${deleteResponse.body.nomenclature}`

            expect(deleteResponse.status).toBe(200)
            expect(deleteResponse.body.message).toBe(deletionConfirmation)
        })
    })
});
