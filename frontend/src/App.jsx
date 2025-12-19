import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import FilterPage from './pages/FilterPage';
import LoginPage from './pages/LoginPage';
import MarketingDashboard from './pages/MarketingDashboard';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/filter" element={<FilterPage />} />
        <Route path="/dashboard/marketing" element={<MarketingDashboard />} />
        <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />
        <Route path="/:type/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}