import React, { Component } from 'react';
import axios from 'axios';
import TagInput from './tagInput.jsx';

export default class UploadForm extends Component {
  checkImgUrl() {
    if(this.props.imageURL) {
      return <p>Image attached.</p>
    
    } else {
      return ( <div><p>First, find your place on the map.</p> 
               <p>Next, upload an image of your place.</p></div> )
    }
  }
  
  render() {
    const uploadStatus = this.props.uploadStatus.map((status) => <div>{status}</div>);
    return (
      <div >
        {this.checkImgUrl()}
      
      <br />
      
      <div>{uploadStatus}</div>
      <form onSubmit={this.props.handleSubmit}>
        
        <label>
          Category
          <input
            name="category"
            type="text"
            placeholder="Enter the type of place"
            value={this.props.category}
            onChange={this.props.handleInputChange}
            />
        </label>
        
        <label>
          Place
          <input
            name="location"
            type="text"
            placeholder="Enter the place's name"
            value={this.props.location}
            onChange={this.props.handleInputChange}
            />
        </label>
        
        <label>
          Description
          <textarea
            name="description"
            type="text"
            placeholder="Describe what's special about this place"
            value={this.props.description}
            onChange={this.props.handleInputChange} 
            />
        </label> <br /><br /><br /><br /><br /><br />

        <label>
          Tags
          <textarea
            name="tags"
            type="text"
            placeholder="Add tags spaced by commas"
            value={this.props.tags}
            onChange={this.props.handleInputChange} 
            />
        </label> 

        <div>
          <input
            name="submit"
            type="submit" 
          />
        </div>
      </form>
      </div>
    );
  }
}
