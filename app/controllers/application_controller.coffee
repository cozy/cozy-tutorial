before 'protect from forgery', ->
    protectFromForgery '014bab01fb364db464d3f1c9a4c4fe8e4032ed0b'

console.log "toto"

if app.settings.env == "production"
    console.log "toto"
    before 'check authentication', ->
        console.log "test"
        if req.isAuthenticated() then next() else send 403

