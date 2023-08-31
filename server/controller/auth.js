const User = require("../models/userSchema");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const { name, email, phone, profession, password, cpassword, gender } = req.body;
    if (!name || !email || !phone || !profession || !password || !cpassword || !gender) {
        return res.status(422).json({ error: "PLESE FILL ALL THE FEILD" });
    } else {
        try {

            const UserExist = await User.findOne({ email: email });
            if (UserExist) {
                return res.status(422).json({ error: "This Email Already Exist" });
            } else {
                if (gender === "male") {
                    profile_pic = "male.gif"
                } else if (gender === "female") {
                    profile_pic = "female.gif"
                } else if (gender === "other") {
                    profile_pic = "male.gif"
                } else {
                    return res.status(402).json({ error: "Something went wrong" });
                }
                const username = "hello"
                if (password === cpassword) {
                    const registerEmployee = new User({
                        name, email, phone, profession, password, gender, profile_pic , username
                    });

                    const registered = await registerEmployee.save();

                    if (registered) {
                        const token = await registerEmployee.generateAuthToken();

                        const cookie = res.cookie("jwtoken", token, {
                            expires: new Date(Date.now() + 25892000000),
                            httpOnly: true
                        })
                        
                        console.log(registerEmployee)
                        res.status(200).json({ messege: "Detail Saved" })
                    }
                } else {
                    res.status(401).json({ error: "Your Password Is Not Same !" });
                }
            }
        } catch (err) {
            res.status(400).json({ error: `${err}` })
            console.log(err);
        }

    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Plese Fill All The Fill" });
    } else {
        try {
            const userLogin = await User.findOne({ email: email });

            if (userLogin) {
                const isMatch = await bcrypt.compare(password, userLogin.password);
                const token = await userLogin.generateAuthToken();

                const cookie = res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })

                if (isMatch) {
                    console.log("Saved")
                    res.send("LOGIN SUCCESSFULL");
                } else {
                    res.status(400).json({ error: "Invalid Crediential !" });
                }
            } else {
                res.status(400).json({ error: "Invalid Login !" });
            }


        } catch (error) {
            res.status(400).json({ error: "Something Went Wrong" });
            console.log(error);
        }
    }
}

const about = async (req, res) => {
    res.send(req.rootUser);
    console.log(req.rootUser)
}

module.exports = { register, signin, about }