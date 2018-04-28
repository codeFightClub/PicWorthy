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
    //  this.setState({ suggestions: data })
    console.log('this is working!!!!!!!', res.data);
     })
     .catch(err => console.error(err));
    }

  render () {
    return (
      <div>
        {/* {this.state.suggestions.map((suggestion) => 
          ( <p><a href="">title</a></p> )
        )} */}
        <h1>Suggestions!</h1>
      </div>
    )
  }
}


