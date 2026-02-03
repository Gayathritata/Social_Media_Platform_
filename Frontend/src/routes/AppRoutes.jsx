import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth Components
import Login from "../Pages/auth/Login";
import Register from "../Pages/auth/Register";
import ForgotPassword from "../Pages/auth/ForgotPassword";
import ProfileSetup from "../Pages/auth/ProfileSetup";

// Core Components
import Home from "../Pages/core/Home";
import Explore from "../Pages/core/Explore";
import Profile from "../Pages/core/Profile";
import Notifications from "../Pages/core/Notifications";
import StartPost from "../Pages/core/CreatePost";
import SavedPosts from "../Pages/core/SavedPosts";
import Settings from "../Pages/Settings/Settings";
import Theme from "../Pages/Settings/Theme";
import ChangePassword from "../Pages/Settings/ChangePassword";
import Language from "../Pages/Settings/Language";
import Privacy from "../Pages/Settings/Privacy";


// Chat Components
import ChatList from "../Pages/chat/ChatList";
import ChatRoom from "../Pages/chat/ChatRoom";
import ConfessionChat from "../Pages/chat/ConfesssionChat"; // Note: Typo in filename 'ConfesssionChat' preserved


// Engagement Components
import AnonymousHelp from "../Pages/engagement/AnonymousHelp";
import BrainTeasers from "../Pages/engagement/BrainTeasers";
import CommunitySpaces from "../Pages/engagement/CommunitySpaces";
import LifeMilestones from "../Pages/engagement/LifeMilestones";
import EngagementHub from "../Pages/engagement/EngagementHub";
import NotFound from "../Pages/core/NotFound";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* Core Routes */}
        <Route path="/AppLayout" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/theme" element={<Theme />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/create-post" element={<StartPost />} />
        <Route path="/saved-posts" element={<SavedPosts />} />

        {/* Chat Routes */}
        <Route path="/chat" element={<ChatList />} />
        <Route path="/chat/:id" element={<ChatRoom />} />
        <Route path="/confession-chat" element={<ConfessionChat />} />

        {/* Engagement Routes */}
        <Route path="/anonymous-help" element={<AnonymousHelp />} />
        <Route path="/brain-teasers" element={<BrainTeasers />} />
        <Route path="/community-spaces" element={<CommunitySpaces />} />
        <Route path="/life-milestones" element={<LifeMilestones />} />
        <Route path="/language" element={<Language />} />
        <Route path="/engagement" element={<EngagementHub />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
