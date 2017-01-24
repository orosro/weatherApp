(function(){

    angular
        .module("weatherViewer")
        .controller('MainController', MainController);

    MainController.$inject = ['$location', 'weather'];

    function MainController($location, weather){

        var vm = this;

        vm.title = 'Here is the weather in your city';


        var onCoordsComplete = function(data){
            vm.coords = data;
            weather.getForecast(data).then(onForecastComplete, onError);
        }

        var onCityComplete = function(data){
            // console.log(data)
            vm.city = data.city;
            weather.getForecast(data).then(onForecastComplete, onError);
        }

        var onForecastComplete = function(data){
            if(vm.coords){
                vm.city = data.city.name;
            }
            vm.forecast = data.list;
            // console.log(vm.forecast)
        }


        var onError  = function(reason){
            vm.error = "Sorry! Seems there is an error";
        }

        // weather.getCoord().then(onCoordsComplete, onError);
        weather.getCity().then(onCityComplete, onError);
    };


}());