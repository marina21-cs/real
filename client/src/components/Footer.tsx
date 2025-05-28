import { Settings } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  // Only show admin button in development or if you know the secret URL
  const showAdminButton = import.meta.env.DEV || window.location.search.includes('admin=true');

  return (
    <footer className="bg-black/80 text-white py-12 backdrop-filter backdrop-blur-10px border-t border-yellow-400/20">
      <div className="container mx-auto px-6 text-center">
        <div className="border-t border-yellow-400/20 pt-8">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <p className="text-gray-400" style={{ fontFamily: 'Rajdhani, monospace' }}>
              &copy; 2024 Creative Freelancer. All rights reserved.
            </p>
            {showAdminButton && (
              <Link href="/login">
                <button className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center gap-2 text-sm border border-yellow-400/30 px-3 py-1 hover:border-yellow-400" style={{ fontFamily: 'Orbitron, monospace' }}>
                  <Settings size={16} />
                  Admin
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
