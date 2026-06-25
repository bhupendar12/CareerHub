import { Routes, Route } from "react-router-dom";

import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import AddApplication from "./pages/AddApplication";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import EditApplication from "./pages/EditApplication";
import ResumeReview from "./pages/ResumeReview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/applications"
        element={<Applications />}
      />

      <Route
        path="/add-application"
        element={<AddApplication />}
      />

      <Route
        path="/statistics"
        element={<Statistics />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />
      <Route
        path="/calendar"
        element={<Calendar />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />
      <Route
        path="/edit-application/:id"
        element={<EditApplication />}
      />
      <Route
        path="/resume-review"
        element={<ResumeReview />}
      />
    </Routes>
  );
}

export default App;