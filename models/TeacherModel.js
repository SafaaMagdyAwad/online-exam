import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // مهم للأمان
    },
    role: {
      type: String,
      enum: ["teacher", "admin"],
      default: "teacher"
    },
    paid: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
    },
    logo: {
      type: String,
    },
    jopTitle:{
      type:String,
      required:true
    },
    // ✅ REQUIRED FOR RESET PASSWORD
      resetPasswordToken: {
        type: String
      },
      resetPasswordExpire: {
        type: Date
      }
  },
  { timestamps: true }
);
// Hash password before saving (async hook, no next)
TeacherSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// ✅ Add comparePassword method
TeacherSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
export default mongoose.model("Teacher", TeacherSchema);
