/// <reference path="../int/Application.d.ts"/>

module test.int {
	declare const app: jCafe.Application;

	app.personsAndGroupsManager.mePerson.location.city.get().then(() => {

	});
	
	const query = app.personsAndGroupsManager.createPersonSearchQuery();
	query.results(0).matches;
	query.results(0).relevance;
	query.results(0).result.activity;
}