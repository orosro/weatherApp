(function(){
    angular
        .module('wv.router', ['ngRoute'])
        .config(function($routeProvider){
            $routeProvider
                .when('/main', {
                    templateUrl: './app/components/main.html',
                    controller: 'MainController',
                    controllerAs: 'vm'
                })
                .otherwise({redirectTo: "/main"});
        })

}())


