'use strict';

var app = angular.module('profileApp');

app.controller('homeCtrl', function($scope, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    Auth.getAllProfiles().then(res => {
        $scope.users = res.data;
    });
});

app.controller('registerCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    $scope.registerUser = function() {
        Auth.registerUser($scope.newUser).then(res => {
            return Auth.login($scope.newUser);
        }).then(res => {
            $state.go('profile');
        });
    };
});

app.controller('profileCtrl', function($scope, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    $scope.editProfile = function() {
        $scope.profileToEdit = true;
        $scope.profile = angular.copy($scope.currentUser);
        Materialize.updateTextFields();
    };

    $scope.cancelEdit = function() {
        $scope.profileToEdit = false;
    };

    $scope.saveProfile = function() {
        Auth.saveProfile($scope.profile).then(res => {
            $scope.currentUser = $scope.profile;
            $scope.profileToEdit = false;
        });
    };
});

app.controller('loginCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });
    
    $scope.loginUser = function() {
        Auth.login($scope.user).then(res => {
            $state.go('profile');
        });
    };
});

app.controller('logoutCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    Auth.logout().then(res => {
        $state.go('home');
    });
});

app.controller('detailsCtrl', function($scope, $state, Auth) {
    Auth.getProfile().then(res => {
        $scope.currentUser = res.data;
    }).catch(err => {
        $scope.currentUser = null;
    });

    Auth.getSingleProfile($state.params.id).then(res => {
        $scope.profile = res.data;
    });
});