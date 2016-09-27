/// <reference path="../int/Application.d.ts"/>
var test;
(function (test) {
    var int;
    (function (int) {
        app.personsAndGroupsManager.mePerson.location.city.get().then(function () {
        });
        var query = app.personsAndGroupsManager.createPersonSearchQuery();
        query.results(0).matches;
        query.results(0).relevance;
        query.results(0).result.activity;
    })(int = test.int || (test.int = {}));
})(test || (test = {}));
