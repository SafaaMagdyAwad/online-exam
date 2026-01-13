import Teacher from "../models/TeacherModel.js";

/**
 * @desc    Update teacher's paid status
 * @route   PATCH /api/admin/teacher/:id/paid
 * @access  Admin
 */
export const updateTeacherPaidStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paid } = req.body;
//console.log(paid,"paid from controller");

    // 1️⃣ Validate request
    if (typeof paid !== "boolean") {
      return res.status(400).json({ message: "Paid status must be true or false" });
    }

    // 2️⃣ Find teacher
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // 3️⃣ Update paid status
    teacher.paid = paid;
    await teacher.save();

    // 4️⃣ Response
    res.status(200).json({
      message: `Teacher's paid status updated to ${paid}`,
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        paid: teacher.paid
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
