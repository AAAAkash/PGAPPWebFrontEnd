// import { useState, useEffect } from 'react'
// import SideBar from "../SideBar";
// import Navbar from "../Navbar";
// import dbConfig from '../../config.json';
// import { useLocation } from 'react-router-dom';

// const showOneComplaint = ({ onClose, editManager, fetchData }) => {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     const [getdata, setGetdata] = useState([]);
//     // console.log(getdata);

//     const location = useLocation();

//     const toggleSidebar = () => {
//         setIsSidebarOpen(!isSidebarOpen);
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
//         return formattedDate;
//     };

//     const handleStatusChange = (e, editManager) => {
//         const newStatus = e.target.value;
//         editManager.ComplaintStatus = newStatus;
//         fetch(dbConfig.backendBaseUrl + `/main/students/ComplaintStatus/${editManager._id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
//             },
//             body: JSON.stringify({ ComplaintStatus: newStatus })
//         })
//             .then(response => {
//                 if (response.ok) {
//                     fetchAllData();
//                     alert(`Complaint ${newStatus}`)
//                     // console.log('Complaint status updated successfully');
//                 } else {
//                     console.error('Failed to update complaint status:', response.statusText);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error updating complaint status:', error);
//             });
//     };

//     const handleButtonClick = () => {
//         onClose();
//         fetchData();

//     };

//     useEffect(() => {

//         fetchAllData();
//     }, []);

//     const fetchAllData = async () => {
//         try {
//             const response = await fetch(
//                 dbConfig.backendBaseUrl + "/main/students/AllComplaintData",
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
//                     }
//                 }
//             );
//             if (response.ok) {
//                 const fetchedData = await response.json();
//                 const Complaint = fetchedData.ComplaintData.filter((e) => e._id === editManager._id);
//                 // console.log(fetchedData, "55555555555555555555555555");
//                 setGetdata(Complaint);
//             } else {
//                 console.error("Failed to fetch data:", response.status);
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };



//     return (
//         <>
//             <div className="mainDivNAV">
//                 <div>
//                     <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//                 </div>
//                 <div className="second-Div">
//                     <div>
//                         <SideBar
//                             isSidebarOpen={isSidebarOpen}
//                             toggleSidebar={toggleSidebar}
//                             activePage={location.pathname.split('/').slice(1).join('/')}
//                         />
//                     </div>
//                     <div className="h-scree three">
//                         <div className="ComplainPopup" >

//                             <div className="compailntbuttonbuilding">
//                                 <div className="compailntbuttonbuildingFirst">
//                                     <svg style={{ cursor: "pointer" }} onClick={handleButtonClick} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                         <rect width="38" height="38" rx="19" fill="#F4E2DE" />
//                                         <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
//                                     </svg>

//                                     <div style={{marginLeft:"10px", marginTop:"2px"}}>
//                                         <h6>Complaint</h6>
//                                     </div>
//                                 </div>
//                                 <div className="compailntbuttonbuildingSecond">
//                                     <select>
//                                         <option>Building Name</option>
//                                         <option>Building1</option>
//                                         <option>Building2</option>
//                                         <option>Building3</option>
//                                         <option>Building4</option>
//                                     </select>
//                                 </div>
//                             </div>


//                             <div className="compailntbuttonbuilding4">
//                                 <div className="ComplainPopupBTNDIVFilter">
//                                     <select>
//                                         <option>Filter</option>
//                                         <option>Pending Payments</option>
//                                         <option>Received Payments</option>
//                                         <option>Cash Payments</option>
//                                     </select>
//                                 </div>
//                             </div>


//                             <div className="compailntPopupOne mt-2  ">
//                                 {getdata.map((filteredItem, index) => (
//                                     <div key={index} className="ComplainPopupDataText">
//                                         <div className="ComplainPopupDataTextLeft">
//                                             <h5>Name</h5>
//                                             <h5>Complaint Number</h5>
//                                             <h5>Building Name</h5>
//                                             <h5>Room No.</h5>
//                                             <h5>Contact No.</h5>
//                                             <h5>Complaint Reason</h5>
//                                             <h5>Registration Date & Time</h5>
//                                             <h5>Last Updation Date & Time</h5>
//                                             <h5>Complaint Status</h5>
//                                         </div>

//                                         <div className="ComplainPopupDataTextRight">
//                                             <h5>{filteredItem.StudentDetails.studentName}</h5>
//                                             <h5>{filteredItem.ComplaintNo}</h5>
//                                             <h5>{filteredItem.StudentDetails.BuildingDetails.Building}</h5>
//                                             <h5>{filteredItem.StudentDetails.RoomDetails.Room_No}</h5>
//                                             <h5>{filteredItem.StudentDetails.phoneNumber}</h5>
//                                             <h5>{filteredItem.ComplaintType}</h5>
//                                             <h5>{formatDate(filteredItem.RegistrationDate)}</h5>
//                                             <h5>{formatDate(filteredItem.UpDatedDate)}</h5>
//                                             <select
//                                                 value={filteredItem.ComplaintStatus}
//                                                 onChange={(e) => handleStatusChange(e, editManager)}
//                                                 style={{
//                                                     cursor:'pointer',
//                                                     backgroundColor: filteredItem.ComplaintStatus === "In Progress" ? "#FBD3AE" : 
//                                                         filteredItem.ComplaintStatus === "Resolved" ? "#C9F2C6" : "",
//                                                     color: filteredItem.ComplaintStatus === "In Progress" ? "#BE691B" :
//                                                         filteredItem.ComplaintStatus === "Resolved" ? "#149221" : "",
//                                                     border: filteredItem.ComplaintStatus === "In Progress" ? "2px solid #BE691B" :
//                                                         filteredItem.ComplaintStatus === "Resolved" ? "2px solid #149221" : "",
//                                                 }}

//                                             >
//                                                 <option style={{ color : "#C10D0D"}} value="Pending">Pending</option>
//                                                 <option style={{ color : "#DB710F"}} value="In Progress">In Progress</option>
//                                                 <option style={{ color : "#589825"}} value="Resolved">Resolved</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 ))}

//                                 <div className='ComplainPopupDataDES'>
//                                     <h5>Description </h5>
//                                     <p>{editManager.AddDesc}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default showOneComplaint






import { useState, useEffect } from 'react'
import SideBar from "../SideBar";
import Navbar from "../Navbar";
import dbConfig from '../../config.json';
import { useLocation } from 'react-router-dom';

const showOneComplaint = ({ onClose, editManager, fetchData }) => {
    const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);
    const [getdata, setGetdata] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("");
    // console.log(getdata);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} - ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate;
    };

    const handleStatusChange = (e, editManager) => {
        const newStatus = e.target.value;
        editManager.ComplaintStatus = newStatus;
        fetch(dbConfig.backendBaseUrl + `/main/students/ComplaintStatus/${editManager._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },
            body: JSON.stringify({ ComplaintStatus: newStatus })
        })
            .then(response => {
                if (response.ok) {
                    fetchAllData();
                    alert(`Complaint ${newStatus}`)
                    // console.log('Complaint status updated successfully');
                } else {
                    console.error('Failed to update complaint status:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error updating complaint status:', error);
            });
    };

    const handleButtonClick = () => {
        onClose();
        fetchData();

    };

    useEffect(() => {

        fetchAllData();
    }, []);

    const fetchAllData = async () => {
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
                const Complaint = fetchedData.ComplaintData.filter((e) => e._id === editManager._id);
                // console.log(fetchedData, "55555555555555555555555555");
                setGetdata(Complaint);
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    return (
        <>
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
                        <div className="ComplainPopup" >

                            <div className="compailntbuttonbuilding">
                                <div className="compailntbuttonbuildingFirst">
                                    <svg style={{ cursor: "pointer" }} onClick={handleButtonClick} width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                                        <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                                    </svg>

                                    <div style={{ marginLeft: "10px", marginTop: "2px" }}>
                                        <h6>Complaint</h6>
                                    </div>
                                </div>
                                <div className="compailntbuttonbuildingSecond">
                                    <select>
                                        <option>Building Name</option>
                                        <option>Building1</option>
                                        <option>Building2</option>
                                        <option>Building3</option>
                                        <option>Building4</option>
                                    </select>
                                </div>
                            </div>


                            <div className="compailntbuttonbuilding4">
                                <div className="ComplainPopupBTNDIVFilter">
                                    <select
                                        value={selectedFilter}
                                        onChange={(e) => setSelectedFilter(e.target.value)}

                                    >
                                        <option value="" >Filter</option>
                                        <option value="Pending">Pending Complaint</option>
                                        <option value="Resolved">Resolved Complaint</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </div>
                            </div>


                            {getdata && getdata.length > 0 ? (
                                <>
                                    {getdata
                                        .filter((item) => {
                                            if (selectedFilter === "") {
                                                return true;
                                            } else {
                                                return item.ComplaintStatus === selectedFilter;
                                            }
                                        })
                                        .map((filteredItem, index) => (
                                            <div className="compailntPopupOne mt-2  ">
                                                <div key={index} className="ComplainPopupDataText">
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
                                                            value={filteredItem.ComplaintStatus}
                                                            onChange={(e) => handleStatusChange(e, editManager)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                backgroundColor: filteredItem.ComplaintStatus === "In Progress" ? "#FBD3AE" :
                                                                    filteredItem.ComplaintStatus === "Resolved" ? "#C9F2C6" : "",
                                                                color: filteredItem.ComplaintStatus === "In Progress" ? "#BE691B" :
                                                                    filteredItem.ComplaintStatus === "Resolved" ? "#149221" : "",
                                                                border: filteredItem.ComplaintStatus === "In Progress" ? "2px solid #BE691B" :
                                                                    filteredItem.ComplaintStatus === "Resolved" ? "2px solid #149221" : "",
                                                            }}

                                                        >
                                                            <option style={{ color: "#C10D0D" }} value="Pending">Pending</option>
                                                            <option style={{ color: "#DB710F" }} value="In Progress">In Progress</option>
                                                            <option style={{ color: "#589825" }} value="Resolved">Resolved</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='ComplainPopupDataDES'>
                                                    <h5>Description </h5>
                                                    <p>{editManager.AddDesc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    {getdata
                                        .filter((item) => {
                                            if (selectedFilter === "") {
                                                return true;
                                            } else {
                                                return item.ComplaintStatus === selectedFilter;
                                            }
                                        }).length === 0 && (
                                            <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "100px" }}>No complaint found</p>
                                        )}
                                </>
                            ) : (
                                <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "100px" }}>No complaint found</p>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default showOneComplaint

