# This is where we import required modules
ViewCollection = require '../lib/view_collection'
BookmarkView  = require './bookmark_view'
BookmarkCollection = require '../collections/bookmark_collection'

module.exports = class BookmarksView extends ViewCollection

    # This is the template we wrote above
    template: require('./templates/home')

    # This is the class that will be used to create view needed to render models
    itemview: BookmarkView

    # Use a CSS selector to connect your view to a DOM element already rendered.
    el: 'body.application'

    # DOM selector to connect the already rendered DOM element where you want to
    # display the subviews. Not mandatory, default is 'el'
    collectionEl: '#bookmark-list'

    # After DOM elements have been created
    afterRender: ->

        # Must be called first
        super()

        # Show loading indicator.
        @$collectionEl.html '<em>loading...</em>'

        # Retrieves the data from the database
        @collection.fetch
            success: (collection, response, option) =>
                @$collectionEl.find('em').remove()
            error: =>
                msg = "Bookmarks couldn't be retrieved due to a server error."
                @$collectionEl.find('em').html msg


     onCreateClicked: =>
          # Grab field data
          title = $('.title-field').val()
          url = $('.url-field').val()

          # Validate that data are ok.
          if title?.length > 0 and url?.length > 0

            bookmark =
                    title: title
                    url: url
            # Save it through collection, this will automatically add it to the
            # current list when request finishes.
            @collection.create bookmark,
                success: ->
                    alert "Bookmark added"
                    $('.title-field').val ''
                    $('.url-field').val ''
                error: -> alert "Server error occured, Bookmark was not saved"
          else
              alert 'Both fields are required'

