const jwt = require('jsonwebtoken');

const generateToken = () => {
  const payload = {
    data: {
      userId: '123456789',
      email: 'exampleUser'
    }
  };

  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secretKey);

  return token;
};

module.exports = generateToken;