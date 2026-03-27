import { Link, useNavigate, useLocation } from 'react-router';
import { logout } from '../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, User, Bell, Menu, X, LayoutDashboard, PlusCircle } from 'lucide-react';
import logo from "../../assets/logo2.png";
import { useState } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-300 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-10">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src={logo} alt="logo" className="h-10" />
            <span className="text-lg font-semibold text-black">
              FollowUp<span className="text-2xl text-green-600 font-bold">PRO</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>

            <Link
              to="/add-job"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive('/add-job')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Add Job
            </Link>

            <Link
              to="/reminders"
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isActive('/reminders')
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Bell className="w-4 h-4" />
              Reminders
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-8">
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-4 h-4 hidden sm:inline" />
              <span className="hidden sm:inline">{user?.name || "User"}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4 hidden sm:inline" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">

          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-1 text-md transition-colors ${
                isActive('/')
                  ? 'text-blue-600'
                  : 'text-black/80 hover:text-black'
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>

          <Link 
            to="/add-job" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-1 text-md transition-colors ${
                isActive('/add-job')
                  ? 'text-blue-600'
                  : 'text-black/80 hover:text-black'
              }`}
          >
            <PlusCircle className='w-4 h-4'/>
            Add Job
          </Link>

          <Link 
            to="/reminders" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-1 text-md transition-colors ${
                isActive('/reminders')
                  ? 'text-blue-600'
                  : 'text-black/80 hover:text-black'
              }`}
          >
            <Bell className='w-4 h-4'/>
            Reminders
          </Link>

          <Link 
            to="/profile" 
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-1 text-md transition-colors ${
                isActive('/profile')
                  ? 'text-blue-600'
                  : 'text-black/80 hover:text-black'
              }`}
          >
            <User className='w-4 h-4'/>
            Profile
          </Link>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-1 text-md text-red-600"
          >
            <LogOut className='w-4 h-4'/>
            Logout
          </button>

        </div>
      )}

    </nav>
  );
}