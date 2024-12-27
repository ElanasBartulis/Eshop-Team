import userHistoryModel from "../models/userHistoryModel.js";

export async function getAllHistory(req, res) {
  const allHistory = await userHistoryModel.findAll();
  res.status(200).json(allHistory);
}
