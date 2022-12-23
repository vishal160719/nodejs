/* eslint-disable no-undef */
const request = require('supertest')
const chai = require('chai')
const sinon = require('sinon')
const nodemailer = require('nodemailer')
const app = require('../app')
const Users = require('../models/users')

const expect = chai.expect

describe('Authentication Test Cases', function () {
  let mailerStub
  before('drop collection', function (done) {
    Users.deleteMany({})
      .then(() => {
        const transport = {
          sendMail: () => Promise.resolve()
        }
        mailerStub = sinon.stub(nodemailer, 'createTransport').returns(transport)
      })
      .then(() => done())
      .catch((error) => done(error))
  })

  describe('POST /register', function () {
    it('should register successfully', function (done) {
      request(app).post('/api/auth/register')
        .send({
          email: 'test@test.com',
          password: '123',
          username: 'user123'
        })
        .end((err, res) => {
          expect(res.body.message).equal('register successful')
          expect(res.body.data.email).equal('test@test.com')
          expect(res.body.data.username).equal('user123')
          expect(res.body.data).not.have.property('password')
          done(err)
        })
    })

    it('should register failed when email is not provided', function (done) {
      request(app).post('/api/auth/register')
        .send({
          password: '123',
          username: 'user123'
        })
        .end((err, res) => {
          expect(res.body.message).equal('register failed')
          expect(res.body.error).equal('email, username or password is not found')
          done(err)
        })
    })
  })

  describe('POST /login', function () {
    it('should login successfully', function (done) {
      request(app).post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: '123'
        })
        .end((err, res) => {
          expect(res.body.message).equal('login successful')
          expect(res.body).have.property('access_token')
          expect(res.body).not.have.property('password')
          done(err)
        })
    })

    it('should login fail when invalid password is provided', function (done) {
      request(app).post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'invalid'
        })
        .end((err, res) => {
          expect(res.body.message).equal('login failed')
          expect(res.body.error).equal('invalid password')
          done(err)
        })
    })
  })
})
