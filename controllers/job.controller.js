// import {Job} from "../models/job.model.js";
// // admin can post a job
// export const postJob = async (req, res) => {
//   try {
//         const {title, description, location, salary, requirements,jobType,expreience,position,companyId}= req.body;
//         const userId = req.user._id;
//         if(!title || !description || !location || !salary || !requirements || !jobType || !expreience || !position || !companyId) {
//             return res.status(404).json({
//                 message: "Somenthing is missing",
//                 success: false
//             });
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(','),
//             salary:Number(salary),
//             location,
//             jobType,
//             expreienceLevel: expreience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "Job posted successfully",
//             job,
//             success: true
//         })
//   } catch (error) {
//     console.log(error);
//   }
// };
// // get all jobs for students
// export const getAllJobs = async (req,res)=>{
//     try{
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or:[
//                 {title: {$regex: keyword, $options:'i'}},
//                 {description: {$regex: keyword, $options: "i"}},
//             ]
//         };
//         const jobs = await Job.find(query);
//         if(!Jobs){
//             return res.status(404).json({
//                 message:"No jobs found",
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     }catch(error){
//         console.log(error);
//     }
// }
// // get job by id for students
// export const getJobBId = async(req,res)=>{
//     try{
//         const jobId = req.param.id;
//         const job = await Job.findById(jobId);
//         if(!job){
//             return res.status(404).json({
//                 message:"Job not found",
//                 success:false
//             })
//         };
//         return res.status(200).json({job, success:true});
//     }catch(error){
//         console.log(error);
//     }
// }

// // admin can get a job
// export const getAdminJobById = async(req,res)=>{
//     try{
//         const adminId = res.User._id;
//         const jobs = await Job.find({created_by:adminId});
//         if(!jobs){
//             return res,status(404).json({
//                 message:"No jobs found",
//                 success:false
//             })
//         };
//         return res.status(200).json({
//               jobs,
//              success:true
//             });
//     }catch(error){
//         console.log(error);
//     }
// }

import { Job } from "../models/job.model.js";

// admin can post a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      salary,
      requirements,
      jobType,
      experienceLevel ,
      position,
      companyId
    } = req.body;

    const userId = req.user._id;

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !requirements ||
      !jobType ||
    !experienceLevel ||
      !position ||
      !companyId
    ) {
      return res.status(404).json({
        message: "Somenthing is missing",
        success: false
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experienceLevel, 
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

// get all jobs for students
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };

    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1});


    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found"
      });
    }

    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

// get job by id for students
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path:"applications"
    })

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};

// admin can get a job
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user._id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path:'company',
      createdAt:-1
    })

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found",
        success: false
      });
    }

    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
