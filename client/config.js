exports.config = {
  // See docs at http://brunch.readthedocs.org/en/latest/config.html.
    "files": {
        "javascripts": {
            "defaultExtension": 'js',
            "joinTo": {
                'scripts/app.js': /^app/,
                'scripts/vendor.js': /^vendor/
            },
            "order": {
                "before": [
                  'vendor/scripts/jquery-2.0.3.min.js',
                  'vendor/scripts/underscore-1.5.2.min.js',
                  'vendor/scripts/backbone-1.0.0.min.js'
                ]
            }
        },

        "templates": {
            "defaultExtension": 'jade',
            "joinTo": 'scripts/app.js'
        }
    }
}