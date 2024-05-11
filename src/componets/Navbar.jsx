import React from 'react'
import { useState, useEffect } from 'react';
import dbConfig from '../config.json';
// import SideBar from './SideBar';
const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);  



  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  const handleResize = () => {
    if (window.innerWidth < 850) {
      // setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSize = () => {
    const screenWidth = window.innerWidth;
    // setIsSidebarOpen(screenWidth > 850);
  };

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    handleSize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="first ">
        <div className="icon">
          <i
            className={`bx bx-chevron-right toggle ${isSidebarOpen ? "open" : ""
              }`}
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="39"
              viewBox="0 0 39 39"
              fill="none"
            >
              <circle cx="19.5" cy="19.5" r="19.5" fill="#DBDBDB" />
              <path
                d="M12 19.1136H24.1795"
                stroke="black"
                strokeWidth={1.7} // Change stroke-width to strokeWidth
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 14H27.3408"
                stroke="black"
                strokeWidth={1.7} // Change stroke-width to strokeWidth
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 24.2272H19.6704"
                stroke="black"
                strokeWidth={1.7} // Change stroke-width to strokeWidth
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
        </div>
        <div className=" first1">
          <h1>Admin Panel</h1>
        </div>
        <div className='navEndDiv'>
          <div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="bell">
                <g id="Icon">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22.2668 17.3607L21.5 19H16C16 21.2091 14.2091 23 12 23C9.79083 23 7.99997 21.2091 7.99997 19H2.50005L1.73321 17.3607C1.73193 17.3597 1.73189 17.3597 1.73186 17.3598L1.73044 17.3615L1.72974 17.3623L1.74072 17.3485C1.75242 17.3335 1.77263 17.3072 1.80018 17.2695C1.85528 17.1941 1.93965 17.0732 2.04376 16.9069C2.252 16.5742 2.53899 16.0603 2.82894 15.3651C3.40784 13.9771 4.0023 11.8579 3.99997 9.00125C3.99997 9.00111 3.99997 9.00139 3.99997 9.00125L3.99992 8.97328C4.01436 4.56725 7.59052 1 11.9999 1C16.4087 1 19.9845 4.56636 19.9998 8.97163L19.9998 8.97333M5.99993 8.97739L5.99997 8.99826C6.00259 12.1414 5.34712 14.523 4.67483 16.1349C4.54189 16.4537 4.40844 16.742 4.2795 17H19.7205C19.5915 16.742 19.4581 16.4537 19.3251 16.1349C18.653 14.5235 17.9977 12.1438 18 9.00203L17.9999 8.98157L17.9999 8.97987C17.989 5.67546 15.3069 3 11.9999 3C8.69371 3 6.01208 5.67412 5.99993 8.97739ZM19.9998 8.97333L20 9.00084C19.9976 11.8577 20.5921 13.977 21.171 15.3651C21.461 16.0603 21.748 16.5742 21.9562 16.9069C22.0604 17.0732 22.1447 17.1941 22.1998 17.2695C22.2274 17.3072 22.2476 17.3335 22.2593 17.3485L22.2696 17.3615L22.2687 17.3604C22.2686 17.3604 22.2681 17.3597 22.2668 17.3607M9.99997 19C9.99997 20.1046 10.8954 21 12 21C13.1045 21 14 20.1046 14 19H9.99997Z" fill="black" />
                  <path d="M22.2707 17.3628C22.2711 17.3634 22.2714 17.3637 22.2707 17.3628V17.3628Z" fill="black" />
                </g>
              </g>
            </svg>
          </div>
          <div>
            <img src="../public/Pro.png" />

          </div>
          <div>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="chevron-down">
                <path id="Icon" d="M12 16.4142L19.4142 9.00003L18 7.58582L12 13.5858L6.00003 7.58582L4.58582 9.00003L12 16.4142Z" fill="black" />
              </g>
            </svg>

          </div>


        </div>
      </div>
      {/* <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </>
  )
}

export default Navbar