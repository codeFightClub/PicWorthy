import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';


/*
 * This top-level component contains the entire upload page, including the map, photo dropzone and
 * upload form subcomponents.
 * 
 * We keep track of the information that the user wants to upload in this component's state, and
 * bind all the methods tracking the state to this component, so that we can add that information 
 * within other components.
 */

export default class Upload extends Component {
  constructor(props) {
    
    super(props)
    
    this.state = {
      category: '',
      location: '',
      imageURLS: [],
      description: '',
      user_id: '',
      username: '',
      submitted: '',
      loading: false,
      coords: {
        lat: null,
        lng: null
      },
      latLng: [],
      uploadStatus: [],
      tags: ''
      // tags: [
      //   { id: "Outdoors", text: "Outdoors"},
      // ],
      // suggestions: [
      //   { id: "Maryland", text: "Maryland"},
      //   { id: "California", text: "California"},
      //   { id: "Napa", text: "Napa"}
      // ]
    };

    /*
     * Bind and define methods that track the state change of this component within other components.
     */

    this.getLink = this.getLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pinLocation = this.pinLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  setLocation(latLng) {
    let copy = this.state.latLng.slice();
    copy.push(latLng)
    this.setState({
      latLng: copy
    });
  }

  getLink(imgurLink) {
    let copy = this.state.imageURLS.slice();
    copy.push(imgurLink);
    this.setState({ imageURLS: copy })
  }

  pinLocation({ latLng }) {
    
    this.setState({
      coords: {
        lat: latLng.lat(),
        lng: latLng.lng(),
      }
    })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /*
   * Method checks whether any fields are empty, and then if all required information is present,
   * submits post request using axios.
   */

  handleSubmit(event) {
    event.preventDefault();

    let photos = [];

    for (let i = 0; i < this.state.imageURLS.length; i++) {
      let photo = {
        category: this.state.category,
        location: this.state.location,
        description: this.state.description,
        imageURL: this.state.imageURLS[i],
        latLng: this.state.latLng[i] || this.state.coords
      }
      photo.user_id = this.props.userData._id;
      photo.username = this.props.userData.username;
      photo.tags = this.state.tags.split(', ');
      photos.push(photo);
    }

    console.log(photos);

    let invalidFields = [];

    photos.forEach((photo) => {
      photo.latLng.latitude === null || photo.latLng.longitude === null ? invalidFields.push('Your photo does not contain location data. Please drop a location pin on the map') : null;
      photo.category === '' ? invalidFields.push(`Please enter a valid category`) : null;
      photo.location === '' ? invalidFields.push(`Please enter a valid location`) : null;
      photo.description === '' ? invalidFields.push(`Please enter a valid description`) : null;
    });
    
    if (invalidFields.length > 0) {
      this.setState({uploadStatus: invalidFields});
      return;
    } else {
      this.setState({uploadStatus: []})
    }
    
    this.setState({
      loading: true
    })

    axios.post(`/api/upload`, photos)
    
      .then(res => {
        this.setState({
          submitted: 'Successfully uploaded!',
          loading: false
        });
      })
    
      .then(() => {
        this.setState({
          category: '',
          description: '',
          imageURLS: [],
          location: '',
          latLng: [],
          tags: '', // reset state of tags
          coords: {lat: null, lng: null}
        });
      })
      
      .then(() => {
        setTimeout(() => this.setState({submitted: ''}), 2000);
      })
      
      .catch((err) => {
        this.setState({
          submitted: 'An error occurred. Please try again.',
          loading: false
        })
      })
  }

  handleAddition (tag) {
    const { tags } = this.state;
    this.setState({ tags: [...tags, ...[tag]] })
  }

  handleDelete (i) {
    let tags = this.state.tags.filter((tag, index) => index !== i);
    this.setState({ tags: tags});
  }

  handleDrag(tag, currentPosition, newPosition) {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currentPosition, 1);
    newTags.splice(newPosition, 0, tag);

    this.setState({ tags: newTags });
  }
  /*
   * Renders the entire upload page, including the map, the photo upload dropzone and
   * the upload form.
   */

  render() {
    const { lat, lng } = this.state.coords;
    const marker = [lat, lng].includes(null) 
      ? [] 
      : [{lat, lng}]
    
    
    return (
      <Grid style={{minHeight: `calc(100vh - 130px)`}}>
        
        <Row style={{padding: `50px`}}>
          <Col xs={9} md={4} style={{height: `400px`}}> 
            <Worthymap 
              getLocationUpload={this.getLocationUpload}
              onMapClick={this.pinLocation}
              defaultZoom={10}
              defaultCenter={{lat: 37.77, lng: -122.41}}
              markers={ marker }
            />
          </Col>
          
          <Col xs={6} md={4}>
            <DropZone getLink={this.getLink} setLocation={this.setLocation}/>
          </Col>
          
          <Col xs={6} md={4}>
            <UploadForm
              category={this.state.category}
              location={this.state.location}
              imageURL={this.state.imageURL}
              description={this.state.description}
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
              uploadStatus={this.state.uploadStatus}
              handleAddition={this.handleAddition}
              handleDelete={this.handleDelete}
              handleDrag={this.handleDrag}
              suggestions={this.state.suggestions}
              tags={this.state.tags}
            />
            <br />
            
            <div style={{width: `100px`, margin: `auto`, position: `relative`, top:`80px`}}>
              <BeatLoader color={`#919295`} loading={this.state.loading} />
            </div>
            <div style={{textAlign: `center`, fontWeight: `bold`, fontSize: `large`, position: `relative`, top:`80px`}}>
              {this.state.submitted}
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

