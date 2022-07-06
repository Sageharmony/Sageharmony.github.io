import logo from './logo.svg';
import './App.css';
import NavbarFunction from './components/Nav';
import React, { Component, useState, useEffect } from 'react';
import HeaderFunction from './components/Header';
import MAPS from './components/maps';
import CaroselFunction from './components/imgs';
import ListLocation from './ListLocation';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api'
import { theme } from './components/mapTheme';
import { Autocomplete } from '@react-google-maps/api';

const App = () => { 

    const [name, setName] = useState()
    const [vibe, setVibe] = useState()
    const [about, setAbout] = useState()
    const [place, setPlace] = useState([])
    const[map, setMap] = useState(null)
    const[search, setSearch] = useState('')
     
    const addNewList = (event) =>{
      event.preventDefault()
      axios.post(
        'http://localhost:8080/locations', {
          name: name,
          about: about,
          vibe: vibe
      
        }
      ).then(() =>{
        axios.get('http://localhost:8080/locations').then( (response) =>{
          setPlace(response.data)
        })
      })
    }
    useEffect(()=>{
      axios
          .get('http://localhost:8080/locations')
          .then((response)=>{
            setPlace(response.data);
          })
    },[])

    const handleNewDelete = (newListData) =>{
      axios.delete(`http://localhost:8080/locations/${newListData._id}`).then(() =>{
    axios.get('http://localhost:8080/locations').then((response) =>{
    
    setPlace(response.data)
    })
      })
    }
    const handleNewUpdate = (event, newListData) =>{
      event.preventDefault();
      axios.put(`http://localhost:8080/locations${newListData._id}`,
      {
        name: name,
        about: about,
        vibe: vibe
    
      }).then(() =>{
    axios.get('http://localhost:8080/locations').then((response) =>{
    setPlace(response.data)
    })
    
      })
    }
    
    useEffect(()=>{
      axios
          .get('http://localhost:8080/locations')
          .then((response)=>{
            setPlace(response.data);
          })
    },[])
    
    
    const handleLocationDelete = (locationData) =>{
      axios.delete(`http://localhost:8080/locations${locationData._id}`).then(() =>{
    axios.get('http://localhost:8080/locations').then((response) =>{
    setPlace(response.data)
    })
      })
    }

    // TOGGLE UPDATE FORM
    const [updateForm, setUpdateForm] = useState(false)
    const [addForm, setAddForm] = useState(false)
    
    // const form =() =>{
    //   setAddForm(!addForm)
    //   setToggle(false)
    // }
    const updateFormToggle =()=>{
      
     setUpdateForm(!updateForm)
    
    }
    
    // maps // 

 const mapStyles = {
    width: '100%',
    height: '500px'
  };

  const center = {
    lat: 45.512794,
    lng: -122.679565
  };

  const options = {
    styles: theme
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDjtmVVCu19gSwmFlnyuImdmp05zpIIYE8"
  })
  


 

  //////////////////////////////////////////////////////////////////////// HERE IS YOUR RETURN /////////////////////////////////////////////////////////////////////////////////
    return (
    <>
    <NavbarFunction/> 
    <CaroselFunction/> 
    <div id='padding'>
    </div>
    {isLoaded ?
    <GoogleMap
      mapContainerStyle={mapStyles}
      center={center}
      options={options}
      zoom={10}
      id='map'
    > {place.map((spots) => {
        return (<>
        <Marker position={{lat : Number(spots.latitude), lng : Number(spots.longitude)}} title={{title : spots.name}}/>
        </>)
      })}    
    </GoogleMap>
      : <></>}
  
    <div>
        <h1>SPOTS</h1>
        <h2>Find a Plcae By Name</h2>
<form> 
    <input type='text' id='search' placeholder="Discover" onChange={event => setSearch(event.target.value)}/>
    </form>
    </div>
    <div id='spotsContainer'>
        {
        place.filter(spots =>{
        if (search == ""){
            return spots
        }else if (spots.name.toLowerCase().includes(search.toLowerCase())) {
            return spots
        }
      }).map((spots, index) =>{
          return (
            <>
            <div id='spots'>
            <h1>{spots.vibe}</h1>
            <h2>{spots.name}</h2>
            <img src={spots.image} width='300' height='300' />
            <h6>{spots.about}<br/>
             Hours : {spots.hours}<br/>
              Is it Loud? : {spots.loud ? "yep!" : "nope"}<br/>
             {spots.seating}</h6>
             
            <Button onClick={updateFormToggle}>Update This Listing</Button>
            { updateForm ? 
            <form onSubmit={(event)=>{handleNewUpdate(event, spots)}}>
                <input type='text' placeholder='name' defaultValue={spots.name}></input>
                <input type='text' placeholder='about' defaultValue={spots.about}></input>
                <input type='submit'></input>
            </form>
            : null}
            <Button onClick={(event)=>{handleLocationDelete(spots)}}>X</Button>
            </div>
            </>
          )  
        })}
    </div>
    <HeaderFunction/>
    </>
    )
}
  


export default App
