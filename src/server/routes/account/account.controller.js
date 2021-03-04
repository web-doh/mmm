import User from "../../models/user";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* 
  POST /account/signup 
  {
      userId,
      username,
      password
  }
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

const respond = (res, message, admin) => {
  res.status(201).json({
    message,
    admin,
  });
};

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export const signUp = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const user = await User.findOne({ userId });
    if (user) {
      errorGenerator("이미 가입한 아이디입니다. 다시 입력해 주세요.", 404);
    }

    const newUser = await createUser(req.body);
    const number = await count();
    const admin = await assignAdmin(newUser, number);
    const response = await respond(res, "created successfully", newUser.admin);
  } catch (err) {
    next(err);
  }
};

/* 
  POST /account/login 
  {
      userId,
      password
  }
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
    if (!userId || !password)
      errorGenerator("아이디와 비밀번호를 모두 입력해 주세요.", 400);

    const user = await User.findOne({ userId });

    if (!user) {
      errorGenerator("존재하지 않는 아이디입니다. 다시 입력해 주세요.", 404);
    }

    const verifying = await verifyPwd(password, user.password);
    if (!verifying) {
      errorGenerator("비밀번호가 일치하지 않습니다. 다시 입력해 주세요.", 404);
    }

    const token = await createToken(user);
    const respond = await res
      .status(201)
      .json({ message: "login successfully", token });
  } catch (err) {
    console.log("login failed!", err);

    next(err);
  }
};
