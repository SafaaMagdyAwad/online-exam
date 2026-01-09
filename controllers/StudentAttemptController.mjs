import { getFilteredResultsService } from "../services/StudentAttemptService.mjs";

export const getFilteredResults = async (req, res) => {
  try {
    const teacherId = req.user._id; // افترض أن المدرس مسجل دخول
    const filters = req.query;
    const results = await getFilteredResultsService(teacherId, filters);
    res.json(results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
