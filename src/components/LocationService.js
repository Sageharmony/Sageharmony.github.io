import axios from 'axios'; 

const BACKEND_API_URL = "http://localhost:8080/locations"


class LocationService {
    
    getLocations = () => {
        return axios.get(BACKEND_API_URL)
       }

    createLocations = (location) =>{
        return axios.post(BACKEND_API_URL, location);
    }

    getLocationByID = (locationId) =>{
        return axios.get(BACKEND_API_URL + '/' + locationId);
    }

    updateLocation = (location, locationId) =>{ 
        return axios.put(BACKEND_API_URL + '/' + locationId, location)
    }

    deleteLocatioin = (locationId) =>{
        return axios.delete(BACKEND_API_URL + '/' + locationId);
    }
}

export default new LocationService()