import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { HousingRequests } from './pages/HousingRequests';
import { HousingRequestReview } from './pages/HousingRequestReview';
import { MaintenanceRequests } from './pages/MaintenanceRequests';
import { Payments } from './pages/Payments';
import { RoomDistribution } from './pages/RoomDistribution';
import { UserManagement } from './pages/UserManagement';
import { StudentServices } from './pages/StudentServices';
import { RoomBooking } from './pages/RoomBooking';
import { Complaint } from './pages/Complaint';
import { MaintenanceRequestForm } from './pages/MaintenanceRequestForm';
import { FeePayment } from './pages/FeePayment';
import { Profile } from './pages/Profile';
import { StudentDashboard } from './pages/StudentDashboard';
import { BuildingRooms } from './pages/BuildingRooms';

export type UserRole = 'admin' | 'student';

interface AuthUser {
  name: string;
  role: string;
  avatar: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [currentUser, setCurrentUser] = useState<AuthUser>({
    name: '',
    role: '',
    avatar: '',
  });

  // تحميل الجلسة من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth) {
      try {
        const auth = JSON.parse(savedAuth);
        setIsLoggedIn(auth.isLoggedIn);
        setUserRole(auth.userRole);
        setCurrentUser(auth.currentUser);
      } catch (error) {
        localStorage.removeItem('auth');
      }
    }
  }, []);

  const handleLogin = (username: string) => {
    let role: UserRole = 'admin';
    let userData: AuthUser;

    // حدد الدور والبيانات بناءً على اسم المستخدم
    if (username === 'student') {
      role = 'student';
      userData = {
        name: 'الطالب',
        role: 'طالب',
        avatar: '',
      };
    } else {
      role = 'admin';
      userData = {
        name: 'د. حمادة',
        role: 'إداري',
        avatar: '',
      };
    }

    // تحديث الحالة
    setUserRole(role);
    setCurrentUser(userData);
    setIsLoggedIn(true);

    // حفظ الجلسة في localStorage
    localStorage.setItem(
      'auth',
      JSON.stringify({
        isLoggedIn: true,
        userRole: role,
        currentUser: userData,
      })
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('admin');
    setCurrentUser({
      name: '',
      role: '',
      avatar: '',
    });
    localStorage.removeItem('auth');
  };

  // تحديد الصفحة الرئيسية بناءً على نوع المستخدم
  const homePage = userRole === 'student' ? '/student-dashboard' : '/dashboard';

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Protected Routes - With Layout */}
            <Route path="/" element={<Layout userRole={userRole} currentUser={currentUser} onLogout={handleLogout} />}>
              {/* Admin Routes */}
              <Route index element={<Navigate to={homePage} replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="housing-requests" element={<HousingRequests />} />
              <Route path="housing-requests/:id" element={<HousingRequestReview />} />
              <Route path="maintenance-requests" element={<MaintenanceRequests />} />
              <Route path="payments" element={<Payments />} />
              <Route path="room-distribution" element={<RoomDistribution />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="building-rooms" element={<BuildingRooms />} />

              {/* Student Routes */}
              <Route path="services" element={<StudentServices />} />
              <Route path="room-booking" element={<RoomBooking />} />
              <Route path="complaint" element={<Complaint />} />
              <Route path="maintenance-request" element={<MaintenanceRequestForm />} />
              <Route path="fee-payment" element={<FeePayment />} />
              <Route path="profile" element={<Profile />} />
              <Route path="student-dashboard" element={<StudentDashboard />} />
            </Route>
            <Route path="/login" element={<Navigate to={homePage} replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
