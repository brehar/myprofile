'use strict';

var app = angular.module('profileApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/html/home.html',
        controller: 'homeCtrl'
    }).state('register', {
        url: '/register',
        templateUrl: '/html/register.html',
        controller: 'registerCtrl'
    }).state('profile', {
        url: '/profile',
        templateUrl: '/html/profile.html',
        controller: 'profileCtrl'
    }).state('login', {
        url: '/login',
        templateUrl: '/html/login.html',
        controller: 'loginCtrl'
    }).state('logout', {
        url: '/logout',
        templateUrl: '/html/logout.html',
        controller: 'logoutCtrl'
    }).state('details', {
        url: '/profile/:id',
        templateUrl: '/html/details.html',
        controller: 'detailsCtrl'
    });
    
    $urlRouterProvider.otherwise('/');
});