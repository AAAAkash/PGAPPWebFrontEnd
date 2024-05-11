import React, { useContext, useState, useEffect } from "react";
import PopupAdd from "./RoomPopupAdd";
import PopupEdit from "./RoomPopupEdit";
import DataContext from "../../../DataContext";
import dbConfig from "../../../config.json";
import Navbar from "../../Navbar";
import SideBar from "../../SideBar";
import ADD from "../BuildingManagementPopup/BuildingManagementPopupEdit"
import StudentAdd from "../StudentListPopup/StudentListPopupAdd"
import StudentProfile from "../StudentListPopup/StudentListPopup"
import Done from "./Electricity_Units"
import Delete from './DeleteRoom'
import { Flex } from "antd";

const RoomView = ({ onClose, isedit, fetchAll }) => {
  const BuildingID = isedit._id;
  // console.log(BuildingID);
  const { student } = useContext(DataContext);
  const [getdata, setGetdata] = useState([]);
  // console.log(getdata,"2222222222");

  const [searchQuery, setSearchQuery] = useState("");
  const [isRoom, setIsRoom] = useState(null);
  const [electricityData, setElectricityData] = useState(null);


  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isViewPopupOpen, setIsViewPopupOpen] = useState(false);

  const [isAddBuildingOpen, setIsAddBuildingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);
  
  const [data, setdata] = useState([]);
  // console.log(data,"2222");
  const [edit, setEdit] = useState(null);
  //  console.log(edit,"2222");



  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEle, setIsEle] = useState(false);
  const [editButtonVisibility, setEditButtonVisibility] = useState({});
  const [studentProfile, setStudentProfile] = useState(false);
  const [deleteProfile, setDeleteProfile] = useState(false);

  const [roomId, setRoomId] = useState("");
  // console.log(roomId,"33333333333333333");
  // const [roomIdOne ,setRoomIdOne] =useState(roomId);

  const [roomInSTudent, setRoomInSTudent] = useState([]);
  // console.log(roomInSTudent, "**********************");
  const [isStudentProfileData, setIsStudentProfileData] = useState(null);

  const [selectedStudentIndex, setSelectedStudentIndex] = useState(0);


  const [electricityAmount, setElectricityAmount] = useState([]);



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setIsHeadingVisible(false);
  };

  const toggleCancel = () => {
    setIsSearchVisible(false);
    setIsHeadingVisible(true);
  };

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  const openAddPopup = () => {
    setIsAddPopupOpen(true);
  };

  const closeAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const openViewPopup = () => {
    setIsViewPopupOpen(true);
  };

  const closeViewPopup = () => {
    setIsViewPopupOpen(false);
  };

  useEffect(() => {

    fetchData();
    // const interval = setInterval(() => {
    //   fetchData();
    // }, 1000);
    // return () => clearInterval(interval);
  }, [isedit._id]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + `/main/Manager/GetRooms/${isedit._id}`,
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
        // console.log(fetchedData,"22222222222222");
        setGetdata(fetchedData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id) => {
    const RoomEdit = getdata.find((company) => company._id === id);
    setIsRoom(RoomEdit);
    setIsEditPopupOpen(true);
  };

  const handleDelete = (id) => {
    const RoomEdit = getdata.find((company) => company._id === id);
    setIsRoom(RoomEdit);
    setDeleteProfile(true);
  };


  const closeAdd = () => {
    setIsAddBuildingOpen(false);
  };

  useEffect(() => {

    buildingData();
    // const interval = setInterval(() => {
    //   buildingData();
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  const buildingData = async () => {
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
        const filteredData = fetchedData.buildings.filter(
          (item) => item._id === isedit._id
        );
        setdata(filteredData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };



  const handleAdd = (id) => {
    const buildingToEdit = data.find((company) => company._id === id);
    let getAllManagerName = []
    let getManagerNames = []
    let getManagerIds = []
    buildingToEdit.getMangers.map((m) => {
      getAllManagerName.push({ "ManagerName": m.ManagerName, "id": m._id });
      getManagerNames.push(m.ManagerName)
      getManagerIds.push(m._id)
    })
    setEdit({ "id": buildingToEdit._id, "Building": buildingToEdit.Building, "BuildingAddress": buildingToEdit.BuildingAddress, "ManagerName": getManagerNames, "getManagerIds": getManagerIds, "managerList": getAllManagerName, "Per_Unit_Cost": buildingToEdit.Per_Unit_Cost, "addDocument": buildingToEdit.addDocument, });
    setIsAddBuildingOpen(true);
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

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };


  const handleElectricity = () => {
    const Electricity = getdata.find((i) => i._id === roomId);
    setElectricityData(Electricity);
    setIsEle(true);
  };

  const openEle = () => {
    setIsEle(true);
  };
  const closeEle = () => {
    setIsEle(false);
  };


  const openStudentProfile = () => {
    setStudentProfile(true);
  };
  const closeStudentProfile = () => {
    setStudentProfile(false);
  };


  const openDeleteProfile = () => {
    setDeleteProfile(true);
  };
  const closeDeleteProfile = () => {
    setDeleteProfile(false);
  };

  const handleOneView = (id, index) => {
    setRoomId(id);
    setSelectedStudentIndex(index);
    // console.log(id,"222222222222222222222222222222");
  };

  useEffect(() => {

    fetchRoomId();
  }, [isedit._id]);

  const fetchRoomId = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + `/main/Manager/GetRooms/${isedit._id}`,
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
        if (fetchedData.length > 0) {
          const firstItemId = fetchedData[0]._id;
          setRoomId(firstItemId);
        } else {
          // console.log("fetchedData array is empty");
        }

      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (roomId) {

      Data();
      // const interval = setInterval(() => {
      //   Data();
      // }, 1000);
      // return () => clearInterval(interval);
    }
  }, [roomId]);


  const Data = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + `/main/ManagerRoom/getRoom/${roomId}`,
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
        const totalAmountEle = fetchedData.RoomDetails.find(item => item.ElectricityAmount);
        setElectricityAmount(totalAmountEle)
        // console.log(totalAmountEle);

        const StudentsDetail = fetchedData.Students_Details.filter(item => item.status !== "0")
        // setRoomInSTudent(fetchedData.Students_Details);
        setRoomInSTudent(StudentsDetail);
        // console.log(fetchedData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleStudentProfile = (id) => {
    const StudentProfileData = roomInSTudent.find((e) => e._id === id);
    setIsStudentProfileData(StudentProfileData);
    setStudentProfile(true);
  };


  const handleButtonClick = () => {
    onClose();
    fetchAll();
  };



  const amount = electricityAmount ? electricityAmount.ElectricityAmount : 0; // Default to 0 if electricityAmount is undefined
  // console.log(amount);



  return (
    <>
      <div className="popup">
        {isAddPopupOpen && (
          <div className="popupbackground">
            <PopupAdd onClose={closeAddPopup} isedit={isedit} fetchData={fetchData}></PopupAdd>
          </div>
        )}

        {isEditPopupOpen && (
          <div className="popupbackground">
            <PopupEdit onClose={closeEditPopup} isRoom={isRoom} fetchData={fetchData}></PopupEdit>
          </div>
        )}

        {isViewPopupOpen && (
          <div className="popupbackground">
            <PopupView onClose={closeViewPopup} isRoom={isRoom}></PopupView>
          </div>
        )}

        {isAddBuildingOpen && (
          <div className="popupbackground">
            <ADD
              isedit={edit}
              onClose={closeAdd}
              buildingData={buildingData}
            />
          </div>
        )}

        {isPopupOpen && (
          <div className="popupbackground">
            <StudentAdd onClose={closePopup}
              BuildingID={BuildingID}
              roomId={roomId}
              data={Data}
              fetchData={fetchData}
            />
          </div>
        )}

        {isEle && (
          <div className="popupbackground">
            <Done
              onClose={closeEle}
              electricityData={electricityData}
              Data={Data}
            />
          </div>
        )}

        {studentProfile && (
          <div className="bg-white">
            <StudentProfile
              onClose={closeStudentProfile}
              viewOneData={isStudentProfileData}
              fetchAll={Data}
              ProfileData={fetchData}
            />
          </div>
        )}


        {deleteProfile && (
          <div className="popupbackground">
            <Delete
              onClose={closeDeleteProfile}
              isRoom={isRoom}
              fetchData={fetchData}
              Data={Data}
            />
          </div>
        )}

      </div>

      <div className="mainDivNAV">
        <div >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="second-Div">
          <div>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              activePage="buildingManagement"
            />
          </div>
          <div className="h-scree Last">

            <div className="NAMEandBUTTON ">
              <div className="NAMEandBUTTONLeft2">
                <svg onClick={handleButtonClick}
                  width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                  <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                </svg>

                <h6>
                  Building management/Rooms
                </h6>

              </div>


              <div className="NAMEandBUTTONRightOne" onClick={openAddPopup}>
                <div>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#F4E2DE" />
                    <path d="M5 13H21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M13 5L13 21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                  </svg>

                </div>
                <div>
                  <h6>Add Room</h6>
                </div>
              </div>

            </div>

            <div>
              <div className="BUILDINGcontantInRoom ">
                {data
                  .filter((item) =>
                    item.Building
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((filteredItem, index) => (

                    <>

                      <div key={index} className="d-flex BUILDINGMAinDiv">
                        {filteredItem.addDocument && filteredItem.addDocument.length > 0 ? (
                          <div className="BUILDING">
                            {filteredItem.addDocument.map((document, docIndex) => (
                              <div key={docIndex} style={{ display: docIndex === 0 ? 'block' : 'none' }} >
                                <img
                                  src={document.url}
                                  // alt={document.originalname}
                                  alt="Building pic"
                                  width="93px"
                                  height="103px"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="BUILDING">
                            <img
                              src="../public/defaultBuilding.jpeg"
                              alt="Manager"
                              width="93px"
                              height="103px"
                            />
                          </div>
                        )}
                        {/* <div className="BUILDING">
                          <img
                            src="../public/Building.png"
                            alt="Manager"
                            width="93px"
                            height="103px"

                          />
                        </div> */}


                        <div className="BUILDING_Text_Room">

                          <h5>{filteredItem.Building}</h5>
                          <h2>{filteredItem.BuildingAddress}</h2>
                          <div className="BUILDING_Text_MANGAGER_NAME">
                            <h6 className=""> Assign Manager :</h6>
                            <p>
                              <b>
                                {filteredItem.getMangers?.map((manager, index, array) => (
                                  <span key={manager.id}>
                                    {""}  {manager.ManagerName}
                                    {index !== array.length - 1 && " , "}
                                  </span>
                                ))}
                              </b>
                            </p>

                          </div>
                        </div>
                      </div>
                      <div className="BUILDING_Text_Room_Button" >
                        <button onClick={() => handleAdd(isedit._id)}>Edit</button>

                      </div>
                    </>
                  ))}

              </div>


              <div className="RoomViewAndStudentData">

                <div className="RoomView">
                  <h5>Rooms</h5>
                  <div className="RoomMainDiv">
                    {getdata && getdata.length > 0 ? (
                      getdata
                        .filter((item) =>
                          item.Room_No && item.Room_No.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((filteredItem, index) => (
                          <div key={index}
                            className={`ROOMcontant ${selectedStudentIndex === index ? 'highlighted' : ''}`}
                            onClick={() => handleOneView(filteredItem._id, index)} >
                            <div className="ROOM_Text_All">
                              <div className="ROOM_Text">
                                <h6>Room No. </h6>
                                <p>{filteredItem.Room_No} </p>
                              </div>

                              <div className="ROOM_Text">
                                <h6>No. of beds </h6>
                                <p>{filteredItem.Beds}</p>
                              </div>

                              <div className="ROOM_Text">
                                <h6>Occupied beds</h6>
                                <div className="ROOM_Text_AllData">
                                  {filteredItem.Occupied_Beds && filteredItem.Occupied_Beds.length > 0 ? (
                                    filteredItem.Occupied_Beds.map((bed, index) => (
                                      <h1 key={index}>{bed}</h1>
                                    ))
                                  ) : (
                                    <h1 style={{ color: "red", fontSize: "12px" }}>0</h1>
                                  )}

                                </div>
                              </div>

                              <div className="ROOM_Text">
                                <h6>Available beds</h6>
                                <div className="ROOM_Text_AllData">
                                  {filteredItem.Available_Beds && filteredItem.Available_Beds.length > 0 ? (
                                    filteredItem.Available_Beds &&
                                    filteredItem.Available_Beds.map((bed, index) => (
                                      <h1 key={index}> {bed}</h1>
                                    ))
                                  ) : (
                                    <h1 style={{ color: "red", fontSize: "12px" }}>0</h1>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="ROOM_button_And_Icon">
                              {editButtonVisibility[filteredItem._id] && (
                                <div className="ROOM__buttonContainer">
                                  <button onClick={() => handleEdit(filteredItem._id)}>
                                    <h6>Edit</h6>
                                  </button>
                                  {/* <button onClick={() => handleView(filteredItem._id)}>
              <h6>View Student</h6>
            </button> */}
                                  <button onClick={() => handleDelete(filteredItem._id)}>
                                    <h6>Delete</h6>
                                  </button>
                                </div>
                              )}
                              <div className="Button_ROOM_Text">
                                <svg
                                  onClick={() => toggleEditButtons(filteredItem._id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="18"
                                  viewBox="0 0 4 18"
                                  fill="none"
                                >
                                  <circle cx="2" cy="9" r="2" fill="black" />
                                  <circle cx="2" cy="2" r="2" fill="black" />
                                  <circle cx="2" cy="16" r="2" fill="black" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <><p style={{ color: "red", fontSize: "12px" }}>No Room in this Building</p></>
                    )
                    }

                  </div>
                </div>

                <div className="ElectricityDiv">
                  <div className="ElectricityDivOne">
                    <div className="ElectricityDivOneButton">
                      <div className="ElectricityDivOneButton1">Electricity Bill : {amount == 0 ? "N/A" : amount}</div>
                      <div className="ElectricityDivOneButton2 " onClick={handleElectricity}>Add Electricity Units</div>
                    </div>

                    <div className="STUDENTDATA">
                      {roomInSTudent && roomInSTudent.length > 0 ? (
                        roomInSTudent.map((filteredItem, index) => (
                          <div key={index} className="STUDENTDATAINROOM" onClick={() => handleStudentProfile(filteredItem._id)}>
                            {filteredItem.addDocuments && filteredItem.addDocuments.length > 0 ? (
                              <>
                                {filteredItem.addDocuments.map((document, docIndex) => (
                                  <div
                                    className="STUDENTDATAINROOMleft"
                                    key={docIndex}
                                    style={{ display: docIndex === 0 ? 'block' : 'none' }}
                                  // onClick={() => handleStudentProfile(filteredItem._id)}
                                  >
                                    <img
                                      src={document.url}
                                      alt="done"
                                      width="60px"
                                      height="60px"
                                      style={{ borderRadius: "50%" }}

                                    />
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div className="STUDENTDATAINROOMleft">
                                <img
                                  // src="../public/cashpic.png"
                                  src="../public/defaultProfile.jpeg"
                                  alt="done"
                                  width="60px"
                                  height="60px"
                                  style={{ borderRadius: "50%" }}
                                />
                              </div>
                            )}
                            <div className="STUDENTDATAINROOMright">
                              <h5>{filteredItem.studentName}</h5>
                              <h6>Mob. : {filteredItem.phoneNumber}</h6>
                              <h6>Email ID : {filteredItem.email} </h6>
                            </div>

                          </div>
                        ))
                      ) : (
                        <>
                          <p style={{ color: "red", fontSize: "12px" }}>No Students in this Room</p>
                        </>
                      )}

                    </div>

                    <div className="ElectricityDivOneButton3" onClick={openPopup}>Add Student</div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default RoomView;
