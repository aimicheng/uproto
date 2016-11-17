var uproto = require('../index');
var assert = require('assert');


it('namespace should pass', function() {
    uproto.namespace('test');
    var current_ns = uproto.namespace();
    assert(current_ns === 'test');
});

it('createClass should pass', function() {
    var A = uproto.createClass('A', Object, {
        init: function(opt) {
            this.a = 'a';
        },
        test_a: function() {
            return "func a";
        },
        overwrite: function() {
            return "in func a";
        }
    });
    var a = new A({
        name: 'a'
    });
    assert(a.init);
    assert(a.a === 'a');
    assert(a.test_a);
    assert(a.test_a() === 'func a');
    assert(a.overwrite);
    assert(a.overwrite() === 'in func a');
});

it('import should pass', function() {
    var A1 = uproto.import('A'),
        A2 = uproto.import('test.A');
    assert(A1 === A2);
});

it('createClass from internal type should pass', function() {
    var A = uproto.import('A');
    var B = uproto.createClass('B', 'test.A', {
        init: function() {
            this.b = 'b';
        },
        test_b: function() {
            return "func b";
        },
        overwrite: function() {
            return "in func b";
        }
    });

    var b = new B();
    assert(b);
    assert(b instanceof A);
    assert(b instanceof B);
    assert(b.getClass() === B);
    assert(b.a === 'a');
    assert(b.b === 'b');
    assert(b.test_a() === 'func a');
    assert(b.test_b() === 'func b');
    assert(b.overwrite() === 'in func b');
});