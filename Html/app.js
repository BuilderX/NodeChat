import * as io from 'net';
/**
 * Created by kimberlyvasquez on 12/30/15.
 */
// load angular
var app = angular.module('scotch-chat', ['ngMaterial', 'ngAnimate', 'ngMdIcons', 'btford.socket-io']);

var serverBaseUrl = "http://localhost:2015";

app.factory('GUI',function(){
    "use strict";
     return require('nw.gui');
});

app.factory('Windows', function(GUI){
    "use strict";
        return GUI.Window.get();


});
//Service to interact with the socket library
app.factory('socket', function (socketFactory) {
    var myIoSocket = io.connect(serverBaseUrl);

    var sock = socketFactory({
        ioSocket: myIoSocket
    });

    return sock;
});

//ng-enter directive
app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

app.controller('MainCtrl', function ($scope, Window, GUI, $mdDialog, socket, $http) {

//Menu setup
});

$scope.messages = [];
$scope.room = "";


// Build window menu for application with GAND W SERVICES

var windowMenu = new Gui.Menu({
    type:'menubar'
});
var roomsMenu = new GUI.Menu();

windowMenu.append(new GUI.MenuItem({
                label:'Rooms',
                submenu:roomsMenu

}));
windowMenu.app(new GUI.MenuItem({
            label:'Exit',
            click:function(){
                "use strict";
                        Window.close();

            }

}));
// app.js

//Listen for the setup event and create rooms
socket.on('setup', function (data) {
    var rooms = data.rooms;

    for (var r = 0; r < rooms.length; r++) {
        //Loop and append room to the window room menu
        handleRoomSubMenu(r);
    }

    //Handle creation of room
    function handleRoomSubMenu(r) {
        var clickedRoom = rooms[r];
        //Append each room to the menu
        roomsMenu.append(new GUI.MenuItem({
            label: clickedRoom.toUpperCase(),
            click: function () {
                //What happens on clicking the rooms? Swtich room.
                $scope.room = clickedRoom.toUpperCase();
                //Notify the server that the user changed his room
                socket.emit('switch room', {
                    newRoom: clickedRoom,
                    username: $scope.username
                });
                //Fetch the new rooms messages
                $http.get(serverBaseUrl + '/msg?room=' + clickedRoom).success(function (msgs) {
                    $scope.messages = msgs;
                });
            }
        }));
    }
    //Attach menu
    GUI.Window.get().menu = windowMenu;
});

