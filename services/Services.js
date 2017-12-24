var app = angular.module('servicesModule', [])

        .service('lodash', function () {
            return _;
        })
        .service('dataService', function (lodash) {
            this.getFiltersNames = function () {
                var filterNamesList = [];
                for (var filterIndex in filters) {
                    filterNamesList.push(filters[filterIndex].name);
                }
                console.log("Service getFiltersNames response=", filterNamesList);
                return filterNamesList;
            };
            this.getFilter = function (filterName) {
                console.log("Service getFilter response=", lodash.find(filters, {"name": filterName}));
                return lodash.find(filters, {"name": filterName});
            };
        }).service('converterService', function (lodash) {
    this.convert = function (value) {
        return;
    };
});

var filters = [
    {
        name: "delay",
        class: Pizzicato.Effects.Delay,
        props: [{
                min: "0", max: "1", defaults: "0.5", name: "feedback"
            },
            {
                min: "0", max: "1", defaults: "0.3", name: "time"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }]
    },
    {
        name: "pingPongDelay",
        class: Pizzicato.Effects.PingPongDelay,
        props: [{
                min: "0", max: "1", defaults: "0.5", name: "feedback"
            },
            {
                min: "0", max: "1", defaults: "0.3", name: "time"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }
        ]
    },
    {
        name: "dubDelay",
        class: Pizzicato.Effects.DubDelay,
        props: [{
                min: "0", max: "1", defaults: "0.5", name: "feedback"
            },
            {
                min: "0", max: "1", defaults: "0.3", name: "time"
            },
            {
                min: "0", max: "4000", defaults: "700", name: "cutoff"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }
        ]
    },
    {
        name: "distortion",
        class: Pizzicato.Effects.Distortion,
        props: [{
                min: "0", max: "1", defaults: "0.5", name: "gain"
            }
        ]
    },
    {name: "quadrafuzz",
        class: Pizzicato.Effects.Quadrafuzz,
        props: [{
                min: "0", max: "1", defaults: "0.6", name: "lowGain"
            },
            {
                min: "0", max: "1", defaults: "0.8", name: "midLowGain"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "midHighGain"
            },
            {
                min: "0", max: "1", defaults: "0.6", name: "highGain"
            }
        ]
    },
    {
        name: "flanger",
        class: Pizzicato.Effects.Flanger,
        props: [{
                min: "0", max: "1", defaults: "0.45", name: "time"
            },
            {
                min: "0", max: "1", defaults: "0.2", name: "speed"
            },
            {
                min: "0", max: "1", defaults: "0.1", name: "depth"
            },
            {
                min: "0", max: "1", defaults: "0.1", name: "feedback"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }
        ]
    },
    {
        name: "compressor",
        class: Pizzicato.Effects.Compressor,
        props: [{
                min: "-100", max: "0", defaults: "-24", name: "threshold"
            },
            {
                min: "0", max: "40", defaults: "30", name: "knee"
            },
            {
                min: "0", max: "1", defaults: "0.003", name: "attack"
            },
            {
                min: "0", max: "1", defaults: "0.025", name: "release"
            },
            {
                min: "1", max: "20", defaults: "12", name: "ratio"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }
        ]
    },
    {
        name: "lowPassFilter",
        class: Pizzicato.Effects.LowPassFilter,
        props: [{
                min: "10", max: "22050", defaults: "350", name: "frequency"
            },
            {
                min: "0.0001", max: "1000", defaults: "1", name: "peak"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix "
            }
        ]
    },
    {
        name: "highPassFilter",
        class: Pizzicato.Effects.HighPassFilter,
        props: [{
                min: "10", max: "22050", defaults: "350", name: "frequency"
            },
            {
                min: "0.0001", max: "1000", defaults: "1", name: "peak"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix "
            }
        ]
    },
    {
        name: "stereoPanner",
        class: Pizzicato.Effects.StereoPanner,
        props: [{
                min: "-1", max: "1", defaults: "0", name: "pan"
            }
        ]
    },
    {
        name: "tremolo",
        class: Pizzicato.Effects.Tremolo,
        props: [{
                min: "0", max: "20", defaults: "4", name: "speed"
            },
            {
                min: "0", max: "1", defaults: "1", name: "depth"
            },
            {
                min: "0", max: "1", defaults: "0.5", name: "mix"
            }
        ]}
];