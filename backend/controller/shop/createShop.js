const {
  successResponse,
  catchAsync,
  AppError,
  createActivationToken,
  sendMail,
} = require("../../utils");
const { Shop } = require("../../model");
const cloudinary = require("cloudinary");

const createShop = catchAsync(async (req, res, next) => {
  const { name, email, password, avatar, phoneNumber, zipCode, address } =
    req.body;
  console.log("req.body");
  console.log(req.body);
  const shopEmail = await Shop.findOne({ email });

  if (shopEmail) {
    return next(new AppError("Shop already exists", 400));
  }

  const myCloud = await cloudinary.v2.uploader.upload(avatar, {
    folder: "avatars",
  });

  const shop = {
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
    phoneNumber,
    zipCode,
    address,
  };

  const activationToken = createActivationToken(shop);

  const activationUrl = `http://localhost:5173/shop/activation/${activationToken}`;

  await sendMail({
    email: shop.email,
    subject: "Activate your account",
    message: `Hello ${shop.name}, please click on the link to activate your account: ${activationUrl}`,
  });
  return successResponse.sendData(res, {
    status: 200,
    message: `please check your email:- ${shop.email} to activate your account!`,
  });
});

module.exports = createShop;
