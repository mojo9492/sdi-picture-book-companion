const request = require('supertest'); // 1
const app = require('../app.js') //2


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
            const queryNSN = '2920-01-420-9968'
            const response = await request(app)
                .get(`/search?type=${queryType}&${queryType}=${queryNSN}`);

            expect(response.status).toBe(200)
            // expect(response.type).toBe('application/json')
            expect(response.body[0].nsn).toBe(queryNSN)
        })

    });

    describe('/add', () => {
        const imageObject = { filePath: './to/my/image.jpg' }
        const item = {
            "nomenclature": "Some new item",
            "common": "Some new item",
            "part_number": "",
            "nsn": "7530-01-514-5168",
            "accounting": "",
            "category": "",
            "description": "it a new awesome item",
        }
        // await supertest(app)
        // .post('/upload')
        // .attach('files', 'test.jpg')


        xit('allows adding of a new item', async () => {
            const response = await request(app)
                .post('/add')
                .send(item)

            expect(response.status).toBe(200)
            // expect(response.body.nsn).toBe(item.nsn)
        })

        xit('should return 422 if incorrect data is entered', async () => {
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
            const deletionConfirmation = `You have deleted item: ${deleteResponse.body.nomenclature}`

            expect(deleteResponse.status).toBe(200)
            expect(deleteResponse.body.message).toBe(deletionConfirmation)
        })
    })
});
