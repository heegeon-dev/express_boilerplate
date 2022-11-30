const reqResponse = require("../cors/responseHandler");
const axios = require("axios");
const config = require("config");

exports.isAuthenticated = async function (req, res, next) {
  try {
    let user = await getUserInfo(req.headers.authorization);
    req.user = user;
  }
  catch (error) {
    console.error(error)
    res.status(414).send(reqResponse.errorResponse(414));
  }
  next();
}

exports.isPersonal = async function (req, res, next) {
  try {
    let user = await getUserInfo(req.headers.authorization);
    if (user.user_type == "P" || user.user_type == "A") {
      req.user = user;
      next();
    }
    else {
      res.status(417).send(reqResponse.errorResponse(417));
    }
  }
  catch (error) {
    console.error(error)
    res.status(414).send(reqResponse.errorResponse(414));
  }
}

exports.isCompany = async function (req, res, next) {
  try {
    let user = await getUserInfo(req.headers.authorization);
    if (user.user_type == "E" || user.user_type == "A") {
      req.user = user;
      next();
    }
    else {
      res.status(417).send(reqResponse.errorResponse(417));
    }
  }
  catch (error) {
    console.error(error)
    res.status(414).send(reqResponse.errorResponse(414));
  }
}

exports.isAdmin = async function (req, res, next) {
  try {
    let user = await getUserInfo(req.headers.authorization);
    if (user.user_type == "A") {
      req.user = user;
      next();
    }
    else {
      res.status(417).send(reqResponse.errorResponse(417));
    }
  }
  catch (error) {
    console.error(error)
    res.status(414).send(reqResponse.errorResponse(417));
  }
}


async function getUserInfo(token) {
  try {
    let result = await axios.get(`${config.get(`${mode}.SEASON_AUTH_URL`)}/user/info`, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token
      },
    });
    return result.data.data;
  }
  catch (err) {
    throw (err);
  }
}