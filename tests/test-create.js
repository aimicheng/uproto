var uproto = require('../index');

var DataProvider = uproto.createClass('DataProvider', Object, {
    init: function() {
        console.log("DataProvider init.");
    }
});


var MySQLDataProvider = uproto.createClass('MySQLDataProvider', 'DataProvider', {
    init: function(p) {
        console.log("MySQLDataProvider init.");
    }
});
console.log('create object now:');
new MySQLDataProvider();