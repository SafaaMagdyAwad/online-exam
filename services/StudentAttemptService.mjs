import StudentAttempt from "../models/StudentAttempt.js";

export const getFilteredResultsService = async (teacherId, filters) => {
  const query = { teacherId };

  if (filters.studentName) {
    query.studentName = { $regex: filters.studentName, $options: "i" };
  }

  if (filters.minScore || filters.maxScore) {
    query.score = {};
    if (filters.minScore) query.score.$gte = Number(filters.minScore);
    if (filters.maxScore) query.score.$lte = Number(filters.maxScore);
  }

  if (filters.from || filters.to) {
    query.startedAt = {};
    if (filters.from) query.startedAt.$gte = new Date(filters.from);
    if (filters.to) query.startedAt.$lte = new Date(filters.to);
  }

  const results = await StudentAttempt.find(query).sort({ startedAt: -1 });

  return results;
};
