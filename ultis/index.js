const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (token, secretKey) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secretKey, (err, decode) => {
                if (!err) resolve(decode)
                else reject(err)
            })
        })
    },
    getTokenFromRequest: req => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) return token;
        const bearerToken = req.headers['authorization'];
        if (bearerToken) {
            const arr = bearerToken.split(' ');
            token = arr[1];
        }
        return token;
    },
    generateToken : (user, secretSignature, tokenLife) => {
        return new Promise((resolve, reject) => {
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
          }
          jwt.sign(
            {data: userData},
            secretSignature,
            {
              algorithm: "HS256",
              expiresIn: tokenLife,
            },
            (error, token) => {
              if (error) {
                return reject(error);
              }
              resolve(token);
          });
        });
      }
}