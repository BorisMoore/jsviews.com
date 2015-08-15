var testrunner = require("qunit");
testrunner.run({
    code: {path: "index-node-jsr.js", namespace: "jsrender"}, // exports require('jsrender')
    tests: "test/unit-tests/tests-jsrender-no-jquery.js"
});

testrunner.run({
    code: {path: "index-node-jsv.js", namespace: "jsviews"}, // exports require('jsviews')
    tests: "test/unit-tests/tests-node.js"
});
