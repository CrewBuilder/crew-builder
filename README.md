> # CrewBuilder

> Build and cultivate a street team for grass-roots support

## Team

  - __Product Owner__: Iona Olive
  - __Scrum Master__: Zack Biernat
  - __Development Team Members__: Ed Plato, Meghana Sarikonda

## Table of Contents

1. [Getting started](#Getting started)
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

## Requirements

- Node
- React
- PSQL
- Sequelize
- Cloudinary
- Facebook Dev
- Moment

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the project roadmap [here](https://github.com/CrewBuilder/crew-builder/issues)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

> Written with [StackEdit](https://stackedit.io/).