const { User } = require('../schemas/user.schema');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../services/auth.service');
const { sendWelcomeEmail } = require('../services/email.service');

exports.register = async (req, res) => {


    const { name, email, password } = req.body

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(401).json({ message: "User already registered" })
    }

    const encryptedPassword = bcrypt.hashSync(password);

    const newUser = await User.create({ email, name, password: encryptedPassword, active: false });


    const token = generateJWT(newUser);
    console.log("token", token)
    await sendWelcomeEmail(email, name);
    return res.status(201).json({ user: newUser, token });
}



exports.login = async (req, res) => {
    const { email, password } = req.body


    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.status(401).json({ message: "User not registered" })
    }


    const passwordsMatch = await bcrypt.compare(password, existingUser.password);


    if (!passwordsMatch) {
        return res.status(401).json({ message: "Passwords do not match" })

    }

    const token = generateJWT(existingUser);

    return res.status(200).json({ user: existingUser, token });
}