import { useState, useEffect } from "react";
import dbConfig from '../../../config.json';

const StudentListPopupAdd = ({ onClose, BuildingID, roomId, data, fetchData}) => {
  // console.log(roomId,"888888888888888");

  const [user, setUser] = useState({
    studentName: "",
    email: "",
    phoneNumber: "",
    fatherName: "",
    Address: "",
    assignedBuilding: BuildingID && BuildingID.length > 0 ? BuildingID : "",
    // Room_No: roomId && roomId.length > 0 ? roomId : "",
    Room_No:  "",
    Bed_No: "",
    dueDate: "",
    rentAmount: "",
    securityAmount: "",
    ElectricityMeterReading: "",
    addDocuments : "",
    // ElectricityBill:5,
  });
  // console.log(user, "all data");
  // console.log(roomId, "2222222");


  const [errors, setErrors] = useState({});

  const [buildingData, setBuildingData] = useState([]);
  const [roomData, setRoomData] = useState([]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let capitalizedValue = value;
  
  //   if (name === "studentName") {
  //     // Capitalize the first letter of the first word
  //     capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
  //     // Lowercase the first letter of subsequent words
  //     const words = capitalizedValue.split(" ");
  //     capitalizedValue = words.map((word, index) => {
  //       return index === 0 ? word : word.charAt(0).toLowerCase() + word.slice(1);
  //     }).join(" ");
  //   }
  
  //   setUser({ ...user, [name]: capitalizedValue });
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
            return word.charAt(0).toUpperCase() + word.slice(1);
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
    // }, 1000); // Adjust the interval as needed (e.g., every 10 seconds)

    // return () => clearInterval(interval);
  }, []);

  const buildingsToEdit = roomData.filter((company) => company.BuildingId === user.assignedBuilding);

  // First, check if roomId matches any room's _id
const matchedRoom = buildingsToEdit.find(room => room._id === roomId);

// If roomId matches, proceed with mapping Available_Beds
const uniqueAvailableBeds = matchedRoom ? matchedRoom.Available_Beds.map(bed => ({ _id: matchedRoom._id, Available_Bed: bed })) 
      : buildingsToEdit.flatMap(room => room.Available_Beds.map(bed => ({ _id: room._id, Available_Bed: bed })));


  // const uniqueAvailableBeds = buildingsToEdit.flatMap(room => room.Available_Beds.map(bed => ({ _id: room._id, Available_Bed: bed })));


  const validateForm = () => {
    const validationErrors = {};

    if (!user.studentName) {
      validationErrors.studentName = "Student Name is required";
    }
    if (!user.email) {
      validationErrors.email = "Email is required";
    }else if (!/^[\w.-]+@gmail\.com$/.test(user.email)) {
    // } else if (!/^[\w.-]+@\w+\.\w+$/.test(user.email)) {
      validationErrors.email = "Please enter a valid email address";
    } 
    // else {
    //   const gmailRegex = /@gmail\.com$/i;
    //   if (!gmailRegex.test(user.email)) {
    //     validationErrors.email = "Please enter a Gmail address";
    //   }
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
      validationErrors.ElectricityMeterReading = "Electricity Meter Reading required";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        // const formData = new FormData();
        // Object.keys(user).forEach((key) => {
        //   formData.append(key, user[key]);
        // }); 
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
       
        if (Array.isArray(user.addDocuments)) {
          user.addDocuments.forEach((file, index) => {
            formData.append("addDocuments", file);
          });
        }
        const response = await fetch(
          dbConfig.backendBaseUrl + "/main/students/studentAdd",
          {
            method: "POST",
            body: formData,
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },

          },
        );

        const responseData = await response.json();
        if (response.ok) {
          // console.log("Student Added Successfully");
          alert("Student Added Successfully");
          onClose();
              
          if (typeof fetchData === 'function' || typeof data === 'function') {
            fetchData();
            data();
          }
          
        } else {
          alert(responseData.message);
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
          } else {
            console.log("Server error occurred");
          }
        }
      } catch (error) {
        console.error("Error adding Student data:", error);
      }
    }
  };



  // const handleChangeDate = (e) => {
  //   const { name, value } = e.target;
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     [name]: value
  //   }));
  // };

  const getDefaultDueDate = () => { const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-based
    const currentYear = currentDate.getFullYear();
    const defaultDueDate = `${currentYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}-28`;
    setUser({
      ...user,
      dueDate: defaultDueDate
    });
  };

  useEffect(() => {
    getDefaultDueDate();
  }, []);

  
  return (
    <>
      <div className="POPup_Main_Div">
        <div className="AddManagerCrossButton">
          <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
          </svg>
        </div>
        <div className="AddManagerHeading">
          <h5>Add Student</h5>
        </div>
        <form>

          <div className="ALLFROMStudent overflow-x-auto ">

            <div className="POPUP_IINPUTT ">
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


            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Assigned Building</label>
              <select
                name="assignedBuilding"
                onChange={handleBuildingChange}
                value={user.assignedBuilding}
              >
                {BuildingID ? (
                  <>
                    {buildingData.map((building) => (
                      <option
                        key={building._id}
                        value={building._id}
                        selected={BuildingID === building._id || user.assignedBuilding === building._id}
                      >
                        {building.Building}
                      </option>
                    ))}
                  </>
                ) : (
                  <>
                    <option disabled value="">Select</option>
                    {buildingData.map((building) => (
                      <option key={building._id} value={building._id}>
                        {building.Building}
                      </option>
                    ))}
                  </>
                )}
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
                {uniqueAvailableBeds.length === 0 ? (
                  <option value="" disabled>No beds in this Building</option>
                ) : (
                  uniqueAvailableBeds.map((Room, index) => (
                    <option key={index} value={`${Room._id},${Room.Available_Bed}`}>
                        {/* {roomId === undefined ? Room.Available_Bed : (roomId === Room._id ? Room.Available_Bed : null)} */}
                      {Room.Available_Bed}
                    </option>
                  ))
                )}

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
                // onChange={handleChangeDate}
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
                <div className="d-flex flex-xl-row POPUP_IINPUTTPICandName">
                <input
                  type="file"
                  name="addDocuments"
                  accept="application/pdf/jpj/jpeg/png"
                  onChange={handleFileChange}
                  placeholder="Enter Buliding Name"
                  className="mt-2"
                  multiple
                  style={{width:"100%"}}
                />
                
                </div>
              </div>
            </div>

            <div className="mt-5 d-flex flex-column POPupSubmitButton">
              <button type="submit" onClick={handleSubmit}>
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default StudentListPopupAdd;