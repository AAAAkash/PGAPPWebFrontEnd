import React from "react";
import { useState, useEffect } from "react";
import dbConfig from '../../config.json';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../SideBar";
import Navbar from "../Navbar";
import OneComplaint from "./showOneComplaint"
import { useLocation } from 'react-router-dom';


const Complaint = ({ onClose, isVisible, Data }) => {

  const [getdata, setGetdata] = useState([]);
  // console.log(getdata,"222222222");
  const [showManagerContent, setShowManagerContent] = useState(true);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editManager, setEditManager] = useState(null);

  const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [buildingData, setBuildingData] = useState([]);
  const [buildingId, setBuildingId] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");



  const [complaintStatus, setComplaintStatus] = useState('');
  // console.log(buildingId);

  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleManagerClick = () => {
    setShowManagerContent(true);
  };

  const handleStudentClick = () => {
    setShowManagerContent(false);
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };


  const openOneComplaint = () => {
    setIsPopupOpen(true);
  };

  const closeOneComplaint = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/students/AllComplaintData",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
          }
        }
      );
      if (response.ok) {
        const fetchedData = await response.json();
        // console.log(fetchedData, "55555555555555555555555555");
        setGetdata(fetchedData.ComplaintData);
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

    // Open the edit popup
    setIsEditPopupOpen(true);
  };

  const handleView = (id) => {
    const ManagerToEdit = getdata.find((company) => company._id === id);
    setEditManager(ManagerToEdit);

    // Open the edit popup
    setIsPopupOpen(true);
  };

  useEffect(() => {
    fetchBuildingData();
  }, []);

  const fetchBuildingData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/building/Building_get",
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
          }
        }
      );

      if (response.ok) {
        const fetchedData = await response.json();
        setBuildingData(fetchedData.buildings);
      } else {
        console.error("Failed to fetch building data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };


  const handleBuildingChange = (e) => {
    setBuildingId(e.target.value);
  };



  const handleStatusChange = (e, filteredItem) => {
    const newStatus = e.target.value;
    // Update the complaint status in the filteredItem
    filteredItem.ComplaintStatus = newStatus;
    // Send PUT request to update the complaint status on the server
    fetch(dbConfig.backendBaseUrl + `/main/students/ComplaintStatus/${filteredItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
      },
      body: JSON.stringify({ ComplaintStatus: newStatus })
    })
      .then(response => {
        if (response.ok) {
          // if (typeof fetchData === 'function') {
          //   fetchData();
          // }         
          console.log('Complaint status updated successfully');
          // You can perform any additional actions after successful update
        } else {
          console.error('Failed to update complaint status:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error updating complaint status:', error);
      });
  };

  const handleButtonClick = () => {
    if (typeof Data === 'function') {
      Data();
    }
    if (typeof onClose === 'function') {
      onClose();
    }
  };





  return (
    <>
      <div className="popup">
        {isEditPopupOpen && (
          <div className="popupbackground1">
            <PopupEdit
              editManager={editManager}
              onClose={closeEditPopup}
            ></PopupEdit>
          </div>
        )}

        {isPopupOpen && (
          <div className="bg-white">
            <OneComplaint
              editManager={editManager}
              fetchData={fetchData}
              onClose={closeOneComplaint}
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
              activePage={location.pathname.split('/').slice(1).join('/')}
            />
          </div>
          <div className="h-scree three">

            <div className="ComplainPopup">

              <div className="compailntbuttonbuilding">
                <div className="compailntbuttonbuildingFirst ">
                  <svg onClick={handleButtonClick}
                    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                    <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                  </svg>

                  {/* </div> */}
                  <div style={{ marginLeft: "10px", marginTop: "2px" }}>
                    <h6>Complaints</h6>
                  </div>
                </div>
                <div className="compailntbuttonbuildingSecond">
                  <select
                    name="assignedBuilding"
                    onChange={handleBuildingChange}
                    value={buildingId}

                  >
                    <option value="">Building Name</option>
                    {buildingData.map((building) => (
                      <option key={building._id} value={building._id}>
                        {building.Building}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="compailntbuttonbuilding4 mt-2  ">
                <div className="ComplainPopupBTNDIV">
                  <div className="ComplainPopupBTNDIVFilter ">
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                    // style={{width:"200px"}}
                    >
                      <option value="" >Filter</option>
                      <option value="Pending">Pending Complaint</option>
                      <option value="Resolved">Resolved Complaint</option>
                      <option value="In Progress">In Progress</option>
                    </select>

                  </div>
                </div>
              </div>
              <div className="ComplaintAllDATA" >
                <div className="ComplainPopupData"  >

                  {getdata && getdata.length > 0 ? (
                    <>
                      {getdata
                        .filter((item) => {
                          if (buildingId === "" || buildingId === null) {
                            return true;
                          } else {
                            const done = item.StudentDetails.BuildingDetails._id === buildingId;
                            return done;
                          }
                        })
                        .filter((item) => {
                          if (selectedFilter === "") {
                            return true;
                          } else {
                            return item.ComplaintStatus === selectedFilter;
                          }
                        })
                        .map((filteredItem, index) => {
                          // Function to format date string
                          const formatDate = (dateString) => {
                            const date = new Date(dateString);
                            const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} -
        ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
                            return formattedDate;
                          };

                          return (
                            <div className="ComplainPopupData2" onClick={() => handleView(filteredItem._id)} key={index}>
                              <div className="ComplainPopupDataText">
                                <div className="ComplainPopupDataTextLeft">
                                  <h5>Name</h5>
                                  <h5>Complaint Number</h5>
                                  <h5>Building Name</h5>
                                  <h5>Room No.</h5>
                                  <h5>Contact No.</h5>
                                  <h5>Complaint Reason</h5>
                                  <h5>Registration Date & Time</h5>
                                  <h5>Last Updation Date & Time</h5>
                                  <h5>Complaint Status</h5>
                                </div>
                                <div className="ComplainPopupDataTextRight">
                                  <h5>{filteredItem.StudentDetails.studentName}</h5>
                                  <h5>{filteredItem.ComplaintNo}</h5>
                                  <h5>{filteredItem.StudentDetails.BuildingDetails.Building}</h5>
                                  <h5>{filteredItem.StudentDetails.RoomDetails.Room_No}</h5>
                                  <h5>{filteredItem.StudentDetails.phoneNumber}</h5>
                                  <h5>{filteredItem.ComplaintType}</h5>
                                  <h5>{formatDate(filteredItem.RegistrationDate)}</h5>
                                  <h5>{formatDate(filteredItem.UpDatedDate)}</h5>
                                  <select
                                    disabled
                                    value={filteredItem.ComplaintStatus}
                                    onChange={(e) => handleStatusChange(e, filteredItem)}
                                    style={{
                                      backgroundColor: filteredItem.ComplaintStatus === "In Progress" ? "#FBD3AE" :
                                        filteredItem.ComplaintStatus === "Resolved" ? "#C9F2C6" : "",
                                      color: filteredItem.ComplaintStatus === "In Progress" ? "#BE691B" :
                                        filteredItem.ComplaintStatus === "Resolved" ? "#149221" : "",
                                      border: filteredItem.ComplaintStatus === "In Progress" ? "2px solid #BE691B" :
                                        filteredItem.ComplaintStatus === "Resolved" ? "2px solid #149221" : "",
                                    }}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Resolved">Resolved</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {getdata
                        .filter((item) => {
                          if (buildingId === "" || buildingId === null) {
                            return true;
                          } else {
                            const done = item.StudentDetails.BuildingDetails._id === buildingId;
                            return done;
                          }
                        })
                        .filter((item) => {
                          if (selectedFilter === "") {
                            return true;
                          } else {
                            return item.ComplaintStatus === selectedFilter;
                          }
                        }).length === 0 && (
                          <p style={{ color: "black", textAlign: "center", width: "100%", marginTop:"100px"}}>No complaint found</p>
                        )}
                    </>
                  ) : (
                    <p style={{ color: "black", textAlign: "center", width: "100%", marginTop:"100px" }}>No complaint found</p>
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

export default Complaint;