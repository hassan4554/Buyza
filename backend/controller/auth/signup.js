const {
  catchAsync,
  successResponse,
  AppError,
  sendMail,
  createActivationToken,
  uploadSingleImage,
} = require("../../utils");
const { User } = require("../../model");

const signup = catchAsync(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  const userEmail = await User.findOne({ email });

  if (userEmail) {
    return next(new AppError("User already exists", 400));
  }

  img = await uploadSingleImage(avatar, "avatars");

  // const myCloud = await cloudinary.v2.uploader.upload(avatar, {
  //   folder: "avatars",
  // });

  const user = {
    name: name,
    email: email,
    password: password,
    avatar: img,
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    // message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
    message: `<!DOCTYPE html>
<html>
  <body>
    <p>Hello ${user.name},</p>
    <p>Please click the button below to activate your account:</p>
    <a href="${activationUrl}" target="_blank" style="
      display: inline-block;
      padding: 12px 24px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007BFF;
      text-decoration: none;
      border-radius: 6px;
    ">
      Activate Account
    </a>
    <p>If the button doesn’t work, you can also copy and paste the following URL into your browser:</p>
    <p><a href="${activationUrl}">${activationUrl}</a></p>
  </body>
</html>
`,
  });
  return successResponse.sendData(res, {
    status: 200,
    message: `please check your email:- ${user.email} to activate your account!`,
  });
});

module.exports = signup;
