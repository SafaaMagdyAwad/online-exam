import {
  createExamService,
  generateExamCodeService,
  getTeacherExamsService,
  getExamByIdService
} from "../services/ExamService.mjs";

/**
 * @desc Create new exam
 * @route POST /api/teacher/exams
 */
export const createExam = async (req, res) => {
  try {
    const exam = await createExamService(req.user.id, req.body);

    res.status(201).json({
      message: "Exam created successfully",
      exam
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Generate exam access code
 * @route POST /api/teacher/exams/:examId/code
 */
export const generateExamCode = async (req, res) => {
  try {
    const { examId } = req.params;

    const accessCode = await generateExamCodeService(
      req.user.id,
      examId
    );

    res.status(201).json({
      message: "Access code generated",
      code: accessCode.code
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExamById = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await getExamByIdService( examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json({ exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * @desc Get all exams for teacher
 * @route GET /api/teacher/exams
 */
export const getMyExams = async (req, res) => {
  try {
    const exams = await getTeacherExamsService(req.user.id);
    res.json({ exams });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExamById = async (req, res) => {
  try {
    const { examId } = req.params;
    const updateData = req.body;
    const exam = await getExamByIdService(req.user.id, examId);
   // console.log(exam , "exam from update ");
    
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    Object.assign(exam, updateData);
    //console.log("updated exam", exam);
    
    await exam.save();
    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const updateExamVById = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await getExamByIdService(req.user.id, examId);
    // console.log(exam , "exam from update ");
    
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    const updateData = !exam.active;
    //console.log("update Data", updateData);
    
    Object.assign(exam, {active: updateData});
    // console.log("updated exam", exam);
    
    await exam.save();
    res.json({ message: "Exam updated successfully", exam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await getExamByIdService(req.user.id, examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    await exam.deleteOne();
    res.json({ message: "Exam deleted successfully" , exam: exam});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};