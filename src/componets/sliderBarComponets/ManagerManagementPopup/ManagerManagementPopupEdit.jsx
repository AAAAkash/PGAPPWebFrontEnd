import { useState, useEffect } from "react";
import { Select, Space } from 'antd';
import dbConfig from "../../../config.json";

const ManagerManagementPopupEdit = ({ editManager, onClose, fetchData }) => {
  // console.log(editManager.addDocuments.fileName, "2222222222222222");
  const [getMFetchData, setFetchData] = useState([]);
  // console.log(getMFetchData, "2");
  const defaultBuildingdata = editManager.Building.map((building) => building);
  const [managerList, setManagerList] = useState(defaultBuildingdata);
  // console.log(managerList,"pppppppppppppppppppppppp");


  // const [user, setUser] = useState(
  //   editManager || {
  //     ManagerName: "", 
  //     Email: "",
  //     PhoneNumber: "",
  //     Building: "" ,
  //   }
  // );
  const defaultBuildingId = editManager.Building.map((building) => building.name);
  const defaultBuildingvalue = editManager.Building.map((building) => building.id);

  // console.log(defaultBuildingId, "66666666666");

  const [user, setUser] = useState({
    ManagerName: editManager ? editManager.ManagerName : "",
    Email: editManager ? editManager.Email : "",
    PhoneNumber: editManager ? editManager.PhoneNumber : "",
    Building: defaultBuildingvalue,
    addDocuments: editManager ? editManager.addDocuments : "",
  });

  // console.log(user, "33333333");

  // setUser.Building(editManager.Building.name)

  const [errors, setErrors] = useState({});

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  //   setErrors({ ...errors, [name]: "" });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let capitalizedValue = value;

    if (name === "ManagerName") {
      capitalizedValue = value
        .split(/\s+/)
        .map((word, index) => {
          if (index === 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
        })
        .join(" ");
    }

    setUser({ ...user, [name]: capitalizedValue });
    setErrors({ ...errors, [name]: "" });
  };


  const options = [];
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

      // console.log(responseData,"9999999999999999");
      setFetchData((prevData) => {
        return responseData.buildings;
      });

    } catch (error) {
      console.error("Error Edit Building data:", error);
      // alert("Error adding Building data");
    }

  }


  // getMFetchData?.map((Main) => {
  //   options.push({
  //     label: Main.Building,
  //     value: Main.Building + "====" + Main._id,
  //     id: Main._id,
  //   });
  // });


  const handleChange1 = (value) => {
    const filterIds = value.map((id) => {
      if (id.split("").length > 15) {
        return id.split("====")[1];
      } else {
        const building = managerList.find((e) => e.name === id);
        return building ? building.id : null;
      }
    }).filter(id => id !== null);

    // Append the newly selected values to the existing state
    setUser((prevUser) => ({
      ...prevUser,
      Building: [...filterIds],
    }));

    // Update the managerList state with all selected values
    setManagerList((prevList) => [...prevList, ...filterIds]);
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
      // } else if (!/^[\w.-]+@\w+\.\w+$/.test(user.Email))
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
    }


    return validationErrors;
  };

  const handleBackClick = () => {
    onClose();
    fetchData();

  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {

        // if (managerList.length == 0) {
        //   user.Building = user.getManagerIds
        // } else {
        //   user.Building = managerList
        // }
        // delete user.managerList
        // delete user.getManagerIds

        const formData = new FormData();
        formData.append("ManagerName", user.ManagerName);
        formData.append("Email", user.Email);
        formData.append("PhoneNumber", user.PhoneNumber);
        // formData.append("Building", user.Building);       
       
        if (Array.isArray(user.addDocuments)) {
          user.addDocuments.forEach((file, index) => {
            formData.append("addDocuments", file);
          });
        }
        if(Array.isArray(user.Building)) {
          user.Building.forEach((file, index) => {
            formData.append("Building", file);
          });
        }

        // const formData = new FormData();

        // // Append user data to formData
        // Object.entries(user).forEach(([key, value]) => {
        //   if (key === 'ManagerName') {
        //     value.forEach((managerId, index) => {
        //       formData.append(`${key}[${index}]`, managerId);
        //     });
        //   } else if (key === 'addDocument') {
        //     value.forEach((file, index) => {
        //       formData.append("addDocument", file);
        //     });
        //   } else {
        //     formData.append(key, value);
        //   }
        // });

        const response = await fetch(
          dbConfig.backendBaseUrl + `/main/AdminManager/edit/${editManager._id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },
          }
        );

        const responseData = await response.json(); // Parse response body

        if (response.ok) {
          alert("Manager Edit Successfully"); 
          // console.log("Manager Edit Successfully:");
          // alert("Block data edit successfully");
          onClose();
          fetchData();
        } else {
          console.error("Server error:", response.status);
          if (responseData && responseData.message) {
            // alert(`Server error: ${responseData.message}`);
          } else {
            // alert("Server error occurred");
          }
        }
      } catch (error) {
        console.error("Error adding Block data:", error);
        // alert("Error adding Block data");
      }
    }
  };

  const selectOptions = getMFetchData?.map((Main) => ({
    label: Main.Building,
    value: Main.Building + "====" + Main._id,
    id: Main._id,
  })).map((option) => (
    <Select.Option key={option.id} value={option.value}>
      {option.label}
    </Select.Option>
  ));


  // const defaultBuildingNames = editManager.Building.map(building => building.name);




  return (
    <>
      <div className="POPup_Main_Div">
        <div className="AddManagerCrossButton">
          <svg onClick={handleBackClick} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
          </svg>
        </div>
        <div className="AddManagerHeading">
          <h5>Edit Manager</h5>
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
                placeholder="Enter Your Phone Number"
                className="mt-2"
                maxLength={"10"}
              />
              {errors.PhoneNumber && <p>{errors.PhoneNumber}</p>}
            </div>


            <div className="POPUP_IINPUTT">
              <label htmlFor="text">Building</label>
              <br />
              <Space
                style={{
                  width: '100%',
                  marginTop: "-17px"
                }}
                direction="vertical"
              >

                <Select
                  name="Building"
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="Please select"
                  defaultValue={defaultBuildingId} // Use the defaultBuildingId array
                  onChange={handleChange1}
                >
                  {selectOptions}
                </Select>



              </Space>
              {/* {errors.Building && <p>{errors.Building}</p>} */}
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
                  style={{width:"100%"}}             
                  // style={{ color: "transparent" }}
                />
                 {/* {user.addDocuments.length > 0 && (
                    <div className="BUildingEditSCRoll" style={{ height:"60px",  display:"flex", flexDirection:"row", width:"92px", overflow:"scroll"}}>
                      {user.addDocuments.map((file, index) => (
                        <div style={{ paddingTop:"14px", fontSize: "13px",}}>{file.originalname ? file.originalname : file.name}</div>
                      ))}
                    </div>
                  )} */}
              </div>
            </div>
          </div>

            {/* <div className="POPUP_IINPUTT">
              <label htmlFor="text">Building</label>
              <select
                name="buliding"
              onChange={handleBuildingChange}
              value={user.ManagerName}
              >
                <option disabled value="">Select</option>
                <option>1</option>
                {getMFetchData.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.ManagerName}
                </option>
              ))}
              </select>
              {errors.building && <p>{errors.building}</p>}
            </div> */}



          </div>
          <div className="mb-3 d-flex flex-column POPupSubmitButton">
            <button type="submit" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ManagerManagementPopupEdit;








// import { useState, useEffect } from "react";
// import { Select, Space } from 'antd';
// import dbConfig from "../../../config.json";

// const ManagerManagementPopupEdit = ({ editManager, onClose, fetchData }) => {
//   // console.log(editManager, "2222222222222222");
//   const [getMFetchData, setFetchData] = useState([]);
//   // console.log(getMFetchData, "2");
//   const defaultBuildingdata = editManager.Building.map((building) => building);
//   const [managerList, setManagerList] = useState(defaultBuildingdata);
// // console.log(managerList,"pppppppppppppppppppppppp");


//   // const [user, setUser] = useState(
//   //   editManager || {
//   //     ManagerName: "", 
//   //     Email: "",
//   //     PhoneNumber: "",
//   //     Building: "" ,
//   //   }
//   // );
//   const defaultBuildingId = editManager.Building.map((building) => building.name);
//   const defaultBuildingvalue = editManager.Building.map((building) => building.id);

//   // console.log(defaultBuildingId, "66666666666");

//   const [user, setUser] = useState({
//     ManagerName: editManager ? editManager.ManagerName : "",
//     Email: editManager ? editManager.Email : "",
//     PhoneNumber: editManager ? editManager.PhoneNumber : "",
//     Building: defaultBuildingvalue,
//   });

//   console.log(user, "33333333");

//   // setUser.Building(editManager.Building.name)

//   const [errors, setErrors] = useState({});

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setUser({ ...user, [name]: value });
//   //   setErrors({ ...errors, [name]: "" });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let capitalizedValue = value;

//     if (name === "ManagerName") {
//       capitalizedValue = value
//         .split(/\s+/)
//         .map((word, index) => {
//           if (index === 0) {
//             return word.charAt(0).toUpperCase() + word.slice(1);
//           } else {
//             return word.charAt(0).toUpperCase() + word.slice(1);
//           }
//         })
//         .join(" ");
//     }

//     setUser({ ...user, [name]: capitalizedValue });
//     setErrors({ ...errors, [name]: "" });
//   };


//   const options = [];
//   useEffect(() => {

//     getAllManagers();

//   }, [])


//   let getAllManagers = async () => {

//     try {

//       let getFetchData = await fetch(
//         dbConfig.backendBaseUrl + "/main/building/Building_get",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

//           },
//         }
//       );
//       const responseData = await getFetchData.json();

//       // console.log(responseData,"9999999999999999");
//       setFetchData((prevData) => {
//         return responseData.buildings;
//       });

//     } catch (error) {
//       console.error("Error Edit Building data:", error);
//       // alert("Error adding Building data");
//     }

//   }


//   getMFetchData?.map((Main) => {
//     options.push({
//       label: Main.Building,
//       value: Main.Building + "====" + Main._id,
//       id: Main._id,
//     });
//   });


//   const handleChange1 = (value) => {
//     const filterIds = value.map((id) => {
//       if (id.split("").length > 15) {
//         return id.split("====")[1];
//       } else {
//         const building = managerList.find((e) => e.name === id);
//         return building ? building.id : null;
//       }
//     }).filter(id => id !== null);
  
//     // Append the newly selected values to the existing state
//     setUser((prevUser) => ({
//       ...prevUser,
//       Building: [ ...filterIds],
//     }));
  
//     // Update the managerList state with all selected values
//     setManagerList((prevList) => [...prevList, ...filterIds]);
//   };
  
  
//   const validateForm = () => {
//     const validationErrors = {};

//     if (!user.ManagerName) {
//       validationErrors.ManagerName = "Manager Name is required";
//     }
//     if (!user.Email) {
//       validationErrors.Email = "Email is required";
//       // } else if (!/^[\w.-]+@\w+\.\w+$/.test(user.Email))
//     } else if (!/^[\w.-]+@gmail\.com$/.test(user.Email)) {
//       validationErrors.Email = "Please enter a valid email address";
//     }
//     // else {
//     //   const gmailRegex = /@gmail\.com$/i;
//     //   if (!gmailRegex.test(user.Email)) {
//     //     validationErrors.Email = "Please enter a Gmail address";
//     //   }
//     // }
//     if (!user.PhoneNumber) {
//       validationErrors.PhoneNumber = "Phone Number is required";
//     }


//     return validationErrors;
//   };

//   const handleBackClick = () => {
//     onClose();
//     fetchData();

//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {

//         // if (managerList.length == 0) {
//         //   user.Building = user.getManagerIds
//         // } else {
//         //   user.Building = managerList
//         // }


//         // delete user.managerList
//         // delete user.getManagerIds

//         const response = await fetch(
//           dbConfig.backendBaseUrl + `/main/AdminManager/edit/${editManager._id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//               "x-access-token":
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50",
//             },
//             body: JSON.stringify(user),
//           }
//         );

//         const responseData = await response.json(); // Parse response body

//         if (response.ok) {
//           console.log("Block data edit successfully:",);
//           // alert("Block data edit successfully");
//           onClose();
//           fetchData();
//         } else {
//           console.error("Server error:", response.status);
//           if (responseData && responseData.message) {
//             // alert(`Server error: ${responseData.message}`);
//           } else {
//             // alert("Server error occurred");
//           }
//         }
//       } catch (error) {
//         console.error("Error adding Block data:", error);
//         // alert("Error adding Block data");
//       }
//     }
//   };


//   // const defaultBuildingNames = editManager.Building.map(building => building.name);




//   return (
//     <>
//       <div className="POPup_Main_Div">
//         <div className="AddManagerCrossButton">
//           <svg onClick={handleBackClick} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
//           </svg>
//         </div>
//         <div className="AddManagerHeading">
//           <h5>Edit Manager</h5>
//         </div>

//         <form>
//           <div className="ALLFROM ">
//             <div className="POPUP_IINPUTT">
//               <label htmlFor="text">Manager Name</label>
//               <input
//                 type="text"
//                 name="ManagerName"
//                 value={user.ManagerName}
//                 onChange={handleChange}
//                 placeholder="Enter Your Name"
//                 className="mt-2"
//               />
//               {errors.ManagerName && <p>{errors.ManagerName}</p>}
//             </div>
//             <div className="POPUP_IINPUTT">
//               <label htmlFor="email">Email</label>
//               <input
//                 name="Email"
//                 value={user.Email}
//                 onChange={handleChange}
//                 type="email"
//                 placeholder="Enter Your Email"
//                 className="mt-2"
//               />
//               {errors.Email && <p>{errors.Email}</p>}
//             </div>
//             <div className="POPUP_IINPUTT">
//               <label htmlFor="number">Phone Number</label>
//               <input
//                 name="PhoneNumber"
//                 value={user.PhoneNumber}
//                 onChange={handleChange}
//                 type="text"
//                 placeholder="Enter Your Phone Number"
//                 className="mt-2"
//               />
//               {errors.PhoneNumber && <p>{errors.PhoneNumber}</p>}
//             </div>


//             <div className="POPUP_IINPUTT">
//               <label htmlFor="text">Building</label>
//               <br />
//               <Space
//                 style={{
//                   width: '100%',
//                   marginTop: "-17px"
//                 }}
//                 direction="vertical"
//               >

//                 <Select
//                 name={user.Building}
//                   mode="multiple"
//                   allowClear
//                   style={{ width: '100%' }}
//                   placeholder="Please select"
//                   defaultValue={defaultBuildingId} // Use the defaultBuildingId array
//                   onChange={handleChange1}
//                   options={options}
//                 />



//               </Space>
//               {errors.ManagerName && <p>{errors.ManagerName}</p>}
//             </div>

//             {/* <div className="POPUP_IINPUTT">
//               <label htmlFor="text">Building</label>
//               <select
//                 name="buliding"
//               onChange={handleBuildingChange}
//               value={user.ManagerName}
//               >
//                 <option disabled value="">Select</option>
//                 <option>1</option>
//                 {getMFetchData.map((manager) => (
//                 <option key={manager._id} value={manager._id}>
//                   {manager.ManagerName}
//                 </option>
//               ))}
//               </select>
//               {errors.building && <p>{errors.building}</p>}
//             </div> */}



//           </div>
//           <div className="mb-3 d-flex flex-column POPupSubmitButton">
//             <button type="submit" onClick={handleSubmit}>
//               Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default ManagerManagementPopupEdit;