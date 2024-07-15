const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const secretKey = "masai";
const saltRounds =10;

// Function to add a user with role 'user'
// const addUser = async (req, res) => {
//     try {
//       const { name, email, password, address, latitude, longitude,role, colonyId } = req.body;
//       const hashedPassword = await bcrypt.hash(password, saltRounds);
//       const newUser = await User.create({
//         name,
//         email,
//         password: hashedPassword,
//         address,
//         latitude,
//         longitude,
//         role,
//         colonyId,
//       });
//       res.status(201).json(newUser);
//     } catch (error) {
//       res.status(500).json({ error: 'Error creating user', details: error.message });
//     }
//   };
  
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aditi.tlgt244@gmail.com', // replace with your email
      pass: 'qirv tpuf nnbg jhbg',  // replace with your email password
    },
  });
  
  const addUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        
      });
  
      // Set up email options
      const mailOptions = {
        from: 'aditi.tlgt244@gmail.com', // replace with your email
        to: email,
        subject: 'Your Registration Details',
        text: `Hello ${name},\n\nYou have been registered successfully. Here are your login details:\nEmail: ${email}\nPassword: ${password}\n\nThank you!`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user', details: error.message });
    }
  };

  // Function to get all users
//   const getUsers = async (req, res) => {
//     try {
//       const users = await User.findAll();
//       res.status(200).json(users);
//     } catch (error) {
//       res.status(500).json({ error: 'Error fetching users', details: error.message });
//     }
//   };
  
  // Function to update a user
//   const updateUser = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedUser = await User.update(req.body, { where: { id } });
//       if (updatedUser[0] === 0) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User updated' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error updating user', details: error.message });
//     }
//   };
  
//   // Function to delete a user
//   const deleteUser = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const deleted = await User.destroy({ where: { id } });
//       if (!deleted) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json({ message: 'User deleted' });
//     } catch (error) {
//       res.status(500).json({ error: 'Error deleting user', details: error.message });
//     }
//   };
  
  // Function to authenticate and login a user
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role, 
                colonyId: user.colonyId, 
                latitude:user.latitude,
                longitude:user.longitude
            },
            secretKey,
            { expiresIn: '1h' }
        );
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                address: user.address,
                latitude: user.latitude,
                longitude: user.longitude,
                role: user.role, // Include role in user object
                colonyId: user.colonyId,
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in', details: error.message });
    }
};

  







module.exports = {
    addUser,
    getUsers,
    loginUser
};