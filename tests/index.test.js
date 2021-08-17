const request = require('supertest'); // 1
const app = require('../index.js') //2


describe('backend test', () =>{
//describe
  xit('basic GET request', () => {
    request(app) // 3
    .get('/user')  // 4
    .expect('Content-Type', /json/) // 5
    .expect('Content-Length', '15') // 5
    .expect(200, {name: 'john'}) // 5
    .end(function(err, res) {  // 6
      if (err) throw err;
    });

  });

  xdescribe('/', () =>{

    xit('', () => {
      request(app) // 3
      .get('/user')  // 4
      .expect('Content-Type', /json/) // 5
      .expect('Content-Length', '15') // 5
      .expect(200, {name: 'john'}) // 5
      .end(function(err, res) {  // 6
        if (err) throw err;
      });
  
    });

  
  });

  describe('/results', () =>{

    it('allows a post request', async () => {
     const post = await request(app) // 3
      .post('/results') 
      .send({placeholder: 'somedata'})
      .set('Accept', "application/json")
      const response = await post;
      expect(response.status).toEqual(200)
    })
  





  
  });
  
});




