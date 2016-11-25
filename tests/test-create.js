var up = require('../index');

up.namespace('kuaizhan.model');
var DataProvider = up.createClass('DataProvider', Object, {
    init: function() {
        console.log(this.constructor.__name);
        console.log("DataProvider init.");
    }
});


var MySQLDataProvider = up.createClass('MySQLDataProvider', 'DataProvider', {
    init: function(p) {
        console.log(this.constructor.__name);
        console.log("MySQLDataProvider init.");
    }
});
console.log('create object now:');
new MySQLDataProvider();