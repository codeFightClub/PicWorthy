import React from 'react';
import { WithContext as ReactTags} from 'react-tag-input';

class TagInput extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h4>Tags</h4>
        <ReactTags tags={this.props.tags}
=======
  render () {
    return (
      <span>
        <ReactTags 
          tags={this.props.tags}
>>>>>>> 8bdbe89543271c17810915723e0ac9c12aa979e0
          suggestions={this.props.suggestions}
          handleDelete={this.props.handleDelete}
          handleAddition={this.props.handleAddition}
          handleDrag={this.props.handleDrag}
<<<<<<< HEAD
          placeholder={"add a tag"}
          />
      </div>
=======
          placeholder={"Add tags, hitting enter between each"}
          />
      </span>
>>>>>>> 8bdbe89543271c17810915723e0ac9c12aa979e0
    )    
  }

}

export default TagInput