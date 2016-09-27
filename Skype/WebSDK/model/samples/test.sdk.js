/// <reference path="../s4b.sdk/Application.d.ts"/>
var test;
(function (test) {
    var sdk;
    (function (sdk) {
        app.personsAndGroupsManager.mePerson.location.get().then(function () {
        });
    })(sdk = test.sdk || (test.sdk = {}));
})(test || (test = {}));
