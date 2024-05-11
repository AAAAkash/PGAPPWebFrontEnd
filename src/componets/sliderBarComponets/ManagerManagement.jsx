import React, { useState, useEffect } from "react";
import PopupAdd from "./ManagerManagementPopup/ManagerManagementPopupAdd";
import PopupEdit from "./ManagerManagementPopup/ManagerManagementPopupEdit";
import PopupBlock from "./ManagerManagementPopup/ManagerManagementPopupBlock";
import Delete from "./ManagerManagementPopup/ManagerManagementPopupDelete";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import dbConfig from "../../config.json";

const ManagerManagement = () => {
  const [getdata, setGetdata] = useState([]);
  // console.log(getdata, "222222222222");
  const [editManager, setEditManager] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isBlockPopupOpen, setIsisBlockPopupOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editButtonVisibility, setEditButtonVisibility] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 700);

  const [deleteProfile, setDeleteProfile] = useState(false);

  // console.log(editManager,"editManager")

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const openBlockPopup = () => {
    setIsisBlockPopupOpen(true);
  };

  const closeBlockPopup = () => {
    setIsisBlockPopupOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setIsHeadingVisible(false);
  };

  const toggleCancel = () => {
    setIsSearchVisible(false);
    setIsHeadingVisible(true);
    setSearchQuery("");
  };

  useEffect(() => {

    fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/AdminManager/Admingetdata",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50",
          },
        }
      );
      if (response.ok) {
        const fetchedData = await response.json();
        // console.log(fetchedData, "55555555555555555555555555");
        setGetdata(fetchedData.allBlockData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEdit = (id) => {
    const ManagerToEdit = getdata.find((company) => company._id === id);
    setEditManager(ManagerToEdit);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (id) => {
    const ManagerToEdit = getdata.find((company) => company._id === id);
    setEditManager(ManagerToEdit);
    setDeleteProfile(true);
  };

  const handleBlock = (id) => {
    const ManagerToEdit = getdata.find((company) => company._id === id);
    setEditManager(ManagerToEdit);
    setIsisBlockPopupOpen(true);
  };

  const toggleEditButtons = (id) => {
    setEditButtonVisibility((prevVisibility) => {
      const updatedVisibility = { ...prevVisibility };
      Object.keys(updatedVisibility).forEach((key) => {
        if (key !== id) {
          updatedVisibility[key] = false;
        }
      });
      updatedVisibility[id] = !updatedVisibility[id];
      return updatedVisibility;
    });
  };


  const openDeleteProfile = () => {
    setDeleteProfile(true);
  };
  const closeDeleteProfile = () => {
    setDeleteProfile(false);
  };

  return (
    <>
      <div className="popup">
        {isPopupOpen && (
          <div className="popupbackground">
            <PopupAdd onClose={closePopup}
              fetchData={fetchData} />
          </div>
        )}

        {isEditPopupOpen && (
          <div className="popupbackground">
            <PopupEdit
              editManager={editManager}
              onClose={closeEditPopup}
              fetchData={fetchData}
            ></PopupEdit>
          </div>
        )}
        {isBlockPopupOpen && (
          <div className="popupbackground">
            <PopupBlock
              onClose={closeBlockPopup}
              BlockManager={editManager}
              fetchData={fetchData}
            />
          </div>
        )}

        {deleteProfile && (
          <div className="popupbackground">
            <Delete
              onClose={closeDeleteProfile}
              DeleteManager={editManager}
              fetchData={fetchData}
            />
          </div>
        )}
      </div>

      <div className="mainDivNAV">
        <div>
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="second-Div">
          <div>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              activePage="managerManagement"
            />
          </div>
          <div className="h-scree three ">
            <div className="NAMEandBUTTON">
              <div className="NAMEandBUTTONLeft">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                  <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                </svg>

                <h6>
                  Manager management
                </h6>

              </div>
              <div className="NAMEandBUTTONRight" onClick={openPopup}>
                <div>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#F4E2DE" />
                    <path d="M5 13H21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M13 5L13 21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                  </svg>

                </div>
                <div>
                  <h6>Add Manager</h6>
                </div>
              </div>
            </div>


            <div className="four ">

              <div className="flex flex-wrap flex-column ManagerManagement">
                <div className="Allcontant ">
                  {getdata && getdata.length > 0 ? (
                    getdata
                      .filter((item) => {
                        const lowerCaseSearchQuery = searchQuery.toLowerCase();
                        const phoneNumberString = String(item.PhoneNumber);
                        return (
                          item.ManagerName.toLowerCase().includes(lowerCaseSearchQuery) ||
                          phoneNumberString.includes(lowerCaseSearchQuery)
                        );
                      })
                      .map((filteredItem, index) => (
                        <div key={index} className="contant">

                          <div className="contant_icon">
                            <svg
                              onClick={() =>
                                toggleEditButtons(filteredItem._id)
                              }
                              xmlns="http://www.w3.org/2000/svg"
                              width="4"
                              height="18"
                              viewBox="0 0 4 18"
                              fill="none"
                            >
                              <circle cx="2" cy="9" r="2" fill="black" />
                              <circle cx="2" cy="2" r="2" fill="black" />
                              <circle cx="2" cy="16" r="2" fill="black" />
                            </svg>
                          </div>
                          {filteredItem.addDocuments && filteredItem.addDocuments.length > 0 ? (
                            <div className="contant_Image">
                              {filteredItem.addDocuments.map((document, docIndex) => (
                                <div key={docIndex} style={{ display: docIndex === 0 ? 'block' : 'none' }}>
                                  <img
                                     src={document.url}
                                    alt="Manager"
                                    width="70px"
                                    height="70px"
                                  />
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="contant_Image">
                              <img
                                 src="../public/defaultProfile.jpeg"
                                alt="Manager"
                                width="70px"
                                height="70px"
                              />
                            </div>
                          )}


                          <div className="contant_Text">
                            <h5>{filteredItem.ManagerName}</h5>
                            <h6>Email ID:  {filteredItem.Email}</h6>
                            <h6>Phone No :  {filteredItem.PhoneNumber}</h6>
                            <h6>
                              Building No:{" "}

                              {filteredItem.Building.length === 0 ? (
                                <>N/A</>
                              ) : (
                                filteredItem.Building.map((building, index) => (
                                  <span key={index}>
                                    {index === 0 ? building.name : `, ${building.name}`}
                                  </span>
                                ))
                              )}


                              {/* 
                            {filteredItem.Building.length === 0
                              ? "N/A"
                              : filteredItem.Building.slice(0).join(", ")} */}
                            </h6>

                          </div>

                          <div className="contantBUttonDiv">
                            {editButtonVisibility[filteredItem._id] && (
                              <div className="buttonContainer">
                                <button
                                  onClick={() => handleEdit(filteredItem._id)}
                                >
                                  <h6>Edit</h6>
                                </button>
                                <button onClick={() => handleBlock(filteredItem._id)}>
                                  <h6>Block</h6>
                                </button>
                                <button onClick={() => handleDelete(filteredItem._id)} >
                                  <h6>Delete</h6>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))) : (
                    <>
                      <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "100px" }}>No record found</p>

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerManagement;
