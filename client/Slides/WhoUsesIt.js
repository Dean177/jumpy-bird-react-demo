import React, { Component } from 'react';
import airbnbUrl from "../resources/images/UsedBy/airbnb.png";
import atomUrl from "../resources/images/UsedBy/atom.png";
import codecademy from "../resources/images/UsedBy/codecademy.png";
import coursera from "../resources/images/UsedBy/coursera.png";
import digitalocean from "../resources/images/UsedBy/digitalocean.png";
import dropbox from "../resources/images/UsedBy/dropbox.png";
import expedia from "../resources/images/UsedBy/expedia.png";
import facebookUrl from "../resources/images/UsedBy/facebook.png";
import hipchat from "../resources/images/UsedBy/hipchat.png";
import instagram from "../resources/images/UsedBy/instagram.png";
import netflix from "../resources/images/UsedBy/netflix.png";
import whatsapp from "../resources/images/UsedBy/whatsapp.png";

export default class WhoUsesIt extends Component {
  render() {
    const usedBy = [airbnbUrl, atomUrl, codecademy, coursera,  expedia,  digitalocean, dropbox,facebookUrl, hipchat, instagram, netflix, whatsapp];

    return (
      <div className="picture-slide">
        <h1 className="used-by"><a href="https://github.com/facebook/react/wiki/Sites-Using-React" target="_blank">It is gaining traction</a></h1>
        {usedBy.map((imageUrl) => {
          return (
            <div className="image" style={{
                backgroundImage: `url(${imageUrl})`
              }}>
            </div>
          ); })
        }
      </div>
    );
  }
}