> # CrewBuilder

> Build and cultivate a street team for grass-roots support
>
> [See it live](https://crew-builder.herokuapp.com/)

## Team

  - __Product Owner__: Iona Olive
  - __Scrum Master__: Zack Biernat
  - __Development Team Members__: Ed Plato, Meghana Sarikonda

## Table of Contents

1. [Getting started](#getting-started)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Getting started

### Create PSQL database 'crewbuilder'. Run 'npm start' or 'npm test' to seed database.
#### Create environment variables for DB:
> DB_USER=zack
> DB_PASSWORD='somepassword'
### Create a Cloudinary cloud to host image uploads.
#### Create environment variables for Cloudinary:
> CLOUD_NAME=mycloud
> API_KEY=cloudinaryapikey
> CLOUDINARY_UPLOAD_URL=https://api.cloudinary.com/v1_1/myaccount/upload
> API_SECRET=cloudinaryapipassword
### Create Facebook app using Facebook Developer. Get app id and FB secret to allow FB authentication.
#### Create environment variables for Facebook:
> FB_CLIENT_ID=123456789012345
> FB_SECRET=73hakf83jf8sjj30skkf9a88s83qqa
#### Set up an email account and Create environment variables for Nodemailer
NODEMAILER_CLIENT_ID=rewards@organization.com
NODEMAILER_PASSWORD=password1

## Requirements

- Node 6.11.0 and higher
- PSQL
- see package.json for dependencies

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g nodemon
npm install
```

Open your favorite terminal and run these commands:

First Tab:
```sh
npm run build
```

Second Tab:

```sh
npm start
```

Webpack bundle.js will be built in:

```sh
client/public/dist/bundle.js
```

### Roadmap

View the project roadmap [here](https://github.com/CrewBuilder/crew-builder/issues)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
See [API.md](API.md) for API documentation and overview.

## MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

> Written with [StackEdit](https://stackedit.io/).