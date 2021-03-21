var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


/* 
testing https://jsonplaceholder.typicode.com

*/

// test for GET /posts?userId=<id>&title=<title>

const server = 'https://jsonplaceholder.typicode.com';
const userId = 2;
const title = 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit';
const endpoint = `/posts?userId=${userId}&title=${title}`
const assert = require('assert')

testCase('Smoke-test', function(){
      it('responds with code 200', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
      });

      it('returns the "content-type" = "application/json"', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
		assert.strictEqual(res.headers['content-type'].split(' ')[0], 'application/json;');
                done();
            });
      });

      it('returns the "content-type charset" = "charset=utf-8"', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
		assert.strictEqual(res.headers['content-type'].split(' ')[1], 'charset=utf-8');
                done();
            });
      });

      it('return type array', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
		res.body.should.be.a('array');
                done();
            });
      });

      it('return type object, if the post exists', (done) => {
        chai.request(server)
            .get(endpoint)
            .end((err, res) => {
		if (res.body.lenght > 0) {
		    assert.strictEqual(typeof(res.body[0]), object);
		};                
		done();
            });
      });
  });
