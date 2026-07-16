import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AdminCourses from './Courses';
import AdminWorkspace from './Workspace';
import AdminSettings from './Settings';
import AdminLiveMeeting from './LiveMeeting';
import AdminQuestionBank from './QuestionBank';
import AdminNotification from './Notification';
import AdminProfileSettings from './ProfileSettings';
import {
   LayoutDashboard, BookOpen, Users, CreditCard, ShieldAlert,
   Bell, Search, TrendingUp, TrendingDown,
   UserCheck, XCircle, CheckCircle, Clock, Calendar,
   BarChart3, Activity, Eye, Ban, Trash2,
   Download, Filter, MoreHorizontal, Phone, MapPin,
   FileImage, Check, X, Zap, GraduationCap, School,
   Layers, MessageSquare, Settings, LogOut, Menu,
   Wallet, Building2, Image as ImageIcon, AlertTriangle,
   Smartphone, MessageCircle, UserPlus, ClipboardCheck,
   FileText, Award, DollarSign, Package,
   Shield, Users2, IdCard, Send, ChartBar,
   PiggyBank, Medal, Sparkles, Fingerprint,
   HandCoins, Replace, NotebookText, ChevronRight,
   History, Globe, Lock, UserCog, PanelLeftClose, PanelLeftOpen,
   Star, Video, ClipboardList, Target, ArrowUp, ArrowDown,
   BookMarked, ListChecks, GanttChart, Megaphone, ExternalLink,
   Printer, FileSpreadsheet, RefreshCw, FilterX,
   Gem, Trophy, TrendingUp as TrendingUpIcon,
    Minus, PauseCircle, ArrowRight, ChevronDown, Plus, Edit
} from 'lucide-react';

// ─── Tab Configuration ──────────────────────────────────────────────
const TABS = [
   { id: 'overview-analytics', label: 'Dashboard', icon: LayoutDashboard },
   { id: 'student-analytics', label: 'Students', icon: Users },
   { id: 'finance', label: 'Finance', icon: Wallet },
   { id: 'attendance-tracker', label: 'Attendance', icon: ClipboardCheck },
   { id: 'teacher-workspace', label: 'Teachers', icon: GraduationCap },
   { id: 'course-analytics', label: 'Courses', icon: BookOpen },
   { id: 'exams-grades', label: 'Exams', icon: FileText },
   { id: 'assignments', label: 'Assignments', icon: NotebookText },
   { id: 'live-meetings', label: 'Meetings', icon: Video },

];

// ─── Mock Data ──────────────────────────────────────────────────────
const D = {
   biz: {
      enrolledToday: 853, todayRevenue: 14250, pendingPayments: 96800,
      present: 412, absent: 58,
      aiSummary: `Week-over-week enrollment grew 7.3% driven by Chemistry 2nd Sec referrals. Branch C (Mansoura) shows a 12% drop-off in Lecture 3 attendance. Payment verification backlog sits at 42 tickets, avg clearance 18 min (target: <10 min). Vodafone Cash dominates at 61% share. Recommended: deploy assistant to Mansoura for 3 days to clear physical cash reconciliation.`,
      classesNow: [
         { time: '09:00–10:30', course: 'Physics 3rd Sec', teacher: 'Dr. Mohamed', students: 48, room: 'Room A', type: 'Lecture' },
         { time: '09:00–10:00', course: 'Chemistry 2nd Sec', teacher: 'Ms. Fatima', students: 36, room: 'Room B', type: 'Lab' },
         { time: '10:30–12:00', course: 'Math 1st Sec', teacher: 'Mr. Khaled', students: 52, room: 'Online', type: 'Online' },
         { time: '10:00–11:30', course: 'Biology 3rd Sec', teacher: 'Dr. Nour', students: 31, room: 'Room C', type: 'Lecture' },
      ],
      teachers: [
         { name: 'Dr. Mohamed', course: 'Physics 3rd Sec', status: 'Live', students: 48 },
         { name: 'Ms. Fatima', course: 'Chemistry 2nd Sec', status: 'Live', students: 36 },
         { name: 'Mr. Khaled', course: 'Math 1st Sec', status: 'Live', students: 52 },
         { name: 'Dr. Nour', course: 'Biology 3rd Sec', status: 'Live', students: 31 },
         { name: 'Ms. Aya', course: 'English 1st Sec', status: 'Offline', students: 24 },
         { name: 'Mr. Hassan', course: 'History 2nd Sec', status: 'Offline', students: 19 },
      ],
   },
   payments: {
      cashInHand: 124500, p2pWallets: 98700, instapay: 76300,
      tickets: [
         { id: 1, student: 'Mohamed Ali', phone: '01011223344', course: 'Physics 3rd Sec', amount: 3500, method: 'Vodafone Cash', ref: '01011223344', hasReceipt: true, status: 'pending' },
         { id: 2, student: 'Fatima Zahra', phone: '01155667788', course: 'Chemistry 2nd Sec', amount: 2500, method: 'InstaPay', ref: 'fatima.z@qnb', hasReceipt: true, status: 'pending' },
         { id: 3, student: 'Youssef Samir', phone: '01299887766', course: 'Math 1st Sec', amount: 1800, method: 'Physical Cash', ref: '—', hasReceipt: true, status: 'approved' },
         { id: 4, student: 'Aya Mohamed', phone: '01033445566', course: 'Biology 3rd Sec', amount: 4200, method: 'Orange Cash', ref: '01033445566', hasReceipt: false, status: 'pending' },
         { id: 5, student: 'Kareem Adel', phone: '01177889900', course: 'Physics 3rd Sec', amount: 3000, method: 'InstaPay', ref: 'kareem.a@alexbank', hasReceipt: true, status: 'approved' },
         { id: 6, student: 'Nadia Hassan', phone: '01555667788', course: 'Chemistry 2nd Sec', amount: 2000, method: 'Etisalat Cash', ref: '01555667788', hasReceipt: true, status: 'pending' },
         { id: 7, student: 'Hossam Ibrahim', phone: '01099887766', course: 'Math 1st Sec', amount: 2800, method: 'Physical Cash', ref: '—', hasReceipt: false, status: 'rejected' },
         { id: 8, student: 'Laila Mahmoud', phone: '01222334455', course: 'Biology 3rd Sec', amount: 3500, method: 'Vodafone Cash', ref: '01222334455', hasReceipt: true, status: 'pending' },
      ],
      balance: { student: 'Mohamed Ali', totalFee: 3500, paid: 2000, remaining: 1500, dueDate: '25 July 2026' },
   },
   students: { total: 12543, active: 11280, inactive: 1263, newThisWeek: 147, male: 6840, female: 5703 },
   attendance: { present: 412, absent: 58, weekAvg: 87.6, unexcused: 22, lateToday: 24 },
   teachers: { total: 24, active: 19, liveNow: 4, avgRating: 4.7 },
   courses: { total: 24, active: 19, fullyBooked: 3, avgCapacity: 82, finished: 2 },
   exams: { upcoming: 4, grading: 142, draftBanks: 8, avgScore: 71.4, completed: 6, highest: 98, lowest: 34, passRate: 76 },
   finances: { grossRev: 310800, expenses: 124200, netProfit: 186600, retention: 87.3, dropout: 4.2, today: 14250, week: 98400, month: 310800, year: 2840000, pendingApprovals: 42, approved: 8, rejected: 3 },
   payroll: { staff: 38, pendingSalaries: 3, monthlyBurn: 84500, nextPay: '28 July' },
   comms: [
      { id: 1, student: 'Ali Hassan', parentPhone: '01012345678', parentName: 'Mr. Hassan', course: 'Physics 3rd Sec', issue: 'Missed 3 consecutive lectures' },
      { id: 2, student: 'Mariam Youssef', parentPhone: '01123456789', parentName: 'Mrs. Youssef', course: 'Chemistry 2nd Sec', issue: 'Failed weekly quiz (43%)' },
      { id: 3, student: 'Khaled Mahmoud', parentPhone: '01234567890', parentName: 'Mr. Mahmoud', course: 'Math 1st Sec', issue: 'No attendance for 5 days' },
      { id: 4, student: 'Rana Abdel-Fattah', parentPhone: '01098765432', parentName: 'Dr. Abdel-Fattah', course: 'Biology 3rd Sec', issue: 'Assignment not submitted (3 weeks)' },
   ],
   piracy: [
      { id: 1, name: 'Ahmed Hassan', phone: '01023456789', ts: '2024-07-11 14:32', location: 'Cairo', ip: '197.32.45.12', status: 'active', device: 'iPhone 14 Pro' },
      { id: 2, name: 'Sara Mahmoud', phone: '01187654321', ts: '2024-07-11 14:28', location: 'Giza', ip: '156.204.89.33', status: 'flagged', device: 'Samsung S23' },
      { id: 3, name: 'Omar Khaled', phone: '01234567890', ts: '2024-07-11 14:15', location: 'Alexandria', ip: '41.65.112.7', status: 'active', device: 'MacBook Pro' },
      { id: 4, name: 'Nour El-Din', phone: '01098765432', ts: '2024-07-11 13:58', location: 'Mansoura', ip: '197.168.4.55', status: 'banned', device: 'iPad Air' },
      { id: 5, name: 'Laila Ibrahim', phone: '01122334455', ts: '2024-07-11 13:45', location: 'Tanta', ip: '156.212.78.91', status: 'flagged', device: 'Windows PC' },
   ],
   notifications: [
      { id: 1, title: 'New enrollment: Physics 3rd Sec', time: '2 min ago', type: 'success', icon: UserCheck },
      { id: 2, title: 'Payment failed: Vodafone Cash #8821', time: '15 min ago', type: 'warning', icon: XCircle },
      { id: 3, title: 'AI Grading complete: 42 submissions', time: '1 hr ago', type: 'info', icon: CheckCircle },
      { id: 4, title: 'Security alert: IP collision detected', time: '2 hrs ago', type: 'danger', icon: ShieldAlert },
      { id: 5, title: 'New student registration: 12 today', time: '3 hrs ago', type: 'success', icon: UserPlus },
      { id: 6, title: 'Assignment deadline approaching: Physics HW', time: '5 hrs ago', type: 'warning', icon: Clock },
      { id: 7, title: 'Upcoming live meeting: Physics Review', time: '8 hrs ago', type: 'info', icon: Video },
      { id: 8, title: 'Payment approved: Mohamed Ali (3,500 EGP)', time: '10 hrs ago', type: 'success', icon: CheckCircle },
   ],
   calendar: [
      { time: '09:00 AM', title: 'Physics: 3rd Secondary — Live Lecture', type: 'lecture', color: 'bg-[#0071E3]/20 text-[#0071E3]' },
      { time: '11:30 AM', title: 'Chemistry: 2nd Secondary — Quiz Review', type: 'quiz', color: 'bg-[#34C759]/20 text-[#34C759]' },
      { time: '02:00 PM', title: 'Math: 1st Secondary — Problem Solving', type: 'lecture', color: 'bg-[#0071E3]/20 text-[#0071E3]' },
      { time: '04:30 PM', title: 'Biology: 3rd Secondary — Lab Session', type: 'lab', color: 'bg-amber-100 text-amber-700' },
   ],

   // ─── Overall Analytics Data ─────────────────────────────────────
   studentGrowth: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      daily: [12, 18, 15, 22, 20],
      weekly: [85, 92, 78, 110, 95],
      monthly: [320, 380, 450, 420, 390, 510],
   },
   revenueGrowth: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      daily: [12500, 14800, 11200, 16500, 14250],
      weekly: [84500, 92000, 78000, 102000, 98400],
      monthly: [285000, 310800, 298000, 342000],
   },
   courseEnrollments: [
      { course: 'Physics 3rd Sec', enrolled: 124 },
      { course: 'Chemistry 2nd Sec', enrolled: 98 },
      { course: 'Math 1st Sec', enrolled: 112 },
      { course: 'Biology 3rd Sec', enrolled: 87 },
      { course: 'English 1st Sec', enrolled: 76 },
      { course: 'History 2nd Sec', enrolled: 53 },
      { course: 'Science 1st Sec', enrolled: 91 },
      { course: 'Arabic 2nd Sec', enrolled: 64 },
   ],
   revenueByCourse: [
      { course: 'Physics 3rd Sec', revenue: 434000 },
      { course: 'Biology 3rd Sec', revenue: 365400 },
      { course: 'Math 1st Sec', revenue: 224000 },
      { course: 'Chemistry 2nd Sec', revenue: 245000 },
      { course: 'English 1st Sec', revenue: 106400 },
      { course: 'Science 1st Sec', revenue: 163800 },
      { course: 'History 2nd Sec', revenue: 84800 },
      { course: 'Arabic 2nd Sec', revenue: 96000 },
   ],
   studentActivity: [
      { label: 'Logged In', value: 843 },
      { label: 'Watched Lessons', value: 612 },
      { label: 'Submitted Quizzes', value: 234 },
      { label: 'Submitted Assignments', value: 187 },
   ],

   // ─── Leaderboards ────────────────────────────────────────────────
   leaderboards: {
      topCourses: [
         { name: 'Physics 3rd Sec', enrolled: 124, completion: 78, revenue: 434000 },
         { name: 'Math 1st Sec', enrolled: 112, completion: 72, revenue: 224000 },
         { name: 'Chemistry 2nd Sec', enrolled: 98, completion: 81, revenue: 245000 },
         { name: 'Science 1st Sec', enrolled: 91, completion: 85, revenue: 163800 },
         { name: 'Biology 3rd Sec', enrolled: 87, completion: 68, revenue: 365400 },
      ],
      topTeachers: [
         { name: 'Dr. Mohamed', attendance: 92, completion: 78, avgGrade: 87 },
         { name: 'Mr. Khaled', attendance: 88, completion: 72, avgGrade: 85 },
         { name: 'Ms. Fatima', attendance: 85, completion: 81, avgGrade: 82 },
         { name: 'Ms. Mona', attendance: 90, completion: 85, avgGrade: 88 },
         { name: 'Dr. Nour', attendance: 82, completion: 68, avgGrade: 79 },
      ],
      topStudents: [
         { name: 'Youssef Samir', grade: 95, attendance: 92, completion: 90, courses: 2 },
         { name: 'Nadia Hassan', grade: 93, attendance: 95, completion: 94, courses: 1 },
         { name: 'Fatima Zahra', grade: 91, attendance: 88, completion: 88, courses: 2 },
         { name: 'Laila Mahmoud', grade: 85, attendance: 88, completion: 82, courses: 2 },
         { name: 'Kareem Adel', grade: 82, attendance: 78, completion: 75, courses: 1 },
      ],
      lowestCourses: [
         { name: 'History 2nd Sec', attendance: 65, completion: 52, avgGrade: 68 },
         { name: 'Biology 3rd Sec', attendance: 68, completion: 55, avgGrade: 71 },
         { name: 'Arabic 2nd Sec', attendance: 72, completion: 60, avgGrade: 70 },
         { name: 'English 1st Sec', attendance: 75, completion: 65, avgGrade: 74 },
         { name: 'Chemistry 2nd Sec', attendance: 78, completion: 70, avgGrade: 76 },
      ],
   },

   // ─── Alerts ──────────────────────────────────────────────────────
   alerts: [
      { id: 1, type: 'payment', title: 'Pending Payment Approvals', count: 42, desc: '42 receipts waiting for verification', severity: 'high', icon: Wallet },
      { id: 2, type: 'attendance', title: 'Students Inactive 7+ Days', count: 28, desc: 'Haven\'t logged in or attended any session', severity: 'high', icon: Clock },
      { id: 3, type: 'course', title: 'Low Attendance Courses', count: 3, desc: 'History 2nd Sec (65%), Biology 3rd Sec (68%), Arabic (72%)', severity: 'medium', icon: AlertTriangle },
      { id: 4, type: 'meeting', title: 'Upcoming Live Meetings', count: 2, desc: 'Physics Review (Today 4pm), Chemistry Lab (Tomorrow 10am)', severity: 'low', icon: Video },
      { id: 5, type: 'exam', title: 'Upcoming Exams', count: 4, desc: 'Physics Midterm (20 Jul), Chemistry Quiz (22 Jul)', severity: 'low', icon: FileText },
      { id: 6, type: 'attendance', title: 'Attendance Not Submitted', count: 2, desc: 'Ms. Aya, Mr. Hassan haven\'t submitted today\'s attendance', severity: 'medium', icon: ClipboardCheck },
   ],

   // ─── Assignment Data ─────────────────────────────────────────────
   assignments: {
      total: 24,
      submitted: 156,
      late: 23,
      missing: 34,
      avgGrade: 76,
      list: [
         { id: 'AS1', name: 'Physics HW 1', course: 'Physics 3rd Sec', teacher: 'Dr. Mohamed', assigned: '5 Jul', due: '12 Jul', submitted: 112, total: 124, lateCount: 8, missingCount: 12, avgScore: 78 },
         { id: 'AS2', name: 'Chemistry Lab Report', course: 'Chemistry 2nd Sec', teacher: 'Ms. Fatima', assigned: '6 Jul', due: '13 Jul', submitted: 85, total: 98, lateCount: 6, missingCount: 13, avgScore: 82 },
         { id: 'AS3', name: 'Math Problem Set 3', course: 'Math 1st Sec', teacher: 'Mr. Khaled', assigned: '7 Jul', due: '14 Jul', submitted: 96, total: 112, lateCount: 12, missingCount: 16, avgScore: 71 },
         { id: 'AS4', name: 'Biology Lab 2', course: 'Biology 3rd Sec', teacher: 'Dr. Nour', assigned: '8 Jul', due: '15 Jul', submitted: 68, total: 87, lateCount: 5, missingCount: 19, avgScore: 74 },
         { id: 'AS5', name: 'English Essay 2', course: 'English 1st Sec', teacher: 'Ms. Aya', assigned: '4 Jul', due: '11 Jul', submitted: 62, total: 76, lateCount: 4, missingCount: 14, avgScore: 80 },
         { id: 'AS6', name: 'Science Project', course: 'Science 1st Sec', teacher: 'Ms. Mona', assigned: '1 Jul', due: '18 Jul', submitted: 45, total: 91, lateCount: 3, missingCount: 46, avgScore: 85 },
         { id: 'AS7', name: 'History Worksheet', course: 'History 2nd Sec', teacher: 'Mr. Hassan', assigned: '9 Jul', due: '16 Jul', submitted: 38, total: 53, lateCount: 7, missingCount: 15, avgScore: 68 },
         { id: 'AS8', name: 'Arabic Grammar Quiz', course: 'Arabic 2nd Sec', teacher: 'Mr. Tamer', assigned: '3 Jul', due: '10 Jul', submitted: 52, total: 64, lateCount: 5, missingCount: 12, avgScore: 72 },
      ],
      submissionTrend: [
         { label: 'Week 1', submitted: 142, late: 18 },
         { label: 'Week 2', submitted: 156, late: 23 },
         { label: 'Week 3', submitted: 138, late: 15 },
         { label: 'Week 4', submitted: 165, late: 28 },
      ],
   },

   // ─── Meeting Data ────────────────────────────────────────────────
   meetings: {
      total: 18,
      upcoming: 4,
      completed: 12,
      cancelled: 2,
      list: [
         { id: 'M1', title: 'Physics Midterm Review', course: 'Physics 3rd Sec', teacher: 'Dr. Mohamed', date: '18 Jul 2026', time: '4:00 PM', duration: 90, attendees: 98, capacity: 124, status: 'upcoming' },
         { id: 'M2', title: 'Chemistry Lab Session', course: 'Chemistry 2nd Sec', teacher: 'Ms. Fatima', date: '19 Jul 2026', time: '10:00 AM', duration: 120, attendees: 82, capacity: 98, status: 'upcoming' },
         { id: 'M3', title: 'Math Problem Solving', course: 'Math 1st Sec', teacher: 'Mr. Khaled', date: '17 Jul 2026', time: '2:00 PM', duration: 60, attendees: 95, capacity: 112, status: 'completed' },
         { id: 'M4', title: 'Biology Lab Demo', course: 'Biology 3rd Sec', teacher: 'Dr. Nour', date: '16 Jul 2026', time: '11:00 AM', duration: 90, attendees: 72, capacity: 87, status: 'completed' },
         { id: 'M5', title: 'English Speaking Club', course: 'English 1st Sec', teacher: 'Ms. Aya', date: '20 Jul 2026', time: '3:00 PM', duration: 60, attendees: 0, capacity: 76, status: 'upcoming' },
         { id: 'M6', title: 'Science Q&A Session', course: 'Science 1st Sec', teacher: 'Ms. Mona', date: '15 Jul 2026', time: '1:00 PM', duration: 45, attendees: 78, capacity: 91, status: 'completed' },
         { id: 'M7', title: 'History Review', course: 'History 2nd Sec', teacher: 'Mr. Hassan', date: '14 Jul 2026', time: '12:00 PM', duration: 60, attendees: 41, capacity: 53, status: 'completed' },
         { id: 'M8', title: 'Arabic Reading Session', course: 'Arabic 2nd Sec', teacher: 'Mr. Tamer', date: '22 Jul 2026', time: '9:00 AM', duration: 45, attendees: 0, capacity: 64, status: 'upcoming' },
      ],
      meetingsPerMonth: [12, 14, 16, 18, 15, 20, 18, 22],
   },

   // ─── Attendance Analytics Data ──────────────────────────────────
   attendanceTrends: {
      daily: [88, 92, 85, 87, 90, 86, 89],
      weekly: [86.2, 87.8, 88.5, 87.0, 87.6],
      monthly: [85.2, 86.8, 87.4, 88.1, 87.6],
   },
   attendanceByCourse: [
      { course: 'Physics 3rd Sec', rate: 92 },
      { course: 'Math 1st Sec', rate: 88 },
      { course: 'Chemistry 2nd Sec', rate: 85 },
      { course: 'Science 1st Sec', rate: 90 },
      { course: 'English 1st Sec', rate: 75 },
      { course: 'Biology 3rd Sec', rate: 68 },
      { course: 'Arabic 2nd Sec', rate: 72 },
      { course: 'History 2nd Sec', rate: 65 },
   ],
   attendanceByTeacher: [
      { teacher: 'Dr. Mohamed', rate: 92 },
      { teacher: 'Ms. Mona', rate: 90 },
      { teacher: 'Mr. Khaled', rate: 88 },
      { teacher: 'Ms. Fatima', rate: 85 },
      { teacher: 'Ms. Aya', rate: 75 },
      { teacher: 'Mr. Tamer', rate: 72 },
      { teacher: 'Dr. Nour', rate: 68 },
      { teacher: 'Mr. Hassan', rate: 65 },
   ],
   mostAttended: [
      { name: 'Nadia Hassan', pct: 98, course: 'Science 1st Sec' },
      { name: 'Youssef Samir', pct: 96, course: 'Math 1st Sec' },
      { name: 'Mohamed Ali', pct: 94, course: 'Physics 3rd Sec' },
      { name: 'Laila Mahmoud', pct: 92, course: 'Math 1st Sec' },
      { name: 'Fatima Zahra', pct: 90, course: 'Chemistry 2nd Sec' },
   ],
   frequentlyAbsent: [
      { name: 'Aya Mohamed', pct: 32, course: 'Biology 3rd Sec', absences: 12 },
      { name: 'Hossam Ibrahim', pct: 45, course: 'Physics 3rd Sec', absences: 9 },
      { name: 'Kareem Adel', pct: 52, course: 'English 1st Sec', absences: 8 },
      { name: 'Rana Youssef', pct: 55, course: 'History 2nd Sec', absences: 7 },
      { name: 'Omar Khaled', pct: 60, course: 'English 1st Sec', absences: 6 },
   ],
   attendanceHeatmap: Array.from({ length: 7 }, (_, day) =>
      Array.from({ length: 8 }, (_, hour) => ({
         day, hour, rate: Math.floor(Math.random() * 40) + 60
      }))
   ),

   // ─── Course Analytics Data ──────────────────────────────────────
   courseAnalytics: {
      perCourse: [
         { name: 'Physics 3rd Sec', enrolled: 124, completion: 78, avgQuiz: 72, avgExam: 68, avgAssignment: 78, attendance: 92, revenue: 434000, teacher: 'Dr. Mohamed', meetings: 6 },
         { name: 'Chemistry 2nd Sec', enrolled: 98, completion: 81, avgQuiz: 76, avgExam: 74, avgAssignment: 82, attendance: 85, revenue: 245000, teacher: 'Ms. Fatima', meetings: 4 },
         { name: 'Math 1st Sec', enrolled: 112, completion: 72, avgQuiz: 80, avgExam: 78, avgAssignment: 71, attendance: 88, revenue: 224000, teacher: 'Mr. Khaled', meetings: 5 },
         { name: 'Biology 3rd Sec', enrolled: 87, completion: 68, avgQuiz: 65, avgExam: 62, avgAssignment: 74, attendance: 68, revenue: 365400, teacher: 'Dr. Nour', meetings: 3 },
         { name: 'English 1st Sec', enrolled: 76, completion: 75, avgQuiz: 78, avgExam: 72, avgAssignment: 80, attendance: 75, revenue: 106400, teacher: 'Ms. Aya', meetings: 2 },
         { name: 'Science 1st Sec', enrolled: 91, completion: 85, avgQuiz: 82, avgExam: 80, avgAssignment: 85, attendance: 90, revenue: 163800, teacher: 'Ms. Mona', meetings: 4 },
         { name: 'History 2nd Sec', enrolled: 53, completion: 52, avgQuiz: 60, avgExam: 58, avgAssignment: 68, attendance: 65, revenue: 84800, teacher: 'Mr. Hassan', meetings: 2 },
         { name: 'Arabic 2nd Sec', enrolled: 64, completion: 60, avgQuiz: 68, avgExam: 65, avgAssignment: 72, attendance: 72, revenue: 96000, teacher: 'Mr. Tamer', meetings: 3 },
      ],
   },

   // ─── Exam Analytics Data ────────────────────────────────────────
   examAnalytics: [
      { name: 'Physics Midterm', avgScore: 68, median: 71, highest: 97, lowest: 22, passRate: 72, failRate: 28, attempts: 124, difficulty: 0.65 },
      { name: 'Chemistry Quiz 2', avgScore: 74, median: 76, highest: 100, lowest: 31, passRate: 78, failRate: 22, attempts: 98, difficulty: 0.58 },
      { name: 'Math Final', avgScore: 78, median: 80, highest: 98, lowest: 28, passRate: 82, failRate: 18, attempts: 112, difficulty: 0.62 },
      { name: 'Biology Lab Test', avgScore: 62, median: 65, highest: 94, lowest: 18, passRate: 65, failRate: 35, attempts: 87, difficulty: 0.72 },
      { name: 'English Midterm', avgScore: 81, median: 83, highest: 98, lowest: 45, passRate: 88, failRate: 12, attempts: 76, difficulty: 0.52 },
      { name: 'Science Midterm', avgScore: 80, median: 82, highest: 99, lowest: 38, passRate: 85, failRate: 15, attempts: 91, difficulty: 0.55 },
   ],

   // ─── Finance Data ────────────────────────────────────────────────
   financeBreakdown: {
      byCourse: [
         { name: 'Physics 3rd Sec', revenue: 434000, pct: 28 },
         { name: 'Biology 3rd Sec', revenue: 365400, pct: 24 },
         { name: 'Chemistry 2nd Sec', revenue: 245000, pct: 16 },
         { name: 'Math 1st Sec', revenue: 224000, pct: 15 },
         { name: 'Science 1st Sec', revenue: 163800, pct: 11 },
         { name: 'Other', revenue: 287200, pct: 6 },
      ],
      byTeacher: [
         { name: 'Dr. Mohamed', revenue: 434000 },
         { name: 'Dr. Nour', revenue: 365400 },
         { name: 'Ms. Fatima', revenue: 245000 },
         { name: 'Mr. Khaled', revenue: 224000 },
         { name: 'Ms. Mona', revenue: 163800 },
      ],
      byGrade: [
         { grade: 'Grade 12', revenue: 658000 },
         { grade: 'Grade 11', revenue: 565400 },
         { grade: 'Grade 10', revenue: 509000 },
         { grade: 'Grade 9', revenue: 387200 },
      ],
      monthly: [
         { month: 'Jan', revenue: 245000, expenses: 98000 },
         { month: 'Feb', revenue: 268000, expenses: 102000 },
         { month: 'Mar', revenue: 285000, expenses: 110000 },
         { month: 'Apr', revenue: 298000, expenses: 115000 },
         { month: 'May', revenue: 310800, expenses: 124200 },
         { month: 'Jun', revenue: 342000, expenses: 130000 },
      ],
   },
   expenses: {
      total: 124200,
      categories: [
         { name: 'Teacher Salaries', amount: 84500, pct: 68, icon: 'GraduationCap' },
         { name: 'Rent & Utilities', amount: 18500, pct: 15, icon: 'Building2' },
         { name: 'Educational Materials', amount: 9800, pct: 8, icon: 'BookOpen' },
         { name: 'Marketing & Ads', amount: 6400, pct: 5, icon: 'Megaphone' },
         { name: 'Admin & Operations', amount: 5000, pct: 4, icon: 'Settings' },
      ],
      monthly: [
         { month: 'Jan', salaries: 78000, rent: 17000, materials: 8500, marketing: 5500, admin: 4000 },
         { month: 'Feb', salaries: 80000, rent: 17000, materials: 9000, marketing: 5800, admin: 4200 },
         { month: 'Mar', salaries: 82000, rent: 18000, materials: 9200, marketing: 6000, admin: 4500 },
         { month: 'Apr', salaries: 83000, rent: 18000, materials: 9500, marketing: 6200, admin: 4500 },
         { month: 'May', salaries: 84500, rent: 18500, materials: 9800, marketing: 6400, admin: 5000 },
         { month: 'Jun', salaries: 86000, rent: 19000, materials: 10000, marketing: 6500, admin: 5200 },
      ],
   },
   expectedRevenue: {
      pendingApprovals: 42,
      pendingAmount: 125800,
      unpaidStudents: 156,
      unpaidAmount: 384000,
      overdueCount: 23,
      overdueAmount: 68700,
      totalExpected: 578500,
   },
   paymentTickets: [
      { id: 1, student: 'Mohamed Ali', phone: '01011223344', course: 'Physics 3rd Sec', amount: 3500, method: 'Vodafone Cash', ref: '01011223344', hasReceipt: true, status: 'pending', submitted: '12 Jul', notes: '' },
      { id: 2, student: 'Fatima Zahra', phone: '01155667788', course: 'Chemistry 2nd Sec', amount: 2500, method: 'InstaPay', ref: 'fatima.z@qnb', hasReceipt: true, status: 'pending', submitted: '12 Jul', notes: '' },
      { id: 3, student: 'Youssef Samir', phone: '01299887766', course: 'Math 1st Sec', amount: 1800, method: 'Physical Cash', ref: '—', hasReceipt: true, status: 'approved', submitted: '10 Jul', notes: 'Approved by Sarah', approvedBy: 'Sarah Ahmed', approvedDate: '11 Jul' },
      { id: 4, student: 'Aya Mohamed', phone: '01033445566', course: 'Biology 3rd Sec', amount: 4200, method: 'Orange Cash', ref: '01033445566', hasReceipt: false, status: 'pending', submitted: '13 Jul', notes: 'No receipt uploaded' },
      { id: 5, student: 'Kareem Adel', phone: '01177889900', course: 'Physics 3rd Sec', amount: 3000, method: 'InstaPay', ref: 'kareem.a@alexbank', hasReceipt: true, status: 'approved', submitted: '9 Jul', notes: 'Verified', approvedBy: 'Omar Khaled', approvedDate: '10 Jul' },
      { id: 6, student: 'Nadia Hassan', phone: '01555667788', course: 'Chemistry 2nd Sec', amount: 2000, method: 'Etisalat Cash', ref: '01555667788', hasReceipt: true, status: 'pending', submitted: '13 Jul', notes: '' },
      { id: 7, student: 'Hossam Ibrahim', phone: '01099887766', course: 'Math 1st Sec', amount: 2800, method: 'Physical Cash', ref: '—', hasReceipt: false, status: 'rejected', submitted: '8 Jul', notes: 'Receipt unclear', rejectedBy: 'Admin', rejectedDate: '9 Jul' },
      { id: 8, student: 'Laila Mahmoud', phone: '01222334455', course: 'Biology 3rd Sec', amount: 3500, method: 'Vodafone Cash', ref: '01222334455', hasReceipt: true, status: 'pending', submitted: '14 Jul', notes: '' },
      { id: 9, student: 'Omar Khaled', phone: '01133445566', course: 'English 1st Sec', amount: 1400, method: 'InstaPay', ref: 'omar.k@cib', hasReceipt: true, status: 'pending', submitted: '14 Jul', notes: '' },
      { id: 10, student: 'Rana Youssef', phone: '01055667788', course: 'History 2nd Sec', amount: 1600, method: 'Vodafone Cash', ref: '01055667788', hasReceipt: true, status: 'approved', submitted: '7 Jul', notes: 'Approved', approvedBy: 'Sarah Ahmed', approvedDate: '8 Jul' },
   ],
};

const waLink = (phone, student, issue) => {
   const clean = phone.replace(/^0/, '');
   return `https://wa.me/20${clean}?text=${encodeURIComponent(`Dear Parent, this is Lumora Academy. Your child ${student}: ${issue}. Please contact us.`)}`;
};

// ─── Mini Table Sub-component ──────────────────────────────────────
function MiniTable({ headers, rows, renderRow }) {
   return (
      <div className="overflow-x-auto">
         <table className="w-full">
            <thead><tr className="bg-[#F5F5F7]/80">
               {headers.map(h => <th key={h} className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">{h}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-slate-50">{rows.map((r, i) => renderRow(r, i))}</tbody>
         </table>
      </div>
   );
}

// ─── Stat Card ──────────────────────────────────────────────────────
function Card({ title, value, subtitle, icon: Icon, color = 'violet', trend, trendUp, children, onClick }) {
   const cm = { violet: 'bg-[#0071E3]/10 text-[#0071E3]', emerald: 'bg-[#34C759]/10 text-[#34C759]', amber: 'bg-[#FF9500]/10 text-amber-600', red: 'bg-red-50 text-red-600', blue: 'bg-blue-50 text-blue-600' };
   return (
      <div onClick={onClick} className={`bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-5 hover:shadow-sm ${onClick ? 'cursor-pointer' : ''}`}>
         <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-lg ${cm[color]}`}><Icon size={20} /></div>
            {trend && <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trendUp ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-red-50 text-red-600'}`}>{trendUp ? <TrendingUp size={13} /> : <TrendingDown size={13} />}{trend}</span>}
         </div>
         <h3 className="text-[#86868B] text-xs font-medium mb-0.5">{title}</h3>
         <p className="text-xl font-semibold text-[#1D1D1F]">{value}</p>
         {subtitle && <p className="text-[11px] text-[#86868B] mt-1">{subtitle}</p>}
         {children}
      </div>
   );
}

// ─── Module: Overview Analytics ─────────────────────────────────────
function OverviewAnalytics({ setTab }) {
   const [growthPeriod, setGrowthPeriod] = useState('weekly');
   const [revenuePeriod, setRevenuePeriod] = useState('weekly');
   const [courseFilter, setCourseFilter] = useState([]);
   const [dateFrom, setDateFrom] = useState('');
   const [dateTo, setDateTo] = useState('');
   const [showAlerts, setShowAlerts] = useState(true);
   const [showCourseDropdown, setShowCourseDropdown] = useState(false);
   const filterRef = useRef(null);

   useEffect(() => {
      const handler = (e) => { if (filterRef.current && !filterRef.current.contains(e.target)) setShowCourseDropdown(false); };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
   }, []);

   const KPI_CARDS = [
      { title: 'Total Students', value: D.students.total.toLocaleString(), subtitle: 'Total registered', icon: Users, color: 'violet' },
      { title: 'Total Teachers', value: D.teachers.total, subtitle: 'Active instructors', icon: GraduationCap, color: 'emerald' },
      { title: 'Active Courses', value: D.courses.active, subtitle: 'Accepting students', icon: BookOpen, color: 'blue' },
      { title: 'Pending Payments', value: D.finances.pendingApprovals, subtitle: 'Waiting approval', icon: Wallet, color: 'amber', onClick: () => setTab('finance') },
      { title: 'Live Meetings', value: D.meetings.total, subtitle: 'Scheduled/completed', icon: Video, color: 'red' },
      { title: 'Total Revenue', value: `${D.finances.grossRev.toLocaleString()} EGP`, subtitle: 'All approved payments', icon: DollarSign, color: 'emerald' },
      { title: 'Completion Rate', value: `${Math.round(D.leaderboards.topCourses.reduce((a, c) => a + c.completion, 0) / D.leaderboards.topCourses.length)}%`, subtitle: 'Avg course completion', icon: Target, color: 'violet' },
      { title: 'Avg Attendance', value: `${D.attendance.weekAvg}%`, subtitle: 'Today\'s attendance rate', icon: ClipboardCheck, color: 'blue' },
   ];

   const growthData = growthPeriod === 'daily' ? D.studentGrowth.daily : growthPeriod === 'weekly' ? D.studentGrowth.weekly : D.studentGrowth.monthly;
   const growthLabels = growthPeriod === 'daily' ? D.studentGrowth.labels : growthPeriod === 'weekly' ? ['W1', 'W2', 'W3', 'W4', 'W5'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
   const revenueData = revenuePeriod === 'daily' ? D.revenueGrowth.daily : revenuePeriod === 'weekly' ? D.revenueGrowth.weekly : D.revenueGrowth.monthly;
   const revenueLabels = revenuePeriod === 'daily' ? D.revenueGrowth.labels : revenuePeriod === 'weekly' ? ['W1', 'W2', 'W3', 'W4', 'W5'] : ['Jan', 'Feb', 'Mar', 'Apr'];

   const QuickActionsRow = () => (
      <div className="flex flex-wrap gap-2">
         {[
            { label: 'Add Student', icon: UserPlus, color: 'violet' },
            { label: 'Add Teacher', icon: GraduationCap, color: 'emerald' },
            { label: 'Create Course', icon: BookOpen, color: 'blue' },
            { label: 'Approve Payments', icon: CheckCircle, color: 'amber', onClick: () => setTab('finance') },
            { label: 'Create Exam', icon: FileText, color: 'red' },
          ].map((a, i) => {
             const cm = { violet: 'bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] hover:shadow-[#0071E3]/20', emerald: 'bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] hover:shadow-[#34C759]/30', blue: 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:shadow-blue-200', amber: 'bg-[#FF9500]/10 hover:bg-amber-100 text-amber-600 hover:shadow-amber-200', red: 'bg-red-50 hover:bg-red-100 text-red-600 hover:shadow-red-200' };
            return (
               <button key={i} onClick={a.onClick} className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 hover:shadow-sm ${cm[a.color]}`}><a.icon size={14} />{a.label}</button>
            );
         })}
      </div>
   );

   const BarChart = ({ data, labels, height = 80, maxValue }) => {
      const safeData = Array.isArray(data) && data.length > 0 ? data : [0];
      const max = maxValue || Math.max(...safeData);
      return (
         <div className="flex items-end gap-1.5" style={{ height: `${height}px` }}>
            {safeData.map((v, i) => {
               const pct = max > 0 ? (v / max) * 100 : 0;
               const isZero = v === 0;
               return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group" style={{ minHeight: 0 }}>
                     <span className="text-[10px] font-bold text-[#0071E3] opacity-0 group-hover:opacity-100">{typeof v === 'number' ? (v > 999 ? `${(v / 1000).toFixed(1)}K` : v) : v}</span>
                     <div className="w-full relative rounded-lg overflow-hidden" style={{ flex: '1 1 auto', minHeight: isZero ? '0px' : '4px' }}>
                        <div className="absolute bottom-0 left-0 right-0 rounded-lg" style={{ height: `${Math.max(pct, 4)}%`, background: `#6366f1` }}></div>
                        <div className="absolute inset-0 bg-[#E8E8ED] rounded-lg"></div>
                     </div>
                     <span className="text-[10px] text-[#86868B] font-medium truncate w-full text-center">{labels && labels[i] ? labels[i] : ''}</span>
                  </div>
               );
            })}
         </div>
      );
   };

   return (
      <>
         {/* ─── Global Filters ─── */}
         <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-5 mb-6">
            <div className="flex items-center gap-3 flex-wrap">
               <Filter size={18} className="text-[#86868B] shrink-0" />
               <span className="text-sm font-medium text-[#86868B] shrink-0">Filters</span>
               <div className="relative" ref={filterRef}>
                  <button onClick={() => setShowCourseDropdown(!showCourseDropdown)} className="flex items-center gap-2.5 bg-white border border-[#D2D2D7] hover:border-[#D2D2D7] rounded-xl px-4 py-2.5 text-sm font-medium text-[#86868B] transition-all hover:shadow-sm cursor-pointer">
                     <BookOpen size={16} className="text-[#86868B]" />
                     <span>{courseFilter.length === 0 ? 'All Courses' : `${courseFilter.length} selected`}</span>
                     <ChevronDown size={14} className={`text-[#86868B] transition-transform ${showCourseDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  {showCourseDropdown && (
                     <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl border border-[#E8E8ED] shadow-xl shadow-slate-200/50 overflow-hidden z-50 animate-fadeIn">
                        <div className="p-2 border-b border-slate-50">
                           <button onClick={() => { setCourseFilter([]); setShowCourseDropdown(false); }} className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-[#86868B] hover:bg-[#F5F5F7] transition-colors">All Courses</button>
                        </div>
                        <div className="max-h-56 overflow-y-auto p-1">
                           {D.courseEnrollments.map(c => {
                              const checked = courseFilter.includes(c.course);
                              return (
                                 <label key={c.course} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-[#0071E3]/10 transition-colors cursor-pointer">
                                    <input type="checkbox" checked={checked} onChange={() => setCourseFilter(prev => checked ? prev.filter(x => x !== c.course) : [...prev, c.course])} className="rounded accent-[#0071E3] w-4 h-4 cursor-pointer" />
                                    <span className="text-sm font-medium text-[#1D1D1F]">{c.course}</span>
                                 </label>
                              );
                           })}
                        </div>
                        {courseFilter.length > 0 && (
                           <div className="p-2 border-t border-slate-50 bg-[#F5F5F7]/50">
                              <button onClick={() => { setCourseFilter([]); setShowCourseDropdown(false); }} className="w-full text-center px-3 py-2 rounded-xl text-xs font-bold text-[#0071E3] hover:bg-white transition-colors">Clear Selection</button>
                           </div>
                        )}
                     </div>
                  )}
               </div>
               {courseFilter.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap">
                     {courseFilter.map(c => (
                        <span key={c} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0071E3]/10 text-[#0071E3] rounded-lg text-xs font-semibold">
                           {c}
                           <button onClick={() => setCourseFilter(prev => prev.filter(x => x !== c))} className="hover:bg-[#0071E3]/10 rounded-full p-0.5"><X size={12} /></button>
                        </span>
                     ))}
                  </div>
               )}
               <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="bg-white border border-[#D2D2D7] hover:border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 transition-all shadow-sm" />
               <span className="text-sm text-[#86868B]">—</span>
               <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="bg-white border border-[#D2D2D7] hover:border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 transition-all shadow-sm" />
               {(courseFilter.length > 0 || dateFrom || dateTo) && (
                  <button onClick={() => { setCourseFilter([]); setDateFrom(''); setDateTo(''); }} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#E8E8ED] hover:bg-[#D2D2D7] text-[#86868B] rounded-xl text-xs font-bold transition-all"><FilterX size={14} />Clear</button>
               )}
               <button onClick={() => setShowAlerts(!showAlerts)} className="ml-auto flex items-center gap-1.5 px-3 py-2 bg-[#FF9500]/10 hover:bg-amber-100 text-amber-600 rounded-xl text-[10px] font-bold transition-all"><Bell size={13} />{D.alerts.length} Alerts</button>
            </div>
         </div>

         {/* ─── 8 KPI Cards ─── */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {KPI_CARDS.map((k, i) => <Card key={i} {...k} />)}
         </div>

         {/* ─── Charts Row 1: Student Growth + Revenue Growth ─── */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
               <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-[#0071E3]/10 rounded-xl group- transition-all duration-300"><TrendingUp size={18} className="text-[#0071E3]" /></div>
                     <div><h3 className="text-sm font-bold text-[#1D1D1F]">Student Growth</h3><p className="text-[10px] text-[#86868B]">Registrations over time</p></div>
                  </div>
                  <div className="flex gap-1 bg-[#F5F5F7] p-0.5 rounded-lg">
                     {['daily', 'weekly', 'monthly'].map(p => (
                        <button key={p} onClick={() => setGrowthPeriod(p)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${growthPeriod === p ? 'bg-[#0071E3] text-white shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-white/50'}`}>{p[0].toUpperCase() + p.slice(1)}</button>
                     ))}
                  </div>
               </div>
               <BarChart data={growthData} labels={growthLabels} height={80} />
            </div>
            <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
               <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-[#34C759]/10 rounded-xl group- transition-all duration-300"><DollarSign size={18} className="text-[#34C759]" /></div>
                     <div><h3 className="text-sm font-bold text-[#1D1D1F]">Revenue Growth</h3><p className="text-[10px] text-[#86868B]">Approved payments over time</p></div>
                  </div>
                  <div className="flex gap-1 bg-[#F5F5F7] p-0.5 rounded-lg">
                     {['daily', 'weekly', 'monthly'].map(p => (
                        <button key={p} onClick={() => setRevenuePeriod(p)} className={`px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${revenuePeriod === p ? 'bg-[#34C759] text-white shadow-sm' : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-white/50'}`}>{p[0].toUpperCase() + p.slice(1)}</button>
                     ))}
                  </div>
               </div>
               <BarChart data={revenueData} labels={revenueLabels} height={80} />
            </div>
         </div>

         {/* ─── Charts Row 2: Course Enrollment + Revenue by Course + Student Activity ─── */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
               <div className="flex items-center gap-4 mb-5">
                  <div className="p-2 bg-blue-50 rounded-xl"><BookOpen size={18} className="text-blue-500" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Course Enrollment</h3>
               </div>
               <div className="space-y-2">
                  {D.courseEnrollments.sort((a, b) => b.enrolled - a.enrolled).map((c, i) => {
                     const max = D.courseEnrollments[0].enrolled;
                     return (
                        <div key={i} className="flex items-center gap-3 group hover:bg-[#F5F5F7] p-2.5 rounded-xl transition-all">
                           <span className={`text-xs font-bold w-6 text-center ${i < 3 ? 'text-[#0071E3]' : 'text-[#86868B]'}`}>{i + 1}</span>
                           <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                 <span className="text-xs font-semibold text-[#1D1D1F] truncate">{c.course}</span>
                                 <span className="text-xs font-bold text-[#1D1D1F]">{c.enrolled}</span>
                              </div>
                              <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                                 <div className={`h-full rounded-full transition-all duration-700 ${i < 3 ? 'bg-[#34C759]' : 'bg-[#0071E3]'}`} style={{ width: `${(c.enrolled / max) * 100}%` }}></div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm transition-all">
               <div className="flex items-center gap-4 mb-5">
                  <div className="p-2 bg-[#FF9500]/10 rounded-xl"><DollarSign size={18} className="text-amber-500" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Revenue by Course</h3>
               </div>
               <div className="space-y-2">
                  {D.revenueByCourse.sort((a, b) => b.revenue - a.revenue).map((c, i) => {
                     const max = D.revenueByCourse[0].revenue;
                     return (
                        <div key={i} className="flex items-center gap-3 group hover:bg-[#F5F5F7] p-2.5 rounded-xl transition-all">
                           <span className="text-xs font-bold text-[#86868B] w-6 text-center">{i + 1}</span>
                           <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                 <span className="text-xs font-semibold text-[#1D1D1F] truncate">{c.course}</span>
                                 <span className="text-xs font-bold text-[#34C759]">{c.revenue.toLocaleString()} EGP</span>
                              </div>
                              <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                                 <div className="h-full bg-[#FF9500] rounded-full transition-all duration-700" style={{ width: `${(c.revenue / max) * 100}%` }}></div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm transition-all">
               <div className="flex items-center gap-4 mb-5">
                  <div className="p-2 bg-[#0071E3]/10 rounded-xl"><Activity size={18} className="text-[#0071E3]" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Student Activity</h3>
               </div>
               <div className="space-y-3">
                  {D.studentActivity.map((a, i) => {
                     const max = Math.max(...D.studentActivity.map(x => x.value));
                     const colorMap = [['bg-[#0071E3]/10', 'text-[#0071E3]', 'bg-[#0071E3]'], ['bg-[#34C759]/10', 'text-[#34C759]', 'bg-[#34C759]'], ['bg-[#FF9500]/10', 'text-amber-600', 'bg-[#FF9500]'], ['bg-blue-50', 'text-blue-600', 'bg-blue-500']];
                     const cc = colorMap[i];
                     return (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-[#F5F5F7] hover:bg-[#D2D2D7] transition-all hover:shadow-sm">
                           <div className={`w-10 h-10 rounded-xl ${cc[0]} flex items-center justify-center`}>
                              <span className={`text-lg font-bold ${cc[1]}`}>{a.value}</span>
                           </div>
                           <div className="flex-1">
                              <p className="text-xs font-semibold text-[#1D1D1F]">{a.label}</p>
                              <div className="h-1.5 bg-white rounded-full overflow-hidden mt-1.5">
                                 <div className={`h-full ${cc[2]} rounded-full`} style={{ width: `${(a.value / max) * 100}%` }}></div>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* ─── Leaderboards ─── */}
         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-xl bg-[#FF9500]"><Trophy size={16} className="text-white" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Top Courses</h3>
               </div>
               <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{ label: 'Highest Enrolled', key: 'enrolled' }, { label: 'Highest Completion', key: 'completion' }, { label: 'Highest Revenue', key: 'revenue' }].map((h, i) => (
                     <div key={i} className="bg-[#F5F5F7] rounded-2xl p-3 text-center hover:shadow-sm transition-all">
                        <p className="text-[9px] text-[#86868B] font-medium uppercase tracking-wider mb-2">{h.label}</p>
                        <p className="text-sm font-bold text-[#1D1D1F] truncate">{D.leaderboards.topCourses[i].name}</p>
                        <p className="text-[10px] text-[#0071E3] font-bold">{h.key === 'revenue' ? `${(D.leaderboards.topCourses[i].revenue / 1000).toFixed(0)}K EGP` : D.leaderboards.topCourses[i][h.key]}{h.key === 'completion' ? '%' : ''}</p>
                     </div>
                  ))}
               </div>
               <div className="space-y-1.5">
                  {D.leaderboards.topCourses.map((c, i) => (
                     <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F7] transition-all">
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'bg-amber-100 text-amber-600 ring-1 ring-amber-200' : i === 1 ? 'bg-[#D2D2D7] text-[#86868B]' : i === 2 ? 'bg-orange-100 text-orange-600 ring-1 ring-orange-200' : 'bg-[#F5F5F7] text-[#86868B]'}`}>{i + 1}</span>
                        <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{c.name}</p><p className="text-[10px] text-[#86868B]">{c.enrolled} enrolled · {c.completion}% completion</p></div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm transition-all">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-xl bg-[#0071E3]"><Gem size={16} className="text-white" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Lowest Performing</h3>
               </div>
               <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{ label: 'Lowest Attendance', key: 'attendance' }, { label: 'Lowest Completion', key: 'completion' }, { label: 'Lowest Grade', key: 'avgGrade' }].map((h, i) => (
                     <div key={i} className="bg-red-50 rounded-2xl p-3 text-center hover:shadow-sm transition-all">
                        <p className="text-[9px] text-red-400 font-medium uppercase tracking-wider mb-2">{h.label}</p>
                        <p className="text-sm font-bold text-[#1D1D1F] truncate">{D.leaderboards.lowestCourses[i].name}</p>
                        <p className="text-[10px] text-red-500 font-bold">{D.leaderboards.lowestCourses[i][h.key]}%</p>
                     </div>
                  ))}
               </div>
               <div className="space-y-1.5">
                  {D.leaderboards.lowestCourses.map((c, i) => (
                     <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F7] transition-all">
                        <span className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-[10px] font-bold text-red-500 ring-1 ring-red-100">{i + 1}</span>
                        <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{c.name}</p><p className="text-[10px] text-[#86868B]">Att: {c.attendance}% · Comp: {c.completion}% · Grade: {c.avgGrade}%</p></div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-[#34C759]/10 rounded-xl"><Star size={16} className="text-[#34C759]" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Top Teachers</h3>
               </div>
               <div className="space-y-2">
                  {D.leaderboards.topTeachers.map((t, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F5F5F7] transition-all group">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200' : 'bg-[#0071E3]/10 text-[#0071E3]'}`}>{t.name.split(' ').map(n => n[0]).join('')}</div>
                        <div className="flex-1"><p className="text-sm font-semibold text-[#1D1D1F]">{t.name}</p>
                           <div className="flex gap-3 mt-1">
                              <span className="text-[10px] text-[#86868B]">Att: {t.attendance}%</span>
                              <span className="text-[10px] text-[#86868B]">Comp: {t.completion}%</span>
                              <span className="text-[10px] text-[#0071E3] font-bold">Grade: {t.avgGrade}%</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm transition-all">
               <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-50 rounded-xl"><Medal size={16} className="text-blue-500" /></div>
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Top Students</h3>
               </div>
               <div className="space-y-2">
                  {D.leaderboards.topStudents.map((s, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#F5F5F7] transition-all group">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${i === 0 ? 'bg-amber-100 text-amber-600 ring-2 ring-amber-200' : 'bg-blue-50 text-blue-600'}`}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                        <div className="flex-1"><p className="text-sm font-semibold text-[#1D1D1F]">{s.name}</p>
                           <div className="flex gap-3 mt-1">
                              <span className="text-[10px] text-[#0071E3] font-bold">Grade: {s.grade}%</span>
                              <span className="text-[10px] text-[#86868B]">Att: {s.attendance}%</span>
                              <span className="text-[10px] text-[#86868B]">Comp: {s.completion}%</span>
                              <span className="text-[10px] text-[#86868B]">{s.courses} courses</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ─── Alerts + Pending Payments + At-Risk Students ─── */}
         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            {showAlerts && (
               <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm hover:border-[#D2D2D7] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-50 rounded-xl"><Bell size={16} className="text-red-500" /></div>
                        <h3 className="text-sm font-bold text-[#1D1D1F]">Alerts</h3>
                     </div>
                     <button onClick={() => setShowAlerts(false)} className="p-1 hover:bg-[#D2D2D7] rounded-lg transition-all"><X size={14} className="text-[#86868B]" /></button>
                  </div>
                  <div className="space-y-2">
                     {D.alerts.map((a, i) => {
                        const Icon = a.icon;
                        const severityColors = { high: 'border-l-0 bg-red-50/30', medium: 'border-l-0 bg-[#FF9500]/10/30', low: 'border-l-0 bg-blue-50/30' };
                        return (
                           <div key={a.id} className={`border-l-4 ${severityColors[a.severity]} p-3 rounded-r-2xl hover:bg-[#F5F5F7] transition-colors cursor-pointer`}>
                              <div className="flex items-center gap-2 mb-1">
                                 <Icon size={14} className="text-[#86868B]" />
                                 <span className="text-xs font-bold text-[#1D1D1F]">{a.title}</span>
                                 <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded ${a.severity === 'high' ? 'bg-red-100 text-red-600' : a.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>{a.severity}</span>
                              </div>
                              <p className="text-[10px] text-[#86868B] ml-6">{a.desc}</p>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
            <div className={`${showAlerts ? 'xl:col-span-2' : 'xl:col-span-3'} grid grid-cols-1 lg:grid-cols-2 gap-6`}>
               <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="p-2 bg-[#FF9500]/10 rounded-xl"><Wallet size={16} className="text-amber-500" /></div>
                     <h3 className="text-sm font-bold text-[#1D1D1F]">Pending Payments</h3>
                  </div>
                  <div className="space-y-2">
                     {D.paymentTickets.filter(t => t.status === 'pending').slice(0, 4).map((t, i) => (
                        <div key={t.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#FF9500]/10/50 transition-all cursor-pointer">
                           <div className="w-8 h-8 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-xs font-bold text-amber-600 shrink-0">{t.student.split(' ').map(n => n[0]).join('')}</div>
                           <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-[#1D1D1F] truncate">{t.student}</p><p className="text-[10px] text-[#86868B]">{t.course} · {t.amount.toLocaleString()} EGP</p></div>
                           <span className={`text-xs font-bold px-3 py-1 rounded-full ${'bg-[#0071E3]/10 text-[#0071E3]'}`}>{t.method}</span>
                        </div>
                     ))}
                  </div>
                  <button onClick={() => setTab('finance')} className="w-full mt-3 py-2.5 bg-[#FF9500]/10 hover:bg-amber-100 text-amber-600 rounded-xl text-xs font-bold transition-all hover:shadow-sm">View All Payments →</button>
               </div>
               <div className="bg-white rounded-xl border border-[#D2D2D7] shadow-sm p-6 hover:shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="p-2 bg-red-50 rounded-xl"><AlertTriangle size={16} className="text-red-500" /></div>
                     <h3 className="text-sm font-bold text-[#1D1D1F]">Students at Risk</h3>
                  </div>
                  <div className="space-y-2">
                     {studentsList.filter(s => s.attendancePct < 80 || s.status === 'Frozen' || s.courses.some(c => c.payment === 'Pending')).slice(0, 4).map((s, i) => (
                        <div key={s.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-red-50/50 transition-all cursor-pointer">
                           <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${s.status === 'Frozen' ? 'bg-[#D2D2D7] text-[#86868B]' : 'bg-red-50 text-red-600'}`}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                           <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-[#1D1D1F] truncate">{s.name}</p><p className="text-[10px] text-[#86868B]">Grade {s.grade} · Att: {s.attendancePct}%</p></div>
                           <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.status === 'Frozen' ? 'bg-[#E8E8ED] text-[#86868B]' : 'bg-red-50 text-red-600'}`}>{s.status === 'Frozen' ? 'Frozen' : 'At Risk'}</span>
                        </div>
                     ))}
                  </div>
                  <button onClick={() => setTab('student-analytics')} className="w-full mt-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all hover:shadow-sm">View All Students →</button>
               </div>
            </div>
         </div>

         {/* ─── Today's Schedule ─── */}
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 hover:shadow-sm hover:border-[#D2D2D7] transition-all duration-300 group mb-8">
            <div className="flex items-center gap-4 mb-4">
               <div className="p-2 bg-blue-50 rounded-xl"><Calendar size={16} className="text-blue-500" /></div>
               <h3 className="text-sm font-bold text-[#1D1D1F]">Today's Schedule</h3>
               <span className="text-[10px] text-[#86868B] font-medium ml-auto">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {[
                  { time: '09:00 - 10:30', course: 'Physics 3rd Sec', teacher: 'Dr. Ahmed Ali', room: 'Lab A', students: 28 },
                  { time: '10:45 - 12:15', course: 'Chemistry 2nd Sec', teacher: 'Ms. Fatima Said', room: 'Room 204', students: 24 },
                  { time: '12:30 - 14:00', course: 'Math 1st Sec', teacher: 'Mr. Khaled Hassan', room: 'Room 101', students: 32 },
                  { time: '14:15 - 15:45', course: 'English 1st Sec', teacher: 'Ms. Aya Ibrahim', room: 'Lab B', students: 20 },
               ].map((slot, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-[#E8E8ED] hover:shadow-sm transition-all hover:border-blue-200">
                     <div className="flex items-center gap-2 mb-2"><Clock size={13} className="text-blue-500" /><span className="text-[10px] font-bold text-blue-600">{slot.time}</span></div>
                     <p className="text-sm font-bold text-[#1D1D1F] mb-1">{slot.course}</p>
                     <p className="text-[10px] text-[#86868B]">{slot.teacher} · {slot.room}</p>
                     <div className="flex items-center gap-1 mt-2"><Users size={11} className="text-[#86868B]" /><span className="text-[10px] text-[#86868B]">{slot.students} students</span></div>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}

// ─── Module: Student Management ─────────────────────────────────────
// ─── Student Data ────────────────────────────────────────────────────
const studentsList = [
   { id: 'S001', name: 'Ahmed Mohamed', parent: 'Mohamed Ahmed', phone: '01012345678', grade: 11, joined: 'Jan 2026', status: 'Active', lastSeen: 'Today', attendancePct: 90, attendancePresent: 18, attendanceAbsent: 2, attendanceLate: 1, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'absent' }, { d: 'July 4', s: 'present' }, { d: 'July 2', s: 'late' }], courses: [{ name: 'Physics', teacher: 'Ahmed Ali', started: 'May', attendance: 90, grade: 87, payment: 'Paid', paidVia: 'InstaPay', approvedBy: 'Reception 1', fee: 1500 }, { name: 'Chemistry', teacher: 'Fatima Said', started: 'May', attendance: 76, grade: 72, payment: 'Pending', fee: 1500 }], exams: [{ name: 'Physics Midterm', score: 84 }, { name: 'Physics Final', score: 91 }], homework: [{ name: 'HW 1', sub: true, score: 95 }, { name: 'HW 2', sub: false }], notes: [{ t: 'Father requested group change.', by: 'Admin' }, { t: 'Excellent student.', by: 'Teacher' }, { t: 'Frequently late to first period.', by: 'Admin' }], activity: [{ t: 'Today', a: 'Payment approved for Physics' }, { t: 'Yesterday', a: 'Attended Physics lecture' }, { t: '3 days ago', a: 'Submitted Physics Homework 1' }, { t: '5 days ago', a: 'Joined Chemistry course' }], aiSummary: 'Attendance dropped from 94% to 76% over the past month. Missed last 2 homework assignments. Payment for Chemistry is pending. Avg exam score: 87%. Recommendation: Contact parent.' },
   { id: 'S002', name: 'Fatima Zahra', parent: 'Khaled Zahra', phone: '01155667788', grade: 10, joined: 'Sep 2025', status: 'Active', lastSeen: 'Yesterday', attendancePct: 88, attendancePresent: 16, attendanceAbsent: 3, attendanceLate: 1, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'absent' }, { d: 'July 4', s: 'present' }, { d: 'July 2', s: 'present' }], courses: [{ name: 'Chemistry', teacher: 'Fatima Said', started: 'Sep 2025', attendance: 88, grade: 91, payment: 'Paid', paidVia: 'Vodafone Cash', approvedBy: 'Reception 2', fee: 1800 }], exams: [{ name: 'Chemistry Midterm', score: 88 }, { name: 'Chemistry Final', score: 94 }], homework: [{ name: 'Lab Report 1', sub: true, score: 92 }], notes: [{ t: 'Top performer in Chemistry.', by: 'Teacher' }], activity: [{ t: 'Yesterday', a: 'Attended Chemistry lab' }, { t: '1 week ago', a: 'Submitted Lab Report 1' }], aiSummary: 'Strong performance across all metrics. Attendance consistent at 88%. No payment issues.' },
   { id: 'S003', name: 'Youssef Samir', parent: 'Samir Adel', phone: '01299887766', grade: 12, joined: 'Oct 2024', status: 'Active', lastSeen: '2 days ago', attendancePct: 92, attendancePresent: 22, attendanceAbsent: 1, attendanceLate: 1, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'present' }, { d: 'July 4', s: 'present' }, { d: 'July 2', s: 'late' }], courses: [{ name: 'Math', teacher: 'Khaled Hassan', started: 'Oct 2024', attendance: 92, grade: 95, payment: 'Paid', paidVia: 'InstaPay', approvedBy: 'Reception 1', fee: 2000 }, { name: 'Physics', teacher: 'Ahmed Ali', started: 'Jan 2026', attendance: 92, grade: 88, payment: 'Paid', paidVia: 'Vodafone Cash', approvedBy: 'Reception 1', fee: 1500 }], exams: [{ name: 'Math Midterm', score: 96 }, { name: 'Math Final', score: 94 }], homework: [{ name: 'HW 3', sub: true, score: 98 }, { name: 'HW 4', sub: true, score: 97 }], notes: [{ t: 'Excellent math student. Consider advanced track.', by: 'Teacher' }], activity: [{ t: '2 days ago', a: 'Attended Math lecture' }, { t: '3 days ago', a: 'Submitted Math HW 4' }], aiSummary: 'Top performer. 92% attendance. Both courses paid in full. No concerns.' },
   { id: 'S004', name: 'Aya Mohamed', parent: 'Mohamed Salah', phone: '01033445566', grade: 11, joined: 'Feb 2026', status: 'Frozen', lastSeen: '1 week ago', attendancePct: 45, attendancePresent: 8, attendanceAbsent: 8, attendanceLate: 4, attendanceHistory: [{ d: 'July 10', s: 'absent' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'absent' }, { d: 'July 4', s: 'absent' }, { d: 'July 2', s: 'late' }], courses: [{ name: 'Biology', teacher: 'Nour Hassan', started: 'Feb 2026', attendance: 45, grade: 58, payment: 'Pending', fee: 1200 }], exams: [{ name: 'Biology Midterm', score: 55 }], homework: [{ name: 'Lab 1', sub: false }], notes: [{ t: 'Multiple absences. Contact parent urgently.', by: 'Admin' }, { t: 'Struggling with course material.', by: 'Teacher' }], activity: [{ t: '1 week ago', a: 'Last attended Biology' }, { t: '2 weeks ago', a: 'Missed Lab session' }], aiSummary: 'Critical concern. Attendance collapsed to 45%. Payment pending. 0 homework submitted. Recommend immediate parent meeting.' },
   { id: 'S005', name: 'Kareem Adel', parent: 'Adel Nour', phone: '01177889900', grade: 10, joined: 'Sep 2025', status: 'Active', lastSeen: 'Today', attendancePct: 78, attendancePresent: 14, attendanceAbsent: 4, attendanceLate: 2, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'late' }, { d: 'July 6', s: 'present' }, { d: 'July 4', s: 'absent' }, { d: 'July 2', s: 'present' }], courses: [{ name: 'English', teacher: 'Aya Ibrahim', started: 'Sep 2025', attendance: 78, grade: 82, payment: 'Paid', paidVia: 'Orange Cash', approvedBy: 'Reception 2', fee: 1400 }], exams: [{ name: 'English Midterm', score: 80 }, { name: 'English Final', score: 84 }], homework: [{ name: 'Essay 1', sub: true, score: 85 }], notes: [{ t: 'Improving steadily.', by: 'Teacher' }], activity: [{ t: 'Today', a: 'Attended English lecture' }, { t: '2 days ago', a: 'Submitted Essay 1' }], aiSummary: 'Steady improvement. Attendance at 78% — on upward trend. Payment up to date.' },
   { id: 'S006', name: 'Nadia Hassan', parent: 'Hassan Ali', phone: '01555667788', grade: 9, joined: 'Sep 2025', status: 'Active', lastSeen: 'Today', attendancePct: 95, attendancePresent: 23, attendanceAbsent: 1, attendanceLate: 0, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'present' }, { d: 'July 4', s: 'present' }, { d: 'July 2', s: 'present' }], courses: [{ name: 'Science', teacher: 'Mona Lotfy', started: 'Sep 2025', attendance: 95, grade: 93, payment: 'Paid', paidVia: 'InstaPay', approvedBy: 'Reception 2', fee: 1600 }], exams: [{ name: 'Science Midterm', score: 92 }, { name: 'Science Final', score: 94 }], homework: [{ name: 'Project 1', sub: true, score: 96 }], notes: [{ t: 'Excellent attendance record.', by: 'Admin' }], activity: [{ t: 'Today', a: 'Attended Science lecture' }, { t: '3 days ago', a: 'Submitted Science Project 1' }], aiSummary: 'Model student. 95% attendance, strong grades, payment current. No action needed.' },
   { id: 'S007', name: 'Hossam Ibrahim', parent: 'Ibrahim Nabil', phone: '01099887766', grade: 12, joined: 'Oct 2024', status: 'Active', lastSeen: '3 days ago', attendancePct: 82, attendancePresent: 16, attendanceAbsent: 3, attendanceLate: 1, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'absent' }, { d: 'July 6', s: 'present' }, { d: 'July 4', s: 'present' }, { d: 'July 2', s: 'late' }], courses: [{ name: 'Physics', teacher: 'Ahmed Ali', started: 'Oct 2024', attendance: 82, grade: 71, payment: 'Partial', paidVia: 'Physical Cash', approvedBy: 'Reception 1', fee: 1500 }], exams: [{ name: 'Physics Midterm', score: 68 }, { name: 'Physics Final', score: 74 }], homework: [{ name: 'HW 5', sub: true, score: 72 }, { name: 'HW 6', sub: false }], notes: [{ t: 'Partial payment issue. Reminder sent.', by: 'Admin' }], activity: [{ t: '3 days ago', a: 'Attended Physics' }, { t: '1 week ago', a: 'Partial payment received' }], aiSummary: 'Attendance adequate (82%) but declining. Partial payment outstanding. Grade avg 71% — needs support.' },
   { id: 'S008', name: 'Laila Mahmoud', parent: 'Mahmoud Farouk', phone: '01222334455', grade: 11, joined: 'Jan 2026', status: 'Active', lastSeen: 'Yesterday', attendancePct: 88, attendancePresent: 17, attendanceAbsent: 2, attendanceLate: 1, attendanceHistory: [{ d: 'July 10', s: 'present' }, { d: 'July 8', s: 'present' }, { d: 'July 6', s: 'present' }, { d: 'July 4', s: 'absent' }, { d: 'July 2', s: 'present' }], courses: [{ name: 'Math', teacher: 'Khaled Hassan', started: 'Jan 2026', attendance: 88, grade: 85, payment: 'Paid', paidVia: 'Vodafone Cash', approvedBy: 'Reception 1', fee: 2000 }, { name: 'Biology', teacher: 'Nour Hassan', started: 'Jan 2026', attendance: 88, grade: 79, payment: 'Pending', fee: 1200 }], exams: [{ name: 'Math Midterm', score: 86 }, { name: 'Biology Midterm', score: 78 }], homework: [{ name: 'Math HW 2', sub: true, score: 90 }, { name: 'Bio Lab 2', sub: true, score: 82 }], notes: [{ t: 'Good student. Biology payment needs follow-up.', by: 'Admin' }], activity: [{ t: 'Yesterday', a: 'Attended Math lecture' }, { t: '2 days ago', a: 'Submitted Bio Lab 2' }], aiSummary: 'Good student (88% attendance). Math paid, Biology payment pending. Grades solid. Follow up on Biology payment.' },
];

// ─── Student Profile Modal ────────────────────────────────────────────
function StudentProfileModal({ student, onClose }) {
   const [profileTab, setProfileTab] = useState('overview');
   const tabs = [
      { id: 'overview', label: 'Overview' }, { id: 'courses', label: 'Courses' },
      { id: 'attendance', label: 'Attendance' }, { id: 'payments', label: 'Payments' },
      { id: 'exams', label: 'Exams' }, { id: 'homework', label: 'Homework' },
      { id: 'notes', label: 'Notes' }, { id: 'activity', label: 'Activity' },
      { id: 'ai', label: 'AI Insights' },
   ];

   const avgExamScore = student.exams.length ? Math.round(student.exams.reduce((a, e) => a + e.score, 0) / student.exams.length) : 0;
   const numWarnings = student.notes.filter(n => n.t.toLowerCase().includes('urgent') || n.t.toLowerCase().includes('contact') || n.t.toLowerCase().includes('problem') || n.t.toLowerCase().includes('concern')).length;

   const StatCard = ({ label, value, color, icon: Icon, wide }) => (
      <div className={`${wide ? 'lg:col-span-2' : ''} flex items-center gap-3 p-3.5 rounded-2xl bg-white/70 border border-[#E8E8ED]/50 hover:shadow-sm hover:border-[#D2D2D7] transition-all`}>
         <div className={`p-2.5 rounded-xl ${color}`}>{Icon && <Icon size={16} />}</div>
         <div><p className="text-[10px] text-[#86868B] font-medium">{label}</p><p className="text-sm font-bold text-[#1D1D1F] mt-0.5">{value}</p></div>
      </div>
   );

   const ProgressBar = ({ value, color, size }) => (
      <div className={`${size === 'sm' ? 'h-1.5' : 'h-2.5'} bg-[#E8E8ED] rounded-full overflow-hidden`}>
         <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${Math.min(value, 100)}%` }}></div>
      </div>
   );

   const renderTabContent = () => {
      switch (profileTab) {
         case 'overview':
            return (
               <div className="space-y-5 animate-fadeIn">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
                     <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl p-6 border border-[#E8E8ED] shadow-sm hover:shadow-sm transition-all">
                           <div className="flex items-center gap-5 mb-5">
                              <div className="w-16 h-16 rounded-2xl bg-[#0071E3] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#0071E3]/20">{student.name.split(' ').map(n => n[0]).join('')}</div>
                              <div className="flex-1">
                                 <h2 className="text-xl font-bold text-[#1D1D1F]">{student.name}</h2>
                                 <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs text-[#86868B]">ID: {student.id}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-xs text-[#86868B]">Joined {student.joined}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span className="text-xs text-[#86868B]">Last seen: {student.lastSeen}</span>
                                 </div>
                              </div>
                              <span className={`shrink-0 text-[11px] font-bold px-3 py-1.5 rounded-full ${student.status === 'Active' ? 'bg-[#34C759]/10 text-[#34C759] ring-1 ring-[#34C759]/30' : 'bg-red-50 text-red-600 ring-1 ring-red-200'}`}>{student.status}</span>
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              <StatCard label="Grade" value={student.grade} color="bg-[#0071E3]/10 text-[#0071E3]" icon={GraduationCap} />
                              <StatCard label="Parent" value={student.parent} color="bg-[#FF9500]/10 text-amber-600" icon={Users} />
                              <StatCard label="Phone" value={student.phone} color="bg-[#0071E3]/10 text-[#0071E3]" icon={Phone} />
                              <StatCard label="Courses" value={student.courses.length} color="bg-[#34C759]/10 text-[#34C759]" icon={BookOpen} />
                           </div>
                           {numWarnings > 0 && (
                              <div className="mt-4 p-3.5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
                                 <AlertTriangle size={16} className="text-red-500 shrink-0" />
                                 <p className="text-xs text-red-700 font-medium">{numWarnings} warning{numWarnings > 1 ? 's' : ''} — <span className="text-red-500">requires attention</span></p>
                              </div>
                           )}
                           <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-[#E8E8ED]">
                              <button className="px-5 py-2.5 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl text-xs font-bold shadow-sm transition-all hover:shadow-sm hover:shadow-[#0071E3]/20">Edit Profile</button>
                              <a href={`tel:${student.phone}`} className="px-5 py-2.5 bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] rounded-xl text-xs font-bold transition-all hover:shadow-sm inline-flex items-center gap-1.5"><Phone size={14} />Call</a>
                              <a href={`https://wa.me/20${student.phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] rounded-xl text-xs font-bold transition-all hover:shadow-sm inline-flex items-center gap-1.5"><MessageCircle size={14} />WhatsApp</a>
                              <button className="px-5 py-2.5 bg-[#FF9500]/10 hover:bg-amber-100 text-amber-600 rounded-xl text-xs font-bold transition-all hover:shadow-sm"><PauseCircle size={14} className="inline mr-1" />Freeze</button>
                              <button className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold transition-all hover:shadow-sm"><ArrowRight size={14} className="inline mr-1" />Move Group</button>
                              <button className="px-5 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-all hover:shadow-sm"><Trash2 size={14} className="inline mr-1" />Delete</button>
                           </div>
                        </div>
                     </div>
                     <div className="lg:col-span-2 space-y-4">
                        <div className="bg-[#FF9500]/10 rounded-xl p-5 border border-amber-100/30 shadow-sm h-full">
                           <p className="text-sm text-[#1D1D1F] leading-relaxed">{student.aiSummary}</p>
                           <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="bg-white/70 rounded-xl p-3"><p className="text-[10px] text-[#86868B]">Attendance</p><p className="text-xl font-bold text-[#1D1D1F]">{student.attendancePct}%</p><ProgressBar value={student.attendancePct} color="bg-[#0071E3]" size="sm" /></div>
                              <div className="bg-white/70 rounded-xl p-3"><p className="text-[10px] text-[#86868B]">Avg Grade</p><p className="text-xl font-bold text-[#0071E3]">{avgExamScore}%</p><ProgressBar value={avgExamScore} color="bg-[#34C759]" size="sm" /></div>
                           </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 border border-[#E8E8ED] shadow-sm">
                           <p className="text-[10px] text-[#86868B] font-medium mb-2">Quick Actions</p>
                           <div className="grid grid-cols-2 gap-2">
                              <button className="p-3 rounded-xl bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] text-[11px] font-bold transition-all"><FileText size={14} className="inline mr-1.5" />Report Card</button>
                               <button className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-[11px] font-bold transition-all"><Send size={14} className="inline mr-1.5" />Message Parent</button>
                               <button className="p-3 rounded-xl bg-[#34C759]/10 hover:bg-[#34C759]/20 text-[#34C759] text-[11px] font-bold transition-all"><Download size={14} className="inline mr-1.5" />Export Data</button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            );
         case 'courses':
            return (
               <div className="space-y-3 animate-fadeIn">
                  {student.courses.map((c, i) => (
                     <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E8ED] shadow-sm hover:shadow-sm hover:border-[#D2D2D7] transition-all group">
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-xs font-bold text-[#0071E3]">{c.name[0]}</div><div><p className="text-sm font-bold text-[#1D1D1F]">{c.name}</p><p className="text-[10px] text-[#86868B]">{c.teacher} · Started {c.started}</p></div></div>
                           <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${c.payment === 'Paid' ? 'bg-[#34C759]/10 text-[#34C759] ring-1 ring-[#34C759]/30' : c.payment === 'Partial' ? 'bg-[#FF9500]/10 text-amber-600 ring-1 ring-amber-200' : 'bg-red-50 text-red-600 ring-1 ring-red-200'}`}>{c.payment}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <div><p className="text-[10px] text-[#86868B] mb-1.5 font-medium">Attendance</p><ProgressBar value={c.attendance} color="bg-[#0071E3]" /><p className="text-xs font-bold text-[#1D1D1F] mt-1">{c.attendance}%</p></div>
                           <div><p className="text-[10px] text-[#86868B] mb-1.5 font-medium">Grade</p><ProgressBar value={c.grade} color="bg-[#34C759]" /><p className="text-xs font-bold text-[#1D1D1F] mt-1">{c.grade}%</p></div>
                           <div><p className="text-[10px] text-[#86868B] mb-1.5 font-medium">Fee</p><p className="text-base font-bold text-[#1D1D1F]">{c.fee.toLocaleString()} <span className="text-[10px] font-normal text-[#86868B]">EGP</span></p></div>
                        </div>
                     </div>
                  ))}
               </div>
            );
         case 'attendance':
            return (
               <div className="animate-fadeIn">
                  <div className="flex items-center gap-6 mb-6 p-5 bg-white rounded-2xl border border-[#E8E8ED] shadow-sm hover:shadow-sm transition-all">
                     <div className="relative w-20 h-20">
                        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                           <circle cx="36" cy="36" r="30" fill="none" stroke="#e2e8f0" strokeWidth="6" />
                           <circle cx="36" cy="36" r="30" fill="none" stroke="url(#attGrad)" strokeWidth="6" strokeDasharray={`${(student.attendancePct / 100) * 188.5} 188.5`} strokeLinecap="round" />
                           <defs><linearGradient id="attGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#818cf8" /></linearGradient></defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center"><span className="text-lg font-bold text-[#1D1D1F]">{student.attendancePct}%</span></div>
                     </div>
                     <div className="flex gap-6">
                        <div className="text-center"><div className="w-12 h-12 rounded-xl bg-[#34C759]/10 flex items-center justify-center text-[#34C759] font-bold text-lg mx-auto mb-1 ring-1 ring-[#34C759]/20">{student.attendancePresent}</div><p className="text-[10px] text-[#86868B]">Present</p></div>
                        <div className="text-center"><div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 font-bold text-lg mx-auto mb-1 ring-1 ring-red-100">{student.attendanceAbsent}</div><p className="text-[10px] text-[#86868B]">Absent</p></div>
                        <div className="text-center"><div className="w-12 h-12 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-amber-500 font-bold text-lg mx-auto mb-1 ring-1 ring-amber-100">{student.attendanceLate}</div><p className="text-[10px] text-[#86868B]">Late</p></div>
                     </div>
                  </div>
                  <div className="space-y-1">
                     {student.attendanceHistory.map((h, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F5F5F7] transition-all group hover:shadow-sm">
                           <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all group-hover:ring-2 ${h.s === 'present' ? 'bg-[#34C759]/10 text-[#34C759] group-hover:ring-[#34C759]/30' : h.s === 'late' ? 'bg-[#FF9500]/10 text-amber-600 group-hover:ring-amber-200' : 'bg-red-50 text-red-600 group-hover:ring-red-200'}`}>
                              {h.s === 'present' ? <Check size={16} /> : h.s === 'late' ? <Clock size={16} /> : <X size={16} />}
                           </div>
                           <span className="text-sm font-semibold text-[#86868B]">{h.d}</span>
                           <span className={`ml-auto text-[10px] font-bold px-3 py-1 rounded-full capitalize transition-all ${h.s === 'present' ? 'bg-[#34C759]/10 text-[#34C759] group-hover:bg-[#34C759]/20' : h.s === 'late' ? 'bg-[#FF9500]/10 text-amber-600 group-hover:bg-amber-100' : 'bg-red-50 text-red-600 group-hover:bg-red-100'}`}>{h.s}</span>
                        </div>
                     ))}
                  </div>
               </div>
            );
         case 'payments':
            return (
               <div className="space-y-3 animate-fadeIn">
                  {student.courses.map((c, i) => {
                     const pct = c.payment === 'Paid' ? 100 : c.payment === 'Partial' ? 50 : 0;
                     return (
                        <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E8ED] shadow-sm hover:shadow-sm hover:border-[#D2D2D7] transition-all group">
                           <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ring-1 ${c.payment === 'Paid' ? 'bg-[#34C759]/10 text-[#34C759] ring-[#34C759]/30' : c.payment === 'Partial' ? 'bg-[#FF9500]/10 text-amber-600 ring-amber-200' : 'bg-red-50 text-red-600 ring-red-200'}`}>
                                    {c.payment === 'Paid' ? <Check size={18} /> : c.payment === 'Partial' ? <Minus size={18} /> : <X size={18} />}
                                 </div>
                                 <div><p className="text-sm font-bold text-[#1D1D1F]">{c.name}</p><p className="text-xs text-[#86868B]">{c.fee.toLocaleString()} EGP</p></div>
                              </div>
                              <div className="text-right">
                                 <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${c.payment === 'Paid' ? 'bg-[#34C759]/10 text-[#34C759]' : c.payment === 'Partial' ? 'bg-[#FF9500]/10 text-amber-600' : 'bg-red-50 text-red-600'}`}>{c.payment}</span>
                                 {c.paidVia && <p className="text-[10px] text-[#86868B] mt-1">Via {c.paidVia} · {c.approvedBy}</p>}
                                 {c.payment === 'Pending' && <p className="text-[10px] text-amber-600 mt-1 font-medium flex items-center gap-1"><Clock size={10} />Pending Approval</p>}
                              </div>
                           </div>
                           <div className="h-2.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                              <div className={`h-full rounded-full transition-all duration-700 ${c.payment === 'Paid' ? 'bg-[#34C759]' : c.payment === 'Partial' ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            );
         case 'exams':
            return (
               <div className="animate-fadeIn">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                     {student.exams.map((e, i) => (
                        <div key={i} className="bg-white rounded-2xl p-5 border border-[#E8E8ED] shadow-sm hover:shadow-sm hover:border-[#D2D2D7] transition-all group">
                           <p className="text-xs text-[#86868B] mb-3 font-medium">{e.name}</p>
                           <div className="flex items-end gap-3">
                              <p className="text-3xl font-bold text-[#0071E3] group- transition-transform origin-left">{e.score}%</p>
                              <div className="flex-1 h-3 bg-[#E8E8ED] rounded-full overflow-hidden mb-1">
                                 <div className="h-full bg-[#0071E3] rounded-full transition-all duration-700 group-hover:shadow-inner" style={{ width: `${e.score}%` }}></div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="bg-[#0071E3]/10 rounded-lg p-5 border border-[#0071E3]/20/50 hover:shadow-sm transition-all">
                     <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#1D1D1F]">Overall Average</span>
                        <div className="flex items-center gap-3">
                           <div className="w-32 h-3 bg-white/70 rounded-full overflow-hidden">
                              <div className="h-full bg-[#0071E3] rounded-full transition-all duration-700" style={{ width: `${avgExamScore}%` }}></div>
                           </div>
                           <span className="text-2xl font-bold text-[#0071E3]">{avgExamScore}%</span>
                        </div>
                     </div>
                  </div>
               </div>
            );
         case 'homework':
            return (
               <div className="space-y-2 animate-fadeIn">
                  {student.homework.map((h, i) => (
                     <div key={i} className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-[#E8E8ED] shadow-sm hover:shadow-sm hover:border-[#D2D2D7] transition-all">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ring-1 ${h.sub ? 'bg-[#34C759]/10 text-[#34C759] ring-[#34C759]/30' : 'bg-red-50 text-red-600 ring-red-200'}`}>{h.sub ? <Check size={18} /> : <X size={18} />}</div>
                           <div><span className="text-sm font-semibold text-[#1D1D1F]">{h.name}</span><p className="text-[10px] text-[#86868B]">{h.sub ? `Submitted · Score: ${h.score}%` : 'Not submitted'}</p></div>
                        </div>
                        {h.sub ? (
                           <div className="flex items-center gap-2"><div className="w-20 h-2 bg-[#E8E8ED] rounded-full overflow-hidden"><div className="h-full bg-[#34C759] rounded-full transition-all duration-700" style={{ width: `${h.score}%` }}></div></div><span className="text-xs font-bold text-[#34C759]">{h.score}%</span></div>
                        ) : (
                           <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-xl ring-1 ring-red-100">Missing</span>
                        )}
                     </div>
                  ))}
               </div>
            );
         case 'notes':
            return (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
                  {student.notes.map((n, i) => {
                     const isUrgent = n.t.toLowerCase().includes('urgent') || n.t.toLowerCase().includes('contact');
                     return (
                        <div key={i} className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-sm transition-all ${isUrgent ? 'border-red-100 bg-red-50' : 'border-[#E8E8ED]'}`}>
                           <div className="flex items-start gap-3">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${isUrgent ? 'bg-red-50 text-red-600' : 'bg-[#0071E3]/10 text-[#0071E3]'}`}>{isUrgent ? <AlertTriangle size={14} /> : n.by[0]}</div>
                              <div className="flex-1"><p className="text-sm text-[#1D1D1F] leading-relaxed">{n.t}</p><div className="flex items-center gap-2 mt-2"><span className={`text-[10px] font-medium ${isUrgent ? 'text-red-500' : 'text-[#86868B]'}`}>— {n.by}</span>{isUrgent && <span className="text-[9px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">Urgent</span>}</div></div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            );
         case 'activity':
            return (
               <div className="animate-fadeIn">
                  {student.activity.map((a, i) => (
                     <div key={i} className="flex gap-4 px-4 py-3 rounded-xl hover:bg-[#F5F5F7] transition-all group hover:shadow-sm">
                        <div className="flex flex-col items-center">
                           <div className="w-3 h-3 rounded-full bg-[#0071E3] mt-1.5 ring-2 ring-[#0071E3]/20 group-hover:ring-slate-200 transition-all"></div>
                           {i < student.activity.length - 1 && <div className="w-px h-full bg-[#0071E3]/30 mt-1"></div>}
                        </div>
                        <div className="flex-1 min-w-0 pb-6">
                           <p className="text-sm font-medium text-[#1D1D1F]">{a.a}</p>
                           <p className="text-[10px] text-[#86868B] mt-0.5 font-medium">{a.t}</p>
                        </div>
                     </div>
                  ))}
               </div>
            );
         case 'ai':
            return (
               <div className="animate-fadeIn">
                  <div className="bg-white border border-[#E8E8ED] rounded-xl p-6 border border-[#0071E3]/20/50 shadow-sm hover:shadow-sm transition-all">

                     <p className="text-sm text-[#1D1D1F] leading-relaxed bg-white/60 rounded-2xl p-4 border border-[#0071E3]/20/30">{student.aiSummary}</p>
                     <div className="mt-5 pt-4 border-t border-[#0071E3]/20 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/70 rounded-xl p-3 text-center hover:shadow-sm transition-all"><p className="text-[10px] text-[#86868B] font-medium">Attendance</p><p className="text-xl font-bold text-[#1D1D1F]">{student.attendancePct}%</p><ProgressBar value={student.attendancePct} color="bg-[#0071E3]" size="sm" /></div>
                        <div className="bg-white/70 rounded-xl p-3 text-center hover:shadow-sm transition-all"><p className="text-[10px] text-[#86868B] font-medium">Courses</p><p className="text-xl font-bold text-[#1D1D1F]">{student.courses.length}</p></div>
                        <div className="bg-white/70 rounded-xl p-3 text-center hover:shadow-sm transition-all"><p className="text-[10px] text-[#86868B] font-medium">Avg Grade</p><p className="text-xl font-bold text-[#0071E3]">{avgExamScore}%</p><ProgressBar value={avgExamScore} color="bg-[#34C759]" size="sm" /></div>
                        <div className="bg-white/70 rounded-xl p-3 text-center hover:shadow-sm transition-all"><p className="text-[10px] text-[#86868B] font-medium">Status</p><span className={`text-[11px] font-bold px-3 py-1.5 rounded-full mt-1 inline-block ${student.status === 'Active' ? 'bg-[#34C759]/10 text-[#34C759] ring-1 ring-[#34C759]/30' : 'bg-red-50 text-red-600 ring-1 ring-red-200'}`}>{student.status}</span></div>
                     </div>
                  </div>
               </div>
            );
      }
   };

   return (
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto" onClick={onClose}>
         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
         <div className="relative bg-white rounded-3xl shadow-2xl border border-[#E8E8ED] w-full max-w-5xl mx-4 overflow-hidden animate-slideUp" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-[#E8E8ED] px-6 py-4 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <button onClick={onClose} className="p-2 hover:bg-[#D2D2D7] rounded-xl transition-all"><X size={18} className="text-[#86868B]" /></button>
                  <div className="w-8 h-8 rounded-lg bg-[#0071E3] flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">{student.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h3 className="text-sm font-bold text-[#1D1D1F]">{student.name}</h3><p className="text-[10px] text-[#86868B]">{student.id} · Grade {student.grade}</p></div>
               </div>
               <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${student.status === 'Active' ? 'bg-[#34C759]/10 text-[#34C759] ring-1 ring-[#34C759]/30' : 'bg-red-50 text-red-600 ring-1 ring-red-200'}`}>{student.status}</span>
               </div>
            </div>
            <div className="px-6 pt-4 pb-1 overflow-x-auto">
               <div className="flex gap-1.5">
                  {tabs.map(t => (
                     <button key={t.id} onClick={() => setProfileTab(t.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${profileTab === t.id ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'bg-[#E8E8ED] text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}>{t.label}</button>
                  ))}
               </div>
            </div>
            <div className="px-6 py-5 max-h-[65vh] overflow-y-auto">
               {renderTabContent()}
            </div>
         </div>
         <style>{`
 @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
 @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
 .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
 .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
 `}</style>
      </div>
   );
}

// ─── Student Management ──────────────────────────────────────────────
function StudentManagement() {
   const [search, setSearch] = useState('');
   const [selectedStudent, setSelectedStudent] = useState(null);
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [filters, setFilters] = useState({ grade: '', status: '', payment: '' });
   const [showAddStudent, setShowAddStudent] = useState(false);
   const [addStudentForm, setAddStudentForm] = useState({ name: '', phone: '', password: '', courses: [] });
   const STUDENT_COURSES = ['Physics 3rd Sec', 'Chemistry 2nd Sec', 'Math 1st Sec', 'Biology 3rd Sec', 'English 1st Sec', 'History 2nd Sec', 'Science 1st Sec', 'Arabic 2nd Sec'];

   const handleAddStudent = () => {
      if (!addStudentForm.name || !addStudentForm.phone || !addStudentForm.password) return;
      const newStudent = {
         id: `STU${String(studentsList.length + 1).padStart(4, '0')}`,
         name: addStudentForm.name,
         parent: addStudentForm.name,
         grade: 10,
         phone: addStudentForm.phone,
         status: 'Active',
         attendancePct: 100,
         lastSeen: 'Just now',
         joined: new Date().toISOString().slice(0, 10),
         courses: addStudentForm.courses.map(c => ({ name: c, payment: 'Pending' })),
         attendanceHistory: [{ date: new Date().toISOString().slice(0, 10), s: 'present' }],
      };
      studentsList.unshift(newStudent);
      setShowAddStudent(false);
      setAddStudentForm({ name: '', phone: '', password: '', courses: [] });
   };

   const filtered = studentsList.filter(s => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.parent.toLowerCase().includes(q) || s.phone.includes(q) || s.id.toLowerCase().includes(q);
      const matchGrade = !filters.grade || s.grade === parseInt(filters.grade);
      const matchStatus = !filters.status || s.status === filters.status;
      const matchPayment = !filters.payment || s.courses.some(c => c.payment === filters.payment);
      return matchSearch && matchGrade && matchStatus && matchPayment;
   });

   const toggleSelect = (id) => {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      setSelectedIds(next);
   };

   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(s => s.id)));
   };

   const stats = {
      total: filtered.length,
      active: filtered.filter(s => s.status === 'Active').length,
      frozen: filtered.filter(s => s.status === 'Frozen').length,
      pendingPayments: filtered.filter(s => s.courses.some(c => c.payment === 'Pending' || c.payment === 'Partial')).length,
      absentToday: filtered.reduce((sum, s) => sum + (s.attendanceHistory[0]?.s === 'absent' ? 1 : 0), 0),
      newThisMonth: filtered.filter(s => s.joined.includes('2026')).length,
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B]" />
                  <input type="text" placeholder="Search by name, parent, phone, ID..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.grade} onChange={e => setFilters(f => ({ ...f, grade: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Grades</option><option value="9">Grade 9</option><option value="10">Grade 10</option><option value="11">Grade 11</option><option value="12">Grade 12</option></select>
               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="Active">Active</option><option value="Frozen">Frozen</option></select>
               <select value={filters.payment} onChange={e => setFilters(f => ({ ...f, payment: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Payments</option><option value="Paid">Paid</option><option value="Partial">Partial</option><option value="Pending">Pending</option></select>
                <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {studentsList.length}</span>
                <button onClick={() => setShowAddStudent(true)} className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0071E3] text-white rounded-xl text-xs font-bold hover:bg-[#0056B3] transition-all shadow-sm"><UserPlus size={14} />Add Student</button>
             </div>
          </div>

         <div className="mb-6 animate-fadeIn">
            <div className="grid grid-cols-6 gap-4">
               {[
                  { label: 'Total Students', value: stats.total, color: 'text-[#1D1D1F]', icon: Users, sub: 'All enrollments' },
                  { label: 'Active', value: stats.active, color: 'text-[#34C759]', icon: UserCheck, sub: 'Currently enrolled' },
                  { label: 'Frozen', value: stats.frozen, color: 'text-[#86868B]', icon: XCircle, sub: 'Suspended' },
                  { label: 'Pending Payments', value: stats.pendingPayments, color: 'text-amber-600', icon: Wallet, sub: 'Needs verification' },
                  { label: 'Absent Today', value: stats.absentToday, color: 'text-red-500', icon: Clock, sub: 'Marked absent' },
                  { label: 'New This Month', value: stats.newThisMonth, color: 'text-[#0071E3]', icon: UserPlus, sub: 'Fresh registrations' },
               ].map((item, i) => {
                  const Icon = item.icon;
                  const cm = { 'text-[#1D1D1F]': 'bg-[#F5F5F7] text-[#86868B]', 'text-[#34C759]': 'bg-[#34C759]/10 text-[#34C759]', 'text-[#86868B]': 'bg-[#E8E8ED] text-[#86868B]', 'text-amber-600': 'bg-[#FF9500]/10 text-amber-500', 'text-red-500': 'bg-red-50 text-red-500', 'text-[#0071E3]': 'bg-[#0071E3]/10 text-[#0071E3]', 'text-blue-600': 'bg-blue-50 text-blue-500' };
                  return (
                     <div key={i} className="bg-white rounded-2xl border border-[#E8E8ED] shadow-sm p-5 hover:shadow-sm transition-all group">
                        <div className="flex items-center justify-between mb-3">
                           <p className="text-[10px] text-[#86868B] font-medium">{item.label}</p>
                           <div className={`p-2 rounded-xl ${cm[item.color]} transition-all group-`}><Icon size={16} /></div>
                        </div>
                        <p className={`text-2xl font-bold ${item.color} tracking-tight`}>{item.value}</p>
                        <p className="text-[10px] text-[#86868B] mt-0.5">{item.sub}</p>
                     </div>
                  );
               })}
            </div>
         </div>

         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden transition-all hover:shadow-sm">
            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#0071E3]/10 border-b border-[#0071E3]/20 flex items-center gap-2 flex-wrap animate-fadeIn">
                  <span className="text-xs font-bold text-[#0071E3] mr-2">{selectedIds.size} selected</span>
                  {['Assign Course', 'Send WhatsApp', 'Announcement', 'Approve Payments', 'Freeze', 'Export'].map((action, i) => {
                     const colors = ['violet', 'emerald', 'blue', 'amber', 'red', 'slate'];
                     const c = colors[i % colors.length];
                     return <button key={action} className={`px-3 py-1.5 bg-white hover:bg-${c}-50 text-${c}-600 rounded-xl text-xs font-bold border-2 transition-all hover:shadow-sm shadow-sm`}>{action}</button>;
                  })}
               </div>
            )}

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-[#F5F5F7]/80">
                        <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Student</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Grade</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Courses</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Payment</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Attendance</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Last Seen</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(s => (
                        <tr key={s.id} className="hover:bg-[#0071E3]/10/30 transition-all cursor-pointer group" onClick={() => setSelectedStudent(s)}>
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(s.id)} onChange={() => toggleSelect(s.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-xs font-bold text-[#0071E3] shrink-0 transition-all group-">{s.name.split(' ').map(n => n[0]).join('')}</div>
                                 <div><span className="text-sm font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">{s.name}</span><span className="text-[10px] text-[#86868B] block">{s.parent}</span></div>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#1D1D1F]">{s.grade}</span></td>
                           <td className="px-4 py-4"><div className="flex gap-1 flex-wrap">{s.courses.map((c, i) => <span key={i} className="text-xs font-medium bg-[#E8E8ED] text-[#86868B] px-3 py-1 rounded-lg">{c.name}</span>)}</div></td>
                           <td className="px-4 py-4"><span className={`text-xs font-bold px-3 py-1 rounded-full ${s.status === 'Active' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-red-50 text-red-600'}`}>{s.status}</span></td>
                           <td className="px-4 py-4">
                              {s.courses.every(c => c.payment === 'Paid') ? <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#34C759]/10 text-[#34C759]">Paid</span> :
                                 s.courses.some(c => c.payment === 'Pending') ? <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FF9500]/10 text-amber-600">Pending</span> :
                                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FF9500]/10 text-amber-600">Partial</span>}
                           </td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                 <div className="w-12 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${s.attendancePct >= 85 ? 'bg-[#34C759]' : s.attendancePct >= 70 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${s.attendancePct}%` }}></div>
                                 </div>
                                 <span className={`text-xs font-bold ${s.attendancePct >= 85 ? 'text-[#34C759]' : s.attendancePct >= 70 ? 'text-amber-600' : 'text-red-500'}`}>{s.attendancePct}%</span>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{s.lastSeen}</span></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="px-5 py-3.5 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
               <span className="text-[11px] text-[#86868B]">Showing {filtered.length} of {studentsList.length} students</span>
               <button className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><Download size={14} />Export Excel</button>
            </div>
         </div>

          {selectedStudent && <StudentProfileModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}

          {showAddStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddStudent(false)}>
              <div className="bg-white w-full max-w-md rounded-[20px] shadow-xl animate-slideUp" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-6 pb-3">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">Add Student</h3>
                  <button onClick={() => setShowAddStudent(false)} className="p-1.5 hover:bg-[#F5F5F7] rounded-lg"><X size={18} className="text-[#86868B]" /></button>
                </div>
                <div className="px-6 pb-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input value={addStudentForm.name} onChange={e => setAddStudentForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="Ahmed Hassan" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <input value={addStudentForm.phone} onChange={e => setAddStudentForm(f => ({ ...f, phone: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="01012345678" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Password</label>
                    <input type="password" value={addStudentForm.password} onChange={e => setAddStudentForm(f => ({ ...f, password: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="Min 6 characters" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Assign Courses</label>
                    <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-[#F5F5F7] rounded-xl">
                      {STUDENT_COURSES.map(c => (
                        <button key={c} type="button" onClick={() => setAddStudentForm(f => ({ ...f, courses: f.courses.includes(c) ? f.courses.filter(x => x !== c) : [...f.courses, c] }))}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${addStudentForm.courses.includes(c) ? 'bg-[#0071E3] text-white shadow-sm' : 'bg-white text-[#86868B] border border-[#D2D2D7] hover:border-[#0071E3]'}`}
                        >{c}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handleAddStudent}
                    className="w-full py-3 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all shadow-sm"
                  >Add Student</button>
                </div>
              </div>
            </div>
          )}
       </>
   );
}

// ─── Module: Finance ────────────────────────────────────────────────
function FinanceModule() {
   const [search, setSearch] = useState('');
   const [filters, setFilters] = useState({ status: '', method: '' });
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [showAddExpense, setShowAddExpense] = useState(false);
   const [expenseForm, setExpenseForm] = useState({ name: '', amount: '', category: 'Salaries' });
   const BC = D.financeBreakdown;

   const filtered = D.paymentTickets.filter(t => {
      const q = search.toLowerCase();
      const m = !filters.status || t.status === filters.status;
      const mt = !filters.method || t.method === filters.method;
      return (!q || t.student.toLowerCase().includes(q) || t.course.toLowerCase().includes(q)) && m && mt;
   });

   const toggleSelect = (id) => {
      const n = new Set(selectedIds); n.has(id) ? n.delete(id) : n.add(id); setSelectedIds(n);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(t => t.id)));
   };

   const handleAddExpense = () => {
      if (!expenseForm.name || !expenseForm.amount) return;
      const cat = D.expenses.categories.find(c => c.name === expenseForm.category);
      if (cat) cat.amount += Number(expenseForm.amount);
      D.expenses.total += Number(expenseForm.amount);
      setShowAddExpense(false);
      setExpenseForm({ name: '', amount: '', category: 'Salaries' });
   };

   const badge = (s) => ({ pending: 'bg-[#FF9500]/10 text-amber-600', approved: 'bg-[#34C759]/10 text-[#34C759]', rejected: 'bg-red-50 text-red-600' })[s] || 'bg-[#FF9500]/10 text-amber-600';

   const finStats = {
      total: filtered.reduce((s, t) => s + t.amount, 0),
      pending: filtered.filter(t => t.status === 'pending').length,
      approved: filtered.filter(t => t.status === 'approved').length,
      rejected: filtered.filter(t => t.status === 'rejected').length,
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search by student, course..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="rejected">Rejected</option></select>
               <select value={filters.method} onChange={e => setFilters(f => ({ ...f, method: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Methods</option><option value="Vodafone Cash">Vodafone Cash</option><option value="InstaPay">InstaPay</option><option value="Orange Cash">Orange Cash</option></select>
               <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {D.paymentTickets.length}</span>
                <button className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><Download size={12} />Export</button>
                <button onClick={() => setShowAddExpense(true)} className="flex items-center gap-1.5 px-4 py-3 bg-gradient-to-r from-[#FF3B30] to-[#E0352B] hover:from-[#E0352B] hover:to-[#CC2F26] text-white rounded-full text-xs font-bold shadow-sm transition-all"><Plus size={13} />Expense</button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
             <Card title="Revenue Today" value={`${D.finances.today.toLocaleString()} EGP`} subtitle="Approved payments today" icon={TrendingUp} trend="12.5%" trendUp color="emerald" />
            <Card title="Revenue This Week" value={`${D.finances.week.toLocaleString()} EGP`} subtitle="7-day total" icon={ChartBar} color="violet" />
            <Card title="Revenue This Month" value={`${D.finances.month.toLocaleString()} EGP`} subtitle="MTD" icon={Wallet} color="blue" />
            <Card title="Revenue This Year" value={`${(D.finances.year / 1000).toFixed(0)}K EGP`} subtitle="YTD total" icon={DollarSign} color="emerald" />
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5"><p className="text-[10px] text-[#86868B] font-medium">Total (Filtered)</p><p className="text-xl font-bold text-[#1D1D1F]">{finStats.total.toLocaleString()} EGP</p></div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5"><p className="text-[10px] text-[#86868B] font-medium">Pending Approvals</p><p className="text-xl font-bold text-amber-600">{finStats.pending}</p></div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5"><p className="text-[10px] text-[#86868B] font-medium">Approved Payments</p><p className="text-xl font-bold text-[#34C759]">{finStats.approved}</p></div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5"><p className="text-[10px] text-[#86868B] font-medium">Rejected Payments</p><p className="text-xl font-bold text-red-500">{finStats.rejected}</p></div>
         </div>

         {/* ─── Revenue Charts ─── */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Monthly Revenue vs Expenses</h3>
               <div className="space-y-2.5">
                  {BC.monthly.map((m, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#86868B] w-8">{m.month}</span>
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                 <div className="h-full bg-[#34C759] rounded-full" style={{ width: `${(m.revenue / 350000) * 100}%` }}></div>
                              </div>
                              <span className="text-[9px] font-bold text-[#34C759] w-16 text-right">{m.revenue.toLocaleString()}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden">
                                 <div className="h-full bg-red-400 rounded-full" style={{ width: `${(m.expenses / 140000) * 100}%` }}></div>
                              </div>
                              <span className="text-[8px] text-red-400 w-16 text-right">{m.expenses.toLocaleString()}</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Revenue by Course</h3>
               <div className="space-y-2.5">
                  {BC.byCourse.map((c, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-[#86868B] w-28 truncate">{c.name}</span>
                        <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                           <div className="h-full bg-[#0071E3] rounded-full" style={{ width: `${c.pct}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#86868B] w-20 text-right">{c.revenue.toLocaleString()} EGP</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* ─── Expense / Cost Overview ─── */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <div className="flex items-center gap-3 mb-5">
                   <h3 className="text-sm font-bold text-[#1D1D1F]">Cost Breakdown</h3>
                   <span className="text-xs text-[#86868B] ml-auto">{D.expenses.total.toLocaleString()} EGP total</span>

               </div>
               <div className="space-y-3">
                  {D.expenses.categories.map((c, i) => {
                     const icons = { GraduationCap, Building2: Building2, BookOpen, Megaphone, Settings };
                     const Icon = icons[c.icon] || DollarSign;
                     return (
                        <div key={i} className="flex items-center gap-3 group hover:bg-[#F5F5F7] p-2.5 rounded-xl transition-all">
                           <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0 group- transition-all"><Icon size={14} className="text-red-500" /></div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center mb-1">
                                 <span className="text-xs font-semibold text-[#1D1D1F] truncate">{c.name}</span>
                                 <span className="text-xs font-bold text-[#1D1D1F]">{c.amount.toLocaleString()} EGP</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                    <div className="h-full bg-red-400 rounded-full transition-all duration-700" style={{ width: `${c.pct}%` }}></div>
                                 </div>
                                 <span className="text-[10px] font-bold text-[#86868B] w-8 text-right">{c.pct}%</span>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
               <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs text-[#86868B]">Net Profit</span>
                  <span className="text-sm font-bold text-[#34C759]">{(D.finances.grossRev - D.expenses.total).toLocaleString()} EGP</span>
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <div className="flex items-center gap-3 mb-5">
                  <h3 className="text-sm font-bold text-[#1D1D1F]">Monthly Expenses</h3>
                  <span className="text-xs text-[#86868B] ml-auto">Avg: {Math.round(D.expenses.monthly.reduce((s, m) => s + m.salaries + m.rent + m.materials + m.marketing + m.admin, 0) / D.expenses.monthly.length).toLocaleString()} EGP</span>
               </div>
               <div className="space-y-3">
                  {D.expenses.monthly.map((m, i) => {
                     const total = m.salaries + m.rent + m.materials + m.marketing + m.admin;
                     const max = Math.max(...D.expenses.monthly.map(x => x.salaries + x.rent + x.materials + x.marketing + x.admin));
                     return (
                        <div key={i} className="flex items-center gap-3">
                           <span className="text-xs font-bold text-[#86868B] w-8">{m.month}</span>
                           <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                 <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(total / max) * 100}%` }}></div>
                                 </div>
                                 <span className="text-[9px] font-bold text-[#86868B] w-16 text-right">{total.toLocaleString()}</span>
                              </div>
                              <div className="flex gap-2 text-[8px] text-[#86868B]">
                                 <span>Sal: {m.salaries.toLocaleString()}</span>
                                 <span>·</span>
                                 <span>Rent: {m.rent.toLocaleString()}</span>
                                 <span>·</span>
                                 <span>Mat: {m.materials.toLocaleString()}</span>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         {/* ─── Payment Approval Table ─── */}
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden mb-8">
            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#FF9500]/10 border-b border-amber-100 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-amber-700 mr-2">{selectedIds.size} selected</span>
                  {['Approve All', 'Reject All', 'Export'].map(a => <button key={a} className="px-4 py-2 bg-white hover:bg-[#FF9500]/10 text-amber-600 rounded-xl text-xs font-bold border-2 border-amber-200 transition-all hover:shadow-sm shadow-sm">{a}</button>)}
               </div>
            )}
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead><tr className="bg-[#F5F5F7]/80">
                     <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Student</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Amount</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Method</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Submitted</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Receipt</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Actions</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(r => (
                        <tr key={r.id} className="hover:bg-[#F5F5F7]/50 transition-colors group">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(r.id)} onChange={() => toggleSelect(r.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4"><div className="flex items-center gap-2"><div className="w-8 h-8 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-[10px] font-bold text-amber-600 shrink-0">{r.student.split(' ').map(n => n[0]).join('')}</div><span className="text-xs font-semibold text-[#1D1D1F]">{r.student}</span></div></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{r.course}</span></td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#1D1D1F]">{r.amount.toLocaleString()} EGP</span></td>
                           <td className="px-4 py-4"><span className="text-[10px] text-[#86868B] bg-[#F5F5F7] px-2 py-1 rounded-lg">{r.method}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{r.submitted}</span></td>
                           <td className="px-4 py-4">{r.hasReceipt ? <button className="flex items-center gap-1 px-3 py-1.5 bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] rounded-lg text-xs font-medium shadow-sm"><ImageIcon size={14} />View</button> : <span className="text-[10px] text-[#86868B] italic">—</span>}</td>
                           <td className="px-4 py-4"><span className={`text-xs font-bold px-3 py-1 rounded-full ${badge(r.status)}`}>{r.status.toUpperCase()}</span></td>
                           <td className="px-4 py-4">
                              {r.status === 'pending' ? (
                                 <div className="flex items-center gap-1">
                                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#34C759]/10 text-[#34C759] hover:bg-[#34C759]/20"><Check size={12} /></button>
                                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100"><X size={12} /></button>
                                 </div>
                              ) : <span className="text-[10px] text-[#86868B]">{r.approvedBy || r.rejectedBy || '—'}</span>}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* ─── Revenue Breakdown + Expected Revenue ─── */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Revenue Breakdown by Grade</h3>
               <div className="space-y-3">
                  {BC.byGrade.map((g, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-[#86868B] w-16">{g.grade}</span>
                        <div className="flex-1 h-3 bg-[#F5F5F7] rounded-full overflow-hidden">
                           <div className="h-full bg-[#0071E3] rounded-full" style={{ width: `${(g.revenue / 700000) * 100}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-[#1D1D1F] w-24 text-right">{g.revenue.toLocaleString()} EGP</span>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Expected Revenue</h3>
               <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-[#FF9500]/10 rounded-2xl p-4"><p className="text-[10px] text-amber-600 font-medium mb-1">Pending Approval</p><p className="text-2xl font-bold text-amber-600">{D.expectedRevenue.pendingApprovals}</p><p className="text-[10px] text-[#86868B]">{D.expectedRevenue.pendingAmount.toLocaleString()} EGP</p></div>
                     <div className="bg-red-50 rounded-2xl p-4"><p className="text-[10px] text-red-500 font-medium mb-1">Unpaid Students</p><p className="text-2xl font-bold text-red-500">{D.expectedRevenue.unpaidStudents}</p><p className="text-[10px] text-[#86868B]">{D.expectedRevenue.unpaidAmount.toLocaleString()} EGP</p></div>
                     <div className="bg-orange-50 rounded-2xl p-4"><p className="text-[10px] text-orange-600 font-medium mb-1">Overdue Payments</p><p className="text-2xl font-bold text-orange-600">{D.expectedRevenue.overdueCount}</p><p className="text-[10px] text-[#86868B]">{D.expectedRevenue.overdueAmount.toLocaleString()} EGP</p></div>
                     <div className="bg-[#34C759]/10 rounded-2xl p-4"><p className="text-[10px] text-[#34C759] font-medium mb-1">Total Expected</p><p className="text-2xl font-bold text-[#34C759]">{D.expectedRevenue.totalExpected.toLocaleString()} EGP</p><p className="text-[10px] text-[#86868B]">If all pending approved</p></div>
                  </div>
                  <div className="bg-[#0071E3]/10 rounded-lg p-4">
                     <div className="flex justify-between text-xs mb-2"><span className="text-[#86868B]">Collection Progress</span><span className="font-bold text-[#0071E3]">{Math.round((D.finances.grossRev / (D.finances.grossRev + D.expectedRevenue.totalExpected)) * 100)}%</span></div>
                     <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-[#0071E3] rounded-full" style={{ width: `${(D.finances.grossRev / (D.finances.grossRev + D.expectedRevenue.totalExpected)) * 100}%` }}></div></div>
                  </div>
               </div>
            </div>
          </div>

          {showAddExpense && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddExpense(false)}>
              <div className="bg-white w-full max-w-md rounded-[20px] shadow-xl animate-slideUp" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-6 pb-3">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">Add Expense</h3>
                  <button onClick={() => setShowAddExpense(false)} className="p-1.5 hover:bg-[#F5F5F7] rounded-lg"><X size={18} className="text-[#86868B]" /></button>
                </div>
                <div className="px-6 pb-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Expense Name</label>
                    <input value={expenseForm.name} onChange={e => setExpenseForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="Internet Bill" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Amount (EGP)</label>
                    <input type="number" value={expenseForm.amount} onChange={e => setExpenseForm(f => ({ ...f, amount: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="5000" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Category</label>
                    <select value={expenseForm.category} onChange={e => setExpenseForm(f => ({ ...f, category: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer">
                      {D.expenses.categories.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <button onClick={handleAddExpense}
                    className="w-full py-3 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-all shadow-sm"
                  >Add Expense</button>
                </div>
              </div>
            </div>
          )}
       </>
    );
 }

 // ─── Module: Attendance Tracker ─────────────────────────────────────
 function AttendanceTracker() {
   const [search, setSearch] = useState('');
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [filters, setFilters] = useState({ status: '', course: '', dateFrom: '', dateTo: '' });
   const records = [
      { id: 'A001', name: 'Mohamed Ali', course: 'Physics 3rd Sec', status: 'Present', time: '08:55', grade: 12, parent: 'Mohamed Ahmed', phone: '01012345678', date: '2026-07-14' },
      { id: 'A002', name: 'Fatima Zahra', course: 'Chemistry 2nd Sec', status: 'Present', time: '09:01', grade: 10, parent: 'Khaled Zahra', phone: '01155667788', date: '2026-07-14' },
      { id: 'A003', name: 'Youssef Samir', course: 'Math 1st Sec', status: 'Late', time: '09:15', grade: 12, parent: 'Samir Adel', phone: '01299887766', date: '2026-07-14' },
      { id: 'A004', name: 'Aya Mohamed', course: 'Biology 3rd Sec', status: 'Absent', time: '—', grade: 11, parent: 'Mohamed Salah', phone: '01033445566', date: '2026-07-14' },
      { id: 'A005', name: 'Kareem Adel', course: 'Physics 3rd Sec', status: 'Present', time: '08:50', grade: 10, parent: 'Adel Nour', phone: '01177889900', date: '2026-07-13' },
      { id: 'A006', name: 'Nadia Hassan', course: 'Chemistry 2nd Sec', status: 'Absent', time: '—', grade: 9, parent: 'Hassan Ali', phone: '01555667788', date: '2026-07-13' },
      { id: 'A007', name: 'Hossam Ibrahim', course: 'Math 1st Sec', status: 'Present', time: '08:47', grade: 12, parent: 'Ibrahim Nabil', phone: '01099887766', date: '2026-07-13' },
      { id: 'A008', name: 'Laila Mahmoud', course: 'Biology 3rd Sec', status: 'Late', time: '09:22', grade: 11, parent: 'Mahmoud Farouk', phone: '01222334455', date: '2026-07-12' },
      { id: 'A009', name: 'Omar Khaled', course: 'English 1st Sec', status: 'Present', time: '08:59', grade: 10, parent: 'Khaled Nabil', phone: '01133445566', date: '2026-07-12' },
      { id: 'A010', name: 'Rana Youssef', course: 'History 2nd Sec', status: 'Absent', time: '—', grade: 11, parent: 'Youssef Ibrahim', phone: '01055667788', date: '2026-07-12' },
      { id: 'A011', name: 'Hassan Mohamed', course: 'Physics 3rd Sec', status: 'Present', time: '08:52', grade: 12, parent: 'Mohamed Ali', phone: '01266778899', date: '2026-07-11' },
      { id: 'A012', name: 'Nour El-Din', course: 'Chemistry 2nd Sec', status: 'Late', time: '09:10', grade: 10, parent: 'El-Din Abdel', phone: '01077889900', date: '2026-07-11' },
   ];

   const filtered = records.filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.course.toLowerCase().includes(q) || r.parent.toLowerCase().includes(q);
      const matchStatus = !filters.status || r.status === filters.status;
      const matchCourse = !filters.course || r.course === filters.course;
      const matchDate = (!filters.dateFrom || r.date >= filters.dateFrom) && (!filters.dateTo || r.date <= filters.dateTo);
      return matchSearch && matchStatus && matchCourse && matchDate;
   });

   const totalPresent = filtered.filter(r => r.status === 'Present').length;
   const totalAbsent = filtered.filter(r => r.status === 'Absent').length;
   const totalLate = filtered.filter(r => r.status === 'Late').length;
   const avgRate = filtered.length ? Math.round(((totalPresent + totalLate) / filtered.length) * 100) : 0;
   const uniqueCourses = [...new Set(records.map(r => r.course))];

   const toggleSelect = (id) => {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      setSelectedIds(next);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(r => r.id)));
   };

   const statusIcon = (s) => {
      if (s === 'Present') return <Check size={14} className="text-[#34C759]" />;
      if (s === 'Late') return <Clock size={14} className="text-amber-500" />;
      return <X size={14} className="text-red-500" />;
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search by name, course, parent..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Courses</option>{uniqueCourses.map(c => <option key={c} value={c}>{c}</option>)}</select>
               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="Present">Present</option><option value="Late">Late</option><option value="Absent">Absent</option></select>
               <input type="date" value={filters.dateFrom} onChange={e => setFilters(f => ({ ...f, dateFrom: e.target.value }))} className="bg-white border border-[#D2D2D7] hover:border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 transition-all shadow-sm" title="From" />
               <input type="date" value={filters.dateTo} onChange={e => setFilters(f => ({ ...f, dateTo: e.target.value }))} className="bg-white border border-[#D2D2D7] hover:border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 transition-all shadow-sm" title="To" />
               <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {records.length}</span>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card title="Present" value={totalPresent} subtitle="Matching records" icon={ClipboardCheck} color="emerald" />
            <Card title="Absent" value={totalAbsent} subtitle="Matching records" icon={XCircle} color="red" />
            <Card title="Avg Attendance Rate" value={`${avgRate}%`} subtitle="Filter-based aggregation" icon={TrendingUp} color="blue" />
            <Card title="Late Arrivals" value={totalLate} subtitle="Matching records" icon={AlertTriangle} color="amber" />
         </div>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">

            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#34C759]/10 border-b border-[#34C759]/20 flex items-center gap-2 flex-wrap animate-fadeIn">
                  <span className="text-xs font-bold text-[#34C759] mr-2">{selectedIds.size} selected</span>
                  {['Mark Present', 'Mark Absent', 'Excuse', 'Notify Parent', 'Export'].map(action => (
                     <button key={action} className="px-4 py-2 bg-white hover:bg-[#34C759]/10 text-[#34C759] rounded-xl text-xs font-bold border-2 border-[#34C759]/30 transition-all hover:shadow-sm shadow-sm">{action}</button>
                  ))}
               </div>
            )}

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-[#F5F5F7]/80">
                        <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Student</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Grade</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Check-in</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(r => (
                        <tr key={r.id} className="hover:bg-[#F5F5F7]/50 transition-colors group">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(r.id)} onChange={() => toggleSelect(r.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-xs font-bold text-[#0071E3] shrink-0 transition-all group-">{r.name.split(' ').map(n => n[0]).join('')}</div>
                                 <div><span className="text-sm font-semibold text-[#1D1D1F]">{r.name}</span><span className="text-[10px] text-[#86868B] block">{r.parent}</span></div>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#1D1D1F]">{r.grade}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{r.course}</span></td>
                           <td className="px-4 py-4">
                              <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full w-fit ${r.status === 'Present' ? 'bg-[#34C759]/10 text-[#34C759]' : r.status === 'Late' ? 'bg-[#FF9500]/10 text-amber-600' : 'bg-red-50 text-red-600'}`}>
                                 {statusIcon(r.status)}{r.status}
                              </span>
                           </td>
                           <td className="px-4 py-4"><span className="text-xs font-mono text-[#86868B] bg-[#E8E8ED] px-2 py-1 rounded-lg">{r.time}</span></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5">
                                 {r.status === 'Absent' ? (
                                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#34C759]/10 text-[#34C759] hover:bg-[#34C759]/20">Mark Present</button>
                                 ) : r.status === 'Present' ? (
                                    <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100">Mark Absent</button>
                                 ) : (
                                    <>
                                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#34C759]/10 text-[#34C759] hover:bg-[#34C759]/20">✓</button>
                                       <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100">✗</button>
                                    </>
                                 )}
                                 <a href={`https://wa.me/20${r.phone.replace(/^0/, '')}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#34C759]/10 text-[#34C759] rounded-lg hover:bg-[#34C759]/20 transition-all"><MessageCircle size={14} /></a>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="px-5 py-3 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
               <span className="text-[11px] text-[#86868B]">{filtered.length} records · {records.filter(r => r.status !== 'Present').length} non-present today</span>
               <button className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><Download size={12} />Export</button>
            </div>
         </div>
      </>
   );
}

// ─── Module: Teacher Workspace ──────────────────────────────────────
function TeacherWorkspace() {
   const [search, setSearch] = useState('');
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [filters, setFilters] = useState({ course: '' });
   const [showAddTeacher, setShowAddTeacher] = useState(false);
   const [editingTeacher, setEditingTeacher] = useState(null);
   const [teacherForm, setTeacherForm] = useState({ name: '', course: '', phone: '', email: '', salary: '' });
   const [staff, setStaff] = useState([
      { id: 'T01', name: 'Dr. Mohamed', course: 'Physics', students: 124, courses: 3, hired: '2022', phone: '0101112233', email: 'mohamed@lumora.com', salary: 12000 },
      { id: 'T02', name: 'Ms. Fatima', course: 'Chemistry', students: 98, courses: 2, hired: '2023', phone: '0112223344', email: 'fatima@lumora.com', salary: 10000 },
      { id: 'T03', name: 'Mr. Khaled', course: 'Math', students: 112, courses: 2, hired: '2021', phone: '0123334455', email: 'khaled@lumora.com', salary: 15000 },
      { id: 'T04', name: 'Dr. Nour', course: 'Biology', students: 87, courses: 2, hired: '2022', phone: '0104445566', email: 'nour@lumora.com', salary: 11000 },
      { id: 'T05', name: 'Ms. Aya', course: 'English', students: 76, courses: 1, hired: '2024', phone: '0115556677', email: 'aya@lumora.com', salary: 8000 },
      { id: 'T06', name: 'Mr. Hassan', course: 'History', students: 53, courses: 1, hired: '2023', phone: '0126667788', email: 'hassan@lumora.com', salary: 9000 },
      { id: 'T07', name: 'Ms. Mona', course: 'Science', students: 91, courses: 2, hired: '2022', phone: '0107778899', email: 'mona@lumora.com', salary: 10500 },
      { id: 'T08', name: 'Mr. Tamer', course: 'Arabic', students: 64, courses: 1, hired: '2024', phone: '0118889900', email: 'tamer@lumora.com', salary: 8500 },
      { id: 'T09', name: 'Ms. Salma', course: 'French', students: 42, courses: 1, hired: '2023', phone: '0129990011', email: 'salma@lumora.com', salary: 7500 },
      { id: 'T10', name: 'Dr. Ahmed', course: 'Physics', students: 78, courses: 2, hired: '2021', phone: '0101112233', email: 'ahmed@lumora.com', salary: 13000 },
   ]);

   const filtered = staff.filter(t => {
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.course.toLowerCase().includes(q);
      const matchCourse = !filters.course || t.course === filters.course;
      return matchSearch && matchCourse;
   });

   const toggleSelect = (id) => {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      setSelectedIds(next);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(t => t.id)));
   };

   const openAddTeacher = () => {
      setEditingTeacher(null);
      setTeacherForm({ name: '', course: '', phone: '', email: '', salary: '' });
      setShowAddTeacher(true);
   };

   const openEditTeacher = (t) => {
      setEditingTeacher(t);
      setTeacherForm({ name: t.name, course: t.course, phone: t.phone, email: t.email, salary: String(t.salary) });
      setShowAddTeacher(true);
   };

   const handleSaveTeacher = () => {
      if (!teacherForm.name || !teacherForm.course) return;
      if (editingTeacher) {
         setStaff(staff.map(t => t.id === editingTeacher.id ? { ...t, ...teacherForm, salary: Number(teacherForm.salary) || 0 } : t));
      } else {
         const newId = `T${String(staff.length + 1).padStart(2, '0')}`;
         setStaff([...staff, { id: newId, name: teacherForm.name, course: teacherForm.course, students: 0, courses: 1, hired: new Date().getFullYear().toString(), phone: teacherForm.phone, email: teacherForm.email, salary: Number(teacherForm.salary) || 0 }]);
      }
      setShowAddTeacher(false);
      setEditingTeacher(null);
   };

   const handleDeleteTeacher = (id) => {
      setStaff(staff.filter(t => t.id !== id));
   };

   const teacherStats = {
      total: filtered.length,
      active: filtered.filter(t => t.students > 0).length,
      totalStudents: filtered.reduce((s, t) => s + t.students, 0),
      avgStudents: filtered.length ? Math.round(filtered.reduce((s, t) => s + t.students, 0) / filtered.length) : 0,
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search by name, course..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Subjects</option><option value="Physics">Physics</option><option value="Chemistry">Chemistry</option><option value="Math">Math</option><option value="Biology">Biology</option><option value="English">English</option></select>
               <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {staff.length}</span>
               <button onClick={openAddTeacher} className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><UserPlus size={14} />Add Teacher</button>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card title="Filtered Teachers" value={teacherStats.total} subtitle="Matching filters" icon={GraduationCap} color="violet" />
            <Card title="With Students" value={teacherStats.active} subtitle="Currently teaching" icon={UserCheck} color="emerald" />
            <Card title="Total Students" value={teacherStats.totalStudents} subtitle="Across filtered teachers" icon={Activity} color="blue" />
            <Card title="Avg Students/Teacher" value={teacherStats.avgStudents} subtitle="Filtered average" icon={TrendingUp} color="amber" />
         </div>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">

            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#0071E3]/10 border-b border-[#0071E3]/20 flex items-center gap-2 flex-wrap animate-fadeIn">
                  <span className="text-xs font-bold text-[#0071E3] mr-2">{selectedIds.size} selected</span>
                  {['Contact via WhatsApp', 'View Schedule', 'Assign Course', 'Export'].map(action => (
                     <button key={action} className="px-4 py-2 bg-white hover:bg-[#0071E3]/10 text-[#0071E3] rounded-xl text-xs font-bold border-2 border-[#D2D2D7] transition-all hover:shadow-sm shadow-sm">{action}</button>
                  ))}
               </div>
            )}

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-[#F5F5F7]/80">
                        <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Teacher</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Students</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Salary</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Since</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Contact</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(t => (
                        <tr key={t.id} className="hover:bg-[#F5F5F7]/50 transition-colors group">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(t.id)} onChange={() => toggleSelect(t.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-xs font-bold text-[#0071E3] shrink-0 transition-all group-">{t.name.split(' ').map(n => n[0]).join('')}</div>
                                 <div><span className="text-sm font-semibold text-[#1D1D1F]">{t.name}</span></div>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-xs font-semibold text-[#86868B]">{t.course}</span></td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#1D1D1F]">{t.students}</span></td>
                           <td className="px-4 py-4"><span className="text-sm font-semibold text-[#1D1D1F]">EGP {t.salary?.toLocaleString()}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">Since {t.hired}</span></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5">
                                 <a href={`tel:${t.phone}`} className="p-2 bg-[#E8E8ED] text-[#86868B] rounded-lg hover:bg-[#34C759]/10 hover:text-[#34C759] transition-all"><Phone size={14} /></a>
                                 <a href={`mailto:${t.email}`} className="p-2 bg-[#E8E8ED] text-[#86868B] rounded-lg hover:bg-[#0071E3]/10 hover:text-[#0071E3] transition-all"><Send size={14} /></a>
                              </div>
                           </td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-1.5">
                                 <button onClick={() => openEditTeacher(t)} className="p-2 bg-[#0071E3]/10 text-[#0071E3] rounded-lg hover:bg-[#0071E3]/20 transition-all"><Edit size={14} /></button>
                                 <button onClick={() => handleDeleteTeacher(t.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-all"><Trash2 size={14} /></button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="px-5 py-3 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
               <span className="text-[11px] text-[#86868B]">{filtered.length} teachers · Total students: {staff.reduce((s, t) => s + t.students, 0)}</span>
            </div>
         </div>

         {showAddTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddTeacher(false)}>
              <div className="bg-white w-full max-w-md rounded-[20px] shadow-xl animate-slideUp" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-6 pt-6 pb-3">
                  <h3 className="text-lg font-bold text-[#1D1D1F]">{editingTeacher ? 'Edit Teacher' : 'Add Teacher'}</h3>
                  <button onClick={() => setShowAddTeacher(false)} className="p-1.5 hover:bg-[#F5F5F7] rounded-lg"><X size={18} className="text-[#86868B]" /></button>
                </div>
                <div className="px-6 pb-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input value={teacherForm.name} onChange={e => setTeacherForm(f => ({ ...f, name: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="Dr. Ahmed" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Course</label>
                    <input value={teacherForm.course} onChange={e => setTeacherForm(f => ({ ...f, course: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="Physics" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Phone</label>
                      <input value={teacherForm.phone} onChange={e => setTeacherForm(f => ({ ...f, phone: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="0101112233" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Email</label>
                      <input value={teacherForm.email} onChange={e => setTeacherForm(f => ({ ...f, email: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="ahmed@lumora.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Monthly Salary (EGP)</label>
                    <input type="number" value={teacherForm.salary} onChange={e => setTeacherForm(f => ({ ...f, salary: e.target.value }))} className="w-full border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all" placeholder="10000" />
                  </div>
                  <button onClick={handleSaveTeacher}
                    className="w-full py-3 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all shadow-sm"
                  >{editingTeacher ? 'Save Changes' : 'Add Teacher'}</button>
                </div>
              </div>
            </div>
         )}
      </>
   );
}

// ─── Module: Assignments ───────────────────────────────────────────
function AssignmentsModule() {
   const [search, setSearch] = useState('');
   const [selectedIds, setSelectedIds] = useState(new Set());
    const [filters, setFilters] = useState({ course: '', teacher: '' });
    const AS = D.assignments;

   const filtered = AS.list.filter(a => {
      const q = search.toLowerCase();
      const m = !filters.course || a.course === filters.course;
      const mt = !filters.teacher || a.teacher === filters.teacher;
      return (!q || a.name.toLowerCase().includes(q) || a.course.toLowerCase().includes(q)) && m && mt;
   });

   const toggleSelect = (id) => {
      const n = new Set(selectedIds); n.has(id) ? n.delete(id) : n.add(id); setSelectedIds(n);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(a => a.id)));
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search assignments..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Courses</option>{[...new Set(AS.list.map(a => a.course))].map(c => <option key={c} value={c}>{c}</option>)}</select>
               <select value={filters.teacher} onChange={e => setFilters(f => ({ ...f, teacher: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Teachers</option>{[...new Set(AS.list.map(a => a.teacher))].map(t => <option key={t} value={t}>{t}</option>)}</select>
               <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {AS.list.length}</span>
               <button className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3]/10 hover:bg-[#0071E3]/20 text-[#0071E3] rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><FileSpreadsheet size={12} />Export</button>
             </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card title="Total Assignments" value={filtered.length} subtitle="Matching filters" icon={NotebookText} color="violet" />
            <Card title="Submitted" value={filtered.reduce((s, a) => s + a.submitted, 0)} subtitle="On-time submissions" icon={CheckCircle} color="emerald" />
            <Card title="Late Submissions" value={filtered.reduce((s, a) => s + a.lateCount, 0)} subtitle="Past deadline" icon={Clock} color="amber" />
            <Card title="Missing" value={filtered.reduce((s, a) => s + a.missingCount, 0)} subtitle="Not submitted" icon={XCircle} color="red" />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Submission Trend</h3>
               <div className="space-y-3">
                  {AS.submissionTrend.map((w, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#86868B] w-12">{w.label}</span>
                        <div className="flex-1 space-y-1">
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
                                 <div className="h-full bg-[#34C759] rounded-full" style={{ width: `${(w.submitted / 180) * 100}%` }}></div>
                              </div>
                              <span className="text-[10px] text-[#34C759] font-bold">{w.submitted}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden">
                                 <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(w.late / 30) * 100}%` }}></div>
                              </div>
                              <span className="text-[9px] text-amber-600">{w.late} late</span>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Average Grade per Assignment</h3>
               <div className="space-y-2">
                  {[...AS.list].sort((a, b) => b.avgScore - a.avgScore).map((a, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-[#86868B] flex-1 truncate">{a.name}</span>
                        <div className="w-16 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                           <div className={`h-full rounded-full ${a.avgScore >= 80 ? 'bg-[#34C759]' : a.avgScore >= 70 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${a.avgScore}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-[#86868B] w-8 text-right">{a.avgScore}%</span>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Late Submission Rate</h3>
               <div className="space-y-2">
                  {[...AS.list].sort((a, b) => (b.lateCount / b.total) - (a.lateCount / a.total)).map((a, i) => {
                     const rate = Math.round((a.lateCount / a.total) * 100);
                     return (
                        <div key={i} className="flex items-center gap-3">
                           <span className="text-xs text-[#86868B] flex-1 truncate">{a.name}</span>
                           <div className="w-16 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${rate < 10 ? 'bg-[#34C759]' : rate < 20 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${rate}%` }}></div>
                           </div>
                           <span className="text-xs font-bold text-[#86868B] w-10 text-right">{rate}%</span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">
            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#0071E3]/10 border-b border-[#0071E3]/20 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#0071E3] mr-2">{selectedIds.size} selected</span>
                  {['Grade', 'Notify', 'Extend Deadline', 'Export'].map(a => <button key={a} className="px-3 py-1.5 bg-white hover:bg-[#0071E3]/10 text-[#0071E3] rounded-xl text-[10px] font-bold border border-[#D2D2D7] transition-all">{a}</button>)}
               </div>
            )}
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead><tr className="bg-[#F5F5F7]/80">
                     <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Assignment</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Teacher</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Due</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Submitted</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Late</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Missing</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Avg Score</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(a => (
                        <tr key={a.id} className="hover:bg-[#F5F5F7]/50 transition-colors">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(a.id)} onChange={() => toggleSelect(a.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4"><span className="text-sm font-semibold text-[#1D1D1F]">{a.name}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{a.course}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{a.teacher}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{a.due}</span></td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#34C759]">{a.submitted}</span></td>
                           <td className="px-4 py-4"><span className="text-xs font-bold text-amber-600">{a.lateCount}</span></td>
                           <td className="px-4 py-4"><span className="text-xs font-bold text-red-500">{a.missingCount}</span></td>
                           <td className="px-4 py-4"><span className={`text-xs font-bold ${a.avgScore >= 80 ? 'text-[#34C759]' : a.avgScore >= 70 ? 'text-amber-600' : 'text-red-500'}`}>{a.avgScore}%</span></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="px-5 py-3 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
               <span className="text-[11px] text-[#86868B]">{filtered.length} assignments · Avg grade: {Math.round(AS.list.reduce((s, a) => s + a.avgScore, 0) / AS.list.length)}%</span>
            </div>
         </div>
      </>
   );
}

// ─── Module: Scheduling Calendar ────────────────────────────────────
// ─── Module: Exams & Grades ─────────────────────────────────────────
function ExamsGrades() {
   const [search, setSearch] = useState('');
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [filters, setFilters] = useState({ status: '', subject: '', teacher: '' });
   const exams = [
      { id: 'E01', name: 'Physics Midterm', subject: 'Physics', teacher: 'Dr. Mohamed', date: '20 July', students: 124, avgScore: 68, passRate: 72, topScore: 97, status: 'Grading' },
      { id: 'E02', name: 'Chemistry Quiz 2', subject: 'Chemistry', teacher: 'Ms. Fatima', date: '22 July', students: 98, avgScore: 74, passRate: 78, topScore: 100, status: 'Grading' },
      { id: 'E03', name: 'Math Final Exam', subject: 'Math', teacher: 'Mr. Khaled', date: '28 July', students: 112, avgScore: '—', passRate: '—', topScore: '—', status: 'Upcoming' },
      { id: 'E04', name: 'Biology Lab Test', subject: 'Biology', teacher: 'Dr. Nour', date: '25 July', students: 87, avgScore: '—', passRate: '—', topScore: '—', status: 'Upcoming' },
      { id: 'E05', name: 'English Midterm', subject: 'English', teacher: 'Ms. Aya', date: '18 July', students: 76, avgScore: 81, passRate: 88, topScore: 98, status: 'Graded' },
      { id: 'E06', name: 'History Quiz', subject: 'History', teacher: 'Mr. Hassan', date: '15 July', students: 53, avgScore: 72, passRate: 75, topScore: 94, status: 'Graded' },
      { id: 'E07', name: 'Science Midterm', subject: 'Science', teacher: 'Ms. Mona', date: '30 July', students: 91, avgScore: '—', passRate: '—', topScore: '—', status: 'Upcoming' },
      { id: 'E08', name: 'Physics Weekly Test', subject: 'Physics', teacher: 'Dr. Mohamed', date: '14 July', students: 124, avgScore: 65, passRate: 68, topScore: 92, status: 'Graded' },
      { id: 'E09', name: 'Chemistry Lab Report', subject: 'Chemistry', teacher: 'Ms. Fatima', date: '12 July', students: 98, avgScore: 77, passRate: 82, topScore: 96, status: 'Graded' },
      { id: 'E10', name: 'Arabic Final', subject: 'Arabic', teacher: 'Mr. Tamer', date: '2 Aug', students: 64, avgScore: '—', passRate: '—', topScore: '—', status: 'Upcoming' },
   ];
   const filtered = exams.filter(e => {
      const q = search.toLowerCase();
      const matchSearch = !q || e.name.toLowerCase().includes(q) || e.subject.toLowerCase().includes(q) || e.teacher.toLowerCase().includes(q);
      const matchStatus = !filters.status || e.status === filters.status;
      const matchSubject = !filters.subject || e.subject === filters.subject;
      const matchTeacher = !filters.teacher || e.teacher === filters.teacher;
      return matchSearch && matchStatus && matchSubject && matchTeacher;
   });

   const toggleSelect = (id) => {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      setSelectedIds(next);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(e => e.id)));
   };

   const gradeColor = (score) => {
      if (score === '—') return 'text-[#86868B]';
      if (score >= 85) return 'text-[#34C759]';
      if (score >= 70) return 'text-amber-600';
      return 'text-red-500';
   };

   const examStats = {
      total: filtered.length,
      upcoming: filtered.filter(e => e.status === 'Upcoming').length,
      grading: filtered.filter(e => e.status === 'Grading').length,
      graded: filtered.filter(e => e.status === 'Graded').length,
      avgScore: filtered.filter(e => e.avgScore !== '—').length
         ? Math.round(filtered.filter(e => e.avgScore !== '—').reduce((s, e) => s + e.avgScore, 0) / filtered.filter(e => e.avgScore !== '—').length)
         : 0,
   };

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search exams, subjects, teachers..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="Upcoming">Upcoming</option><option value="Grading">Grading</option><option value="Graded">Graded</option></select>
               <select value={filters.subject} onChange={e => setFilters(f => ({ ...f, subject: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Subjects</option><option value="Physics">Physics</option><option value="Chemistry">Chemistry</option><option value="Math">Math</option><option value="Biology">Biology</option><option value="English">English</option></select>
               <select value={filters.teacher} onChange={e => setFilters(f => ({ ...f, teacher: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Teachers</option><option value="Dr. Mohamed">Dr. Mohamed</option><option value="Ms. Fatima">Ms. Fatima</option><option value="Mr. Khaled">Mr. Khaled</option><option value="Dr. Nour">Dr. Nour</option></select>
                <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {exams.length}</span>
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
             <Card title="Upcoming Exams" value={examStats.upcoming} subtitle="Scheduled this month" icon={FileText} color="red" />
            <Card title="Currently Grading" value={examStats.grading} subtitle="Submissions under review" icon={Clock} color="amber" />
            <Card title="Graded" value={examStats.graded} subtitle="Results published" icon={CheckCircle} color="emerald" />
            <Card title="Avg Score (Filtered)" value={`${examStats.avgScore}%`} subtitle="Across filtered exams" icon={Award} color="violet" />
         </div>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">

            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#FF9500]/10 border-b border-amber-100 flex items-center gap-2 flex-wrap animate-fadeIn">
                  <span className="text-xs font-bold text-amber-700 mr-2">{selectedIds.size} selected</span>
                  {['Grade Now', 'Publish Results', 'Notify Students', 'Export Scores', 'Archive'].map(action => (
                     <button key={action} className="px-3 py-1.5 bg-white hover:bg-[#FF9500]/10 text-amber-600 rounded-xl text-[10px] font-bold border border-amber-200 transition-all hover:shadow-sm">{action}</button>
                  ))}
               </div>
            )}

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-[#F5F5F7]/80">
                        <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Exam</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Subject</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Teacher</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Date</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Students</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Avg Score</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Pass Rate</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(e => (
                        <tr key={e.id} className="hover:bg-[#F5F5F7]/50 transition-colors group">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(e.id)} onChange={() => toggleSelect(e.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-xs font-bold text-amber-600 shrink-0 transition-all group-">
                                    {e.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                                 </div>
                                 <span className="text-sm font-semibold text-[#1D1D1F]">{e.name}</span>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{e.subject}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{e.teacher}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{e.date}</span></td>
                           <td className="px-4 py-4"><span className="text-sm font-bold text-[#1D1D1F]">{e.students}</span></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                 <span className={`text-sm font-bold ${gradeColor(e.avgScore)}`}>{e.avgScore}{e.avgScore !== '—' ? '%' : ''}</span>
                                 {e.avgScore !== '—' && (
                                    <div className="w-10 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                                       <div className={`h-full rounded-full ${e.avgScore >= 85 ? 'bg-[#34C759]' : e.avgScore >= 70 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${e.avgScore}%` }}></div>
                                    </div>
                                 )}
                              </div>
                           </td>
                           <td className="px-4 py-4">
                              {e.passRate !== '—' ? (
                                 <span className={`text-xs font-bold ${e.passRate >= 80 ? 'text-[#34C759]' : e.passRate >= 70 ? 'text-amber-600' : 'text-red-500'}`}>{e.passRate}%</span>
                              ) : <span className="text-xs text-[#86868B]">—</span>}
                           </td>
                           <td className="px-4 py-4">
                              <span className={`text-xs font-bold px-3 py-1 rounded-full ${e.status === 'Grading' ? 'bg-[#FF9500]/10 text-amber-600' : e.status === 'Graded' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-blue-50 text-blue-600'}`}>{e.status}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

             <div className="px-5 py-3 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
                <span className="text-[11px] text-[#86868B]">{filtered.length} exams · {filtered.filter(e => e.status === 'Grading').length} pending grading</span>
             </div>
           </div>
        </>
     );
  }

  // ─── Module: Homework Hub ───────────────────────────────────────────
  // ─── Module: Parent Portal ──────────────────────────────────────────
  // ─── Module: Student Portal ─────────────────────────────────────────
  // ─── Module: Course Analytics ──────────────────────────────────────
function CourseAnalytics() {
   const [search, setSearch] = useState('');
   const [filters, setFilters] = useState({ teacher: '', minEnrolled: '', course: '' });

   const filtered = D.courseAnalytics.perCourse.filter(c => {
      const q = search.toLowerCase();
      const m = !filters.teacher || c.teacher === filters.teacher;
      const me = !filters.minEnrolled || c.enrolled >= parseInt(filters.minEnrolled);
      const mc = !filters.course || c.name === filters.course;
      return (!q || c.name.toLowerCase().includes(q)) && m && me && mc;
   });

   const sortedByEnrolled = [...D.courseAnalytics.perCourse].sort((a, b) => b.enrolled - a.enrolled);
   const sortedByCompletion = [...D.courseAnalytics.perCourse].sort((a, b) => b.completion - a.completion);

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.teacher} onChange={e => setFilters(f => ({ ...f, teacher: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Teachers</option>{[...new Set(D.courseAnalytics.perCourse.map(c => c.teacher))].map(t => <option key={t} value={t}>{t}</option>)}</select>
               <select value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Courses</option>{[...new Set(D.courseAnalytics.perCourse.map(c => c.name))].map(c => <option key={c} value={c}>{c}</option>)}</select>
               <select value={filters.minEnrolled} onChange={e => setFilters(f => ({ ...f, minEnrolled: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Sizes</option><option value="100">100+ students</option><option value="80">80+ students</option><option value="50">50+ students</option></select>
               <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {D.courseAnalytics.perCourse.length}</span>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card title="Total Courses" value={filtered.length} subtitle="Matching filters" icon={BookOpen} color="violet" />
            <Card title="Active Courses" value={D.courses.active} subtitle="Currently running" icon={Layers} color="emerald" />
            <Card title="Finished Courses" value={D.courses.finished} subtitle="Completed this term" icon={CheckCircle} color="blue" />
            <Card title="Avg Attendance" value={filtered.length ? `${Math.round(filtered.reduce((s, c) => s + c.attendance, 0) / filtered.length)}%` : '0%'} subtitle="Filtered average" icon={ClipboardCheck} color="amber" />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Most Popular Courses</h3>
               <div className="space-y-2.5">
                  {sortedByEnrolled.slice(0, 5).map((c, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#86868B] w-5">{i + 1}</span>
                        <div className="flex-1">
                           <div className="flex justify-between mb-0.5"><span className="text-xs text-[#1D1D1F] truncate">{c.name}</span><span className="text-xs font-bold text-[#0071E3]">{c.enrolled}</span></div>
                           <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden"><div className="h-full bg-[#0071E3] rounded-full" style={{ width: `${(c.enrolled / 124) * 100}%` }}></div></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Highest Completion</h3>
               <div className="space-y-2.5">
                  {sortedByCompletion.slice(0, 5).map((c, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#86868B] w-5">{i + 1}</span>
                        <div className="flex-1">
                           <div className="flex justify-between mb-0.5"><span className="text-xs text-[#1D1D1F] truncate">{c.name}</span><span className="text-xs font-bold text-[#34C759]">{c.completion}%</span></div>
                           <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden"><div className="h-full bg-[#34C759] rounded-full" style={{ width: `${c.completion}%` }}></div></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Lowest Completion</h3>
               <div className="space-y-2.5">
                  {sortedByCompletion.slice(-5).reverse().map((c, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <span className="text-xs font-bold text-[#86868B] w-5">{i + 1}</span>
                        <div className="flex-1">
                           <div className="flex justify-between mb-0.5"><span className="text-xs text-[#1D1D1F] truncate">{c.name}</span><span className="text-xs font-bold text-red-500">{c.completion}%</span></div>
                           <div className="h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden"><div className="h-full bg-red-400 rounded-full" style={{ width: `${c.completion}%` }}></div></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead><tr className="bg-[#F5F5F7]/80">
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Teacher</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Enrolled</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Completion</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Avg Quiz</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Avg Exam</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Assignment</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Attendance</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Revenue</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map((c, i) => (
                        <tr key={i} className="hover:bg-[#F5F5F7]/50 transition-colors">
                           <td className="px-5 py-3.5"><span className="text-sm font-semibold text-[#1D1D1F]">{c.name}</span></td>
                           <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{c.teacher}</span></td>
                           <td className="px-4 py-3.5"><span className="text-sm font-bold text-[#1D1D1F]">{c.enrolled}</span></td>
                           <td className="px-4 py-3.5"><div className="flex items-center gap-1.5"><div className="w-12 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden"><div className={`h-full rounded-full ${c.completion >= 80 ? 'bg-[#34C759]' : c.completion >= 70 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${c.completion}%` }}></div></div><span className="text-[10px] font-bold text-[#86868B]">{c.completion}%</span></div></td>
                           <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{c.avgQuiz}%</span></td>
                           <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{c.avgExam}%</span></td>
                           <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{c.avgAssignment}%</span></td>
                           <td className="px-4 py-3.5"><span className={`text-xs font-bold ${c.attendance >= 85 ? 'text-[#34C759]' : c.attendance >= 75 ? 'text-amber-600' : 'text-red-500'}`}>{c.attendance}%</span></td>
                           <td className="px-4 py-3.5"><span className="text-xs font-bold text-[#1D1D1F]">{c.revenue.toLocaleString()} EGP</span></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </>
   );
}

// ─── Module: Live Meetings ─────────────────────────────────────────
function LiveMeetings() {
   const [search, setSearch] = useState('');
   const [filters, setFilters] = useState({ status: '', teacher: '', course: '' });
   const M = D.meetings;

   const filtered = M.list.filter(m => {
      const q = search.toLowerCase();
      const ms = !filters.status || m.status === filters.status;
      const mt = !filters.teacher || m.teacher === filters.teacher;
      const mc = !filters.course || m.course === filters.course;
      return (!q || m.title.toLowerCase().includes(q) || m.course.toLowerCase().includes(q)) && ms && mt && mc;
   });

   return (
      <>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-5 mb-6 animate-fadeIn">
            <div className="flex items-center gap-3 flex-wrap">
               <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                  <Search size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" placeholder="Search meetings..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
               </div>
               <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="upcoming">Upcoming</option><option value="completed">Completed</option></select>
               <select value={filters.teacher} onChange={e => setFilters(f => ({ ...f, teacher: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Teachers</option>{[...new Set(M.list.map(m => m.teacher))].map(t => <option key={t} value={t}>{t}</option>)}</select>
               <select value={filters.course} onChange={e => setFilters(f => ({ ...f, course: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Courses</option>{[...new Set(M.list.map(m => m.course))].map(c => <option key={c} value={c}>{c}</option>)}</select>
                <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {M.list.length}</span>
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
             <Card title="Filtered Meetings" value={filtered.length} subtitle="Matching filters" icon={Video} color="violet" />
            <Card title="Upcoming" value={filtered.filter(m => m.status === 'upcoming').length} subtitle="Scheduled" icon={Calendar} color="blue" />
            <Card title="Completed" value={filtered.filter(m => m.status === 'completed').length} subtitle="Held successfully" icon={CheckCircle} color="emerald" />
            <Card title="Total Attendees" value={filtered.reduce((s, m) => s + m.attendees, 0)} subtitle="Across filtered meetings" icon={Users} color="amber" />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Meetings per Month</h3>
               <div className="flex items-end gap-2 h-32">
{D.meetings.meetingsPerMonth.map((v, i) => {
                      const max = Math.max(...D.meetings.meetingsPerMonth);
                     return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                           <span className="text-[8px] font-bold text-[#86868B] opacity-0 group-hover:opacity-100">{v}</span>
                           <div className="w-full bg-[#F5F5F7] rounded-lg overflow-hidden flex-1 flex items-end">
                              <div className="w-full bg-[#0071E3] rounded-lg group-hover:opacity-80" style={{ height: `${(v / max) * 100}%` }}></div>
                           </div>
                           <span className="text-[8px] text-[#86868B]">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A'][i]}</span>
                        </div>
                     );
                  })}
               </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm p-6 lg:col-span-2">
               <h3 className="text-sm font-bold text-[#1D1D1F] mb-4">Student Attendance per Meeting</h3>
               <div className="space-y-2.5">
                  {M.list.filter(m => m.status === 'completed').map((m, i) => {
                     const pct = Math.round((m.attendees / m.capacity) * 100);
                     return (
                        <div key={i} className="flex items-center gap-3">
                           <span className="text-xs text-[#86868B] flex-1 truncate">{m.title}</span>
                           <span className="text-[10px] text-[#86868B] w-10">{m.attendees}/{m.capacity}</span>
                           <div className="w-20 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${pct >= 80 ? 'bg-[#34C759]' : pct >= 60 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                           </div>
                           <span className="text-xs font-bold text-[#86868B] w-8 text-right">{pct}%</span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>

         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead><tr className="bg-[#F5F5F7]/80">
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Meeting</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Course</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Teacher</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Date</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Duration</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Attendees</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Attendance</th>
                     <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(m => {
                        const pct = m.attendees > 0 ? Math.round((m.attendees / m.capacity) * 100) : 0;
                        return (
                           <tr key={m.id} className="hover:bg-[#F5F5F7]/50 transition-colors">
                              <td className="px-5 py-3.5"><span className="text-sm font-semibold text-[#1D1D1F]">{m.title}</span></td>
                              <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{m.course}</span></td>
                              <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{m.teacher}</span></td>
                              <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{m.date}<br /><span className="text-[10px] text-[#86868B]">{m.time}</span></span></td>
                              <td className="px-4 py-3.5"><span className="text-xs text-[#86868B]">{m.duration} min</span></td>
                              <td className="px-4 py-3.5"><span className="text-sm font-bold text-[#1D1D1F]">{m.attendees}</span></td>
                              <td className="px-4 py-3.5">
                                 {m.attendees > 0 ? (
                                    <div className="flex items-center gap-1.5">
                                       <div className="w-12 h-1.5 bg-[#E8E8ED] rounded-full overflow-hidden">
                                          <div className={`h-full rounded-full ${pct >= 80 ? 'bg-[#34C759]' : pct >= 60 ? 'bg-[#FF9500]' : 'bg-red-500'}`} style={{ width: `${pct}%` }}></div>
                                       </div>
                                       <span className="text-[10px] font-bold text-[#86868B]">{pct}%</span>
                                    </div>
                                 ) : <span className="text-[10px] text-[#86868B]">—</span>}
                              </td>
                              <td className="px-4 py-3.5">
                                 <span className={`text-xs font-bold px-3 py-1 rounded-full ${m.status === 'completed' ? 'bg-[#34C759]/10 text-[#34C759]' : m.status === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>{m.status}</span>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </div>
          </div>

        </>
     );
  }

 // ─── Module: Employee Payroll ───────────────────────────────────────
function EmployeePayroll() {
   const [search, setSearch] = useState('');
   const [selectedIds, setSelectedIds] = useState(new Set());
   const [filters, setFilters] = useState({ status: '', role: '', department: '' });
   const staff = [
      { id: 'P01', name: 'Dr. Mohamed', role: 'Lead Instructor', dept: 'Academic', salary: 12000, bank: 'CIB ****1234', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P02', name: 'Ms. Fatima', role: 'Chemistry Teacher', dept: 'Academic', salary: 8500, bank: 'QNB ****5678', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P03', name: 'Mr. Khaled', role: 'Math Teacher', dept: 'Academic', salary: 8500, bank: 'BM ****9012', paidDate: '—', status: 'Pending' },
      { id: 'P04', name: 'Ms. Aya', role: 'English Teacher', dept: 'Academic', salary: 6500, bank: 'CIB ****3456', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P05', name: 'Sarah Ahmed', role: 'Receptionist', dept: 'Admin', salary: 4000, bank: 'QNB ****7890', paidDate: '—', status: 'Pending' },
      { id: 'P06', name: 'Omar Khaled', role: 'Assistant', dept: 'Admin', salary: 3500, bank: 'BM ****2345', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P07', name: 'Nour El-Din', role: 'Accountant', dept: 'Finance', salary: 7000, bank: 'CIB ****6789', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P08', name: 'Laila Mahmoud', role: 'Receptionist', dept: 'Admin', salary: 4000, bank: 'QNB ****0123', paidDate: '—', status: 'Pending' },
      { id: 'P09', name: 'Dr. Nour', role: 'Biology Teacher', dept: 'Academic', salary: 9000, bank: 'BM ****4567', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P10', name: 'Mr. Hassan', role: 'History Teacher', dept: 'Academic', salary: 6000, bank: 'CIB ****8901', paidDate: '25 June 2026', status: 'Paid' },
      { id: 'P11', name: 'Ms. Mona', role: 'Science Teacher', dept: 'Academic', salary: 7500, bank: 'QNB ****2345', paidDate: '—', status: 'Pending' },
      { id: 'P12', name: 'Mr. Tamer', role: 'Arabic Teacher', dept: 'Academic', salary: 6500, bank: 'BM ****6789', paidDate: '25 June 2026', status: 'Paid' },
   ];

   const filtered = staff.filter(s => {
      const q = search.toLowerCase();
      const matchSearch = !q || s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q);
      const matchStatus = !filters.status || s.status === filters.status;
      const matchRole = !filters.role || s.role === filters.role;
      const matchDept = !filters.department || s.dept === filters.department;
      return matchSearch && matchStatus && matchRole && matchDept;
   });

   const toggleSelect = (id) => {
      const next = new Set(selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      setSelectedIds(next);
   };
   const toggleAll = () => {
      if (selectedIds.size === filtered.length) setSelectedIds(new Set());
      else setSelectedIds(new Set(filtered.map(s => s.id)));
   };

   const paidCount = staff.filter(s => s.status === 'Paid').length;
   const pendingTotal = staff.filter(s => s.status === 'Pending').reduce((sum, s) => sum + s.salary, 0);

   return (
      <>
         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <Card title="Total Staff" value={D.payroll.staff} subtitle="All employees" icon={Users} color="violet" />
            <Card title="Pending Salaries" value={D.payroll.pendingSalaries} subtitle="Awaiting disbursement" icon={Clock} color="amber" />
            <Card title="Monthly Burn" value={`${D.payroll.monthlyBurn.toLocaleString()} EGP`} subtitle="Total payroll cost" icon={PiggyBank} color="red" />
            <Card title="Next Payment" value={D.payroll.nextPay} subtitle="Scheduled date" icon={Calendar} color="emerald" />
         </div>
         <div className="bg-white rounded-xl border border-[#E8E8ED] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-50">
               <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 bg-[#E8E8ED] rounded-2xl px-5 py-3 flex-1 min-w-[220px] focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all shadow-sm">
                     <Search size={16} className="text-[#86868B] shrink-0" />
                     <input type="text" placeholder="Search by name, role, department..." value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent text-sm text-[#86868B] placeholder-slate-400 outline-none w-full" />
                  </div>
                  <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Status</option><option value="Paid">Paid</option><option value="Pending">Pending</option></select>
                  <select value={filters.role} onChange={e => setFilters(f => ({ ...f, role: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Roles</option><option value="Lead Instructor">Lead Instructor</option><option value="Teacher">Teacher</option><option value="Receptionist">Receptionist</option><option value="Accountant">Accountant</option></select>
                  <select value={filters.department} onChange={e => setFilters(f => ({ ...f, department: e.target.value }))} className="bg-white border border-[#D2D2D7] rounded-xl px-4 py-3 text-sm font-medium text-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]/30 cursor-pointer hover:border-[#D2D2D7] transition-all shadow-sm"><option value="">All Departments</option><option value="Academic">Academic</option><option value="Admin">Admin</option><option value="Finance">Finance</option></select>
                  <span className="text-xs text-[#86868B] ml-auto">{filtered.length} of {staff.length}</span>
               </div>
            </div>

            {selectedIds.size > 0 && (
               <div className="px-5 py-3 bg-[#34C759]/10 border-b border-[#34C759]/20 flex items-center gap-2 flex-wrap animate-fadeIn">
                  <span className="text-xs font-bold text-[#34C759] mr-2">{selectedIds.size} selected</span>
                  {['Pay Now', 'Pay All', 'Export Payroll', 'Edit', 'View History'].map(action => (
                     <button key={action} className="px-4 py-2 bg-white hover:bg-[#34C759]/10 text-[#34C759] rounded-xl text-xs font-bold border-2 border-[#34C759]/30 transition-all hover:shadow-sm shadow-sm">{action}</button>
                  ))}
               </div>
            )}

            <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="bg-[#F5F5F7]/80">
                        <th className="w-10 px-4 py-4"><input type="checkbox" checked={selectedIds.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded cursor-pointer accent-[#0071E3]" /></th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Employee</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Role</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Department</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Salary</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Bank Account</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Last Paid</th>
                        <th className="text-left text-xs font-medium text-[#86868B] px-4 py-3 whitespace-nowrap">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {filtered.map(s => (
                        <tr key={s.id} className="hover:bg-[#F5F5F7]/50 transition-colors group">
                           <td className="px-4 py-4" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedIds.has(s.id)} onChange={() => toggleSelect(s.id)} className="rounded cursor-pointer accent-[#0071E3]" /></td>
                           <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-xs font-bold text-blue-600 shrink-0 transition-all group-">{s.name.split(' ').map(n => n[0]).join('')}</div>
                                 <span className="text-sm font-semibold text-[#1D1D1F]">{s.name}</span>
                              </div>
                           </td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{s.role}</span></td>
                           <td className="px-4 py-4"><span className="text-[10px] font-medium text-[#86868B] bg-[#F5F5F7] px-2 py-1 rounded-lg">{s.dept}</span></td>
                           <td className="px-4 py-4">
                              <span className="text-sm font-bold text-[#1D1D1F]">{s.salary.toLocaleString()} EGP</span>
                           </td>
                           <td className="px-4 py-4"><span className="text-[10px] font-mono text-[#86868B] bg-[#E8E8ED] px-2 py-1 rounded-lg">{s.bank}</span></td>
                           <td className="px-4 py-4"><span className="text-xs text-[#86868B]">{s.paidDate}</span></td>
                           <td className="px-4 py-4">
                              <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.status === 'Paid' ? 'bg-[#34C759]/10 text-[#34C759]' : 'bg-[#FF9500]/10 text-amber-600'}`}>{s.status}</span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            <div className="px-5 py-3 border-t border-slate-50 bg-[#F5F5F7]/50 flex items-center justify-between">
               <span className="text-[11px] text-[#86868B]">{filtered.length} employees · {paidCount} paid · {pendingTotal.toLocaleString()} EGP pending</span>
               <button className="flex items-center gap-1.5 px-5 py-3 bg-[#0071E3] hover:bg-[#0071E3]/90 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow-sm transition-all"><DollarSign size={12} />Process Payroll</button>
            </div>
         </div>
      </>
   );
}

// ─── Module: Inventory Stock ────────────────────────────────────────
// ─── Module Renderer ────────────────────────────────────────────────
function renderModule(tab, setTab = () => { }) {
   switch (tab) {
      case 'overview-analytics': return <OverviewAnalytics setTab={setTab} />;
      case 'student-analytics': return <StudentManagement />;
      case 'finance': return <FinanceModule />;
      case 'attendance-tracker': return <AttendanceTracker />;
      case 'teacher-workspace': return <TeacherWorkspace />;
      case 'course-analytics': return <CourseAnalytics />;
      case 'exams-grades': return <ExamsGrades />;
      case 'assignments': return <AssignmentsModule />;
      case 'live-meetings': return <LiveMeetings />;

      default: return <OverviewAnalytics setTab={() => { }} />;
   }
}

// ─── Global Search Modal ────────────────────────────────────────────
// ─── Main Dashboard ─────────────────────────────────────────────────
export default function AdminDashboard() {
   const [activeTab, setActiveTab] = useState('overview-analytics');
   const [showNotifications, setShowNotifications] = useState(false);
   const [globalSearch, setGlobalSearch] = useState(false);
   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
   const [showProfileMenu, setShowProfileMenu] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   const [searchResults, setSearchResults] = useState({ students: [], teachers: [], courses: [], payments: [], exams: [], assignments: [] });
   const searchRef = useRef(null);
   const navRef = useRef(null);
   const navigate = useNavigate();
   const location = useLocation();

   const activeTabConfig = TABS.find(t => t.id === activeTab) || TABS[0];

   const isDashboard = location.pathname === '/admin' || location.pathname === '/admin/' || location.pathname === '/admin/dashboard';

   useEffect(() => {
      if (navRef.current) {
         const btn = navRef.current.querySelector(`[data-tab="${activeTab}"]`);
         if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
   }, [activeTab]);

   useEffect(() => {
      if (!searchQuery.trim()) {
         setSearchResults({ students: [], teachers: [], courses: [], payments: [], exams: [], assignments: [] });
         return;
      }
      const q = searchQuery.toLowerCase();
      setSearchResults({
         students: studentsList.filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.parent.toLowerCase().includes(q)).slice(0, 4),
         teachers: D.leaderboards.topTeachers.filter(t => t.name.toLowerCase().includes(q)),
         courses: D.courseEnrollments.filter(c => c.course.toLowerCase().includes(q)),
         payments: D.paymentTickets.filter(t => t.student.toLowerCase().includes(q) || t.course.toLowerCase().includes(q)).slice(0, 4),
         exams: [{ name: 'Physics Midterm', subject: 'Physics' }, { name: 'Chemistry Quiz', subject: 'Chemistry' }].filter(e => e.name.toLowerCase().includes(q)),
         assignments: D.assignments.list.filter(a => a.name.toLowerCase().includes(q) || a.course.toLowerCase().includes(q)).slice(0, 3),
      });
   }, [searchQuery]);

   useEffect(() => {
      const handler = (e) => {
         if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchRef.current?.focus();
         }
         if (e.key === 'Escape') {
            setSearchQuery('');
            searchRef.current?.blur();
         }
      };
      window.addEventListener('keydown', handler);
      return () => window.removeEventListener('keydown', handler);
   }, []);

   const ADMIN_SIDEBAR_ITEMS = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
      { id: 'courses', label: 'Courses', icon: BookOpen, path: '/admin/courses' },
      { id: 'workspace', label: 'Workspace', icon: GraduationCap, path: '/admin/workspace' },
      { id: 'meetings', label: 'Live Meetings', icon: Video, path: '/admin/meetings' },
      { id: 'question-bank', label: 'Question Bank', icon: FileText, path: '/admin/question-bank' },
      { id: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/notifications' },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
   ];

   return (
      <div className="min-h-screen bg-[#F5F5F7] font-sans text-[#1D1D1F] flex text-base">

          {/* ─── Admin Sidebar ─── */}
          <aside className={`sidebar-desktop ${sidebarCollapsed ? 'w-[72px]' : 'w-[220px]'} fixed left-0 top-0 h-screen bg-white border-r border-[#E8E8ED] flex flex-col transition-all duration-300 z-50`}>
            <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-50">
               <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/Lumora.png" alt="Lumora" className="w-full h-full object-cover" />
               </div>
               {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                     <h1 className="text-base font-bold text-[#1D1D1F] truncate">Lumora</h1>
                     <p className="text-xs text-[#86868B] truncate">Admin Panel</p>
                  </div>
               )}
               <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="p-1.5 hover:bg-[#D2D2D7] rounded-lg text-[#86868B] hover:text-[#86868B] transition-colors shrink-0">
                  {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
               </button>
            </div>

            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
               {ADMIN_SIDEBAR_ITEMS.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path || (item.id === 'dashboard' && isDashboard);
                  return (
                     <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}
                        title={sidebarCollapsed ? item.label : undefined}
                     >
                        <Icon size={sidebarCollapsed ? 22 : 20} className="shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                     </button>
                  );
               })}
            </nav>

            <div className="p-3 border-t border-slate-50">
                <button onClick={() => navigate('/login')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#86868B] hover:bg-[#D2D2D7] hover:text-red-500 transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}>
                   <LogOut size={20} />
                   {!sidebarCollapsed && <span className="truncate">Logout</span>}
                </button>
            </div>
         </aside>

          {/* ─── Mobile Sidebar ─── */}
          {mobileMenuOpen && (
            <div className="sidebar-mobile-overlay lg:hidden" onClick={() => setMobileMenuOpen(false)} />
          )}
          <aside className={`sidebar-mobile-drawer lg:hidden ${mobileMenuOpen ? 'open' : 'closed'}`}>
            <div className="flex items-center justify-between px-4 h-16 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <img src="/Lumora.png" alt="Lumora" className="w-9 h-9 rounded-lg object-cover" />
                <div>
                  <h1 className="text-sm font-bold text-[#1D1D1F]">Lumora</h1>
                  <p className="text-[11px] text-[#86868B]">Admin Panel</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 hover:bg-[#E8E8ED] rounded-lg text-[#86868B]">
                <X size={18} />
              </button>
            </div>
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
              {ADMIN_SIDEBAR_ITEMS.map(item => {
                const Icon = item.icon;
                const isItemActive = location.pathname === item.path || (item.id === 'dashboard' && isDashboard);
                return (
                  <button
                    key={item.id}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isItemActive ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}
                  >
                    <Icon size={20} className="shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
            <div className="p-3 border-t border-slate-50">
              <button onClick={() => { navigate('/login'); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#86868B] hover:bg-[#D2D2D7] hover:text-red-500 transition-colors">
                <LogOut size={20} />
                <span className="truncate">Logout</span>
              </button>
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <div className={`${sidebarCollapsed ? 'ml-[72px]' : 'ml-[220px]'} flex-1 flex flex-col min-w-0 transition-all duration-300`}>
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl border-b border-[#E8E8ED]/80 shadow-sm shadow-slate-100/50">
                <div className="flex items-center justify-between px-4 lg:px-6 py-3">
                   <div className="flex items-center gap-2">
                      <button onClick={() => setMobileMenuOpen(true)} className="p-2 hover:bg-[#E8E8ED] rounded-lg text-[#86868B] transition-colors lg:hidden touch-target flex items-center justify-center">
                        <Menu size={20} />
                      </button>
                      <div className="flex items-center gap-1.5 text-xs text-[#86868B]">
                         <LayoutDashboard size={13} />
                         <span>/</span>
                         <span className="font-medium text-[#0071E3]">{isDashboard ? activeTabConfig.label : ADMIN_SIDEBAR_ITEMS.find(i => location.pathname === i.path)?.label || 'Admin'}</span>
                      </div>
                  </div>
                   <div className="flex items-center gap-4 ml-auto relative">
                     <div className="flex items-center gap-2 bg-[#E8E8ED] hover:bg-[#D2D2D7] rounded-2xl px-4 py-2.5 transition-colors">
                        <Search size={16} className="text-[#86868B] shrink-0" />
                        <input ref={searchRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search students, teachers, courses..." className="text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none bg-transparent w-48 md:w-64" />
                        {searchQuery && <button onClick={() => setSearchQuery('')} className="p-0.5 hover:bg-[#D2D2D7] rounded"><X size={14} className="text-[#86868B]" /></button>}
                        <span className="text-[10px] text-[#86868B] bg-white px-1.5 py-0.5 rounded hidden md:inline">Ctrl+K</span>
                     </div>
                     {searchQuery && (
                        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-3xl border border-[#E8E8ED] shadow-xl shadow-slate-200/50 overflow-hidden z-50 animate-fadeIn" onClick={e => e.stopPropagation()}>
                           {Object.values(searchResults).reduce((s, arr) => s + arr.length, 0) === 0 ? (
                              <div className="p-6 text-center">
                                 <Search size={24} className="text-slate-200 mx-auto mb-2" />
                                 <p className="text-xs text-[#86868B]">No results found</p>
                              </div>
                           ) : (
                              <div className="max-h-96 overflow-y-auto p-3 space-y-1">
                                 {searchResults.students.map((s, i) => (
                                    <div key={`s-${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#0071E3]/10 transition-colors cursor-pointer">
                                       <div className="w-8 h-8 rounded-xl bg-[#0071E3]/10 flex items-center justify-center text-[10px] font-bold text-[#0071E3] shrink-0">{s.name.split(' ').map(n => n[0]).join('')}</div>
                                       <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{s.name}</p><p className="text-[10px] text-[#86868B]">{s.id} · Grade {s.grade}</p></div>
                                    </div>
                                 ))}
                                 {searchResults.teachers.map((t, i) => (
                                    <div key={`t-${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#34C759]/10 transition-colors cursor-pointer">
                                       <div className="w-8 h-8 rounded-xl bg-[#34C759]/10 flex items-center justify-center text-[10px] font-bold text-[#34C759] shrink-0">{t.name.split(' ').map(n => n[0]).join('')}</div>
                                       <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{t.name}</p><p className="text-[10px] text-[#86868B]">{t.completion}% completion</p></div>
                                    </div>
                                 ))}
                                 {searchResults.courses.map((c, i) => (
                                    <div key={`c-${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#0071E3]/10 transition-colors cursor-pointer">
                                       <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">{c.course.split(' ').slice(0, 2).map(w => w[0]).join('')}</div>
                                       <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{c.course}</p><p className="text-[10px] text-[#86868B]">{c.enrolled} enrolled</p></div>
                                    </div>
                                 ))}
                                 {searchResults.payments.map((p, i) => (
                                    <div key={`p-${i}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FF9500]/10 transition-colors cursor-pointer">
                                       <div className="w-8 h-8 rounded-xl bg-[#FF9500]/10 flex items-center justify-center text-[10px] font-bold text-amber-600 shrink-0">{p.student.split(' ').map(n => n[0]).join('')}</div>
                                       <div className="flex-1"><p className="text-xs font-semibold text-[#1D1D1F]">{p.student}</p><p className="text-[10px] text-[#86868B]">{p.course} · {p.amount.toLocaleString()} EGP</p></div>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     )}
                     <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2.5 hover:bg-[#D2D2D7] rounded-xl transition-colors">
                        <Bell size={20} className="text-[#86868B]" />
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">{D.notifications.length}</span>
                     </button>
                     <div className="relative">
                        <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-9 h-9 rounded-xl bg-[#0071E3] flex items-center justify-center text-white font-bold text-xs shadow-md shadow-[#0071E3]/20 cursor-pointer hover:bg-[#0056B3] transition-colors">DM</div>
                        {showProfileMenu && (
                           <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl border border-[#E8E8ED] shadow-xl shadow-slate-200/50 overflow-hidden z-50 animate-fadeIn">
                              <button onClick={() => { setShowProfileMenu(false); navigate('/admin/profile-settings'); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] transition-colors text-left">
                                 <UserCog size={16} className="text-[#86868B]" />
                                 <span className="text-sm font-medium text-[#1D1D1F]">Profile Settings</span>
                              </button>
                              <div className="border-t border-[#E8E8ED]" />
                              <button onClick={() => { setShowProfileMenu(false); navigate('/login'); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F5F5F7] transition-colors text-left">
                                 <LogOut size={16} className="text-[#FF3B30]" />
                                 <span className="text-sm font-medium text-[#FF3B30]">Logout</span>
                              </button>
                           </div>
                        )}
                     </div>
                  </div>

                  {showNotifications && (
                     <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-3xl border border-[#E8E8ED] shadow-xl shadow-slate-200/50 overflow-hidden z-50 animate-fadeIn">
                        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
                           <h3 className="text-sm font-bold text-[#1D1D1F]">Notifications</h3>
                           <button onClick={() => setShowNotifications(false)} className="p-1 hover:bg-[#D2D2D7] rounded-lg"><X size={14} className="text-[#86868B]" /></button>
                        </div>
                        <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                           {D.notifications.map(n => {
                              const Icon = n.icon;
                              const cm = { success: 'bg-[#34C759]/10 text-[#34C759]', warning: 'bg-[#FF9500]/10 text-amber-600', info: 'bg-blue-50 text-blue-600', danger: 'bg-red-50 text-red-600' };
                              return (
                                 <div key={n.id} className="flex gap-3 p-4 hover:bg-[#F5F5F7] transition-colors cursor-pointer">
                                    <div className={`p-2 rounded-xl shrink-0 ${cm[n.type]}`}><Icon size={14} /></div>
                                    <div className="flex-1 min-w-0"><p className="text-xs font-semibold text-[#1D1D1F]">{n.title}</p><p className="text-[10px] text-[#86868B] mt-0.5">{n.time}</p></div>
                                 </div>
                              );
                           })}
                        </div>
                        <div className="p-3 border-t border-slate-50 bg-[#F5F5F7]/50 text-center">
                           <button onClick={() => { setShowNotifications(false); navigate('/admin/notifications'); }} className="text-[10px] font-bold text-[#0071E3] hover:text-[#0071E3] cursor-pointer">View All Notifications</button>
                        </div>
                     </div>
                  )}

               </div>

               {isDashboard && (
                  <div ref={navRef} className="flex items-center gap-1.5 px-6 pb-3 overflow-x-auto animate-fadeIn">
                     {TABS.map(tab => {
                        const Icon = tab.icon;
                        return (
                           <button key={tab.id} data-tab={tab.id} onClick={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-[#0071E3] text-white shadow-sm shadow-[#0071E3]/20' : 'text-[#86868B] hover:bg-[#D2D2D7] hover:text-[#1D1D1F]'}`}>
                              <Icon size={16} />
                              {tab.label}
                           </button>
                        );
                     })}
                  </div>
               )}
            </header>

            <div className={`flex-1 px-6 ${location.pathname === '/admin/workspace' ? 'py-0' : 'py-6'} flex flex-col min-h-0`}>
               {location.pathname === '/admin/workspace' ? (
                  <AdminWorkspace />
               ) : (
                  <>
                   {isDashboard ? (
                         renderModule(activeTab, setActiveTab)
                      ) : location.pathname === '/admin/courses' ? (
                         <AdminCourses />
                      ) : location.pathname === '/admin/meetings' ? (
                         <AdminLiveMeeting />
                      ) : location.pathname === '/admin/question-bank' ? (
                         <AdminQuestionBank />
                      ) : location.pathname === '/admin/settings' ? (
                         <AdminSettings />
                      ) : location.pathname === '/admin/notifications' ? (
                         <AdminNotification />
                      ) : location.pathname === '/admin/profile-settings' ? (
                         <AdminProfileSettings />
                      ) : null}
                     <div className="mt-8 pt-4 border-t border-[#E8E8ED]">
                        <p className="text-[10px] text-[#86868B] text-center">Lumora Academy Operations Platform &middot; All manual workflows &middot; Zero automated payment gateways</p>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
