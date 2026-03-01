// import {Application} from "../models/application.model.js";
// import {Job} from "../models/job.model.js";
// export const applyJob = async (req,res) =>{
//     try{
//         const userId = req.id;
//         const jobId = req.params.id;
//         if(!jobId){
//             return res.status(400).json({
//                 message:"Job id is required",
//                 success:false
//             })
//         };
//         // check if the user has already applied for the job
//         const existingApplication = await Application.findOne({job:jobId, applicant:userId});
//         if(existingApplication){
//             return res.status(400).json({
//                 message:"You have alrady applied for this jobs",
//                 success:false
//             });
//         }
//         // check if the jobs exist
//            const job = await job.findById(jobId);
//            if(!job){
//                     return res.status(404).json({
//                         message:"Job not found",
//                         success: false
//                     })
//            }
//         //    create a new application 
//         const newApplication = await Application.create({
//             job:jobId,
//             application:userId,
//         });
//         job.applications.push(newApplication._id);
//         await job.save();
//         return res.status(201).json({
//             messgae:"Job applied successfully",
//             success:true
//         })
//     }catch(error){
//         console.log(error);
//     }
// };


// export const getAppliedJobs = async (req, res) => {
//   try {
//     const userId = req.id;

//     const application = await Application.find({ applicant: userId })
//       .sort({ createdAt: -1 })
//       .populate({
//         path: "job",
//         options: { sort: { createdAt: -1 } },
//         populate: {
//           path: "company",
//           options: { sort: { createdAt: -1 } },
//         },
//       });

//     if (!application) {
//       return res.status(404).json({
//         message: "No Applications",
//         success: false,
//       });
//     }

//     return res.status(200).json({
//       application,
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };


// // admine are see how many user are applied 
// export const getApplicants = async (res,res)=>{
//     try{
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:'applications',
//             options:{sort:{createdAt:-1}},
//             populate:{
//                 path:'applicant'
//             }
//         });
//         if(!job){
//             return res.status(404).josn({
//                 message:'Job not found',
//                 success:false
//             })
//         };
//         return res.status(200).json({
//             job,
//             success:true
//         });
//     }catch(error){
//         console.log(error);
//     }
// }
// // eccepted or rejected
// export const updateStatus = async (req,res)=>{
//     try{
//         const {status} =req.body;
//         const applicationId = req.params.id;
//         if(!status){
//             return res.status(400).json({
//                 message:'status is required',
//                 success:false
//             })
//         };
//         // find the application by application id 
//         const application = await ApplicationId.findOne({_id:applicationId});
//         if(!application){
//             return res.status(404).json({
//                 message:"Application not found",
//                 success:false
//             })
//         };
//         // update the status 
//         application.status = status.toLowerCase();
//         await appliction.save();

//         return res.status(200).json({
//             message:"status updated successfully",
//             success:true
//         });
//     }catch(error){
//         console.log(error);
//     }
// }

import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false
      });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job applied successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: { path: "company" }
      });

    if (!application || application.length === 0) {
      return res.status(404).json({
        message: "No Applications",
        success: false
      });
    }

    return res.status(200).json({
      application,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

// admin can see applicants
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" }
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};

// accept / reject
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
        success: false
      });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
  }
};
