import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-card-dark border-b border-border-dark sticky top-0 z-30">
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold text-brand-light"
        >
          ExpenseTracker
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-brand-light">
            Dashboard
          </Link>
          <Link
            to="/add-expense"
            className="hover:text-brand-light"
          >
            Add Expense
          </Link>
          <Link
            to="/add-category"
            className="hover:text-brand-light"
          >
            Add Category
          </Link>
          <Link
            to="/categories"
            className="hover:text-brand-light"
          >
            Categories
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="block"
          >
            Dashboard
          </Link>
          <Link
            to="/add-expense"
            onClick={() => setOpen(false)}
            className="block"
          >
            Add Expense
          </Link>
          <Link
            to="/add-category"
            onClick={() => setOpen(false)}
            className="block"
          >
            Add Category
          </Link>
          <Link
            to="/categories"
            onClick={() => setOpen(false)}
            className="block"
          >
            Categories
          </Link>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 rounded-md bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
