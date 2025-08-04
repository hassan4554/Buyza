const {
  successResponse,
  catchAsync,
  AppError,
  createActivationToken,
  sendMail,
  uploadSingleImage,
} = require("../../utils");
const { Shop } = require("../../model");

const createShop = catchAsync(async (req, res, next) => {
  const { name, email, password, avatar, phoneNumber, zipCode, address } =
    req.body;

  const shopEmail = await Shop.findOne({ email });

  if (shopEmail) {
    return next(new AppError("Shop already exists", 400));
  }

  const img = await uploadSingleImage(avatar, "avatars");

  const shop = {
    name,
    email,
    password,
    avatar: img,
    phoneNumber,
    zipCode,
    address,
  };

  const activationToken = createActivationToken(shop);

  const activationUrl = `${process.env.FRONTEND_URL}/shop/activation/${activationToken}`;

  await sendMail({
    email: shop.email,
    subject: "Activate your account",
    message: `<!DOCTYPE html>
<html>
  <body>
    <p>Hello ${shop.name},</p>
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
    message: `please check your email:- ${shop.email} to activate your account!`,
  });
});

module.exports = createShop;
