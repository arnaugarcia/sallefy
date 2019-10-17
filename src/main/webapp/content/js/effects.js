/**
 * Effects. zoomIn, slideUp, slideRight, slideRightSkew, slideLeftSkew, slideLeftSkew, randomBounch, bounchIn, fadeInSkew, elasticUp, cardDealer
 */
var adonisGridEffects = {};
adonisGridEffects.effects = {
    'zoomIn': {
        animeOpts: {
            duration: function(t,i) {
                return  i*150;
            },
            easing: 'easeOutExpo',
            delay: function(t,i) {
                return 100 + i*100;
            },
            opacity: {
                value: [0,1],
                easing: 'linear'
            },
            scale: [0,1]
        }
    },
    'slideUp': {
        // Sort target elements function.
        animeOpts: {
            duration: function(t,i) {
                return 700 + i*50;
            },
            easing: 'easeOutExpo',
            delay: function(t,i) {
                return i * 100;
            },
            opacity: {
                value: [0,1],
                duration: function(t,i) {
                    return 250 + i*50;
                },
                easing: 'linear'
            },
            translateY: [400,0]
        }
    },
    'slideRight': {
        sortTargetsFn: function(a,b) {
            return b.getBoundingClientRect().left - a.getBoundingClientRect().left;
        },
        animeOpts: {
            duration: 1500,
            easing: [0.1,1,0.3,1],
            delay: function(t,i) {
                return 400+ i * 40;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            translateX: [1000,0],
        }
    },
    'slideRightSkew': {
        sortTargetsFn: function(a,b) {
            return b.getBoundingClientRect().left - a.getBoundingClientRect().left;
        },
        animeOpts: {
            duration: 1500,
            easing: [0.1,1,0.3,1],
            delay: function(t,i) {
                return 400+ i * 30;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            translateX: [1000,0],
            rotateZ: [15,0]
        }
    },
    'slideLeftSkew': {
        sortTargetsFn: function(a,b) {
            return b.getBoundingClientRect().left - a.getBoundingClientRect().left;
        },
        animeOpts: {
            duration: 1000,
            easing: [0.1,1,0.3,1],
            delay: function(t,i) {
                return 400+ i * 20;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            translateX: [-500,0],
            rotateZ: [15,0]
        }
    },
    'randomBounch': {
        animeOpts: {
            duration: 1200,
            elasticity: 500,
            delay: function(t,i) {
                return 300 + i*25;
            },
            opacity: {
                value: [0,1],
                duration: 300,
                easing: 'linear'
            },
            translateX: function() {
                return [anime.random(0,1) === 0 ? 100 : -100,0];
            },
            translateY: function() {
                return [anime.random(0,1) === 0 ? 100 : -100,0];
            }
        }
    },
    'hingle': {
        perspective: 800,
        origin: '50% 0%',
        animeOpts: {
            duration: 1500,
            elasticity: 0,
            delay: function(t,i) {
                return 500 + i*200;
            },
            opacity: {
                value: [0,1],
                duration: 1000,
                easing: 'linear'
            },
            rotateX: [-90,0]
        }
    },
    'bounchIn': {
        animeOpts: {
            duration: 1100,
            elasticity: 600,
            delay: function(t,i) {
                return 300 + i*150;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            scaleX: {
                value: [0.4,1]
            },
            scaleY: {
                value: [0.6,1],
                duration: 1000
            }
        }
    },
    'fadeInSkew': {
        perspective: 1000,
        origin: '50% 0%',
        animeOpts: {
            duration: 800,
            easing: [0.1,1,0.3,1],
            delay: function(t,i) {
                return 300 + i*50;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            translateX: [100,0],
            translateY: [-100,0],
            translateZ: [400,0],
            //rotateZ: [10,0],
            //rotateX: [75,0]
        }
    },
    'elasticUp': {
        origin: '50% 0%',
        animeOpts: {
            duration: 800,
            easing: 'easeOutBack',
            delay: function(t,i) {
                return 300 + i * 100;
            },
            opacity: {
                value: [0,1],
                easing: 'linear'
            },
            translateY: [400,0],
            scaleY: [
                {value: [3,0.6], delay: function(t,i) {return i * 100 + 120;}, duration: 300, easing: 'easeOutExpo'},
                {value: [0.6,1], duration: 1400, easing: 'easeOutElastic'}
            ],
            scaleX: [
                {value: [0.9,1.05], delay: function(t,i) {return i * 100 + 120;}, duration: 300, easing: 'easeOutExpo'},
                {value: [1.05,1], duration: 1400, easing: 'easeOutElastic'}
            ]
        }
    },
    'cardDealer': {
        animeOpts: {
            duration: 800,
            easing: 'easeOutExpo',
            delay: function(t,i) {
                return 300 + i*100;
            },
            opacity: {
                value: [0,1],
                duration: 100,
                easing: 'linear'
            },
            translateX: function(t,i) {
                var docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft},
                    x1 = window.innerWidth/2 + docScrolls.left,
                    tBounds = t.getBoundingClientRect(),
                    x2 = tBounds.left +docScrolls.left + tBounds.width/2;

                return [x1-x2,0];
            },
            translateY: function(t,i) {
                var docScrolls = {top : document.body.scrollTop + document.documentElement.scrollTop},
                    y1 = window.innerHeight + docScrolls.top,
                    tBounds = t.getBoundingClientRect(),
                    y2 = tBounds.top + docScrolls.top + tBounds.height/2;

                return [y1-y2,0];
            },
            rotate: function(t,i) {
                var x1 = window.innerWidth/2,
                    tBounds = t.getBoundingClientRect(),
                    x2 = tBounds.left + tBounds.width/2;

                return [x2 < x1 ? 90 : -90,0];
            },
            scale: [0,1]
        }
    },
    'zoomOutHide': {
        animeOpts: {
            duration: 1100,
            elasticity: 0,
            delay: function(t,i) {
                return 300 + i*100;
            },
            opacity: {
                value: [1,0],
                duration: 600,
                easing: 'linear'
            },
            scale: 0,
        }
    },
    'menuOne': {
        animeOpts: {
            duration: 1100,
            elasticity: 600,
            delay: function(t,i) {
                return 300 + i*100;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear'
            },
            scaleX: {
                value: [0.4,1]
            },
            scaleY: {
                value: [0.6,1],
                duration: 1000
            }
        }
    },
    'menuTwo': {
        animeOpts: {
            duration: 600,
            elasticity: 0,
            easing: 'easeInOutQuart',
            delay: function(t,i) {
                return 0 + i*10;
            },
            opacity: {
                value: [0,1],
                duration: 600,
                easing: 'linear',
                delay: function(t,i) {
                    return  i*60;
                }
            },
            translateX: function(t,i) {
                return [i*-20,0];
            },
        }
    },
};
