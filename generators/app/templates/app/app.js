angular.module('app', [])
  .controller('AllInOne', function($scope, $http) {
    $scope.todos = [];
    $scope.todo = {};
    $http.get('/todo').success(function(data) {
      $scope.todos = data;
    });
    $scope.addTodo = function() {
      $http.post('/todo', $scope.todo).success(function(data) {
        $scope.todos.unshift(data);
      });
      $scope.todo = {};
    };
  });