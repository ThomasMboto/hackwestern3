/* global angular, document, window */
angular.module('starter.controllers', [])

.controller('AppCtrl', function( $scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////
    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})
/*
.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})
*/
.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope,$ionicScrollDelegate,$location,$stateParams, $timeout, $http, ionicMaterialMotion, ionicMaterialInk, ApiEndpoint) {

  //var _this = $scope.this;
    console.log('ApiEndpoint', ApiEndpoint)
    // Set Header

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.home= true;
    $scope.epl = true;
    $scope.mlb = true;
    $scope.nfl = true;

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    $scope.scrollTo = function(target){
      if(target == 'home'){
        $scope.home= true;
        $scope.epl = true;
        $scope.mlb = true;
        $scope.nfl = true;
      }
      else if(target == 'home2') {
        $scope.home= true;
        $scope.epl = true;
      }
      else if(target == 'epl'){
        $scope.epl = true;
        $scope.home= false;$scope.mlb = false; $scope.nfl = false;
      }
      else if(target == 'mlb'){
        $scope.mlb = true;
        $scope.home= false; $scope.epl = false; $scope.nfl = false;
      }
      else{
        $scope.nfl = true;
        $scope.home= false; $scope.epl = false; $scope.mlb = false;
      }

    };

    $scope.result = "";

/*
var getApiData = function() {
    return $http.get(ApiEndpoint.url + '/tasks')
      .then(function(data) {
        console.log('Got some data: ', data);
        return data;
      });
  };

  return {
    getApiData: getApiData
  };

*/
    //  $http.get('http://api.sportradar.us/mlb-t5/games/2016/10/15/boxscore.json?api_key=j9pf2dkw3tr8vthr4mqybbng')
     /*$http.get(ApiEndpoint.url + '/tasks')
        .success(function(data, status, headers,config){
          console.log('data success');
          console.log(data); // for browser console
          $scope.result = data; // for UI
        })
        .error(function(data, status, headers,config){
          console.log('data error');
        })
        .then(function(result){
          things = result.data;
        });*/
    $http.get('http://api.sportradar.us/mlb-t5/games/2016/10/15/boxscore.json?api_key=j9pf2dkw3tr8vthr4mqybbng')
    .success(function(data, status, headers,config){
      console.log('data success');
      console.log(data); // for browser console
      $scope.result = data; // for UI
    })
    .error(function(data, status, headers,config){
      console.log('data error');
    })
    .then(function(result){
      things = result.data;
    });
    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

});
