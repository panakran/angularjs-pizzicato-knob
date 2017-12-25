angular.module('filterModule', [])
.directive('filter', function ($compile, dataService) {

    return{

        templateUrl: "templates/filter.html",
        restrict:'E',
        controller: "FilterController",
        scope: true,
        link: {

            pre: function (scope, elem, attr, ctrl) {
                console.log("PRE LINKING FILTER DIRECTIVE");
                console.log("Nothing to do here...");
            },
            post: function (scope, elem, attr, ctrl) {
                console.log("POST LINKING FILTER DIRECTIVE");
                console.log("Calling service get filter param=", attr.filter);
                var theFilter = dataService.getFilter(attr.filter);
                scope.filter = new theFilter.class;
                var filterLabel = angular.element('</div class="well well-lg"><div class="row"><h4><span class="label label-success">' + attr.filter + '</span></h4></div><div class="row">');
                elem.append(filterLabel);
                angular.forEach(theFilter.props, function (value) {
                    var element = angular.element('<div class="col-sm-2"><h5><span class="label label-primary">' + value.name + '</span><h5><input value="' + value.defaults + '"type="text" class="' + value.name + '"></div>');
                    elem.append(element);
                    $("." + value.name).knob({
                        'change': function (v) {
                            scope.$emit('onChange', scope.filter, value.name, v);
                            console.log("Triggering On change event", v);
                        }
                    })
                    .trigger(
                        'configure',
                        {
                            "min": value.min,
                            "max": value.max,
                            "step": value.max / 100,
                            "height": 110,
                            "width": 110,
                            "fgColor": "#00c629",
                            "bgColor": "#c2efcb",
                            "inputColor": "#00c629",
                            "skin": "tron",
                            "thickness": 0.2,
                            "displayPrevious": true
                        }
                        );
                });
                var removeBtn = $compile(angular.element('</div><div class="row"><button ng-click="removeFilter(filter)" class="btn btn-primary">Remove ' + attr.filter + '</button></div>'))(scope);
                elem.append(removeBtn);
                scope.$emit('applyFilter', scope.filter);
                console.log("Emit apply filter event-", scope.filter);

            }
        }

    };
})

.controller('FilterController', function ($scope, $element) {
    $scope.filter = null;
    $scope.removeFilter = function (filter) {
        $scope.$emit('removeFilter', filter);
        console.log("Emit remove fillter event", filter);
        $element.remove();

    };

});