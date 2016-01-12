'use strict'

let app = angular.module('whitePageApp', []);


app.controller('MainCtrl', function ($scope, phoneSearch ) {
  console.log('hello from app js!');

  // set the phone number input to an empty string;
  $scope.phoneNumber = '';
  // this takes in the phone number on the scope and passes it
  // to the searchNumber function, when the button is clicked
  // this function is triggered
  $scope.searchNumber = function (phoneNumber) {
    phoneSearch.Search(phoneNumber).then(function (resp) {
      // resets input field to empty
      $scope.phoneNumber = '';
      // gets all people from database to refresh the table
      phoneSearch.getPeople().then(function (resp) {
        console.log(resp);
        // sets the resp array on the scope
        $scope.people = resp.data;
      })
    },function (err) {
      console.log(err);
    })
  }


  phoneSearch.getPeople().then(function (resp) {
    $scope.people = resp.data
  },function (err) {
    console.log(err);
  })

})


app.service('phoneSearch',function ($http) {

  this.Search = function (phoneNumber) {
    return $http.post(`/phone/${phoneNumber}`)
  }

  this.getPeople = function () {
  return $http.get('/phone')
  }

})
