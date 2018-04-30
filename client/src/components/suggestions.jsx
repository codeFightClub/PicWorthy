import React from 'react';
import axios from 'axios';

export default class Suggestions extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       suggestions: []
     }
   }

   componentDidMount () {
    axios.get('/api/suggestions')
      .then((res) => {
        this.setState({ suggestions: res.data })
      })
      .catch(err => console.error(err));
    }

  render () {
    return (
      <div>
      <h1>Suggestions!</h1>
        {this.state.suggestions.map(suggestion => 
          ( <div>{suggestion.location}</div> )
        )}
      </div>
    )
  }
}


