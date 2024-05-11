
import { useEffect, useState } from "react";
import dbConfig from '../../../config.json';


const BuildingManagementPopupAdd = ({ onClose, fetchData }) => {
  let mList = [];
  const [getMFetchData, setFetchData] = useState([]);
  const [user, setUser] = useState({
    ManagerName: "",
    Building: "",
    BuildingAddress: "",
    Per_Unit_Cost: "",
    addDocument: [],
  });

  // console.log(user, "555555555555");



  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleBuildingChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value === 'Select' ? '' : value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUser({ ...user, [name]: [...files] });
  };


  const validateForm = () => {
    const validationErrors = {};
    if (!user.BuildingAddress) {
      validationErrors.BuildingAddress = "Building Address is required";
    }
    if (!user.Building) {
      validationErrors.Building = "Building Name is required";
    }
    if (!user.Per_Unit_Cost) {
      validationErrors.Per_Unit_Cost = "Per Unit Cost is required";
    }
    return validationErrors;
  };

  useEffect(() => {

    getAllManagers();

  }, [])


  let getAllManagers = async () => {

    try {

      let getFetchData = await fetch(
        dbConfig.backendBaseUrl + "/main/AdminManager/Admingetdata",
        {
          method: "GET",
          headers: {
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

          },
        }
      );
      const responseData = await getFetchData.json();
      setFetchData((prevData) => {
        return responseData.allBlockData;
      });
    } catch (error) {
      console.error("Error adding Building data:", error);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append("Building", user.Building);
        formData.append("ManagerName", user.ManagerName);
        formData.append("Per_Unit_Cost", user.Per_Unit_Cost);
        formData.append("BuildingAddress", user.BuildingAddress);       
       
        user.addDocument.forEach((file, index) => {
          formData.append("addDocument", file);
        });

//         user.addDocument.forEach((file, index) => {
//           formData.append(addDocument_${index}, file);
//         });


        const response = await fetch(
          dbConfig.backendBaseUrl + "/main/building/BuildingAdd",
          // "http://localhost:3030/main/building/BuildingAdd",
          {
            method: "POST",
            body: formData,
            headers: {
              "contact-type": "multipart/form-data",
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50',
            },
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          // console.log("Building data added successfully:", responseData.BuildingData);
          alert("Building Added Successfully");        
          onClose();
          fetchData();
        } else {
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
            console.error(`Server error: ${responseData.message}`);
          } else {
            console.error("Server error occurred");
          }
        }
      } catch (error) {
        console.error("Error adding Building data:", error);
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
          <h5>Add Building</h5>
        </div>
        <form>
          <div className="ALLFROM ">
            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Buliding Name</label>
              <input
                type="text"
                name="Building"
                value={user.Building}
                onChange={handleChange}
                placeholder="Enter Buliding Name"
                className="mt-2 "
              />
              {errors.Building && <p>{errors.Building}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Assign Manager</label>
              <select
                name="ManagerName"
                onChange={handleBuildingChange}
                value={user.ManagerName}
              >
                <option disabled value="">Select</option>
                {getMFetchData.map((manager) => (
                  <option key={manager._id} value={manager._id}>
                    {manager.ManagerName}
                  </option>
                ))}
              </select>
              {errors.ManagerName && <p>{errors.ManagerName}</p>}
            </div>


            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Per Unit Const</label>
              <input
                type="text"
                name="Per_Unit_Cost"
                value={user.Per_Unit_Cost}
                onChange={handleChange}
                placeholder="₹10 per Unit"
                className="mt-2 "
              />
              {errors.Per_Unit_Cost && <p>{errors.Per_Unit_Cost}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Buliding Address</label>
              <textarea
                type="text"
                name="BuildingAddress"
                value={user.BuildingAddress}
                onChange={handleChange}
                placeholder="Enter Buliding Addres"
                className="mt-2 "
              />
              {errors.BuildingAddress && <p >{errors.BuildingAddress}</p>}
            </div>

            <div className="POPUP_IINPUTT">
              <div className="flex d-flex flex-row POPUP_IINPUTTPICTure">
                <h2   htmlFor="text" >Upload Picture</h2>
                <div className="d-flex flex-xl-row POPUP_IINPUTTPICandName">
                <input
                  type="file"
                  name="addDocument"
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

            <div className="mt-3 d-flex flex-column POPupSubmitButton">
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

export default BuildingManagementPopupAdd;
