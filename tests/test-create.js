var uproto = require('../index');

uproto.namespace('kuaizhan.model');
var DataProvider = uproto.createClass('DataProvider', Object, {
    init: function() {
        console.log(this.constructor.__name);
        console.log("DataProvider init.");
    }
});


var MySQLDataProvider = uproto.createClass('MySQLDataProvider', 'DataProvider', {
    init: function(p) {
        console.log(this.constructor.__name);
        console.log("MySQLDataProvider init.");
    }
});
console.log('create object now:');
new MySQLDataProvider();