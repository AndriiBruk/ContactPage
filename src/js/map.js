let map;
let service;

export function mapInit(query) {

  map = new google.maps.Map(document.querySelector('.stores-map'), {
    zoom: 15,
  });


  const request = getRequest(query);

  service = new google.maps.places.PlacesService(map);
  showWarehouseOnMap(request);
}

export function showWarehouseOnMap(request) {

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

export function getRequest(query) {
  const request = {
    query: query,
    fields: ["name", "geometry"],
  }

  return request;
}
