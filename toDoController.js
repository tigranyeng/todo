var app = angular.module('myApp', []); 
app.controller('toDoController', ['$scope','$http', function($scope, $http) {
    $scope.todoList = [];
   	$scope.sh = false;
    $scope.show = false;
    var showList = function() {

        $http.get('/api/todos').then(function(response) {

            var list = response.data.todos;
            list.forEach(function(item){
                $scope.todoList.push({id:item.id, text:item.title, content:item.content, status:false}); 
                })
            $scope.show = true;
                
        });
          
    };

    showList();

    $scope.add = function() {
        var text = $scope.text;
        var content = $scope.content;
    	
        $http.post('/api/todos', {
            title: text,
            content: content
        }).then(function(response){
                var todo = response.data.todo;
                $scope.todoList.push({id:todo.id, text:todo.title, content:todo.content, status:false});
                $scope.show = true;
                console.log($scope.todoList);
            });
	     
    };

    $scope.remove = function() {

         var oldList = $scope.todoList;
         $scope.todoList = [];
         var id=[];
        
         oldList.forEach(function(x) {
            if(x.status){
               
                if(x.text == $scope.details_text){
                    $scope.sh = false;
                }
                id.push(x.id);
            }
            else if(!x.status){
                $scope.todoList.push(x);
            }
                
        });
        $http.delete('/api/todos/' + id)
            .then(function(response) {
                alert('Deleted!!!');
            });
        	if(!$scope.todoList.length){
    			$scope.show = false;
    		}
    };

    $scope.show_details = function(){

    	$scope.sh = true;
        $scope.details_text = $scope.todoList[this.$index].text;
    	$scope.details_id = $scope.todoList[this.$index].id;
    	$scope.details_content = $scope.todoList[this.$index].content;
    	$scope.index = this.$index
    }

    $scope.edit = function(details_id){
        var id = details_id;
        var title = $scope.details_text;
        var content = $scope.details_content;

        $http.put('/api/todos/' + id, {
            title: title,
            content: content
        }).then(function(response) {
                var todo = response.data.todo;
                $scope.todoList.forEach(function(item){
                    if(item.id==todo.id){
                        item.text = todo.title;  
                        item.content = todo.content;  
                    }
               });
               alert('Edited!!!') 
 
        });
        
    }
    
    $scope.close = function(){

    	$scope.sh = false;

    }
}]);