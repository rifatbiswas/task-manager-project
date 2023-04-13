const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  let reqBody = req.body;
  let data = await UserModel.create(reqBody);

  if (data) {
    return res.status(201).json({ status: "Success", data: data });
  } else {
    return res.status(400).json({ status: "Failed", error: error.message });
  }
};

exports.login = async (req, res) => {
  let reqBody = req.body;
  try {
    let data = await UserModel.aggregate([
      { $match: reqBody },
      {
        $project: {
          _id: 0,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ]);
    if (data.length > 0) {
      let payload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: data[0]["email"],
      };
      let token = jwt.sign(payload, "SecreatKey12345678");
      res.status(200).json({ status: "success", token: token, data: data[0] });
    } else {
      res.status(401).json({ status: "unauthorized" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }
};



// exports.profileUpdate = async (req, res) => {
//   let email = req.headers["email"]
//   let reqBody = req.body;
//   let data = await UserModel.updateOne({email:email}, reqBody);
//   if (data) {
//     return res.status(201).json({ status: "Success", data: data });
//   } else {
//     return res.status(400).json({ status: "Failed", error: error.message });
//   }
// };

exports.profileUpdate = async (req, res) => {
  let email = req.headers["email"]
  let reqBody = req.body;
  try {
    let data = await UserModel.updateOne({ email: email }, reqBody);
    return res.status(201).json({ status: "Success", data: data });
  } catch (error) {
    return res.status(400).json({ status: "Failed", error: error.message });
  }
};
