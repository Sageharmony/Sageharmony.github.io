import axios from "axios";
import React, { Component } from "react";
import LocationService from "./components/LocationService";


class ListLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
    };
  }

    const

    deleteLocation = (id) => {
    LocationService.deleteLocatioin(id).then((res) => {
      this.setState({
        locations: this.state.locations.filter(
          (location) => location.id !== id
        ),
      });
    });
  }
  viewLocation = (id) => {
    this.props.history.push(`/locations/${id}`);
  }

  editLocation = (event, newLocationData) => {
    event.preventDeafult();
    axios.put(`http://localhost:8080/locations${newLocationData._id}`,
    {
  
    }).then(() =>{
        axios.get('http://localhost:8080/locations').then((response) =>{
        this.setState(response.data)
        })
    })
  } 

  componentDidMount = () => {
    LocationService.getLocations().then((res) => {
      this.setState({ locations: res.data });
    });
  }

  addLocation = () =>{
    this.props.history.push(`/add-location/_add`);
  }


  render() {
    return (
      <div>
        <h2 className="text-center">Spots List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addLocation}>
            {" "}
            Add Location
          </button>
        </div>

        {this.state.locations.map((location) => (
          <ul>
            <li>
              {" "}
              {location.name} ,{location.about}
            </li>

            <button
              onClick={() => this.editLocation(location.id)}
              className="btn btn-info"
            >
              Update{""}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => this.deleteLocation(location.id)}
              className="btn btn-danger"
            >
              Delete{""}
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => this.viewLocation(location.id)}
              className="btn btn-info"
            >
              View{" "}
            </button>
          </ul>
        ))}
      </div>
    );
  }
}

export default ListLocation;
