(function(){

   angular
        .module('weatherViewer')
        .factory('weather', weather);

    var AP = '&appid=de5ade81b8e15181d8d2e538c722a33b',
        coords = {};
    function weather($q, $http){


        /*
        * Returns coordinates using geolocation
        */
        // Get coordonates using geolocation - seems to not returning the right coord
        var getCoord = function(){
            console.log('Getting coords')
            return $q(function(resolve, reject){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition);

                } else {
                    reject('Geolocation is not supported by this browser.');
                    console.error("Geolocation is not supported by this browser.");
                }

                function showPosition(position) {
                    // console.log(position.coords.latitude, position.coords.longitude );
                    coordinates = {
                        "lat": position.coords.latitude,
                        "long": position.coords.longitude
                    }
                    resolve(coordinates);
                }
            })
        }


        /*
        * Get city using ipinfo.io
        * returns promise
         */
        var getCity = function(){
            return $http.get('http://ipinfo.io').then(
                function(response){
                    return response.data;
                }
            )
        }


        /*
        * Get Forecast for specified location
        * @param "coord" object - object with lat and long coordinates
        * returns promise
        */
        var getForecast = function(coord){
            console.log('Fetching forecast on the following days')
            if(coord.city !== undefined){
                var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+coord.city+'&cnt=6&units=metric'+AP;
            } else {
                var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+coord.lat+'&lon='+coord.long+'&cnt=6&units=metric'+AP;
            }
            console.log(url);
            return $http.get(url).then(
                function(response){
                    return response.data
                }
            )
        }


        // Map service functions
        return {
            getCoord: getCoord,
            getCity: getCity,
            getForecast: getForecast
        };
    };

}());