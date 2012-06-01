should = require('should')
Tree = require('../lib/tree').Tree

tree = null

describe "Tree tools", ->

    describe "Create new tree", ->
        it "When I create a new tree", ->
            tree = new Tree()
        it "I have a tree with just one root", ->
            should.exist tree.root

    describe "Add a node", ->
        it "When I add a node called 'recipe'", ->
            tree.addNode "recipe"
        it "And I add a node called 'todo'", ->
            tree.addNode "todo"
        it "Then I have a property recipe and a property todo in my tree.", ->
            should.exist tree.root.recipe
            should.exist tree.root.todo
        it "When I add a node called 'recipe/dessert/brownie'", ->
            tree.addNode "recipe/dessert/brownie"
        it "Then I have a property recipe.dessert.brownie in my tree.", ->
            should.exist tree.root.recipe.dessert.brownie

    describe "Delete a node", ->
        it "When I delete a node called 'todo'", ->
            tree.deleteNode "todo"
        it "Then node called 'todo' should not exist", ->
            should.not.exist tree.root.todo
        it "When I delete a node called 'recipe/dessert/brownie'", ->
            tree.deleteNode "recipe/dessert/brownie"
        it "Then node called 'recipe/dessert/brownie' should not exist", ->
            should.not.exist tree.root.recipe.dessert.brownie

    describe "Update a node", ->
        it "When I delete a node called 'todo'", ->
            tree.deleteNode "todo"
        it "Then node called 'todo' should not exist", ->
            should.not.exist tree.root.todo
        it "When I delete a node called 'recipe/dessert/brownie'", ->
            tree.deleteNode "recipe/dessert/brownie"
        it "Then node called 'recipe/dessert/brownie' should not exist", ->
            should.not.exist tree.root.recipe.dessert.brownie



