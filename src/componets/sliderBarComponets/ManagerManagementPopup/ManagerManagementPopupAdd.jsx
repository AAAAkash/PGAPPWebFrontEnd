import { useState, useEffect } from "react";
import dbConfig from "../../../config.json";



const ManagerManagementPopupAdd = ({ onClose, fetchData }) => {
  const [user, setUser] = useState({
    ManagerName: "",
    Email: "",
    PhoneNumber: "",
    Building: "",
    addDocuments: "",
  });
  // console.log(user,"2222222222");

  let mList = [];
  const [getMFetchData, setFetchData] = useState([]);
  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  //   setErrors({ ...errors, [name]: "" });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let capitalizedValue = value;

    // if (name === "ManagerName") {
    //   // Capitalize the first letter of the first word
    //   capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    //   // Lowercase the first letter of subsequent words
    //   const words = capitalizedValue.split(" ");
    //   capitalizedValue = words.map((word, index) => {
    //     return index === 0 ? word : word.charAt(0).toLowerCase() + word.slice(1);
    //   }).join(" ");
    // }
    if (name === "ManagerName") {
      capitalizedValue = value
        .split(/\s+/)
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize first word
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1); // Lowercase subsequent words
          }
        })
        .join(" ");
    } else {
      capitalizedValue = value.charAt(0).toLowerCase() + value.slice(1); // Lowercase entire value for other fields
    }



    setUser({ ...user, [name]: capitalizedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleBuildingChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === "Select" ? "" : value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: [...files] });
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!user.ManagerName) {
      validationErrors.ManagerName = "Manager Name is required";
    }
    if (!user.Email) {
      validationErrors.Email = "Email is required";
    } else if (!/^[\w.-]+@gmail\.com$/.test(user.Email)) {
      validationErrors.Email = "Please enter a valid email address";
    }

    // else {
    //   const gmailRegex = /@gmail\.com$/i;
    //   if (!gmailRegex.test(user.Email)) {
    //     validationErrors.Email = "Please enter a Gmail address";
    //   }
    // }
    if (!user.PhoneNumber) {
      validationErrors.PhoneNumber = "Phone Number is required";
    } else if (/^0/.test(user.PhoneNumber)) {
      validationErrors.PhoneNumber = "Phone number cannot start with zero";
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
        formData.append("ManagerName", user.ManagerName);
        formData.append("Email", user.Email);
        formData.append("PhoneNumber", user.PhoneNumber);
        formData.append("Building", user.Building);       
       
        user.addDocuments.forEach((file, index) => {
          formData.append("addDocuments", file);
        });
        const response = await fetch(
          dbConfig.backendBaseUrl + "/main/AdminManager/AdminManagerAdd",
          {
            method: "POST",
            body: formData,
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          alert("Manager Added Successfully");
          // console.log(responseData.message);
          onClose();
          fetchData();
        } else {
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
            alert("Server error 500 ");
          } else {
            console.log('Server error occurred', responseData.message);
            alert("Server error 500 ");
          }
        }
      } catch (error) {
        console.error("Error adding Block data:", error);
        alert("Server error 500 ");
      }
    }
  };


  useEffect(() => {

    getAllManagers();

  }, [])


  let getAllManagers = async () => {

    try {

      let getFetchData = await fetch(
        dbConfig.backendBaseUrl + "/main/building/Building_get",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

          },
        }
      );
      const responseData = await getFetchData.json();
      setFetchData((prevData) => {
        return responseData.buildings;
      });

    } catch (error) {
      console.error("Error adding Building data:", error);
    }

  }



  return (

    <div className="POPup_Main_Div">
      <div className="AddManagerCrossButton">
        <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
        </svg>
      </div>

      <div className="AddManagerHeading">
        <h5>Add Manager</h5>
      </div>

      <form>
        <div className="ALLFROM ">
          <div className="POPUP_IINPUTT">
            <label htmlFor="text">Manager Name</label>
            <input
              type="text"
              name="ManagerName"
              value={user.ManagerName}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="mt-2"
            />
            {errors.ManagerName && <p>{errors.ManagerName}</p>}
          </div>
          <div className="POPUP_IINPUTT">
            <label htmlFor="email">Email</label>
            <input
              name="Email"
              value={user.Email}
              onChange={handleChange}
              type="email"
              placeholder="Enter Your Email"
              className="mt-2"
            />
            {errors.Email && <p>{errors.Email}</p>}
          </div>
          <div className="POPUP_IINPUTT">
            <label htmlFor="number">Phone Number</label>
            <input
              name="PhoneNumber"
              value={user.PhoneNumber}
              onChange={handleChange}
              type="text"
              maxLength={"10"}
              placeholder="Enter Your Phone Number"
              className="mt-2"
            />
            {errors.PhoneNumber && <p>{errors.PhoneNumber}</p>}
          </div>


          <div className="POPUP_IINPUTT">
            <label htmlFor="text">Building</label>
            <select
              name="Building"
              onChange={handleBuildingChange}
              value={user.Building}
            >
              <option disabled value="">Select</option>
              {getMFetchData.map((building) => (
                <option key={building._id} value={building._id}>
                  {building.Building}
                </option>
              ))}
            </select>
            {errors.Building && <p>{errors.Building}</p>}
          </div>

          <div className="POPUP_IINPUTT">
            <div className="flex d-flex flex-row POPUP_IINPUTTPICTure">
              <h2 htmlFor="text" >Upload Picture</h2>
              <div className="d-flex flex-xl-row POPUP_IINPUTTPICandName">
                <input
                  type="file"
                  name="addDocuments"
                  accept="application/pdf/jpj/jpeg/png"
                  onChange={handleFileChange}
                  // placeholder="Enter Buliding Name"
                  className="mt-2"
                  multiple
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

        </div>
        <div className="mb-3 d-flex flex-column POPupSubmitButton">
          <button type="submit" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerManagementPopupAdd;
