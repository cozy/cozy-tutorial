should = require('chai').Should()
Client = require('request-json').JsonClient

client = new Client "http://localhost:8888/"

instantiateApp = require '../server'
app = instantiateApp()

describe "Test section", ->

    before (done) ->
        app.listen 8888
        done()

    after (done) ->
        app.compound.server.close()
        done()

    it "Then it succeeds", ->
        "ok".should.equal "ok"
