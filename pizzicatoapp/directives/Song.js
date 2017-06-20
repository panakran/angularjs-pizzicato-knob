angular.module('songModule', [])
        .directive('song', function (dataService) {

            return{

                templateUrl: "templates/song.html",
                controller: "SongController",
                scope: true,
                transclude: true,
                link: {

                    pre: function (scope, elem, attr, ctrl) {
                        console.log("PRE LINKING SONG DIRECTIVE");
                        console.log("scope.songName=", attr.song);
                        scope.songName = attr.song;
                        scope.FiltersNames = dataService.getFiltersNames();
                    },
                    post: function (scope, elem, attr, ctrl) {
                        console.log("POST LINKING SONG DIRECTIVE");
                        console.log("Nothing to do...");

                    }
                }
            };
        })
        .controller('SongController', function ($scope, $element, $compile, $q) {
            $scope.toggleval = true;
    

            $scope.loadSong = function () {
                console.log("Loading song");
                $q.all($scope.openSong()).then(
                        function () {
                        });
            };

            $scope.openSong = function () {

                var deferred = $q.defer();

                console.log("Loading song to resolve", $scope.songName);
                $scope.songFile = new Pizzicato.Sound({
                    source: 'file',
                    options: {path: ['./songs/' + $scope.songName]}//+$scope.songName TODO

                });
                deferred.resolve($scope.songFile);
                console.log("Returning resolved ", deferred);

                return deferred.promise;
            };
            $scope.song = {
                playing: false, // Set the initial state

                togglePlay: function () {
                    $scope.song.playing = !$scope.song.playing; // This would alternate the state each time
                    console.log("Toggle play/pause");

                    if ($scope.song.playing) {
                        $scope.songFile.play();
                    } else {
                        $scope.songFile.pause();

                    }
                }
            };
            $scope.stop = function () {

                $scope.songFile.stop();
            };
            $scope.addFilter = function (filter) {
                var elem = $compile(angular.element("<div class=\"well well-lg\" filter=\"" + filter + "\"></div>"))($scope);
                console.log("song.addFilter()", filter);
                $element.append(elem);
            };
            $scope.$on('applyFilter', function (event, filter) {
                console.log("Apply filter event-", filter);
                $scope.songFile.addEffect(filter);
            });
            $scope.$on('removeFilter', function (event, filter) {
                console.log("Remove filter event-", filter);
                $scope.songFile.removeEffect(filter);
            });
            $scope.$on('onChange', function (event, filterClass, filterName, newValue) {
                console.log("Change value event-", newValue);
                filterClass[filterName] = newValue;
            });
            $scope.createVolume = function () {
                console.log("Create volume");
                $(".volume").knob({
                    'change': function (v) {
                        $scope.songFile.volume = v;
                        console.log(v);
                    }

                }

                ).trigger(
                        'configure',
                        {
                            "min": 0,
                            "max": 1,
                            "step": 1 / 100,
                            "fgColor": "#FF0000",
                            "bgColor": "#f9dbdb",
                            "inputColor": "#FF0000",
                            "height": 150,
                            "width": 150,
                            "skin": "tron",
                            "thickness": 0.2,
                            "displayPrevious": true
                        }
                );
            };
            $scope.createAttack = function () {
                console.log("Create attack");
                $(".attackMain").knob({
                    'change': function (v) {
                        $scope.songFile.attack = v;
                        console.log(v);
                    }

                }

                ).trigger(
                        'configure',
                        {
                            "min": 0,
                            "max": 10,
                            "step": 10 / 100,
                            "fgColor": "#FF0000",
                            "height": 150,
                            "width": 150,
                            "bgColor": "#f9dbdb",
                            "inputColor": "#FF0000",
                            "skin": "tron",
                            "thickness": 0.2,
                            "displayPrevious": true
                        }
                );
            };
            $scope.createRelease = function () {
                console.log("Create release");
                $(".releaseMain").knob({
                    'change': function (v) {
                        $scope.songFile.release = v;
                        console.log(v);
                    }

                }

                ).trigger(
                        'configure',
                        {
                            "min": 0,
                            "max": 10,
                            "step": 10 / 100,
                            "fgColor": "#FF0000",
                            "bgColor": "#f9dbdb",
                            "inputColor": "#FF0000",
                            "height": 150,
                            "width": 150,
                            "skin": "tron",
                            "thickness": 0.2,
                            "displayPrevious": true
                        }
                );
            };
        });