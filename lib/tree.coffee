currentTree = null

class exports.Tree

    constructor: ->
        @root = {}

    addNode: (path) ->
        nodes = path.split("/")

        currentNode = @root
        for pathNode in nodes
            if currentNode[pathNode] != undefined
                currentNode = currentNode[pathNode]
            else
                currentNode[pathNode] = {}
                currentNode = currentNode[pathNode]
        this

    deleteNode: (path) ->
        #nodes = path.split("/")

        #currentNode = @root
        #while currentNode != undefined and nodes.length > 1
        #    node = nodes.shift()
        #    currentNode = currentNode[node]

        node = @getNode path
        console.log node
        delete node
        #delete currentNode[nodes.shift()] if currentNode != undefined

        this
             
    updateNode: ->
        false

    getNode: (path) ->
        nodes = path.split("/")

        currentNode = @root
        while currentNode != undefined and nodes.length > 1
            currentNode = currentNode[nodes.shift()]

        currentNode

    toJson: ->
        JSON.stringify(@)

