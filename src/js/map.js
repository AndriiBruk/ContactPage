let map;
let service;

export function initMap(query) {
  const kyivCoordinates = new google.maps.LatLng(50.4021702,30.3926088);
  map = new google.maps.Map(document.querySelector('.stores-map'), {
    /*center: kyivCoordinates,*/
    zoom: 15,
  });

  
  const request = {
    query: query,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[0]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
    icon: 'img/pin.svg'
  });
}
