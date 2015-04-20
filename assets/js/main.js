var app = angular.module('kss', [])

angular.module('kss').controller('MainCtrl', function ($scope, $http) {
  $scope.lookup = function () {

    $http.get("/query", {
      params: {
        "number": $scope.number
      }
    }).success(function (data) {
      $scope.results = data;
    }).error(function (data, status) {
      $scope.data = data || "Request failed";
      $scope.status = status;
      console.log("error", status, data);
    });

  };
});

