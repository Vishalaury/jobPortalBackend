// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // import getDataUri from "../utils/datauri.js";
// // import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, password, role } = req.body;
         
//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: 'User already exist with this email.',
//                 success: false,
//             })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//        await User.create({
//   fullname,
//   email,
//   phoneNumber,
//   password: hashedPassword,
//   role,
//   profile: {
//     bio: "",
//     skills: [],
//     resume: "",
//     resumeOriginalName: "",
//     company: null,
//     profilePhoto: ""
//   }
// });


//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
        
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };

//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }

//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };

//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }

//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, {
//             maxAge: 1 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             sameSite: 'strict'
//         }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const logout = async (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "Logged out successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
//         const file = req.file;

//        const filrUri = getDataUri(file);
//       const cloudresponse = await cloudinary.uploader.upload(fileUri.contend);


//         // if (!fullname || !email || !phoneNumber || !bio || !skills) {
//         //     return res.status(400).json({
//         //         message: "Something is missing",
//         //         success: false
//         //     });
//         // }
//         //   cloudinary array
//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }
//     //    update profile


//           if(fullname) user.fullname = fullname
//           if(email) user.email = email
//           if(phoneNumber) user.phoneNumber = phoneNumber
//           if(bio) user.profile.bio = bio
//           if(skills) user.profile.skills = skillsArray


//                 if(cloudResponse){
//                     user.profile.resume = cloudResponse.secure_url//save the cloudinary url
//                     user.profile.resumeOriginalName= file.originalname//save the original file name 
//                 }
//         // user.fullname = fullname;
//         // user.email = email;
//         // user.phoneNumber = phoneNumber;
//         // user.profile.bio = bio;          
//         // user.profile.skills = skillsArray; 

//         await user.save();
         
//         return res.status(200).json({
//             message: "Profile updated successfully",
//             user,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: "Server error",
//             success: false
//         });
//     }
// };



// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";

// /* ================= REGISTER ================= */
// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({ message: "Something is missing", success: false });
//     }

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exist with this email", success: false });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         bio: "",
//         skills: [],
//         resume: "",
//         resumeOriginalName: "",
//         company: null,
//         profilePhoto: ""
//       }
//     });

//     return res.status(201).json({ message: "Account created successfully", success: true });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({ message: "Something is missing", success: false });
//     }

//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Incorrect email or password", success: false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Incorrect email or password", success: false });
//     }

//     if (role !== user.role) {
//       return res.status(400).json({ message: "Account doesn't exist with this role", success: false });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

//     return res
//       .status(200)
//       .cookie("token", token, { maxAge: 86400000, httpOnly: true, sameSite: "strict" })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile
//         },
//         success: true
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGOUT ================= */
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= UPDATE PROFILE ================= */
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     let cloudResponse;
//     if (file) {
//       const fileUri = getDataUri(file); // ✅ fixed
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content); // ✅ fixed
//     }

//     const user = await User.findById(req.id);
//     if (!user) {
//       return res.status(400).json({ message: "User not found", success: false });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(",");

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//       success: true
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";

// /* ================= REGISTER ================= */
// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({
//         message: "User already exist with this email",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         bio: "",
//         skills: [],
//         resume: "",
//         resumeOriginalName: "",
//         company: null,
//         profilePhoto: "",
//       },
//     });

//     return res.status(201).json({
//       message: "Account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with this role",
//         success: false,
//       });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 86400000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile,
//         },
//         success: true,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGOUT ================= */
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= UPDATE PROFILE ================= */
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     let cloudResponse;
//     if (file) {
//       const fileUri = getDataUri(file);

//       // ✅ FINAL FIX (DOWNLOAD → SHOW)
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "raw",
//         flags: "attachment:false",
//       });
//     }

//     const user = await User.findById(req.id);
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(",");

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };







// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// import getDataUri from "../utils/dataUri.js";
// import cloudinary from "../utils/cloudinary.js";

// /* ================= REGISTER ================= */
// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;

//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({
//         message: "User already exist with this email",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//       profile: {
//         bio: "",
//         skills: [],
//         resume: "",
//         resumeOriginalName: "",
//         company: null,
//         profilePhoto: "",
//       },
//     });

//     return res.status(201).json({
//       message: "Account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGIN ================= */
// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         message: "Incorrect email or password",
//         success: false,
//       });
//     }

//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account doesn't exist with this role",
//         success: false,
//       });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       process.env.SECRET_KEY,
//       { expiresIn: "1d" }
//     );

//     return res
//       .status(200)
//       .cookie("token", token, {
//         maxAge: 86400000,
//         httpOnly: true,
//         sameSite: "strict",
//       })
//       .json({
//         message: `Welcome back ${user.fullname}`,
//         user: {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile,
//         },
//         success: true,
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= LOGOUT ================= */
// export const logout = async (req, res) => {
//   try {
//     return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//       message: "Logged out successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// /* ================= UPDATE PROFILE ================= */
// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;

//     let cloudResponse;
//     if (file) {
//       const fileUri = getDataUri(file);

//       // ✅ FINAL FIX (PDF preview + correct filename)
//       cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//         resource_type: "raw",
//         use_filename: true,
//         unique_filename: false,
//         flags: "attachment:false",
//       });
//     }

//     const user = await User.findById(req.id);
//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skills) user.profile.skills = skills.split(",");

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       user,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };




// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, password, role } = req.body;
         
//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: 'User already exist with this email.',
//                 success: false,
//             })
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role,
//             profile:{
//                 profilePhoto:cloudResponse.secure_url,
//             }
//         });

//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
        
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         };
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             })
//         };
//         // check role is correct or not
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             })
//         };

//         const tokenData = {
//             userId: user._id
//         }
//         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const logout = async (req, res) => {
//     try {
//         return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//             message: "Logged out successfully.",
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         // cloudinary ayega idhar
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



//         let skillsArray;
//         if(skills){
//             skillsArray = skills.split(",");
//         }
//         const userId = req.id; // middleware authentication
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             })
//         }
//         // updating data
//         if(fullname) user.fullname = fullname
//         if(email) user.email = email
//         if(phoneNumber)  user.phoneNumber = phoneNumber
//         if(bio) user.profile.bio = bio
//         if(skills) user.profile.skills = skillsArray
      
//         // resume comes later here...
//         if(cloudResponse){
//             user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//             user.profile.resumeOriginalName = file.originalname // Save the original file name
//         }


//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).json({
//             message:"Profile updated successfully.",
//             user,
//             success:true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }







// import { User } from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

// export const register = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, password, role } = req.body;
         
//         if (!fullname || !email || !phoneNumber || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         }

//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({
//                 message: "User already exist with this email.",
//                 success: false,
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         await User.create({
//             fullname,
//             email,
//             phoneNumber,
//             password: hashedPassword,
//             role,
//             profile: {
//                 profilePhoto: cloudResponse.secure_url,
//             }
//         });

//         return res.status(201).json({
//             message: "Account created successfully.",
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
        
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             });
//         }

//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             });
//         }

//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password.",
//                 success: false,
//             });
//         }

//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account doesn't exist with current role.",
//                 success: false
//             });
//         }

//         const tokenData = {
//             userId: user._id
//         };

//         const token = jwt.sign(
//             tokenData,
//             process.env.SECRET_KEY,
//             { expiresIn: "1d" }
//         );

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res
//             .status(200)
//             .cookie("token", token, {
//                 maxAge: 1 * 24 * 60 * 60 * 1000,
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none"
//             })
//             .json({
//                 message: `Welcome back ${user.fullname}`,
//                 user,
//                 success: true
//             });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const logout = async (req, res) => {
//     try {
//         return res
//             .status(200)
//             .cookie("token", "", {
//                 maxAge: 0,
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: "none"
//             })
//             .json({
//                 message: "Logged out successfully.",
//                 success: true
//             });

//     } catch (error) {
//         console.log(error);
//     }
// };

// export const updateProfile = async (req, res) => {
//     try {
//         const { fullname, email, phoneNumber, bio, skills } = req.body;
        
//         const file = req.file;
//         const fileUri = getDataUri(file);
//         const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
//            resource_type: "raw"
//             });

//         let skillsArray;
//         if (skills) {
//             skillsArray = skills.split(",");
//         }

//         const userId = req.id;
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(400).json({
//                 message: "User not found.",
//                 success: false
//             });
//         }

//         if (fullname) user.fullname = fullname;
//         if (email) user.email = email;
//         if (phoneNumber) user.phoneNumber = phoneNumber;
//         if (bio) user.profile.bio = bio;
//         if (skills) user.profile.skills = skillsArray;

//         if (cloudResponse) {
//             user.profile.resume = cloudResponse.secure_url;
//             user.profile.resumeOriginalName = file.originalname;
//         }

//         await user.save();

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         };

//         return res.status(200).json({
//             message: "Profile updated successfully.",
//             user,
//             success: true
//         });

//     } catch (error) {
//         console.log(error);
//     }
// };







import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

/* ================= REGISTER ================= */

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false
      });
    }

    let profilePhotoUrl = "";

    if (req.file) {
      const fileUri = getDataUri(req.file);

      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl
      }
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });

  } catch (error) {
    console.log(error);
  }
};


/* ================= LOGIN ================= */

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      });
    }

    const tokenData = {
      userId: user._id
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
      });

  } catch (error) {
    console.log(error);
  }
};


/* ================= LOGOUT ================= */

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: "Logged out successfully.",
        success: true
      });

  } catch (error) {
    console.log(error);
  }
};


/* ================= UPDATE PROFILE ================= */

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const userId = req.id;

    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      });
    }

    let skillsArray;

    if (skills) {
      skillsArray = skills.split(",");
    }

    /* ---------- RESUME UPLOAD ---------- */

    let cloudResponse;

    if (req.file) {
      const fileUri = getDataUri(req.file);

      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw"
      });
    }

    /* ---------- UPDATE DATA ---------- */

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    });

  } catch (error) {
    console.log(error);
  }
};