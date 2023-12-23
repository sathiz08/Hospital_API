const doctors = require("../../../models/doctors");


//Resister a doctors
module.exports.register = async (req, res) => {
  try {
    //create doctors
    let doctors = await doctors.create(req.body);
    // Return response
    res.status(201).json({
      success: true,
      body: doctors,
      msg:'doctors Registered Sucessfully!'
    });
    
  } catch (err) {
    console.log(err);
    // Error handling
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
};

//doctors Login
module.exports.login= async (req, res)=>{
  try {

    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        msg:'No email or password'
      });
    }

    let doctors = await doctors.findOne({ email: email });
    if (!doctors) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

    // Check if password matches
    const isMatch = await doctors.matchPassword(password);
    // Error handling if invalid password
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        msg: "Invalid Username or Password!" 
      });
    }

    // Get JWT token
    const token = doctors.getSignedJwtToken();

    // Return response
    res.status(200).json({
      success: true,
      token,
      msg: `Log In Sucessful! Keep the Token safe ${doctors.name}!`
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      msg:'Error Occoured!'
    });
  }
}