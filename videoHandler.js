
function videos($scope, $timeout){
	//static arrays for testing 
	$scope.sidebar = [{id:"video1", directory:"ronaldo1.mp4", name:"test video"},{id:"video2", directory:"ronaldo2.mp4", name:"test video"},{id:"video3", directory:"ronaldo3.mp4", name:"test video"},{id:"video4", directory:"ronaldo4.mp4", name:"test video"},{id:"video5", directory:"test.mp4", name:"test video"}];
	$scope.panel = [];
    $scope.panelPauseTimes = [];
    $scope.sliderEnd = 0;

	//add a video to the panel from the sidebar
	$scope.addToPanel =function(index){	
        _V_($scope.sidebar[index].id).dispose();
        $scope.panel.push(


            {id: $scope.sidebar[index].id, name: $scope.sidebar[index].name, directory: $scope.sidebar[index].directory});
	
		      $scope.sidebar.splice((index), 1);


            var panelLength = $scope.panel.length;

           
                _V_($scope.panel[(panelLength-1)].id, { "controls": true, "autoplay": false, "preload": "auto" }, function(){
            // Player (this) is initialized and ready.
            });    
        }

        $scope.removeFromPanel = function(index){
            _V_($scope.panel[index].id).dispose();
             $scope.sidebar.push(

            {id: $scope.panel[index].id, name: $scope.panel[index].name, directory: $scope.panel[index].directory});
    
            $scope.panel.splice((index), 1);

             var sideBarLength = $scope.sidebar.length;
            
           
                _V_($scope.sidebar[sideBarLength-1].id, { "controls": true, "autoplay": false, "preload": "auto" }, function(){
            // Player (this) is initialized and ready.
            
            });
}
$scope.pauseAll = function(){
        angular.forEach($scope.panel, function(value,key){
            
            _V_($scope.panel[key].id).pause();
            

        })
    }

    //Play all the videos IN PANEL
    $scope.playAll = function(){
    	angular.forEach($scope.panel, function(value,key){
    		
    		_V_($scope.panel[key].id).play();
    		

    	})
	}

    $scope.returnVideoEndTime = function(index){
       
        var player = _V_($scope.panel[index].id);
        
        var result = player.currentTime();
       
        return result;
    }


    //collects current times in a array 
    $( "#slider" ).on( "slidestart", function( event, ui ) { 
        angular.forEach($scope.panel, function(value,key){  
           var myPlayer = _V_(value.id);
           $scope.panelPauseTimes[key]= (myPlayer.currentTime());
            
        })}

     );

    $( "#slider" ).on( "slide", function( event, ui ) {
        angular.forEach($scope.panel, function(value,key){
           
           
        console.log($scope.panelPauseTimes[key]);  


        if (ui.value > $scope.sliderEnd) 
        {
        var newTime = ui.value + $scope.panelPauseTimes[key];

        _V_(value.id).currentTime(newTime);
        
        }
        else{
        var newTime = $scope.panelPauseTimes[key] - ($scope.sliderEnd - ui.value);
        

       _V_(value.id).currentTime(newTime);

         }
        }

        )}
        );
    $( "#slider" ).on( "slidestop", function( event, ui ) {$scope.sliderEnd = ui.value;} );

    
    
        
}