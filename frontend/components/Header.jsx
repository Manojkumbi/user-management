function Navbar() {
    return (
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="flex justify-between items-center px-6 py-4">
        <h1 className="text-3xl font-bold" style={{ cursor: "pointer" , marginLeft: "20px" }}>User Management</h1>

  
          <div className="flex ">
           
  
            <a
              href="https://github.com/Manojkumbi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              About
            </a>
  
            <a
              href="https://manojkumbi.github.io/project/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors duration-300"
            >
              My Playground
            </a>
          </div>
        </nav>
      </header>
    );
  }
  
  export default Navbar;
  