import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login, register, clearError } from '../features/auth/authSlice';
import { toast } from 'sonner';
import logo from "../../assets/logo2.png";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user, loading, error } = useSelector((state) => state.auth);

  // ✅ Redirect after login
  useEffect(() => {
  if (token) {
    toast.success('Login successful!');

    if (user.role === 'ADMIN') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  }
}, [token, user, navigate]);

// ✅ Error handling
useEffect(() => {
  if (error) {
    toast.error(error);
    dispatch(clearError());
  }
}, [error]);

  // ✅ Reset only when switching mode
  useEffect(() => {
      setFormData({
        name: '',
        email: '',
        password: ''
      })
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
    toast.error("Email and password required");
    return;
  }

  if (!isLogin && !formData.name) {
    toast.error("Name is required");
    return;
  }

    if (isLogin) {
      dispatch(login({
        email: formData.email,
        password: formData.password
      }))
      .unwrap();
    } else {
      dispatch(register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }))
      .unwrap()
      .then(() => {
        toast.success("Account created! Please login.");
        setIsLogin(true); // 👉 switch to login
      })
      .catch(() => {});
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src={logo} alt="logo" className="h-10" />
            <span className="text-lg font-semibold text-black">
              FollowUp<span className="text-green-600 text-2xl font-bold">PRO</span>
            </span>
          </div>
          <p className="text-gray-600">Track your job applications effortlessly</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

          <h2 className="text-2xl font-semibold mb-4">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {!isLogin && (
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg"
              />
            )}

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}