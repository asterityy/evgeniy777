import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LessonsPage from "./pages/LessonsPage";
import LessonDetailPage from "./pages/LessonDetailPage";
import TestsPage from "./pages/TestsPage";
import TestDetailPage from "./pages/TestDetailPage";
import GlossaryPage from "./pages/GlossaryPage";
import BibliographyPage from "./pages/BibliographyPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lessons/:id" element={<LessonDetailPage />} />
              <Route path="/tests" element={<TestsPage />} />
              <Route path="/tests/:id" element={<TestDetailPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/bibliography" element={<BibliographyPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute role="user">
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
