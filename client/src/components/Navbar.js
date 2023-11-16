import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Set initial window width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <nav className="text-black py-6">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1
            className="text-2xl sm:text-3xl font-semibold cursor-pointer"
            onClick={handleLogoClick}
          >
            FirePred.
          </h1>
          {windowWidth < 768 ? (
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none flex items-center p-2 rounded-md"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <HiOutlineX className="h-6 w-6 text-black" />
                ) : (
                  <FaBars className="h-6 w-6 text-black" />
                )}
              </button>
            </div>
          ) : (
            <ul className="flex items-center space-x-4 justify-center">
              <li>
                <Link
                  to="/"
                  className="whitespace-nowrap text-lg hover:text-red-500"
                >
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link
                  to="/YearDataPage"
                  className="whitespace-nowrap text-lg hover:text-red-500"
                >
                  ข้อมูลสถิติการเกิดไฟในแต่ละปี
                </Link>
              </li>
              <li>
                <Link
                  to="/PredictionPage"
                  className="whitespace-nowrap text-lg hover:text-red-500"
                >
                  การคาดการณ์
                </Link>
              </li>
            </ul>
          )}
        </div>
        {isMenuOpen && windowWidth < 768 && (
          <ul className="text-black flex flex-col items-center py-4 space-y-4 transition duration-300">
            <li>
              <Link
                to="/"
                className="whitespace-nowrap text-lg hover:text-red-500"
              >
                หน้าแรก
              </Link>
            </li>
            <li>
              <Link
                to="/YearDataPage"
                className="whitespace-nowrap text-lg hover:text-red-500"
              >
                ข้อมูลสถิติการเกิดไฟในแต่ละปี
              </Link>
            </li>
            <li>
              <Link
                to="/PredictionPage" // Corrected path without .js
                className="whitespace-nowrap text-lg hover:text-red-500"
              >
                การคาดการณ์
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
