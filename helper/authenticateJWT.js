// const jwt = require('jsonwebtoken');
// const { NodeLocalStorage } = require('./common');
// const { findAdmin } = require('../api/web/model/admin');
// const { findUser } = require('../api/web/model/user');

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization');

//   if (!token) {
//     return res.status(403).json({ status: false, response_code: 403, message: 'Unauthorized', error: 'Unauthorized' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
//     if (err) {
//       return res.status(403).json({ status: false, response_code: 403, message: 'Login Expired / Invalid token', error: 'Login Expired / Invalid token' });
//     }
//     // if (NodeLocalStorage.getItem(user.id) !== token) {
//     //   return res.status(403).json({ status: false, response_code: 403, message: 'Login Expired / Invalid token', error: 'Login Expired / Invalid token' });
//     // }

//     if (user.type === 'admin') {
//       const existingAdmin = await findAdmin({ token, is_deleted: false });
//       if (!existingAdmin) {
//         return res.status(403).json({ status: false, response_code: 403, message: 'Login Expired / Invalid token', error: 'Login Expired / Invalid token' });
//       }
//     }

//     if (user.type === 'user') {
//       const existingUser = await findUser({ token, is_deleted: false });
//       if (!existingUser) {
//         return res.status(403).json({ status: false, response_code: 403, message: 'Login Expired / Invalid token', error: 'Login Expired / Invalid token' });
//       }
//     }

//     req.user = user;
//     next();
//   });
// };

// module.exports = authenticateJWT;
