import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Index';
import Dashboard from './pages/Dashboard/Index';
import MembersManagement from './pages/MembersManagement/Index';
import EmployeesManagement from './pages/EmployeesManagement/Index';
import TrainersManagement from './pages/TrainersManagement/Index';
import PackageManagement from './pages/PackageManagement/Index';
import CompanyManagement from './pages/CompanyManagement/Index';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<MembersManagement />} />
            <Route path="/employees" element={<EmployeesManagement />} />
            <Route path="/trainers" element={<TrainersManagement />} />
            <Route path="/packages" element={<PackageManagement />} />
            <Route path="/companies" element={<CompanyManagement />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
