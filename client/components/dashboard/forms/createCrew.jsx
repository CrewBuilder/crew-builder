// create a new crew with form and POST to API, or edit crew and PUT to API
import React, { Component } from 'react';
import { FormControl, FormGroup } from 'react-bootstrap';
import { PostCrew, EditCrew } from '../../utils/requests.jsx';
// debug flag for dev error tracking
const debug = false;

export default class CreateCrew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: this.props.imageurl || '',
      name: this.props.name || '',
      description: this.props.desc || '',
      image: null,
      imagechanged: false
    };
    // props contain name and unique details of user, so we can keep track of who created this crew  and store it in database accordingly

    this.handleSubmit = (e) => {
      e.preventDefault();

      if (this.state.imagechanged || this.state.url === '') {
        var formData = new FormData();
        formData.append('picture', this.state.image);

        let options = {
          method: 'POST',
          body: formData,
          headers: {
            'x-auth-token': localStorage.getItem('id_token')
          }
        };

        fetch('/image', options)
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              url: data.message
            });

            var obj = {
              name: this.state.name,
              description: this.state.description,
              image: this.state.url
            };

            // newCrew boolean true for new crew
            if (this.props.newCrew) {
              PostCrew(obj, this.props.user.id, (err, data) => {
                if (err) {
                  if (debug) {
                    console.log('Error:', err);
                  }
                } else {
                  this.props.history.push('/dashboard');
                  this.props.getCurrentCrews(this.props.user.id);
                }
              });
            } else {
              EditCrew(this.props.id, obj, this.props.user, (err, data) => {
                if (err) {
                  if (debug) {
                    console.log('Error:', err);
                  }
                } else {
                  this.props.history.push('/dashboard');
                  this.props.getCurrentCrews(this.props.user.id);
                }
              });
            }
          })
          .catch((errors) => {
            if (debug) {
              console.log('Error:', errors);
            }
          });

      } else {
        // no new image, so can bypass cloudinary and just send changes
        var obj = {
          name: this.state.name,
          description: this.state.description,
          image: this.state.url
        };

        EditCrew(this.props.id, obj, this.props.user, (err, data) => {
          if (err) {
            if (debug) {
              console.log('Error:', err);
            }
          } else {
            this.props.history.push('/dashboard');
            this.props.getCurrentCrews(this.props.user.id);
          }
        });
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      imagechanged: false
    });
  }

  render() {
    return (
      <div>
        <form className="create-crew-form" onSubmit={this.handleSubmit}>
          <FormControl
            type="text"
            name="name"
            value={this.state.name}
            placeholder="enter crew name"
            onChange={(e) => this.setState({
              name: e.target.value
            })}
            required />
          <br/>
          <FormControl
            className="create-crew-description"
            componentClass="textarea"
            type="text"
            name="description"
            value={this.state.description}
            placeholder="crew description - be as descriptive as possible"
            onChange={(e) => this.setState({
              description: e.target.value
            })}
            required />
          <br/>
          <FormControl
            type="file"
            name="pic"
            onChange={(e) => this.setState({
              image: e.target.files[0],
              imagechanged: true
            })} />
          <br/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

