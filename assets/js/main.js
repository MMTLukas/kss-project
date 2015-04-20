var app = angular.module('kss', [])

angular.module('kss').controller('MainCtrl', function ($scope, $http) {
  $scope.lookup = function () {

    $http.get("/number", {
      params: {
        "number": $scope.number
      }
    }).
      success(function (data) {
        console.log(data);

        $scope.results = JSON.parse(data);
        $scope.results = {
          "fibonacci": {
            "time": "1",
            "result": "",
            "description": ""
          },
          "prime": {
            "time": "2",
            "result": "",
            "description": ""
          },
          "next-prime": {
            "time": "3",
            "result": "",
            "description": ""
          },
          "prime-factors": {
            "time": "4",
            "result": "",
            "description": ""
          }
        };
      })
      .error(function (data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
        console.log("error", status, data);
      });
  };
});

