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
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  };

  const activationToken = createActivationToken(user);

  const activationUrl = `http://localhost:5173/activation/${activationToken}`;

  await sendMail({
    email: user.email,
    subject: "Activate your account",
    message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
  });
  return successResponse.sendData(res, {
    status: 200,
    message: `please check your email:- ${user.email} to activate your account!`,
  });
});

module.exports = signup;
