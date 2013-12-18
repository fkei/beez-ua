(function(global) {
    var require = global.require;

    // Configure RequireJS
    require.config({
        "baseUrl": "../s",
        "urlArgs": "v="+(new Date()).getTime(),
        "paths": {
            "underscore": "../node_modules/underscore/underscore",
            "mocha": "../node_modules/mocha/mocha",
            "chai": "../node_modules/chai/chai",
            "index": "./beez-ua/index",
            "spec": '../spec'
        },
        shim: {
            "underscore": { "exports": "_" }
        }
    });

    // Require libraries
    require(['require', 'chai', 'mocha'], function(require,chai,mocha,$){
        // Chai
        global.assert = chai.assert;
        //global.should = chai.should();
        global.expect = chai.expect;

        // Mocha
        global.mocha.setup('bdd');
        var spec = global.spec;

        spec.rerun = function rerun() {
            if (!spec.TestCaseName) {
                return;
            }
            //var suite = require(['spec/' + el.getAttribute("data-name")]);
            // Require base tests before starting
            require(['spec/' + spec.TestCaseName], function(suite){
                // Start runner
                global.mocha.suite.suites = []; // clear
                suite();
                var runner = global.mocha.run();
                runner.globals([
                        '_zid' // Backbone.history
                ]);
            });
        };

    });
})(this);
