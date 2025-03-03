import Job from "../model/job.model.js";

export const createJob = async (req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.create(data);
    await newJob.save();

    res.status(201).json({
      status: "success",
      data: {
        job: newJob,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const updateJob = async(req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.updateOne(data);
    await newJob.save();


    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const deleteJob = async(req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.deleteOne(data);
    await newJob.save();


    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const getJob = async(req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.get(data);
    await newJob.save();


    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const data = req.body;
    const newJob = await Job.getAllJobs(data);
    await newJob.save();   


    res.status(201).json({
      status: "success",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error,
    });
  }
};
