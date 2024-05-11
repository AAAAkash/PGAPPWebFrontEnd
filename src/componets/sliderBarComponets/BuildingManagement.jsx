import React, { useState, useEffect } from "react";
import PopupEdit from "./BuildingManagementPopup/BuildingManagementPopupEdit";
import PopupAdd from "./BuildingManagementPopup/BuildingManagementPopupAdd";
import Room from "./Room/RoomView"
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import dbConfig from '../../config.json';

const BuildingManagement = () => {
  const [getdata, setGetdata] = useState([]);
  // console.log(getdata, "66666666666666666666");
  const [searchQuery, setSearchQuery] = useState("");
  const [isedit, setIsEdit] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isRoom, setIsRoom] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isHeadingVisible, setIsHeadingVisible] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);


  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

  const openRoomPopup = () => {
    setIsRoom(true);
  };

  const closeRoomPopup = () => {
    setIsRoom(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(true);
    setIsHeadingVisible(false);
  };

  const toggleCancel = () => {
    setIsSearchVisible(false);
    setIsHeadingVisible(true);
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
        setGetdata(fetchedData.buildings);
        // console.log(fetchedData.buildings, "buildings11111111111");
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
    const buildingToEdit = getdata.find((company) => company._id === id);
    let getAllManagerName = []
    let getManagerNames = []
    let getManagerIds = []
    buildingToEdit.getMangers.map((m) => {
      getAllManagerName.push({ "ManagerName": m.ManagerName, "id": m._id });
      getManagerNames.push(m.ManagerName)
      getManagerIds.push(m._id)
    })
    setIsEdit({ "id": buildingToEdit._id, "Building": buildingToEdit.Building, "BuildingAddress": buildingToEdit.BuildingAddress, "ManagerName": getManagerNames, "getManagerIds": getManagerIds, "managerList": getAllManagerName, "Per_Unit_Cost": Per_Unit_Cost });
    setIsEditPopupOpen(true);
  };

  const handleRoomView = (id) => {
    const buildingToEdit = getdata.find((company) => company._id === id);
    setIsEdit(buildingToEdit);
    setIsRoom(true);
  };
  return (
    <>

      <div className="popup">
        {isAddPopupOpen && (
          <div className="popupbackground">
            <PopupAdd onClose={closeAddPopup} fetchData={fetchData}></PopupAdd>
          </div>
        )}

        {isEditPopupOpen && (
          <div className="popupbackground">
            <PopupEdit onClose={closeEditPopup} isedit={isedit} fetchData={fetchData}></PopupEdit>
          </div>
        )}

        {isRoom && (
          <div className="bg-white">
            <Room onClose={closeRoomPopup} isedit={isedit} fetchAll={fetchData}></Room>
          </div>
        )}
      </div>

      <div className="mainDivNAV">
        <div>
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="second-Div">
          <div>
            <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activePage="buildingManagement" />

          </div>
          <div className=" three ">
            <div className="NAMEandBUTTON">
              <div className="NAMEandBUTTONLeft">
                <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                  <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                </svg>

                <h6>
                  Building management
                </h6>

              </div>
              <div className="NAMEandBUTTONRight" onClick={openAddPopup}>
                <div>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="26" height="26" rx="13" fill="#F4E2DE" />
                    <path d="M5 13H21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                    <path d="M13 5L13 21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
                  </svg>

                </div>
                <div>
                  <h6>Add Building</h6>
                </div>
              </div>
            </div>

            <div className="four ">
              <div className="flex flex-wrap flex-column ManagerManagement">
                <div className="Allcontant">
                {getdata && getdata.length > 0 ? (
                  getdata
                    .map((filteredItem, index) => (
                      <div key={index} className="BUILDINGcontant">
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
                        <div className="BUILDING"   >
                          <img
                            src="../public/defaultBuilding.jpeg"
                            alt="Manager"
                            width="93px"
                            height="103px"
                            // style={{backgroundColor:"black"}}
                          />
                        </div>
                      )}                  

                     
                        <div className="BUILDING_Text">
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
                        <div className="BUILDINGRightArrow">
                          <svg onClick={() => handleRoomView(filteredItem._id)}
                            width="35" height="12" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.3536 4.887C17.5488 4.69174 17.5488 4.37515 17.3536 4.17989L14.1716 0.997912C13.9763 0.80265 13.6597 0.80265 13.4645 0.997912C13.2692 1.19317 13.2692 1.50976 13.4645 1.70502L16.2929 4.53345L13.4645 7.36187C13.2692 7.55714 13.2692 7.87372 13.4645 8.06898C13.6597 8.26424 13.9763 8.26424 14.1716 8.06898L17.3536 4.887ZM3.59272e-08 5.03345L17 5.03345L17 4.03345L-3.59272e-08 4.03345L3.59272e-08 5.03345Z" fill="#EE6C4E" />
                          </svg>

                        </div>
                      </div>
                    ))):(
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




export default BuildingManagement;




















// import React, { useState, useEffect } from "react";
// import PopupEdit from "./BuildingManagementPopup/BuildingManagementPopupEdit";
// import PopupAdd from "./BuildingManagementPopup/BuildingManagementPopupAdd";
// import Room from "./Room/RoomView"
// import Navbar from "../Navbar";
// import SideBar from "../SideBar";
// import dbConfig from '../../config.json';

// const BuildingManagement = () => {
//   const [getdata, setGetdata] = useState([]);
//   console.log(getdata, "66666666666666666666");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isedit, setIsEdit] = useState(null);
//   const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
//   const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
//   const [isRoom, setIsRoom] = useState(false);
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [isHeadingVisible, setIsHeadingVisible] = useState(true);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };


//   const openEditPopup = () => {
//     setIsEditPopupOpen(true);
//   };

//   const closeEditPopup = () => {
//     setIsEditPopupOpen(false);
//   };

//   const openAddPopup = () => {
//     setIsAddPopupOpen(true);
//   };

//   const closeAddPopup = () => {
//     setIsAddPopupOpen(false);
//   };

//   const openRoomPopup = () => {
//     setIsRoom(true);
//   };

//   const closeRoomPopup = () => {
//     setIsRoom(false);
//   };

//   const toggleSearch = () => {
//     setIsSearchVisible(true);
//     setIsHeadingVisible(false);
//   };

//   const toggleCancel = () => {
//     setIsSearchVisible(false);
//     setIsHeadingVisible(true);
//   };


//   useEffect(() => {

//     fetchData();
//     // const interval = setInterval(() => {
//     //   fetchData();
//     // }, 1000);
//     // return () => clearInterval(interval);
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         dbConfig.backendBaseUrl + "/main/building/Building_get",
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
//           }
//         }
//       );

//       if (response.ok) {
//         const fetchedData = await response.json();
//         setGetdata(fetchedData.buildings);
//         // console.log(fetchedData.buildings, "buildings11111111111");
//       } else {
//         console.error("Failed to fetch data:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };


//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleEdit = (id) => {
//     const buildingToEdit = getdata.find((company) => company._id === id);
//     let getAllManagerName = []
//     let getManagerNames = []
//     let getManagerIds = []
//     buildingToEdit.getMangers.map((m) => {
//       getAllManagerName.push({ "ManagerName": m.ManagerName, "id": m._id });
//       getManagerNames.push(m.ManagerName)
//       getManagerIds.push(m._id)
//     })
//     setIsEdit({ "id": buildingToEdit._id, "Building": buildingToEdit.Building, "BuildingAddress": buildingToEdit.BuildingAddress, "ManagerName": getManagerNames, "getManagerIds": getManagerIds, "managerList": getAllManagerName, "Per_Unit_Cost": Per_Unit_Cost });
//     setIsEditPopupOpen(true);
//   };

//   const handleRoomView = (id) => {
//     const buildingToEdit = getdata.find((company) => company._id === id);
//     setIsEdit(buildingToEdit);
//     setIsRoom(true);
//   };
//   return (
//     <>

//       <div className="popup">
//         {isAddPopupOpen && (
//           <div className="popupbackground">
//             <PopupAdd onClose={closeAddPopup} fetchData={fetchData}></PopupAdd>
//           </div>
//         )}

//         {isEditPopupOpen && (
//           <div className="popupbackground">
//             <PopupEdit onClose={closeEditPopup} isedit={isedit} fetchData={fetchData}></PopupEdit>
//           </div>
//         )}

//         {isRoom && (
//           <div className="bg-white">
//             <Room onClose={closeRoomPopup} isedit={isedit} fetchAll={fetchData}></Room>
//           </div>
//         )}
//       </div>

//       <div className="mainDivNAV">
//         <div>
//           <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         </div>
//         <div className="second-Div">
//           <div>
//             <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} activePage="buildingManagement" />

//           </div>
//           <div className=" three ">
//             <div className="NAMEandBUTTON">
//               <div className="NAMEandBUTTONLeft">
//                 <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <rect width="38" height="38" rx="19" fill="#F4E2DE" />
//                   <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
//                 </svg>

//                 <h6>
//                   Building management
//                 </h6>

//               </div>
//               <div className="NAMEandBUTTONRight" onClick={openAddPopup}>
//                 <div>
//                   <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <rect width="26" height="26" rx="13" fill="#F4E2DE" />
//                     <path d="M5 13H21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
//                     <path d="M13 5L13 21" stroke="#EE6C4E" strokeWidth="2" strokeLinecap="round" />
//                   </svg>

//                 </div>
//                 <div>
//                   <h6>Add Building</h6>
//                 </div>
//               </div>
//             </div>

//             <div className="four ">
//               <div className="flex flex-wrap flex-column ManagerManagement">
//                 <div className="Allcontant">
//                   {getdata
//                     .map((filteredItem, index) => (
//                       <div key={index} className="BUILDINGcontant">
//                        {filteredItem.addDocument && filteredItem.addDocument.length > 0 ? (
//                         <div className="BUILDING">
//                           {/* Image rendering with delay */}
//                           <DelayedImageRenderer documents={filteredItem.addDocument} />
//                         </div>
//                       ) : (
//                         <div className="BUILDING">
//                           {/* Placeholder image */}
//                           <img
//                             src="../public/Building.png"
//                             alt="Manager"
//                             width="93px"
//                             height="103px"
//                           />
//                         </div>
//                       )}

                    

//                         {/* <div className="BUILDING">
//                           {filteredItem.addDocument && filteredItem.addDocument.length > 0 && (
//                             <>
//                               {filteredItem.addDocument.map((image, index) => (
//                                 <img
//                                   key={index}
//                                   src={image.filename} // Assuming images are stored in the 'images' directory
//                                   alt={`Building ${image.filename}`}
//                                   width="93px"
//                                   height="103px"
//                                 />
//                               ))}
//                             </>
//                           )}
//                         </div> */}
//                         <div className="BUILDING_Text">

//                           <h5>{filteredItem.Building}</h5>
//                           <h2>{filteredItem.BuildingAddress}</h2>
//                           <div className="BUILDING_Text_MANGAGER_NAME">
//                             <h6 className=""> Assign Manager :</h6>
//                             <p>
//                               <b>
//                                 {filteredItem.getMangers?.map((manager, index, array) => (
//                                   <span key={manager.id}>
//                                     {""}  {manager.ManagerName}
//                                     {index !== array.length - 1 && " , "}
//                                   </span>
//                                 ))}
//                               </b>
//                             </p>

//                           </div>

//                         </div>
//                         <div className="BUILDINGRightArrow">
//                           <svg onClick={() => handleRoomView(filteredItem._id)}
//                             width="35" height="12" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M17.3536 4.887C17.5488 4.69174 17.5488 4.37515 17.3536 4.17989L14.1716 0.997912C13.9763 0.80265 13.6597 0.80265 13.4645 0.997912C13.2692 1.19317 13.2692 1.50976 13.4645 1.70502L16.2929 4.53345L13.4645 7.36187C13.2692 7.55714 13.2692 7.87372 13.4645 8.06898C13.6597 8.26424 13.9763 8.26424 14.1716 8.06898L17.3536 4.887ZM3.59272e-08 5.03345L17 5.03345L17 4.03345L-3.59272e-08 4.03345L3.59272e-08 5.03345Z" fill="#EE6C4E" />
//                           </svg>

//                         </div>
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>

//       </div>

//     </>
//   );
// };


// const DelayedImageRenderer = ({ documents }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex(prevIndex => (prevIndex + 1) % documents.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [documents.length]);

//   return (
//     <div>
//       {documents.map((document, index) => (
//         <div key={index} style={{ display: index === currentIndex ? 'block' : 'none' }}>
//           <img
//             src={document.url}
//             alt={document.originalname}
//             width="93px"
//             height="103px"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BuildingManagement;