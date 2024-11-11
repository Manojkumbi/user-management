import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <nav className="flex justify-between items-center flex-wrap">
        <h1 className="text-xl font-semibold">User Management</h1>


        <div
          className={`space-x-4 sm:flex sm:space-x-6 flex-col sm:flex-row sm:mt-0 mt-2 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <a href="https://github.com/Manojkumbi" target="_blank" rel="noopener noreferrer">
            <button className="hover:bg-blue-700 p-2 rounded mb-2 sm:mb-0">About</button>
          </a>
          <a href="https://manojkumbi.github.io/project/" target="_blank" rel="noopener noreferrer">
          <button className="hover:bg-blue-700 p-2 rounded mb-2 sm:mb-0">My play ground</button>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
