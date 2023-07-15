# Real Estate Catalogue (Backend)

This repository contains the backend code for the Real Estate Catalogue platform. The platform allows users to list and browse real estate properties that are available for sale.

## Technologies Used

The backend of this project is built using the following technologies:

- Node.js: A JavaScript runtime environment that allows executing JavaScript code on the server.
- Express.js: A popular web application framework for Node.js that simplifies building APIs and handling HTTP requests.
- MongoDB: A NoSQL database that provides a flexible and scalable solution for storing data.
- Firebase: A platform that provides various services, including authentication and cloud storage.

## Features

The backend of the Real Estate Catalogue platform provides the following features:

- Property Management: APIs for creating and reading real estate properties.
- User Authentication: APIs for user registration, login, and authentication using jwt.
- Data Storage: Integration with MongoDB for storing and retrieving property and user data.
- File Upload: APIs for handling property image uploads and storage using Firebase Cloud Storage.
- Security: Implementation of authentication middleware and data validation to ensure secure access to APIs.

## Installation

To run the Real Estate Catalogue backend locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/real-estate-catalogue-backend.git
   ```

2. Navigate to the project directory:

   ```shell
   cd real-estate-catalogue-backend
   ```

3. Install the dependencies using npm or yarn:

   ```shell
   npm install
   ```

   or

   ```shell
   yarn install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory of the project.
   - Add the necessary environment variables such as database connection string, Firebase configuration, and any other required variables. Refer to the `.env.example` file for the required variables.

5. Start the server:

   ```shell
   npm start
   ```

   or

   ```shell
   yarn start
   ```

   The server will start running on the specified port (default is `3000`).

6. You can now use the Real Estate Catalogue frontend or an API testing tool to interact with the backend APIs.

## Acknowledgments

This project was inspired by the need for a platform to list and browse real estate properties for sale. Special thanks to the developers and contributors of Node.js, Express.js, MongoDB, and Firebase for their amazing work.

## Contact

If you have any questions or suggestions regarding the Real Estate Catalogue backend project, please feel free to contact us at eshwaramahendra0120@gmail.com.

Happy listing and browsing!
