import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import HomePage from '../pages/HomePage';
import MapPage from '../pages/MapPage';
import DashboardPage from '../pages/DashboardPage';
import ProfilePage from '../pages/ProfilePage';
import StationDetailPage from '../pages/StationDetailPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/station/:stationId" element={<StationDetailPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default AppRouter;