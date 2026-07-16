import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminDashboard from "./Pages/Admin/Dashboard";
import LoginRegister from "./Pages/Auth/LoginRegister";
import CourseDetails from "./Pages/Admin/CourseDetails";
import TeacherDashboard from "./Pages/Teacher/Dashboard";
import TeacherCourseDetails from "./Pages/Teacher/CourseDetails";
import LumoraChat from "./Components/LumoraChat";
import StudentDashboard from "./Pages/Student/Dashboard";
import AssessmentDetail from "./Pages/Student/AssessmentDetail";
import TakeAssessment from "./Pages/Student/TakeAssessment";

function AppLayout() {
  const location = useLocation();
  return (
    <>
      {!/^\/(login|student\/(assessment|take-assessment|ai-tutor))/.test(location.pathname) && <LumoraChat />}
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/course/:id" element={<CourseDetails />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/course/:id" element={<TeacherCourseDetails />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentDashboard />} />
        <Route path="/student/course/:id" element={<StudentDashboard />} />
        <Route path="/student/assessment/:courseId/:lectureIdx/:lessonIdx" element={<AssessmentDetail />} />
        <Route path="/student/take-assessment/:courseId/:lectureIdx/:lessonIdx" element={<TakeAssessment />} />
        <Route path="/student/ai-tutor" element={<StudentDashboard />} />
        <Route path="/student/progress" element={<StudentDashboard />} />
        <Route path="/student/meetings" element={<StudentDashboard />} />
        <Route path="/student/notifications" element={<StudentDashboard />} />
        <Route path="/student/profile-settings" element={<StudentDashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
