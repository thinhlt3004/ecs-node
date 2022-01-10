import AccountModel from "./../Models/Account.Model.js";
import { asyncWrapper } from "./../Helpers/AsyncWrapper.js";
import { v4 as uuid } from "uuid";
import { sendMail } from "./../Helpers/SendMail.js";
import jwt from "jsonwebtoken";
class AccountController {
  generateAccessToken = (user) => {
    return jwt.sign({ id: user._id, role: user.roleId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
  };

  generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id, role: user.roleId }, process.env.REFRESH_TOKEN_SECRET);
  };

  create = asyncWrapper(async (req, res) => {
    req.body.confirmToken = uuid();
    const newAccount = new AccountModel(req.body);
    const acc = await newAccount.save();
    console.log(req.body.fullName);
    console.log(req.body.confirmToken);
    await sendMail(req.body.email, req.body.fullName, "ConfirmRegister", {
      username: req.body.username,
      token: req.body.confirmToken,
    });
    return res.status(200).json(acc);
  });

  confirm = asyncWrapper(async (req, res) => {
    const { token } = req.body;
    const updatedAcc = await AccountModel.findOneAndUpdate(
      { confirmToken: token },
      { emailConfirm: true },
      { new: true }
    );
    return res.status(200).json(updatedAcc);
  });

  getAll = asyncWrapper(async (req, res) => {
    const acc = await AccountModel.find({});
    return res.status(200).json(acc);
  });

  getByID = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const acc = await AccountModel.findById(id);
    return res.status(200).json(acc);
  });

  update = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const updatedAccount = await AccountModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedAccount);
  });

  login = asyncWrapper(async (req, res) => {
    const current = await AccountModel.FindByCredentials(
      req.body.email,
      req.body.password
    );
    if (current) {
      const accessToken = this.generateAccessToken(current);
      const refreshToken = this.generateRefreshToken(current);
      const { password, ...otherInfos } = current._doc;
      return res.status(200).json({ ...otherInfos, accessToken, refreshToken });
    } else {
      return res.status(400).json("Email or Password is incorrect");
    }
  });

  refreshToken = asyncWrapper(async (req, res) => {
    const current = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!current) {
      return res.status(404).json("Not Found");
    } else {
      const acc = await AccountModel.findById(current.id);
      const newAccessToken = this.generateAccessToken(acc);
      const newRefreshToken = this.generateRefreshToken(acc);
      res.status(200).json({
        accessToken : newAccessToken,
        refreshToken : newRefreshToken,
     });
    }
  });
}

export default new AccountController();
