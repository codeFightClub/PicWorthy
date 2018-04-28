import React, { Component } from 'react';
import UploadForm from './uploadform.jsx';
import Worthymap from './worthymap.jsx';
import DropZone from './dropzone.jsx';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

export default class Upload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: '',
      location: '',
      imageURL: '',
      description: '',
      user_id: '',
      username: '',
      submitted: '',
      loading: false,
      latLng: {lat: null, lng: null},
      uploadStatus: [],
      tags: ''
    };
    this.getLink = this.getLink.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.pinLocation = this.pinLocation.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
  }

  getLink(imgurLink) {
    this.setState({ imageURL: imgurLink })
  }

  pinLocation({ latLng }) {
    this.setState({
      latLng: {
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

  handleSubmit(event) {
    event.preventDefault();

    const inputFields = (({category, location, description, imageURL, latLng}) => ({category: category, location: location, description: description, imageURL: imageURL, latLng: latLng, description: description, imageURL: imageURL, latLng: latLng}))(this.state);
    let invalidFields = [];

    for (const pair in inputFields) {
      pair === 'latLng'
        ? inputFields[pair].lat === '' || inputFields[pair].lng === '' ? invalidFields.push('Please drop a pin on location on the map') : null
        : inputFields[pair] === '' ? invalidFields.push(`Please enter a valid ${pair}`) : null;
    }
    
    if (invalidFields.length > 0) {
      this.setState({uploadStatus: invalidFields});
      return;
    } else {
      this.setState({uploadStatus: []})
    }
    inputFields.user_id = this.props.userData._id;
    inputFields.username = this.props.userData.username;
    inputFields.tags = this.state.tags.split(', '); //store tags as an array
    
    
    this.setState({
      loading: true
    })

    axios.post(`/api/upload`, inputFields)
    
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
          imageURL: '',
          location: '',
          latLng: {
            lat: null,
            lng: null
          },
          tags: '' // reset state of tags
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

  render() {
    const { lat, lng } = this.state.latLng;
    const marker = [lat, lng].includes(null) 
      ? [] 
      : [{lat, lng}]
    
    
    return (
      <div>
        
        <div>
          <div> 
            <Worthymap 
              getLocationUpload={this.getLocationUpload}
              onMapClick={this.pinLocation}
              defaultZoom={10}
              defaultCenter={{lat: 37.77, lng: -122.41}}
              markers={ marker }
            />
          </div>
          
          <div>
            <DropZone getLink={this.getLink} />
          </div>
          
          <div>
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
            
            <div>
              <BeatLoader />
            </div>
            <div>
              {this.state.submitted}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

