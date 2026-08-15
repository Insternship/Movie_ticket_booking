import * as showService from "../services/showService.js";

export const createShow = async (req, res) => {
  const show = await showService.createShow(req.body);

  res.status(201).json({
    success: true,
    data: show
  });
};

export const getShows = async (req, res) => {
  const shows = await showService.getShows();

  res.json({
    success: true,
    data: shows
  });
};

export const getShow = async (req, res) => {
  const show = await showService.getShowById(req.params.id);

  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found"
    });
  }

  res.json({
    success: true,
    data: show
  });
};

export const updateShow = async (req, res) => {
  const show = await showService.updateShow(req.params.id, req.body);

  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found"
    });
  }

  res.json({
    success: true,
    data: show
  });
};

export const deleteShow = async (req, res) => {
  const show = await showService.deleteShow(req.params.id);

  if (!show) {
    return res.status(404).json({
      success: false,
      message: "Show not found"
    });
  }

  res.json({
    success: true,
    message: "Show deleted successfully"
  });
};