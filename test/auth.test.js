const request = require('supertest')
const chai = require('chai')
const app = require('../app')
const Users = require('../models/users')
const sinon = require('sinon')
const nodemailer = require('nodemailer')


const expect = chai.expect

describe('Authentication Test Cases', function () {
    describe('POST /register', function(){
        let mailerStub
        before('drop collection',function(done){
            Users.deleteMany({})
            .then(()=>{
                const transport = {
                    sendMail: () => Promise.resolve()
                }
                mailerStub = sinon.stub(nodemailer, 'createTransport').returns(transport)
            })
            .then(()=>done())
            .catch((error)=>{done(error)})
        })

        it('Should register successfully', function(done){
            request(app).post('/api/auth/register')
            .send({
                username: 'Test',
                email: "test@email.com",
                password:'1234'
            })
            .end((err, res) =>{
                console.log(err);
                console.log(res.body);
                expect(res.body.message).equals("register successful")
                expect(res.body.data.email).equal("test@test.com")
                expect(res.body.data.username).equal("test")
                expect(res.body.data).not.have.property("password")
                done()
            })
        })

        it('Should register failed when email is not provided', function(done){
            request(app).post('/api/auth/register')
            .send({
                username: 'Test',
                password:'1234'
            })
            .end((err, res) =>{
                expect(res.body.message).equals("register failed")
                expect(res.body.data.error).equal("email,username or password is not found")
                done(err)
            })
        })
    })
})