import React from 'react';
import { WithContext as ReactTags} from 'react-tag-input';

class TagInput extends React.Component {
  render () {
    return (
      <span>
        {/* <ReactTags 
          tags={this.props.tags}
          suggestions={this.props.suggestions}
          handleDelete={this.props.handleDelete}
          handleAddition={this.props.handleAddition}
          handleDrag={this.props.handleDrag}
          placeholder={"Add tags, hitting enter between each"}
          /> */}
          <form>
            Tags <input type="text" placeholder="separated by commas"/>
          </form>
      </span>
    )    
  }

}

export default TagInput