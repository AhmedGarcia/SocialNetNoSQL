# SocialNetNoSQL

## Description
This Social Network API is designed for a social networking web application where users can share their thoughts, react to friends’ thoughts, and manage their friend list. Built using **Express.js** for routing, a **MongoDB** database, and the **Mongoose ODM**, this API provides the foundation for handling large amounts of unstructured data, typical of social networking platforms.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Thought Routes](#thought-routes)
  - [Friend Routes](#friend-routes)
  - [Reaction Routes](#reaction-routes)
- [Walkthrough Video](#walkthrough-video)
- [License](#license)
- [Questions](#questions)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/social-network-api.git
   ```

2. Navegate to the project directory:

```bash
cd social-network-api
```

3. Install the necessary dependencies:

```bash
npm install
```

4. Ensure MongoDB is installed and running on your local machine. You can start MongoDB using:

```bash
mongod
```

## Usage

### Start the server

```bash
npm start
```

### Use Insomnia or Postman to test the API endpoints. In our walkthough video we use Insomnia. Refer to the API Endpoints section below for the available routes and their usage.

## API Endpoints

### User Routes

#### Create a New User

- **POST** `/api/users`

- **Body**:

  ```json
  {
    "username": "john_doe",
    "email": "john_doe@example.com"
  }
  ```

  #### Get All Users

- **GET** `/api/users`

#### Get a Single User by ID

- **GET** `/api/users/:userId

#### Update a User by ID

- **PUT** `/api/users/:userId

- **Body**:

```json
{
  "username": "john_updated",
  "email": "john_updated@example.com"
}
```

#### Delete a User by ID

- **DELETE** `/api/users/:userId

### Thought Routes

#### Create a New Thought

- **POST** `/api/thoughts`

- **Body**:

```json
{
  "thoughtText": "This is my thought!",
  "username": "john_doe",
  "userId": "user_id_here"
}
```

#### Get All Thoughts

- **GET** `/api/thoughts`

#### Get a Single Tgought by ID

- **GET** `/api/thoughts/:thoughtId`

#### Update a Thought by ID

- **PUT** `/api/thoughts/:thoughtId`

- **Body**:

```json
{
  "thoughtText": "Updated thought text!"
}
```

#### Delete a Thought by ID

- **DELETE** `/api/thoughts/:thoughtId`

### Friend Routes

#### Add a Friend to User’s Friend List

- **POST** `/api/users/:userId/friends/:friendId`

#### Remove a Friend from User’s Friend List

- **DELETE** `/api/users/:userId/friends/:friendId`

### Reaction Routes

#### Add a Reaction to a Thought

- **POST** `/api/thoughts/:thoughtId/reactions`

- **Body**:

```json
{
  "reactionBody": "This is a reaction!",
  "username": "john_doe"
}
```

#### Remove a Reaction from a Thought

- **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`

## Walkthrough Videos

A walkthrough video demonstrating how to start the server can be found [here](https://drive.google.com/file/d/10-Y59reNomYlHkbxtdIYYGObllySHgzc/view?usp=sharing). The video demonstrating the functionality of the Social Network API can be found [here](https://drive.google.com/file/d/1Psjc_Q4F9HlS6RgtdI0gBMGFbGq8iMDN/view?usp=sharing).

The video covers:

* How to start the server and connect to the MongoDB database.
* GET routes for retrieving all users and thoughts.
* GET routes for retrieving a single user and a single thought by ID.
* POST, PUT, and DELETE routes for users and thoughts.
* POST and DELETE routes for managing a user’s friend list.
* POST and DELETE routes for reactions to thoughts.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact Me

If you have any questions or feedback regarding this project, feel free to reach out:

- **GitHub**: [Ahmed Garcia](https://github.com/your-username)
- **Email**: [ahmed.garcia.ramos@gmail.com](mailto:ahmed.garcia.ramos@gmail.com)
- **Repository**: [Social Network API](https://github.com/AhmedGarcia/SocialNetNoSQL)
