require("dotenv").config({ path: ".env" });

const User = require("../models/User");

module.exports = {
  userlistControl: async (req, res) => {
    const contents = await User.find({});

    res.status(200).send({ data: contents });
  },
  userRegisterControl: async (req, res) => {
    const { id, email, name, age } = req.body;

    const userContents = {
      id: id,
      email: email,
      name: name,
      age: age,
      enrolled: new Date(),
    };

    const insertDb = new User(userContents).save();

    if (insertDb) {
      return res
        .status(201)
        .send({ message: "정상적으로 유저 정보가 등록되었습니다." });
    } else {
      return res
        .status(500)
        .send({ message: "서버 오류가 발생했습니다. 등록되지 못했습니다." });
    }
  },
  userEditControl: async (req, res) => {
    const { id, email, name, age } = req.body;

    const editedUser = {
      email: email,
      name: name,
      age: age,
    };

    const ToEditUser = await User.findOne({ id: id });

    if (ToEditUser === null) {
      res.status(400).send({ message: "게시글이 존재하지 않습니다." });
    } else {
      await User.find({ id: id }).updateOne(editedUser).exec();

      res.status(200).send({ message: "유저 정보가 수정되었습니다." });
    }
  },
  userDeleteControl: async (req, res) => {
    const { id } = req.body;

    const ToDeleteUser = await User.findOne({ id: id });

    if (ToDeleteUser === null) {
      res.status(400).send({ message: "유저 정보가 존재하지 않습니다." });
    } else {
      await User.deleteOne({ id: id });

      res.status(200).send({ message: "유저 정보가 삭제되었습니다." });
    }
  },
};
