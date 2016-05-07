'use strict';

var app = angular.module('profileApp');

app.service('Auth', function($http) {
    this.getProfile = () => {
        return $http.get('/api/users/profile');
    };
    
    this.registerUser = newUser => {
        return $http.post('/api/users', newUser);
    };
    
    this.login = user => {
        return $http.post('/api/users/login', user);
    };
    
    this.logout = () => {
        return $http.delete('/api/users/logout');
    };
    
    this.saveProfile = newProfile => {
        return $http.put('/api/users/profile', newProfile);
    };

    this.getAllProfiles = () => {
        return $http.get('/api/users');
    };

    this.getSingleProfile = id => {
        return $http.get(`/api/users/profile/${id}`);
    };
});