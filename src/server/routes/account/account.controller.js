import User from "../../models/user";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 
  ACCOUNT SIGNUP: POST /account/signup 
  BODY SAMPLE: { "userId": "sample", "username": "sample", "password": "sample" }
  ERROR CODES:
        1: DUPLICATE USERID
*/

const createUser = async (userInput) => {
  const { userId, username, password } = userInput;
  const hashedPwd = await hashPassword(password);

  const user = new User({
    userId,
    username,
    password: hashedPwd,
  });

  return user.save();
};

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(8);
  const hashedPwd = await bcrypt.hash(password, salt);

  return hashedPwd;
}

const count = () => {
  return User.count({}).exec();
};

const assignAdmin = (user, count) => {
  if (count === 1) {
    user.admin = true;
    return user.save();
  } else {
    return Promise.resolve(false);
  }
};

const respond = (res, user) => {
  return res.status(201).json({
    status: "success",
    user,
  });
};

const errorGenerator = (res, error, code, statusCode) => {
  return res.status(statusCode).json({
    status: "error",
    error,
    code,
  });
};

export const signUp = async (req, res, next) => {
  try {
    const { userId, password1: password, username } = req.body;

    // Check whether ID exists
    const user = await User.findOne({ userId });
    if (user) {
      return errorGenerator(res, "DUPLICATE USERID", 1, 409);
    }

    // Create Account & Save to DB

    const newUser = await createUser({ userId, password, username });
    const number = await count();
    const admin = await assignAdmin(newUser, number);
    const response = await respond(res, newUser);

    return response;
  } catch (err) {
    next(err);
  }
};

/* 
  ACCOUNT SIGNIN: POST /account/login 
  BODY SAMPLE: { "userId": "sample", "password": "sample" }
  ERROR CODES:
        1: NO MATCHING USERID
        2: WRONG PASSWORD
*/

const createToken = (user) => {
  const payload = {
    _id: user._id,
    userId: user.userId,
    admin: user.admin,
  };

  const token = new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
        subject: "userInfo",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

  return token;
};

const verifyPwd = async (password1, password2) => {
  const check = await bcrypt.compare(password1, password2);
  return check;
};

export const login = async (req, res, next) => {
  try {
    const { userId = null, password = null } = req.body;

    // Check whether ID exists
    const user = await User.findOne({ userId });

    if (!user) {
      return errorGenerator(res, "NO MATCHING USERID", 1, 404);
    }

    // Check whether password is valid
    const verifying = await verifyPwd(password, user.password);
    if (!verifying) {
      return errorGenerator(res, "WRONG PASSWORD", 2, 403.11);
    }

    // Create token
    const token = await createToken(user);
    user["token"] = token;
    // Return success response
    const response = await respond(res, user);

    return response;
  } catch (err) {
    console.log("login failed!", err);

    next(err);
  }
};
