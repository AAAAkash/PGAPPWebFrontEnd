import {  useState, useEffect } from "react";
import dbConfig from '../../../config.json';

const RoomPopupAdd = ({ onClose, isedit, fetchData }) => {
  const [user, setUser] = useState({
    BuildingId: isedit._id,
    Room_No: "",
    Beds: "",
  });
  // console.log(user, "all data");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const validationErrors = {};
    const roomNoRegex = /^[0-9]+$/; 
    const bedsRegex = /^[0-9]+$/;

    if (!user.Room_No) {
      validationErrors.Room_No = "Room Name is required";
    }else if(!roomNoRegex.test(user.Room_No)) {
      validationErrors.Room_No = "Add Room Number";
    }
    if (!user.Beds) {
      validationErrors.Beds = "No. of Beds required";
    }else if(!bedsRegex.test(user.Beds)) {
      validationErrors.Beds = "Number of Beds must be a number";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(
          dbConfig.backendBaseUrl + '/main/RoomsData/AdminAddRoom',         
           {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

          },
          body: JSON.stringify(user),
        }
        );

        const responseData = await response.json(); 

        if (response.ok) {
          // console.log(
          //   "Room data added successfully:",
          //   responseData.BuildingData
          // );
          alert("Room Added Successfully")
          onClose();
          fetchData();
        } else {
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
          } else {
            console.log("Server error occurred");
          }
        }
      } catch (error) {
        console.error("Error adding Room data:", error);
      }
    }
  };

  return (
    <>
      <div className="RoomMainPopup1">

        <div className="AddManagerCrossButton">
          <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
          </svg>
        </div>

        <h4>Add Room</h4>

        <form>
          <div className="FormOFADDRoom">
          <div className="POPUP_Add_Room">
            <label htmlFor="text">Add Room Name</label>
            <input
              type="text"
              name="Room_No"
              value={user.Room_No}
              onChange={handleChange}
              placeholder="Enter Room Name"
              className="mt-2 "
            />
            {errors.Room_No && <p>{errors.Room_No}</p>}
          </div>
          <div className="POPUP_Add_Room">
            <label htmlFor="text">No. of Beds</label>
            <input
              type="text"
              name="Beds"
              value={user.Beds}
              onChange={handleChange}
              placeholder="Enter No. of Beds"
              className="mt-2 "
            />
            {errors.Beds && <p>{errors.Beds}</p>}
          </div>
          <div className="mt-5 d-flex flex-column RoomMainPopupBUTTON">
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

export default RoomPopupAdd;
