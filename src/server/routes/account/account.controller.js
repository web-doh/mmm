import User from "../../models/user";
import * as bcrypt from "bcryptjs";

/* 
  POST /account/signup 
  {
      email,
      username,
      password
  }
*/

const createUser = async (userInput) => {
  const { email, username, password } = userInput;
  const hashedPwd = await hashPassword(password);

  const user = new User({
    email,
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

const respond = (isAdmin, res) => {
  res.json({
    message: "created successfully",
    admin: isAdmin ? true : false,
  });
};

const errorGenerator = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
};

export const signUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errorGenerator("이미 가입한 이메일 주소입니다. 다시 입력해 주세요.", 404);
    }

    const newUser = await createUser(req.body);
    const number = await count();
    const admin = await assignAdmin(newUser, number);
    const response = await respond(admin, res);
  } catch (err) {
    next(err);
  }
};
