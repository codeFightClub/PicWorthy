import React from 'react';
import { WithContext as ReactTags} from 'react-tag-input';

class TagInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div>
        <h4>Tags</h4>
        <ReactTags tags={this.props.tags}
          suggestions={this.props.suggestions}
          handleDelete={this.props.handleDelete}
          handleAddition={this.props.handleAddition}
          handleDrag={this.props.handleDrag}
          placeholder={"add a tag"}
          />
      </div>
    )    
  }

}

export default TagInput