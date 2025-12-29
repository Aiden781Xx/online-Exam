import User from "../models/user"
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,);
};

exports.registerUser= async (req, res) => {
    const { studentName, fatherName,standard,section,rollno,examDate,profileImageUrl } = req.body;

    //validation : check for missing fields
    if (!studentName || !fatherName || !fatherName ||!standard ||! section ||!rollno ||! examDate ) {
        return res.status(400).json({ message: 'ALL fields are required' });
    }
    try{
  // checking if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already registerd ' });
    }

    // Create new user
    const user = await User.create({ studentName, 
        fatherName,
        standard,
        section,
        rollno,
        examDate
         });
    res.status(201).json({ id:user._id ,
        user,
        token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
}
exports.loginUser= async (req, res) => {
    const { email, password } = req.body;

    //validation : check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'ALL fields are required' });
    }
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ id: user._id, user, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: 'Error login user', error: error.message });
    }
}