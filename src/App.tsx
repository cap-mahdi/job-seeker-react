import { BrowserRouter, Routes, Route } from "react-router-dom";
import { JobProvider } from "./contexts/JobContext";
import FreelancerPage from "./pages/FreelancerPage";
import ChoosePage from "./pages/ChoosePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthProvider";
import User from "./components/common/User";
import LogOut from "./components/common/LogOut";
import RecruiterPage from "./pages/RecruiterPage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route
            path="/mode"
            element={
              <ProtectedRoute>
                <ChoosePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <LogOut />
                <User mode="recruiter" link="/recruiter" />
                <JobProvider>
                  <FreelancerPage />
                </JobProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recruiter"
            element={
              <ProtectedRoute>
                <LogOut />

                <User mode="freelancer" link="/jobs" />
                <JobProvider>
                  <RecruiterPage />
                </JobProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
