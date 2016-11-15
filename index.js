var types_defined = {};
var namespace_cache = {};
var EMPTY_FUNC = function() {};
var NS_SP = '.';

var uproto = {
    ns: 'default',
    import: function(TypeName) {
        var namespace_str = this.ns,
            pos = TypeName.lastIndexOf(NS_SP);
        if (pos > -1) {
            namespace_str = TypeName.substr(0, pos);
            TypeName = TypeName.substr(pos + 1);
        }
        var ns = this._resolve_namespace(namespace_str);

        if (!ns[TypeName]) {
            throw new Error('Type ' + TypeName + ' not found in namespace ' + namespace_str);
        }

        return ns[TypeName];
    },
    _resolve_namespace: function(namespace_str) {
        if (!namespace_str) {
            return types_defined['default'];
        }

        if (namespace_cache[namespace_str]) {
            return namespace_cache[namespace_str];
        }

        var parts = namespace_str.split(NS_SP),
            node = types_defined;
        while (parts.length > 0) {
            var name = parts.shift();
            if (typeof node[name] !== 'object') {
                throw new Error('namespace not found.');
            }
            node = node[name];
        }

        namespace_cache[namespace_str] = node;
        return node;
    },
    //get or set current namespace;
    namespace: function(namespace_str) {
        if (!namespace_str) {
            return this.ns;
        }
        var parts = namespace_str.split(NS_SP),
            node = types_defined,
            ns_path = [];
        while (parts.length > 0) {
            var name = parts.shift();
            ns_path.push(name);
            if (!node[name]) {
                node[name] = {
                    __ns_name: ns_path.join(NS_SP)
                };
            }
            node = node[name];
        }
        this.ns = namespace_str;
    },
    merge: function(dest_obj, src_obj) {
        Object.getOwnPropertyNames(src_obj).forEach(function(name) {
            dest_obj[name] = src_obj[name];
        });
        return dest_obj;
    },
    createClass: function(TypeName, ParentType, prototype_obj) {
        //check params
        if (typeof ParentType === 'string') {
            ParentType = this.import(ParentType);
        }

        if (typeof ParentType !== 'function') {
            throw new Error('param ParentType must be a function.');
        }
        if (typeof TypeName !== 'string') {
            throw new Error('param TypeName must be a string.');
        }

        if (!prototype_obj) {
            prototype_obj = {};
        }
        if (typeof prototype_obj !== 'object') {
            throw new Error('param prototype_obj must be an object.');
        }

        //resolve namespace_str
        var namespace_str = this.ns,
            pos = TypeName.lastIndexOf(NS_SP);
        if (pos > -1) {
            namespace_str = TypeName.substr(0, NS_SP);
        }
        var ns = this._resolve_namespace(namespace_str);
        //forbid redefine
        if (ns[TypeName]) {
            throw new Error('type already defined: ' + TypeName);
        }

        if (!prototype_obj.init) {
            prototype_obj.init = EMPTY_FUNC;
        }

        //constructor
        var T = ns[TypeName] = function () {
            ParentType.apply(this, arguments);

            //call parent init
            if (ParentType.prototype.init) {
                ParentType.prototype.init.apply(this, arguments);
            }
            this.init(arguments);
        };

        T.prototype = Object.create(ParentType.prototype);
        this.merge(T.prototype, prototype_obj);
        T.prototype.constructor = T;
        //save Parent class
        T.__parent = ParentType;
        return T;
    }
};

uproto.namespace('default');
module.exports = uproto;