Note = define 'Template', ->
    property 'title', String
    property 'content', String
    property 'creationDate', Date, default: Date
    property 'lastModificationDate', Date, default: Date
    property 'content': String
    property 'tags', [String]
    property 'tagParent', String

# User defines user that can interact with the Cozy instance.
User = define 'User', ->
    property 'email', String
    property 'password', String
    property 'owner', Boolean, default: false
    property 'activated', Boolean, default: false
