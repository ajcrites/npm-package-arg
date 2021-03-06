var npa = require("../npa.js")

require("tap").test("basic", function (t) {
  t.setMaxListeners(999)

  var tests = {
    "foo@1.2": {
      name: "foo",
      type: "range",
      spec: ">=1.2.0-0 <1.3.0-0",
      raw: "foo@1.2",
      rawSpec: "1.2"
    },

    "foo@1.2.3": {
      name: "foo",
      type: "version",
      spec: "1.2.3",
      raw: "foo@1.2.3"
    },

    "foo@=v1.2.3": {
      name: "foo",
      type: "version",
      spec: "1.2.3",
      raw: "foo@=v1.2.3",
      rawSpec: "=v1.2.3"
    },

    "git://github.com/user/foo": {
      name: null,
      type: "git",
      spec: "git://github.com/user/foo",
      raw: "git://github.com/user/foo"
    },

    "/path/to/foo": {
      name: null,
      type: "local",
      spec: "/path/to/foo",
      raw: "/path/to/foo"
    },

    "https://server.com/foo.tgz": {
      name: null,
      type: "remote",
      spec: "https://server.com/foo.tgz",
      raw: "https://server.com/foo.tgz"
    },

    "user/foo-js": {
      name: null,
      type: "github",
      spec: "user/foo-js",
      raw: "user/foo-js"
    },

    "foo@user/foo-js": {
      name: "foo",
      type: "github",
      spec: "user/foo-js",
      raw: "foo@user/foo-js"
    },

    "foo@latest": {
      name: "foo",
      type: "tag",
      spec: "latest",
      raw: "foo@latest"
    },

    "foo": {
      name: "foo",
      type: "range",
      spec: "*",
      raw: "foo"
    }
  }

  Object.keys(tests).forEach(function (arg) {
    var res = npa(arg)
    t.type(res, "Result")
    t.has(res, tests[arg])
  })

  // Completely unreasonable invalid garbage throws an error
  t.throws(function() {
    npa("this is not a \0 valid package name or url")
  })

  t.throws(function() {
    npa("gopher://yea right")
  }, "Unsupported URL Type: gopher://yea right")

  t.end()
})
