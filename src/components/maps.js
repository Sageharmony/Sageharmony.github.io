// import { Component, useState, React } from 'react';
// import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api'
// import { theme } from './mapTheme';
// import { Autocomplete } from '@react-google-maps/api';

// const MapContainer = () => {
  
//   const[map, setMap] = useState(null)

//   const mapStyles = {
//     width: '100%',
//     height: '500px'
//   };

//   const center = {
//     lat: 45.512794,
//     lng: -122.679565
//   };

//   const options = {
//     styles: theme
//   };

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: "AIzaSyDjtmVVCu19gSwmFlnyuImdmp05zpIIYE8"
//   })
  
//   function initMap() {
//     // The location of the map
//     var shop = { lat: /*[[${session.shop.latitude}]]*/, lng: /*[[${session.shop.longitude}]]*/ };
//     var map = new google.maps.Map(
//       document.getElementById('map'), { zoom: 4, center: shop });
//     var marker = new google.maps.Marker({ position: shop, map: map });
//   }

  


  
//   return isLoaded ? (
//     <>
  
//     <GoogleMap
//       mapContainerStyle={mapStyles}
//       center={center}
//       options={options}
//       zoom={10}
//       id='map'
//     >
//       {/* <Marker position={{ lat: 45.5207 , lng: -122.6756 }} />
//       <Marker position={{lat: 45.534039341445755, lng: -122.54775660217916}} />
//       <Marker position={{ lat:38.4033160268529, lng: -122.82111220054867}} /> */}
      
//     </GoogleMap>
//     </>
// ) : <></>
  
// }

// export default MapContainer