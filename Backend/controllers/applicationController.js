import Application from "../models/Application.js";

export const createApplication = async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications =
      await Application.find({
        user: req.user.id,
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getApplicationById =
  async (req, res) => {
    try {
      const application =
        await Application.findById(
          req.params.id
        );

      res.json(application);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateApplication =
  async (req, res) => {
    try {
      const application =
        await Application.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      res.json(application);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteApplication =
  async (req, res) => {
    try {
      await Application.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Application deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };