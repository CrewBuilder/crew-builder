import React, { Component } from 'react';

import { Login } from './utils/auth.jsx';
import {Jumbotron, Button, Carousel} from 'react-bootstrap';

// landing page with login and call to action carousel
export default class Landing extends Component {
  constructor(props) {
    super(props);

    // triggers login and app state change to redirect to dashboard
    this.handleLogin = () => {
      let userCheck = window.localStorage.getItem('id_token');
      if (userCheck) {
        window.localStorage.removeItem('id_token');
      }
      Login((res) => {
        return res;
      })
        .then((loggedIn) => {
          this.props.changeLoginStatus();
        })
        .catch((error) => {
          console.log('Login Error: ', error);
        });
    };
  }

  render() {
    return (
      <div className="vertical-center">
        <Jumbotron className="landing-container">
          <div className="text-center jumbotron-heading">
            <h1>Crew Builder</h1>
            <p>Contribute to your crew...earn rewards</p>
            <div>
              <Button onClick={this.handleLogin} bsStyle="primary">Sign up with Facebook</Button>
            </div>
          </div>
        </Jumbotron>

        <Carousel controls={false} indicators={false} className="carousel-container">
          <Carousel.Item>
            <img className="carousel-img" width={800} height={400} alt="900x500" src="https://farm4.staticflickr.com/3208/2682021398_1bbf189bf6.jpg" />
            <Carousel.Caption className="caption-landing">
              <h2 className="caption-text">Bring out new fans</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" width={800} height={400} alt="900x500" src="https://farm8.staticflickr.com/7445/9072298392_6607f7eb50.jpg" />
            <Carousel.Caption className="caption-landing">
              <h2 className="caption-text">Help grow your cause</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-img" width={800} height={400} alt="900x500" src="https://farm4.staticflickr.com/3432/3911533511_85381ccc2a.jpg" />
            <Carousel.Caption className="caption-landing">
              <h2 className="caption-text">Reward your supporters </h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <div className="footer">&copy; 2017 CrewBuilder | <a href="https://github.com/CrewBuilder/crew-builder" rel="noopener noreferrer" target="_blank">GitHub</a></div>
      </div>
    );
  }
}
