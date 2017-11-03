import React, { Component } from 'react';

import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
  RedditShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const TelegramIcon = generateShareIcon('telegram');
const WhatsappIcon = generateShareIcon('whatsapp');
const RedditIcon = generateShareIcon('reddit');

export default class Social extends Component {

  constructor(props) {
    super(props);
    this.state={
      shareUrl: 'https://www.reddit.com/',
      message: 'Here is a test message for our social media!'
    }

    this.test = () => {
      console.log('test');
    }
  }

  render() {

    return (
      <div className="social-button-container container-fluid">

        <div className="img-responsive social-button">
          <FacebookShareButton
            url={this.state.shareUrl}
            quote={this.state.message}
            onClick={this.test}
            className="social-share-button">
            <FacebookIcon
              size={48}
              round />
          </FacebookShareButton>
        </div>

        <div className="img-responsive social-button">
          <TwitterShareButton
            url={this.state.shareUrl}
            title={this.state.message}
            via="noob"
            hashtags={['hey']}
            className="social-share-button">
            <TwitterIcon
              size={48}
              round />
          </TwitterShareButton>
        </div>

        <div className="social-button">
          <GooglePlusShareButton
            url={this.state.shareUrl}
            className="social-share-button">
            <GooglePlusIcon
              size={48}
              round />
          </GooglePlusShareButton>
        </div>

        <div className="social-button">
         <WhatsappShareButton
            url={this.state.shareUrl}
            title={this.state.message}
            separator=" "
            className="social-share-button">
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
        </div>

        <div className="social-button">
          <TelegramShareButton
            url={this.state.shareUrl}
            title={this.state.message}
            className="social-share-button">
            <TelegramIcon size={48} round />
          </TelegramShareButton>
        </div>

        <div className="social-button">
          <PinterestShareButton
            url={this.state.shareUrl}
            media="http://www.celebratewithstringsattached.com/uploads/3/5/4/6/3546135/1090860.jpg"
            windowWidth={800}
            windowHeight={630}
            className="social-share-button">
            <PinterestIcon size={48} round />
          </PinterestShareButton>
        </div>

      </div>

    )
  }
}