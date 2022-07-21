const loadPlaces = function(coords) {

    const PLACES = [

        {
            name: 'Another place name',
            location: {
                lat: 43.398088,
                lng: 13.052418,
            }
        },
        {
            name: "Your place name",
            location: {
                lat: 43.398333, // add here latitude if using static data
                lng: 13.052222, // add here longitude if using static data
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.398344,
                lng: 13.052279,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.748600,
                lng: 13.232766,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.760266,
                lng: 13.214166,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.767216,
                lng: 13.222216,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.755266,
                lng: 13.241100,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.755270,
                lng: 13.222173,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.756634,
                lng: 13.223795,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.761646,
                lng: 13.215774,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.760633,
                lng: 13.214716,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.766933,
                lng: 13.222133,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.7499,
                lng: 13.233366,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.7495,
                lng: 13.2328,
            }
        },
        {
            name: 'Another place name',
            location: {
                lat: 43.587116,
                lng: 13.517559,
            }
        }

    ];


    return Promise.resolve(PLACES);
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // then use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place icon
                    const icon = document.createElement('a-image');
                    icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
                    icon.setAttribute('name', place.name);
                    icon.setAttribute('src', '../assets/map-marker.png');

                    // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
                    icon.setAttribute('scale', '40, 40');

                    icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));

                    const clickListener = function(ev) {
                        ev.stopPropagation();
                        ev.preventDefault();

                        const name = ev.target.getAttribute('name');

                        const el = ev.detail.intersection && ev.detail.intersection.object.el;

                        if (el && el === ev.target) {
                            const label = document.createElement('span');
                            const container = document.createElement('div');
                            container.setAttribute('id', 'place-label');
                            label.innerText = name;
                            container.appendChild(label);
                            document.body.appendChild(container);

                            setTimeout(() => {
                                container.parentElement.removeChild(container);
                            }, 1500);
                        }
                    };

                    icon.addEventListener('click', clickListener);
                    
                    scene.appendChild(icon);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};