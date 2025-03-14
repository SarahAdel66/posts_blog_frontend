import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import PostItem from "./components/PostItem";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import MyPosts from './pages/MyPosts';
import EditPost from './pages/EditPost';

function App() {

  return (
    <div className='w-100 min-vh-100 d-flex flex-column align-items-center'>
    <AuthProvider >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostItem />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:postId" element={<EditPost/>} />

          {/* user cannot create post without login */}
          <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App
