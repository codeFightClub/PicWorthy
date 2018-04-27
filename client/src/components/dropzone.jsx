import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { BounceLoader } from 'react-spinners';

import EXIF from 'exif-js';

/*
This component helps to upload images by providing a 
'dropzone' area that you can click on or drop items into.
Specifically, it's used inside the upload.jsx file.
It uses formData to handle file uploading to the form.
Additionally, it's possible to upload an array of images, 
but in this case we only append the 0th element of the array (the first item).
*/

export default class Accept extends React.Component {
  constructor() {
    super()
    this.state = {
      accepted: [],
      rejected: [],
      uploaded: false,
      loading: false
    }
    this.changeImg = this.changeImg.bind(this);
  }

  onDrop(img) {
    const formData = new FormData();
    formData.append('image', img[0]);
    const that = this;

    //Uses EXIF to parse GPS coordinates from .jpeg images
    EXIF.getData(img[0], function() {
        let allMetaData = EXIF.getAllTags(this);
        let toDecimal = function (number) {
          return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
        };

        let latitude = toDecimal(allMetaData.GPSLatitude);
        let longitude = toDecimal(allMetaData.GPSLongitude) * -1;

        console.log(latitude);
        console.log(longitude);
        let latLng = {
          latitude: latitude,
          longitude: longitude
        };
        that.props.setLocation(latLng);     
    });


    this.setState({
      loading: true
    })

    axios({
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {Authorization: "Client-ID 3f9b22888755abe"},
        data: formData
    })
    .then(function(response) {
      that.props.getLink(response.data.data.link);
      that.setState({
        uploaded: true,
        loading: false
      })
    })
    .catch(function(err) {
        console.log(err);
    })
  }

  changeImg() {
    if (this.state.loading) {
      return <BounceLoader color={'#87ceff'} loading={this.state.loading} size={100}/>
    } else if (this.state.uploaded) {
      return <img width="100px" height="100px" src="http://pluspng.com/img-png/success-png-success-icon-image-23194-400.png" />
    } else {
      return <img width="100px" height="100px" src="http://www.arcdocendi.com/Forms/images/upload.png" />
    }
    console.log('accepted array', this.state.uploaded)
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={(this.onDrop.bind(this))}
            style={{width: `100%`, border:`2px dashed grey`, height: `400px`}}
          >
            <div style={{width: `80%`, margin:`auto`, paddingTop: `50px`, paddingBottom: `50px`, textAlign: `center`}}>
              <p>Try dropping a file here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted</p>
            </div>
            <div style={{width:`100px`, margin: `auto`}}>
              {this.changeImg()}
            </div>
          </Dropzone>
        </div>
        <aside>
          {/* <h4>Accepted files</h4> */}
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          {/* <h4>Rejected files</h4> */}
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}
