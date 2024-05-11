import React from "react";
import { useState, useEffect } from "react";
import StudentEditPopup from "./StudentListPopupEdit"
import dbConfig from '../../../config.json';
import Navbar from "../../Navbar";
import SideBar from "../../SideBar";
import { useLocation } from 'react-router-dom';
import { auto } from "@popperjs/core";

const StudentListPopup = ({ onClose, viewOneData, fetchAll, ProfileData }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);

  const [studentData, setStudentData] = useState([]);
  // console.log(studentData, "333333333333333333");
  const [data, setData] = useState(null);


  const [showPopup, setShowPopup] = useState(false);
  const [selectedDocumentUrl, setSelectedDocumentUrl] = useState('');
  const [zoomFactor, setZoomFactor] = useState(1);

  // console.log(data,"666666666666666");
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // console.log(location.pathname.split('/').slice(1).join('/'), "2222222222");


  // console.log(viewOneData,"2222222222")

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
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
        dbConfig.backendBaseUrl + "/main/students/studentget",
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
        const Student = fetchedData.students.filter((e) => e._id === viewOneData._id);
        setStudentData(Student);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOneView = (id) => {
    const studentDataView = studentData.find((company) => company._id === id);
    setData(studentDataView);
    setIsEditPopupOpen(true);
  };

  const handleButtonClick = () => {
    onClose();
    fetchAll();
    // Call ProfileData only if it exists
    if (typeof ProfileData === 'function') {
      ProfileData();
    }
  };


  const handlePopupOpen = (url) => {
    setSelectedDocumentUrl(url);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleZoomIn = () => {
    setZoomFactor(zoomFactor + 0.1);
  };

  const handleZoomOut = () => {
    setZoomFactor(zoomFactor - 0.1);
  };


  const handleDownloadImage = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'image.jpg'; // You can customize the filename here
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <>
      <div>
        <div className="popup">
          {isEditPopupOpen && (
            <div className="popupbackground">
              <StudentEditPopup
                data={data}
                onClose={closeEditPopup}
                fetchData={fetchData}
              ></StudentEditPopup>
            </div>
          )}

          {showPopup && (
            <div className="popupDTAA">
              <div className="popupDTAAImage" >
                <div className="popupDTAAImageall">
                  {/* <button onClick={handlePopupClose}>Close</button> */}
                  <div className="AddManagerCrossButton">
                    <svg onClick={handlePopupClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
                    </svg>
                  </div>


                  <img
                    src={selectedDocumentUrl}
                    alt="Document"
                    width="400px"
                    height="400px"                  
                    style={{ borderRadius: "22%" }}
                    // width={`${350 * zoomFactor}px`}
                    // height={`${350 * zoomFactor}px`}            
                  />
                   {/* <div className="zoomControls">
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>
              </div> */}

                </div>
              </div>
            </div>
          )}

        </div>

        <div className="mainDivNAV ">
          <div >
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
            <div className="h-scree Last">
              <div className="NAMEandBUTTON2">
                <div className="NAMEandBUTTONLeft2">
                  <svg
                    onClick={handleButtonClick}
                    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                    <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                  </svg>
                  <h6>
                    Student List/Student Details
                  </h6>
                </div>
              </div>

              <div className="flex flex-wrap flex-column ManagerManagement">
                <div className="StudentListALlMainDiv">
                  {studentData && studentData.length > 0 ? (
                    studentData.map((filteredItem, index) => (
                      <div key={index} className="StudentListPhotoAndNameDiv">

                        <div className="StudentListPhotoAndNameDivOne">
                          <div className="StudentListPhotoAndNameDivOneIMAGE">
                            {/* <img
                              src="../public/cashpic.png"
                              alt="done"
                              width="200px"
                              height="200px"
                            /> */}
                            {filteredItem.addDocuments && filteredItem.addDocuments.length > 0 ? (
                              <>
                                {filteredItem.addDocuments.map((document, docIndex) => (
                                  <div key={docIndex} style={{ display: docIndex === 0 ? 'block' : 'none' }} >

                                    <img
                                      src={document.url}
                                      alt="done"
                                      width="200px"
                                      height="200px"
                                      style={{ borderRadius: "50%" }}

                                    />
                                  </div>
                                ))}
                              </>
                            ) : (
                              <div >
                                <img
                                  // src="../public/cashpic.png"
                                  src="../public/defaultProfile.jpeg"
                                  alt="done"
                                  width="200px"
                                  height="200px"
                                  style={{ borderRadius: "50%" }}
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <h5>Payment Status Pending</h5>
                            <button className="StudentListPhotoAndNameDivOneButton1">Send Reminder</button>
                            <button className="StudentListPhotoAndNameDivOneButton2">Send Documents For Verification</button>
                          </div>
                        </div>

                        <div className="StudentListPhotoAndNameDivTwo">

                          <div className="StudentListPhotoAndNameDivTwo1">
                            <h6>Name</h6>
                            <h6>Mob No</h6>
                            <h6>Email ID</h6>
                            <h6>Assigned Building</h6>
                            <h6>Room No.</h6>
                            <h6>Payment Status</h6>
                            <h6>Due Date</h6>
                            <h6>Rent Amount</h6>
                            <h6>Security Amount</h6>
                            <h6>Electricity Bill</h6>
                            <h6>Rent Received in Case</h6>
                          </div>


                          <div key={index} className="StudentListPhotoAndNameDivTwo2">
                            <h6>{filteredItem.studentName}</h6>
                            <h6>{filteredItem.phoneNumber}</h6>
                            <h6>{filteredItem.email}</h6>
                            {/* <h6>N/A</h6> */}
                            <h6>{filteredItem.BuildingDetails.Building}</h6>
                            {/* <h6>{viewOneData.BuildingDetails.Building}</h6> */}
                            <h6>{filteredItem.Bed_No.length === 0 ? "N/A" : filteredItem.Bed_No}</h6>
                            <h6>Due</h6>
                            {/* <h6>{viewOneData.paymentStatus}</h6> */}
                            <h6>{filteredItem.dueDate}</h6>
                            <h6>₹ {filteredItem.rentAmount}</h6>
                            <h6>₹ {filteredItem.securityAmount}</h6>
                            {/* <h6>₹ {filteredItem.ElectricityBill === "NaN" ? "N/A": filteredItem.ElectricityBill}</h6> */}
                            <h6>₹ {
                              filteredItem.ElectricityBill === "NaN"
                                ? "N/A"
                                : Number(filteredItem.ElectricityBill).toLocaleString('en-IN', {
                                  maximumFractionDigits: 2,
                                })}</h6>
                            <input type="checkbox" style={{ height: "40x", width: "40px", marginLeft: "-12px" }} />
                          </div>

                        </div>


                        <div className="StudentListPhotoAndNameDivThree">
                          {/* <button onClick={openEditPopup}>
                        Edit
                      </button> */}
                          <svg onClick={() => handleOneView(filteredItem._id)} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="22.5" cy="22.5" r="22.5" fill="#F4E2DE" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M29.8828 10.4614L34.5384 15.117L30.1019 19.5536C30.1017 19.5538 30.1021 19.5533 30.1019 19.5536C30.1017 19.5538 30.1008 19.5547 30.1006 19.5549L15.5541 34.1014H10.8984L10.8984 29.4458L25.4451 14.8991C25.4449 14.8993 25.4453 14.899 25.4451 14.8991C25.4453 14.899 25.446 14.8983 25.4462 14.8981L29.8828 10.4614ZM26.1914 17.1359L13.0078 30.3195L13.0078 31.992H14.6803L27.8639 18.8084L26.1914 17.1359ZM29.3555 17.3169L27.683 15.6444L29.8828 13.4445L31.5553 15.117L29.3555 17.3169Z" fill="#EE6C4E" />
                          </svg>

                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                    // <p>No data available</p>
                  )}
                  {studentData && studentData.length > 0 ? (
                    studentData.map((filteredItem, index) => (
                      //  {filteredItem.Verification.length >0 ? }
                      <div key={index} className="POPUP_IINPUTT_All_One">
                        {filteredItem.Verification.length > 0 ?
                          <div className="POPUP_IINPUTT_One">

                            <div className=""><b>Documents</b></div>
                            {/* <div className="POPUP_IINPUTT_One_button">Download All</div> */}
                          </div> :
                          <></>}


                        <div className="POPUP_IINPUTT_All_Two">


                          {filteredItem.Verification.map((document, docIndex) => (
                            <div key={docIndex} className="POPUP_IINPUTT_All_1">
                              <div className="POPUP_IINPUTT_Two_First">
                                <input type="checkbox" />
                                <div className="POPUP_IINPUTT_Two_Sec">
                                  <img
                                    src={document.url}
                                    alt="done"
                                    width="60px"
                                    height="60px"
                                    style={{ borderRadius: "10%" }}

                                  />
                                </div>
                                <div className="POPUP_IINPUTT_Two_Thi"><i>{document.Verification}</i></div>
                              </div>


                              <div className="POPUP_IINPUTT_Two_Second">

                                <svg onClick={() => handlePopupOpen(document.url)} className="mt-1" width="19" height="20" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21903 6.99984C6.21903 5.21638 7.72318 3.83317 9.49964 3.83317C11.2761 3.83317 12.7802 5.21638 12.7802 6.99984C12.7802 8.78329 11.2761 10.1665 9.49964 10.1665C7.72318 10.1665 6.21903 8.78329 6.21903 6.99984ZM9.49964 5.4165C8.52689 5.4165 7.80236 6.15994 7.80236 6.99984C7.80236 7.83974 8.52689 8.58317 9.49964 8.58317C10.4724 8.58317 11.1969 7.83974 11.1969 6.99984C11.1969 6.15994 10.4724 5.4165 9.49964 5.4165Z" fill="#EE6C4E" />
                                  <path fillRule="evenodd" clipRule="evenodd" d="M0.83147 6.75229C1.99876 3.20596 5.45377 0.666504 9.50011 0.666504C13.5465 0.666504 17.0015 3.20599 18.1688 6.75235L18.2502 6.99987L18.1688 7.24738C17.0015 10.7937 13.5465 13.3332 9.50012 13.3332C5.45377 13.3332 1.99874 10.7937 0.831469 7.24732L0.75 6.99981L0.83147 6.75229ZM2.42223 6.99981C3.44678 9.75047 6.21449 11.7498 9.50012 11.7498C12.7857 11.7498 15.5534 9.75049 16.578 6.99986C15.5535 4.2492 12.7857 2.24984 9.50011 2.24984C6.21449 2.24984 3.44679 4.24918 2.42223 6.99981Z" fill="#EE6C4E" />
                                </svg>
                                {/* handleDownloadImage */}
                                <svg  onClick={() => handleDownloadImage(document.url)}
                                width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.4168 17.9168H1.5835V9.2085H3.16683V16.3335H15.8335V9.2085H17.4168V17.9168Z" fill="#EE6C4E" />
                                  <path d="M9.50016 14.2864L5.21391 10.0002L6.3335 8.88058L8.7085 11.2556V2.0835H10.2918V11.2556L12.6668 8.88058L13.7864 10.0002L9.50016 14.2864Z" fill="#EE6C4E" />
                                </svg>

                                {/* 
                              <svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.875 6.125V11.75H5.625V6.125H6.875Z" fill="#717171" />
                                <path d="M9.375 6.125V11.75H8.125V6.125H9.375Z" fill="#717171" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.54953 1.125H10.4505L11.0755 3H13.75V4.25H12.5V14.875H2.5V4.25H1.25V3H3.92453L4.54953 1.125ZM5.24214 3H9.75786L9.54953 2.375H5.45047L5.24214 3ZM3.75 4.25V13.625H11.25V4.25H3.75Z" fill="#717171" />
                              </svg> 
                            \*/}
                              </div>
                            </div>
                          ))}

                          {filteredItem.digitalSignature === "Panding" ? (<></>): (
                            <div className="POPUP_IINPUTT_All_1">
                              <div className="POPUP_IINPUTT_Two_First">
                                <input type="checkbox" />
                                <div className="POPUP_IINPUTT_Two_Sec">
                                  <img
                                    src={filteredItem.digitalSignature}
                                    alt="done"
                                    width="60px"
                                    height="60px"
                                    style={{ borderRadius: "10%" }}

                                  />
                                </div>
                                <div className="POPUP_IINPUTT_Two_Thi"><i>Agriment</i></div>
                              </div>


                              <div className="POPUP_IINPUTT_Two_Second">

                                <svg onClick={() => handlePopupOpen(filteredItem.digitalSignature)} className="mt-1" width="19" height="20" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21903 6.99984C6.21903 5.21638 7.72318 3.83317 9.49964 3.83317C11.2761 3.83317 12.7802 5.21638 12.7802 6.99984C12.7802 8.78329 11.2761 10.1665 9.49964 10.1665C7.72318 10.1665 6.21903 8.78329 6.21903 6.99984ZM9.49964 5.4165C8.52689 5.4165 7.80236 6.15994 7.80236 6.99984C7.80236 7.83974 8.52689 8.58317 9.49964 8.58317C10.4724 8.58317 11.1969 7.83974 11.1969 6.99984C11.1969 6.15994 10.4724 5.4165 9.49964 5.4165Z" fill="#EE6C4E" />
                                  <path fillRule="evenodd" clipRule="evenodd" d="M0.83147 6.75229C1.99876 3.20596 5.45377 0.666504 9.50011 0.666504C13.5465 0.666504 17.0015 3.20599 18.1688 6.75235L18.2502 6.99987L18.1688 7.24738C17.0015 10.7937 13.5465 13.3332 9.50012 13.3332C5.45377 13.3332 1.99874 10.7937 0.831469 7.24732L0.75 6.99981L0.83147 6.75229ZM2.42223 6.99981C3.44678 9.75047 6.21449 11.7498 9.50012 11.7498C12.7857 11.7498 15.5534 9.75049 16.578 6.99986C15.5535 4.2492 12.7857 2.24984 9.50011 2.24984C6.21449 2.24984 3.44679 4.24918 2.42223 6.99981Z" fill="#EE6C4E" />
                                </svg>
                                {/* handleDownloadImage */}
                                <svg  onClick={() => handleDownloadImage(filteredItem.digitalSignature)}
                                width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M17.4168 17.9168H1.5835V9.2085H3.16683V16.3335H15.8335V9.2085H17.4168V17.9168Z" fill="#EE6C4E" />
                                  <path d="M9.50016 14.2864L5.21391 10.0002L6.3335 8.88058L8.7085 11.2556V2.0835H10.2918V11.2556L12.6668 8.88058L13.7864 10.0002L9.50016 14.2864Z" fill="#EE6C4E" />
                                </svg>

                                {/* 
                              <svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.875 6.125V11.75H5.625V6.125H6.875Z" fill="#717171" />
                                <path d="M9.375 6.125V11.75H8.125V6.125H9.375Z" fill="#717171" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.54953 1.125H10.4505L11.0755 3H13.75V4.25H12.5V14.875H2.5V4.25H1.25V3H3.92453L4.54953 1.125ZM5.24214 3H9.75786L9.54953 2.375H5.45047L5.24214 3ZM3.75 4.25V13.625H11.25V4.25H3.75Z" fill="#717171" />
                              </svg> 
                            \*/}
                              </div>
                            </div>
                       
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <></>
                    // <p>No data available</p>
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

export default StudentListPopup;
