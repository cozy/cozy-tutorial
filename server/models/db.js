var Schema = require('jugglingdb').Schema;
var settings = {url: 'http://localhost:9101/'};
module.exports = new Schema('cozy-adapter', settings);
