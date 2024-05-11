
import { useState, useEffect } from "react";
import dbConfig from '../../../config.json';

const StudentListPopupEdit = ({ onClose, data, fetchData }) => {
  const [user, setUser] = useState(data || {
    studentName: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    Address: "",
    assignedBuilding: "",
    Room_No: "",
    Bed_No: "",
    dueDate: "",
    rentAmount: "",
    securityAmount: "",
    ElectricityMeterReading: "",
    addDocuments : "",
    // ElectricityBill:5,
  });
  // console.log(user,"2222222222222");

  const [errors, setErrors] = useState({});

  const [buildingData, setBuildingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  //   setErrors({ ...errors, [name]: "" });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
    let capitalizedValue = value;
  
    if (name === "studentName") {
      // Capitalize the first letter of the first word
      capitalizedValue = value
        .split(/\s+/) // Split by one or more spaces
        .map((word, index) => {
          // Capitalize the first letter of the first word
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          } else {
            // Lowercase the first letter of subsequent words
            return word.charAt(0).toUpperCase()+ word.slice(1);
          }
        })
        .join(" "); // Join words back together with a single space
    }
  
    setUser({ ...user, [name]: capitalizedValue });
    setErrors({ ...errors, [name]: "" });
  };

  
  const handleBuildingChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === 'Select' ? '' : value });
  };

  const handleRoomChange = (e) => {
    const selectedRoom = e.target.value;
    const [roomId, bedNo] = selectedRoom.split(',');

    setUser(prevUser => ({
      ...prevUser,
      Room_No: roomId,
      Bed_No: bedNo,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: [...files] });
  };


  useEffect(() => {
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


    const fetchRoomData = async () => {
      try {
        const response = await fetch(
          dbConfig.backendBaseUrl + `/main/RoomsData/adminRoomget`,
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
          setRoomData(fetchedData.rooms);
        } else {
          console.error("Failed to fetch room data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchBuildingData();
    fetchRoomData();

    // const interval = setInterval(() => {
    //   fetchBuildingData();
    //   fetchRoomData();
    // }, 1000);
    // return () => clearInterval(interval);
  }, []);

  const buildingsToEdit = roomData.filter((company) => company.BuildingId === user.assignedBuilding);

  const uniqueAvailableBeds = buildingsToEdit.flatMap(room => room.Available_Beds.map(bed => ({ _id: room._id, Available_Bed: bed })));



  const validateForm = () => {
    const validationErrors = {};

    if (!user.studentName) {
      validationErrors.studentName = "Student Name is required";
    }
    if (!user.email) {
      validationErrors.email = "Email is required";
    // } else if (!/^[\w.-]+@\w+\.\w+$/.test(user.email)) {
    }
    // else if (!/^[\w.-]+@gmail\.com$/.test(user.email)) {
    //   validationErrors.email = "Please enter a valid email address";
    // }
    
    if (!user.phoneNumber) {
      validationErrors.phoneNumber = "Phone Number is required";
    }
    if (!user.fatherName) {
      validationErrors.fatherName = "Father Name is required";
    }
    if (!user.Address) {
      validationErrors.Address = "Address is required";
    }
    if (!user.assignedBuilding) {
      validationErrors.assignedBuilding = "Assigned Building is required";
    }
    if (!user.Room_No) {
      validationErrors.Room_No = "Room no is required";
    }
    if (!user.dueDate) {
      validationErrors.dueDate = "Due Date is required";
    }
    if (!user.rentAmount) {
      validationErrors.rentAmount = "Rent Amount is required";
    }
    if (!user.securityAmount) {
      validationErrors.securityAmount = "Security Amount required";
    }
    if (!user.ElectricityMeterReading) {
      validationErrors.ElectricityMeterReading = "Electricity Bill is required";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("studentName", user.studentName);
        formData.append("email", user.email);
        formData.append("phoneNumber", user.phoneNumber);
        formData.append("fatherName", user.fatherName);
        formData.append("Address", user.Address);
        formData.append("assignedBuilding", user.assignedBuilding);
        formData.append("Room_No", user.Room_No);
        formData.append("Bed_No", user.Bed_No);
        formData.append("dueDate", user.dueDate);
        formData.append("rentAmount", user.rentAmount);
        formData.append("securityAmount", user.securityAmount);
        formData.append("ElectricityMeterReading", user.ElectricityMeterReading);
        // formData.append("ElectricityBill", user.ElectricityBill);  

        user.addDocuments.forEach((file, index) => {
          formData.append("addDocuments", file);
        });
        const response = await fetch(
          dbConfig.backendBaseUrl + `/main/adminStudent/AdmineditStudent/${user._id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },
          }
        );

        const responseData = await response.json();
        if (response.ok) {
          alert("Student Edit Successfully");
          // console.log("Student Edit successfully:", responseData.blockData);
          onClose();
          fetchData();
        } else {
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
            alert(`Server error: ${responseData.message}`);
          } else {
            console.log("Server error occurred");
          }
        }
      } catch (error) {
        console.error("Error Edit Student data:", error);
      }
    }
  };
  return (
    <>
      <div className="POPup_Main_Div">
        <div className="AddManagerCrossButton">
          <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
          </svg>
        </div>
        <div className="AddManagerHeading">
          <h5>Edit Student</h5>
        </div>
        <form>
          <div className="ALLFROMStudent overflow-x-auto ">
            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Student Name</label>
              <input
                name="studentName"
                value={user.studentName}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Name"
                className="mt-2 "
              />
              {errors.studentName && <p>{errors.studentName}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="mt-2 "
              />
              {errors.email && <p>{errors.email}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="number">Mob No.</label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Your Phone Number"
                className="mt-2 "
                maxLength={10}
              />
              {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
            </div>

            <div className="POPUP_IINPUTT ">
              <label htmlFor="text">Father Name</label>
              <input
                name="fatherName"
                value={user.fatherName}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Father Name"
                className="mt-2 "
              />
              {errors.fatherName && <p>{errors.fatherName}</p>}
            </div>

            <div className="POPUP_IINPUTT ">
              <label htmlFor="text">Address</label>
              <input
                name="Address"
                value={user.Address}
                onChange={handleChange}
                type="text"
                placeholder="Enter Your Address"
                className="mt-2 "
              />
              {errors.Address && <p>{errors.Address}</p>}
            </div>


            <div className="POPUP_IINPUTT ">
              <label htmlFor="text">Assigned Building</label>
              <select
                name="assignedBuilding"
                onChange={handleBuildingChange}
                value={user.assignedBuilding}
              >
                <option disabled value="">Select</option>
                {buildingData.map((building) => (
                  <option key={building._id} value={building._id}>
                    {building.Building}
                  </option>
                ))}
              </select>
              {errors.assignedBuilding && <p>{errors.assignedBuilding}</p>}
            </div>

            <div className="POPUP_IINPUTT ">
              <label htmlFor="text">Room No.</label>
              <select
                name=""
                onChange={handleRoomChange}
              >
                <option value="">
                  Select
                </option>
                {uniqueAvailableBeds.map((Room, index) => (
                  <>
                    <option key={index} value={`${Room._id},${Room.Available_Bed}`}>
                      {Room.Available_Bed}
                    </option>
                  </>
                ))}
              </select>
              {errors.Room_No && <p>{errors.Room_No}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Rent Amount</label>
              <input
                type="text"
                name="rentAmount"
                value={user.rentAmount}
                onChange={handleChange}
                placeholder="Enter Rent Amount"
                className="mt-2 "
              />
              {errors.rentAmount && <p>{errors.rentAmount}</p>}
            </div>


            <div className="POPUP_IINPUTT">
              <label htmlFor="text">One month Security Amount</label>
              <input
                type="text"
                name="securityAmount"
                value={user.securityAmount}
                onChange={handleChange}
                placeholder="Enter Security Amount"
                className="mt-2 "
              />
              {errors.securityAmount && <p>{errors.securityAmount}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Rent due date</label>
              <input
                type="date"
                name="dueDate"
                value={user.dueDate}
                onChange={handleChange}
                placeholder="Enter Due Date"
                className="mt-2 "
              />
              {errors.dueDate && <p>{errors.dueDate}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="password">Electricity Meter Reading</label>
              <input
                type="text"
                name="ElectricityMeterReading"
                value={user.ElectricityMeterReading}
                onChange={handleChange}
                placeholder="00 Units"
                className="mt-2 "
              />
              {errors.ElectricityMeterReading && <p>{errors.ElectricityMeterReading}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <div className="flex d-flex flex-row POPUP_IINPUTTPICTure">
                <h2 htmlFor="text">Upload Picture</h2>
                <div className="d-flex flex-xl-row POPUP_IINPUTTPICandName" >
                <input
                  type="file"
                  name="addDocuments"
                  accept="application/pdf/jpj/jpeg/png/svg"
                  onChange={handleFileChange}
                  placeholder="Enter Buliding Name"
                  className="mt-2"
                  style={{ color: "transparent" }}
                  // multiple
                />
                  {user.addDocuments.length > 0 && (
                  <>
                    {user.addDocuments.map((file, index) => (
                      <div style={{ marginTop: "14px", fontSize: "13px", fontWeight:'500' }}>{file.fileName ? file.fileName : file.name}</div>
                    ))}
                </>
                )}
                </div>
              </div>
            </div>

            {/* <div className="POPUP_IINPUTT_One">
              <div className=""><b>Documents</b></div>
              <div className="POPUP_IINPUTT_One_button">Download All</div>
            </div>

            <div className="POPUP_IINPUTT_Two">
              <div className="POPUP_IINPUTT_Two_First">
                <input type="checkbox" />
                <div className="POPUP_IINPUTT_Two_Sec"></div>
                <div className="POPUP_IINPUTT_Two_Thi"><i>Document Name</i></div>
              </div>

              <div className="POPUP_IINPUTT_Two_Second">
                <svg className="mt-1" width="19" height="20" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21903 6.99984C6.21903 5.21638 7.72318 3.83317 9.49964 3.83317C11.2761 3.83317 12.7802 5.21638 12.7802 6.99984C12.7802 8.78329 11.2761 10.1665 9.49964 10.1665C7.72318 10.1665 6.21903 8.78329 6.21903 6.99984ZM9.49964 5.4165C8.52689 5.4165 7.80236 6.15994 7.80236 6.99984C7.80236 7.83974 8.52689 8.58317 9.49964 8.58317C10.4724 8.58317 11.1969 7.83974 11.1969 6.99984C11.1969 6.15994 10.4724 5.4165 9.49964 5.4165Z" fill="#EE6C4E" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.83147 6.75229C1.99876 3.20596 5.45377 0.666504 9.50011 0.666504C13.5465 0.666504 17.0015 3.20599 18.1688 6.75235L18.2502 6.99987L18.1688 7.24738C17.0015 10.7937 13.5465 13.3332 9.50012 13.3332C5.45377 13.3332 1.99874 10.7937 0.831469 7.24732L0.75 6.99981L0.83147 6.75229ZM2.42223 6.99981C3.44678 9.75047 6.21449 11.7498 9.50012 11.7498C12.7857 11.7498 15.5534 9.75049 16.578 6.99986C15.5535 4.2492 12.7857 2.24984 9.50011 2.24984C6.21449 2.24984 3.44679 4.24918 2.42223 6.99981Z" fill="#EE6C4E" />
                </svg>

                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.4168 17.9168H1.5835V9.2085H3.16683V16.3335H15.8335V9.2085H17.4168V17.9168Z" fill="#EE6C4E" />
                  <path d="M9.50016 14.2864L5.21391 10.0002L6.3335 8.88058L8.7085 11.2556V2.0835H10.2918V11.2556L12.6668 8.88058L13.7864 10.0002L9.50016 14.2864Z" fill="#EE6C4E" />
                </svg>


                <svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.875 6.125V11.75H5.625V6.125H6.875Z" fill="#717171" />
                  <path d="M9.375 6.125V11.75H8.125V6.125H9.375Z" fill="#717171" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.54953 1.125H10.4505L11.0755 3H13.75V4.25H12.5V14.875H2.5V4.25H1.25V3H3.92453L4.54953 1.125ZM5.24214 3H9.75786L9.54953 2.375H5.45047L5.24214 3ZM3.75 4.25V13.625H11.25V4.25H3.75Z" fill="#717171" />
                </svg>



              </div>





            </div>

            <div className="POPUP_IINPUTT_Two">
              <div className="POPUP_IINPUTT_Two_First">
                <input type="checkbox" />
                <div className="POPUP_IINPUTT_Two_Sec"></div>
                <div className="POPUP_IINPUTT_Two_Thi"><i>Document Name</i></div>
              </div>

              <div className="POPUP_IINPUTT_Two_Second">
                <svg className="mt-1" width="19" height="20" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21903 6.99984C6.21903 5.21638 7.72318 3.83317 9.49964 3.83317C11.2761 3.83317 12.7802 5.21638 12.7802 6.99984C12.7802 8.78329 11.2761 10.1665 9.49964 10.1665C7.72318 10.1665 6.21903 8.78329 6.21903 6.99984ZM9.49964 5.4165C8.52689 5.4165 7.80236 6.15994 7.80236 6.99984C7.80236 7.83974 8.52689 8.58317 9.49964 8.58317C10.4724 8.58317 11.1969 7.83974 11.1969 6.99984C11.1969 6.15994 10.4724 5.4165 9.49964 5.4165Z" fill="#EE6C4E" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.83147 6.75229C1.99876 3.20596 5.45377 0.666504 9.50011 0.666504C13.5465 0.666504 17.0015 3.20599 18.1688 6.75235L18.2502 6.99987L18.1688 7.24738C17.0015 10.7937 13.5465 13.3332 9.50012 13.3332C5.45377 13.3332 1.99874 10.7937 0.831469 7.24732L0.75 6.99981L0.83147 6.75229ZM2.42223 6.99981C3.44678 9.75047 6.21449 11.7498 9.50012 11.7498C12.7857 11.7498 15.5534 9.75049 16.578 6.99986C15.5535 4.2492 12.7857 2.24984 9.50011 2.24984C6.21449 2.24984 3.44679 4.24918 2.42223 6.99981Z" fill="#EE6C4E" />
                </svg>

                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.4168 17.9168H1.5835V9.2085H3.16683V16.3335H15.8335V9.2085H17.4168V17.9168Z" fill="#EE6C4E" />
                  <path d="M9.50016 14.2864L5.21391 10.0002L6.3335 8.88058L8.7085 11.2556V2.0835H10.2918V11.2556L12.6668 8.88058L13.7864 10.0002L9.50016 14.2864Z" fill="#EE6C4E" />
                </svg>


                <svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.875 6.125V11.75H5.625V6.125H6.875Z" fill="#717171" />
                  <path d="M9.375 6.125V11.75H8.125V6.125H9.375Z" fill="#717171" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.54953 1.125H10.4505L11.0755 3H13.75V4.25H12.5V14.875H2.5V4.25H1.25V3H3.92453L4.54953 1.125ZM5.24214 3H9.75786L9.54953 2.375H5.45047L5.24214 3ZM3.75 4.25V13.625H11.25V4.25H3.75Z" fill="#717171" />
                </svg>
              </div>



            </div>

            <div className="POPUP_IINPUTT_Two">
              <div className="POPUP_IINPUTT_Two_First">
                <input type="checkbox" />
                <div className="POPUP_IINPUTT_Two_Sec"></div>
                <div className="POPUP_IINPUTT_Two_Thi"><i>Document Name</i></div>
              </div>

              <div className="POPUP_IINPUTT_Two_Second">
                <svg className="mt-1" width="19" height="20" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21903 6.99984C6.21903 5.21638 7.72318 3.83317 9.49964 3.83317C11.2761 3.83317 12.7802 5.21638 12.7802 6.99984C12.7802 8.78329 11.2761 10.1665 9.49964 10.1665C7.72318 10.1665 6.21903 8.78329 6.21903 6.99984ZM9.49964 5.4165C8.52689 5.4165 7.80236 6.15994 7.80236 6.99984C7.80236 7.83974 8.52689 8.58317 9.49964 8.58317C10.4724 8.58317 11.1969 7.83974 11.1969 6.99984C11.1969 6.15994 10.4724 5.4165 9.49964 5.4165Z" fill="#EE6C4E" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.83147 6.75229C1.99876 3.20596 5.45377 0.666504 9.50011 0.666504C13.5465 0.666504 17.0015 3.20599 18.1688 6.75235L18.2502 6.99987L18.1688 7.24738C17.0015 10.7937 13.5465 13.3332 9.50012 13.3332C5.45377 13.3332 1.99874 10.7937 0.831469 7.24732L0.75 6.99981L0.83147 6.75229ZM2.42223 6.99981C3.44678 9.75047 6.21449 11.7498 9.50012 11.7498C12.7857 11.7498 15.5534 9.75049 16.578 6.99986C15.5535 4.2492 12.7857 2.24984 9.50011 2.24984C6.21449 2.24984 3.44679 4.24918 2.42223 6.99981Z" fill="#EE6C4E" />
                </svg>

                <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.4168 17.9168H1.5835V9.2085H3.16683V16.3335H15.8335V9.2085H17.4168V17.9168Z" fill="#EE6C4E" />
                  <path d="M9.50016 14.2864L5.21391 10.0002L6.3335 8.88058L8.7085 11.2556V2.0835H10.2918V11.2556L12.6668 8.88058L13.7864 10.0002L9.50016 14.2864Z" fill="#EE6C4E" />
                </svg>


                <svg width="15" height="20" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.875 6.125V11.75H5.625V6.125H6.875Z" fill="#717171" />
                  <path d="M9.375 6.125V11.75H8.125V6.125H9.375Z" fill="#717171" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M4.54953 1.125H10.4505L11.0755 3H13.75V4.25H12.5V14.875H2.5V4.25H1.25V3H3.92453L4.54953 1.125ZM5.24214 3H9.75786L9.54953 2.375H5.45047L5.24214 3ZM3.75 4.25V13.625H11.25V4.25H3.75Z" fill="#717171" />
                </svg>

              </div>
            </div> */}

            <div className="mt-5 mb-3 d-flex flex-column POPupSubmitButton">
              <button type="submit" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentListPopupEdit;
