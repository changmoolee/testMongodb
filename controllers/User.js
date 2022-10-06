require("dotenv").config({ path: ".env" });

const User = require("../models/User");

module.exports = {
  userlistControl: async (req, res) => {
    const contents = await User.find({});

    res.status(200).send({ data: contents });
  },
  userRegisterControl: async (req, res) => {
    const { id, password } = req.body;

    const userContents = {
      id: id,
      password: password,
      enrolled: new Date(),
    };

    const insertDb = new User(userContents).save();

    if (insertDb) {
      return res
        .status(201)
        .send({ message: "정상적으로 유저가 등록되었습니다." });
    } else {
      return res
        .status(500)
        .send({ message: "서버 오류가 발생했습니다. 등록되지 못했습니다." });
    }
  },
  userEditControl: async (req, res) => {
    const { id, password } = req.body;

    const editedUser = {
      password: password,
    };

    const userToBeEdited = await User.findOne({ id: id });

    if (userToBeEdited === null) {
      res.status(400).send({ message: "유저가 존재하지 않습니다." });
    } else {
      await User.find({ id: id }).updateOne(editedUser).exec();

      res.status(200).send({ message: "유저 비밀번호가 수정되었습니다." });
    }
  },
  userDeleteControl: async (req, res) => {
    const { id } = req.body;

    const ToDeleteUser = await User.findOne({ id: id });

    if (ToDeleteUser === null) {
      res.status(400).send({ message: "유저가 존재하지 않습니다." });
    } else {
      await User.deleteOne({ id: id });

      res.status(200).send({ message: "유저가 삭제되었습니다." });
    }
  },

  userLogInControl: async (req, res) => {
    const { id, password } = req.body;
    const userToBeLogIn = await User.findOne({ id: id, password: password });

    if (userToBeLogIn === null) {
      res.status(400).send({
        message: "유저가 존재하지 않거나 비밀번호가 일치하지 않습니다.",
      });
    } else {
      req.session.userId = id;
      req.session.save(function () {});
      res.status(200).send({ message: "로그인이 완료되었습니다." });
    }
  },
  userLogOutControl: async (req, res) => {
    console.log(req.session.userId);

    if (req.session.userId) {
      delete req.session.userId;
      req.session.save(function () {});
      res.status(200).send({ message: "로그아웃이 완료되었습니다." });
    } else {
      res.status(400).send({
        message: "유저가 존재하지 않거나 비밀번호가 일치하지 않습니다.",
      });
    }
  },
};
