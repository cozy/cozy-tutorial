Note = define 'Template', ->
    property 'title', String, index: true
    property 'content', String
    property 'creationDate', Date, default: Date
    property 'lastModificationDate', Date, default: Date
    property 'content': String
    property 'tags', [String]
    property 'tagParent', String

Tree = define 'Tree', ->
    property 'type', String, default: "Template"
    property 'struct', String


