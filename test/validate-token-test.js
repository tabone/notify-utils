'use strict'

const assert = require('assert')
const utils = require('../index')

describe('utils.validateToken() method:', function () {
  describe('Scenario: Validating a valid access token:', function () {
    describe('Given an access token,', function () {
      let token = null

      beforeEach(function () {
        token = {}
      })

      describe('which is considered to be valid,', function () {
        let origin = null
        let maxAge = null

        beforeEach(function () {
          maxAge = 3600 // 1 hour
          token.created = new Date()
          token.origin = origin = 'http://bar.com'
        })

        describe('when validating the token:', function () {
          it('should return a resolved promise with the token', function () {
            return utils.validateToken(token, { maxAge, origin })
              .then(resToken => assert.strictEqual(resToken, token))
          })
        })
      })
    })
  })

  describe('Scenario: Validating an expired access token:', function () {
    describe('Given an access token,', function () {
      let token = null

      beforeEach(function () {
        token = {}
      })

      describe('which is considered to be expired,', function () {
        let origin = null
        let maxAge = null

        beforeEach(function () {
          maxAge = 3600 // 1 hour
          token.created = new Date()
          token.created.setHours(token.created.getHours() + 2)
          token.origin = origin = 'http://bar.com'
        })

        describe('when validating the token:', function () {
          it('should return a rejected promise with the token', function () {
            return utils.validateToken(token, { maxAge, origin })
              .catch(resToken => assert.strictEqual(resToken, token))
          })
        })
      })
    })
  })

  describe('Scenario: Validating an access token with a different origin:', function () {
    describe('Given an access token,', function () {
      let token = null

      beforeEach(function () {
        token = {}
      })

      describe('which has a different origin from the HTTP Request origin,', function () {
        let requestOrigin = null
        let maxAge = null

        beforeEach(function () {
          maxAge = 3600 // 1 hour
          token.created = new Date()
          token.origin = 'http://bar.com'
          requestOrigin = 'http://foo.com'
        })

        describe('when validating the token:', function () {
          it('should return a rejected promise with the token', function () {
            return utils.validateToken(token, { maxAge, requestOrigin })
              .catch(resToken => assert.strictEqual(resToken, token))
          })
        })
      })
    })
  })
})