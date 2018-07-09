const app = angular.module('myApp', []);

const url = '../../api/applications';

function MyController($http) {



	this.query = function () {
		console.log('appel query en cours...');
		return $http.get(url).then(response => this.applications = response.data.content).catch(e => console.log('error', e));
	};

	this.create = function () {
		console.log('appel create en cours...');
		return $http.post(url, this.newApplication).then(() => {
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
	};

	this.empty = function () {
		console.log('appel delete all en cours...');
		return $http.delete(url).then(() => {
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
	};

	this.retrieve = function (id) {
		console.log('appel retrieve en cours...', id);
		return $http.get(`${url}/${id}`).then((response) => {
			console.log('application', response.data.content);
			this.retrievedApplication = response.data.content;
		}).catch((error) => {
			console.error('error', error);
		});
	};

	this.update = function (application) {
		console.log('appel update en cours...');
		return $http.put(`${url}/${application._id}`, {
			_id: application._id,
			name: application.newName
		}).then((response) => {
			console.log('application', response.data.content);
			this.application = response.data.content;
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
	}

	this.delete = function (application) {
		console.log('appel delete en cours...');
		return $http.delete(`${url}/${application._id}`).then((response) => {
			console.log('application', response.data.content);
			this.application = response.data.content;
			this.query();
		}).catch((error) => {
			console.error('error', error);
		});
	}

	this.query();
}


app.controller('MyController', MyController);

app.directive('jlgClickAndDisable', function () {
	return {
		scope: {
			jlgClickAndDisable: '&'
		},
		controller: function ($scope, $element) {
			$element.bind('click', function () {
				console.log('disable the button');
				$element.prop('disabled', true);
				$scope.jlgClickAndDisable().finally(function () {
					$element.prop('disabled', false);
				})
			});
		}
	};
});
