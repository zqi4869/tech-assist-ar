
import { Link, useLocation } from 'react-router-dom';
import { Wrench, History, Glasses, ClipboardList, Map } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: ClipboardList },
    { path: '/work-history', label: 'Work History', icon: History },
    { path: '/tools', label: 'Tools', icon: Wrench },
    { path: '/sitemap', label: 'Sitemap', icon: Map },
    { path: '/ar-session', label: 'AR Session', icon: Glasses },
  ];

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-orange-400" />
            <span className="text-xl font-bold">FieldService Pro</span>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden md:block">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
