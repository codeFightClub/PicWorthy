import React, { Component } from 'react';
import axios from 'axios';
import TagInput from './tagInput.jsx';

export default class UploadForm extends Component {
  checkImgUrl() {
    if(this.props.imageURL) {
      return <p style={{fontWeight:`bold`}}>Image attached.</p>
    
    } else {
      return <p style={{fontWeight:`bold`}}>First, find your place on the map.<br></br> Next, upload an image of your place.</p>
    }
  }
  
  render() {
    
    const uploadStatus = this.props.uploadStatus.map((status) => <div>{status}</div>);

    return (
      <div style={{paddingTop: `30px`}}>
        {this.checkImgUrl()}
      
      <br />
      
      <div style={{color: 'red', fontWeight: 'bold'}}>{uploadStatus}</div>
      <form onSubmit={this.props.handleSubmit}>
        
        <label>
          Category
          <input
            name="category"
            type="text"
            placeholder="Enter the type of place"
            value={this.props.category}
            onChange={this.props.handleInputChange}
            style={inputStyle} />
        </label><br /><br />
        
        <label>
          Place
          <input
            name="location"
            type="text"
            placeholder="Enter the place's name"
            value={this.props.location}
            onChange={this.props.handleInputChange}
            style={inputStyle} />
        </label><br /><br />
        
        <label>
          Description
          <textarea
            name="description"
            type="text"
            placeholder="Describe what's special about this place"
            value={this.props.description}
            onChange={this.props.handleInputChange} 
            style={textareaStyle} />
        </label><br /><br /><br /><br /><br /><br />
        
        <label>
          Tags
        </label>
        <TagInput 
          handleAddition={this.props.handleAddition}
          handleDelete={this.props.handleDelete}
          handleDrag={this.props.handleDrag}
          suggestions={this.props.suggestions}
          tags={this.props.tags}
          style={inputStyle}
        />

        <div style={{textAlign:`center`, position: `relative`, top: `75px`}}>
          <input
            name="submit"
            type="submit" 
            style={{borderRadius:`5px`}}
          />
        </div>
      </form>
      </div>
    );
  }
}

const inputStyle = {
  position: `absolute`,
  left: `105px`,
  width: `calc(100% - 105px)`,
  fontWeight: `normal`,
}

const textareaStyle = {
  position: `absolute`,
  left: `105px`,
  width: `calc(100% - 105px)`,
  height: `100px`,
  fontWeight: `normal`,
  resize: `none`,
  contenteditable: `true`,
  borderColor: `#e2e3e5`
}

const tagInputStyle = {

}