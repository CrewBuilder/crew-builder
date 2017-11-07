import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ShareButtons, generateShareIcon } from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} = ShareButtons;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');

export default class Social extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shareUrl: 'https://crew-builder.herokuapp.com/'
    };

    this.test = () => {
      console.log('test');
    };
  }

  render() {
    let fbLongQuote = 'Join Crew Builder and help support ' + this.props.currentCrew.crew.name + '! ' + this.props.currentCrew.crew.description;

    let shortQuote = 'Join Crew Builder and help support ' + this.props.currentCrew.crew.name + '! ';
    let twitterHash = [this.props.currentCrew.crew.name.split(' ')[0]];

    return (
      <div className="social-button-container container-fluid">
        <Row>
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="img-responsive social-button">
              <FacebookShareButton
                url={this.state.shareUrl}
                quote={fbLongQuote}
                onClick={this.test}
                className="social-share-button">
                <FacebookIcon
                  size={48}
                  round />
              </FacebookShareButton>
            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="img-responsive social-button">
              <TwitterShareButton
                url={this.state.shareUrl}
                title={shortQuote}
                hashtags={twitterHash}
                className="social-share-button">
                <TwitterIcon
                  size={48}
                  round />
              </TwitterShareButton>
            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="social-button">
              <GooglePlusShareButton
                url={this.state.shareUrl}
                className="social-share-button">
                <GooglePlusIcon
                  size={48}
                  round />
              </GooglePlusShareButton>
            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="social-button">
              <WhatsappShareButton
                url={this.state.shareUrl}
                title={shortQuote}
                separator=" "
                className="social-share-button">
                <WhatsappIcon size={48} round />
              </WhatsappShareButton>
            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <div className="social-button">
              <TelegramShareButton
                url={this.state.shareUrl}
                title={shortQuote}
                className="social-share-button">
                <TelegramIcon size={48} round />
              </TelegramShareButton>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}