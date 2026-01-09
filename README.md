Online Exam Platform - README
📌 Project Overview

Online Exam Platform is a secure and flexible system for managing electronic exams.
It allows teachers to create exams, add students, and control who can take which exam. Students can enter exams using their name + code, complete the exam, and receive their grades automatically.

This project is built using:

Backend: Node.js + Express

Database: MongoDB

Authentication: JWT for teachers/admin

Frontend: React (planned)

📝 Key Features
1. Teacher Features

Create exams and define duration, questions, and total marks.

Add a list of students for a specific exam.

Generate unique student codes for exam access.

Print or export the list of students + codes.

View and filter student performance reports (by name, grade, or date).

Control exam access: only authorized students can enter.

2. Student Features

Students enter exams using their name + unique code.

Can only attempt each exam once.

Resume attempts after refresh: the remaining time is calculated automatically.

Automatic grade calculation after submitting the exam.

3. Admin Features

Admin can manage teachers and exams.

Admin authentication to access protected endpoints.

🏗️ Project Structure
/models        # Mongoose models: Teacher, Student, Exam, ExamAccess, StudentAttempt
/controllers   # Express controllers for teacher, student, admin
/services      # Business logic (ExamService, StudentService, TeacherService)
/routes        # Express routes
/middleware    # Authentication and authorization middleware
/scripts       # Scripts for creating initial admin, etc.

🔑 Student Exam Flow

Teacher adds students to an exam and generates their codes.

Students enter the exam using name + code.

System verifies the student is authorized for the exam.

Student starts the exam: attempt is created, start time recorded.

Student submits answers: score is calculated automatically.

Teacher can view reports and filter results.

⚡ Important Notes / TODO

Tomorrow: The enterExam function will be updated to only require the student name.

The student code will no longer be needed in the startExamAttempt function, simplifying login.

This change will make it easier for students to access exams while keeping the teacher in control of authorization.

🛠️ How to Run the Project

Clone the repository:

git clone <repo_url>
cd online-exam


Install dependencies:

npm install


Set up .env with:

PORT=3000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_secret_key>


Start the server:

nodemon server.js


Use Postman or frontend React app to test API endpoints:

Teacher routes: /api/teacher/...

Student routes: /api/student/...

Admin routes: /api/admin/...

📦 Dependencies

express

mongoose

dotenv

jsonwebtoken

bcryptjs

nodemon (dev dependency)

✅ Security & Features

JWT-based authentication for teachers and admins.

Validation on all input fields.

Prevent multiple attempts per student per exam.

Automatic calculation of remaining exam time on refresh.

Full reports exportable and printable for teachers.