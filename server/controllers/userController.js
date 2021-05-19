const db = require ('../schemas/schemaSQL');
const bcrypt  = require ('bcrypt');
const { SALT_FACTOR } = process.env;

const userController = {};

userController.createUser = (req, res, next) => {
  // extract the username & password from the req.body
  const { username, password } = req.body;
  const userId = Math.floor(Math.random() * 10000);
  // hash the user provided password
  password = bcrypt.hash(password, SALT_FACTOR, (err, hash) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    return hash;
  })
  
  const newUserQuery = `
  INSERT INTO Users (userId, username, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `
  const values = [userId, username, password];
  
  try {
    db.query(newUserQuery, values, (err, result) => {
      console.log('Result on insert', result);
      const {rows} = result;
      console.log('Am I extracting rows?', rows)
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

userController.verifyUser = (req, res, next) => {
  // extract the username & password from the req.body
  const { username, password } = req.body;
  const userQuery = 
    `SELECT ***
    FROM ****
    `;
  const queryRef = {
    1: username,
    2: password
  }
  try {
    db.query(userQuery, (err, result) => {
      const {rows} = result;
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

userController.deleteUser = (req, res, next) => {
  const userQuery = 
    `SELECT ***
    FROM ****
    `;
  try {
    db.query(userQuery, (err, result) => {
      const {rows} = result;
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

userController.updateUserPassword = (req, res, next) => {
  const userQuery = 
    `SELECT ***
    FROM ****
    `;
  try {
    db.query(userQuery, (err, result) => {
      const {rows} = result;
      res.locals.verifyUser = rows;
      return next();
    });
  } catch (err) {next(err);}
};

module.exports  = userController;