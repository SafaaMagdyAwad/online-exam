
# Online Exam System (نظام الامتحانات الإلكتروني)

## Overview (نظرة عامة)
صفحه ويب باللغه العربيه
هذا المشروع عبارة عن **نظام امتحانات إلكتروني** يسمح للمدرسين بإنشاء امتحانات وإدارة طلابهم، بينما يمكن للطلاب دخول الامتحانات باستخدام **كود دخول** يتم إنشاؤه بواسطة المدرس.  
الطلاب لا يحتاجون لإنشاء حسابات، وكل البيانات الأساسية تُسجّل عند دخول الامتحان فقط.

---

## Features (الميزات)

### للمدرس
- تسجيل حساب دائم مع دفع لأول مرة   done
- إنشاء امتحانات (Exam) متعددة  done
- إضافة أسئلة وإجابات لكل امتحان  done
- توليد **كود دخول** لكل امتحان أو مجموعة طلاب    done
- مشاهدة تقارير أداء الطلاب   [TODO : the code is not yet tried]
- تصفية نتائج الطلاب حسب الاسم أو الدرجة أو التاريخ
- السيطرة الكاملة على من يدخل امتحاناته (الطلاب المعتمدين فقط)

### للطالب
- الدخول باستخدام **اسمه + كود الامتحان**
- لا يحتاج لحساب
- دخول امتحان مرة واحدة فقط
- الحصول على الدرجة بعد انتهاء الامتحان

## admin (safaa)
- adminlogin
- can modify teacher status to paid    done
---

## System Architecture (معمارية النظام)

### Schemas

#### 1. Teacher
- يمثل المدرس
- Schema:
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "password": String (hashed),
  "paid": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}

2. Exam

يمثل الامتحان نفسه

Schema:

{
  "_id": ObjectId,
  "title": String,
  "teacherId": ObjectId,
  "duration": Number (minutes),
  "totalMarks": Number,
  "active": Boolean,
  "questions": [
    { "question": String, "options": [String], "correctAnswer": Number }
  ],
  "createdAt": Date,
  "updatedAt": Date
}

3. ExamAccessCode

كود الدخول الذي يعطيه المدرس للطلاب

Schema:

{
  "_id": ObjectId,
  "code": String,
  "examId": ObjectId,
  "teacherId": ObjectId,
  "active": Boolean,
  "expiresAt": Date,
  "createdAt": Date,
  "updatedAt": Date
}

4. StudentAttempt

يمثل محاولة الطالب للامتحان

Schema:

{
  "_id": ObjectId,
  "studentName": String,
  "examId": ObjectId,
  "teacherId": ObjectId,
  "code": String,
  "answers": [
    { "questionIndex": Number, "answer": Number }
  ],
  "score": Number,
  "startedAt": Date,
  "finishedAt": Date,
  "createdAt": Date,
  "updatedAt": Date
}

Flow (سير النظام)
Teacher Flow

تسجيل حساب جديد + دفع لأول مرة

إنشاء امتحان

إضافة أسئلة وإجابات

إنشاء كود دخول للطلاب

مشاركة الكود مع الطلاب

بعد انتهاء الامتحانات، مشاهدة تقارير الأداء

Student Flow

يدخل الاسم + كود الامتحان

يبدأ الامتحان

يظهر له Timer حسب مدة الامتحان

يجيب على الأسئلة

عند الانتهاء، تظهر له الدرجة مباشرة

لا يمكنه إعادة الدخول بنفس الكود

APIs (واجهة برمجة التطبيقات)
Teacher

POST /api/auth/register → تسجيل المدرس

POST /api/auth/login → تسجيل الدخول للمدرس

POST /api/teacher/exams → إنشاء امتحان

POST /api/teacher/exams/:examId/code → إنشاء كود دخول

GET /api/teacher/reports/:examId → مشاهدة أداء الطلاب

Student

POST /api/student/login → دخول الطالب باستخدام الكود

GET /api/student/exam/:code → جلب بيانات الامتحان

POST /api/student/exam/:code/submit → إرسال إجابات الطالب

Security (الأمان)

كلمات السر مشفرة باستخدام bcrypt

JWT لتوثيق المدرس (Teacher Auth)

كود الامتحان يمنع الدخول المتكرر

الطالب لا يحتاج لحساب دائم → حماية البيانات الشخصية

المدرسين معزولين عن بعض

كل امتحان مرتبط بالمدرس فقط

Technologies Used (التقنيات المستخدمة)

Node.js

Express.js

MongoDB + Mongoose

bcryptjs (لتشفير الباسورد)

JSON Web Token (JWT)

Postman / REST API لاختبار الخدمات

Project Structure (هيكل المشروع)
/controllers
    AuthController.js
    ExamController.js
    StudentController.js
/models
    Teacher.js
    Exam.js
    ExamAccess.js
    StudentAttempt.js
/routes
    authRoutes.js
    teacherRoutes.js
    studentRoutes.js
/app.js
/server.js
/.env

Environment Variables (.env)
PORT=5000
MONGO_URI=mongodb://localhost:27017/online-exam
JWT_SECRET=super_secret_key_123

How to Run (طريقة التشغيل)
git clone <repo-url>
cd online-exam-system
npm install
npm run dev


يستخدم nodemon للتطوير

الخادم يعمل على http://localhost:5000

Notes (ملاحظات هامة)

كل الطلاب مرتبطون بالمدرسين عن طريق كود دخول

الطلاب لا يسجلون بياناتهم بشكل دائم

الكود يمكن للمدرس التحكم فيه (تفعيل/تعطيل، انتهاء صلاحية)

يمنع الطالب من الدخول أكثر من مرة

التقارير يمكن تصفيتها حسب الاسم، الدرجة، التاريخ

Future Improvements (تحسينات مستقبلية)

إضافة Timer Backend مع WebSocket

إمكانية طباعة التقرير بصيغة PDF

إرسال إشعارات للطلاب عند إنشاء امتحان

دعم أسئلة متعددة الأنواع (اختيار من متعدد، صح/خطأ، مقالي)



##  حماية إضافية (اختيارية لكنها قوية)
✅ 1. Lock Device
deviceId: String


وتقارنها في كل Request

✅ 2. IP Tracking

لو IP اتغير → Warning / Lock

✅ 3. Prevent Multiple Tabs

نفس attemptId

نفس الوقت