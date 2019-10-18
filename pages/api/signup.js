import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exists with email ${email}`);
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    console.log({ newUser });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json(token);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up user. Please try again");
  }
};
