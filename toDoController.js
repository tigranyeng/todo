var app = angular.module('myApp', []); 
app.controller('toDoController', function($scope) {
    $scope.todoList = [];
   	$scope.sh = false;
    $scope.show = false;
    $scope.add = function() {
    	if($scope.text){
	        $scope.todoList.push({text:$scope.text, content:$scope.content, status:false});
	        $scope.text = "";
	        $scope.content = "";
        	if($scope.todoList.length){
    			$scope.show = true;
    		}
		}	
    };

    $scope.remove = function() {

        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.status) $scope.todoList.push(x);
        });
        	if(!$scope.todoList.length){
    			$scope.show = false;
    		}
    };

    $scope.show_details = function(){

    	$scope.sh = true;
    	$scope.details_text = $scope.todoList[this.$index].text;
    	$scope.details_content = $scope.todoList[this.$index].content;
    	$scope.index = this.$index
    }

    $scope.edit = function(){

    	if($scope.details_text){
    		$scope.todoList[$scope.index].text = $scope.details_text;
    		$scope.todoList[$scope.index].content = $scope.details_content;
    	}
    }
    $scope.close = function(){

    	$scope.sh = false;

    }
});