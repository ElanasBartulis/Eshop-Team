import userHistoryModel from "../models/userHistoryModel.js";
import UserModel from "../models/userModel.js";

export async function getAllHistory(req, res) {
  const allHistory = await userHistoryModel.findAll();
  res.status(200).json(allHistory);
}

export async function getHistoryByUserId(req, res) {
  const { id } = req.params;
  if (!id || isNaN(id))
    return res.status(400).json({
      message: "User History ID was not provided or was in wrong format",
    });
  const findUserHistoryId = await UserModel.findByPk(id);
  if (!findUserHistoryId)
    return res.status(404).json({ message: "User not found" });
  res.status(200).json(findUserHistoryId);
}
