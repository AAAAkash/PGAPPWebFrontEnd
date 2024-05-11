import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Select, Space } from 'antd';
import dbConfig from '../../../config.json';

const BuildingManagementPopupEdit = ({ onClose, isedit, buildingData }) => {
  // console.log(isedit, "2222222222222222222222");
  const [getMFetchData, setFetchData] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [user, setUser] = useState(
    isedit || {
      ManagerName: [],
      Building: "",
      BuildingAddress: "",
      Per_Unit_Cost: "",
      addDocument: [],
    }
  );

  // console.log(user, "33333333333333");

  const options = [];
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
            "Content-Type": "application/json",
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'

          },
        }
      );
      const responseData = await getFetchData.json();
      setFetchData((prevData) => {
        return responseData.allBlockData;
      });

    } catch (error) {
      console.error("Error Edit Building data:", error);
    }

  }


  getMFetchData?.map((manager) => {
    options.push({
      label: manager.ManagerName,
      value: manager.ManagerName + "====" + manager._id,
      id: manager._id,
    });
  });

  const [errors, setErrors] = useState({});

  const handleChange1 = (value) => {
    let filterIds = []
    value.map((id) => {
      if (id.split("").length > 15) {
        filterIds.push(id.split("====")[1])
      } else {
        user.managerList.map((e) => {
          if (e.ManagerName == id) {
            filterIds.push(e.id)
          }
        })
      }
    })
    user.ManagerName = filterIds
    setManagerList(filterIds)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        if (managerList.length === 0) {
          user.ManagerName = user.getManagerIds;
        } else {
          user.ManagerName = managerList;
        }

        delete user.managerList;
        delete user.getManagerIds;

        const formData = new FormData();

        // Append user data to formData
        Object.entries(user).forEach(([key, value]) => {
          if (key === 'ManagerName') {
            value.forEach((managerId, index) => {
              formData.append(`${key}[${index}]`, managerId);
            });
          } else if (key === 'addDocument') {
            value.forEach((file, index) => {
              formData.append("addDocument", file);
            });
          } else {
            formData.append(key, value);
          }
        });

        // console.log(formData,"2222222222222");

        const response = await fetch(
          dbConfig.backendBaseUrl + `/main/building/editBuilding/${user.id}`,
          {
            method: "PUT",
            body: formData,
            headers: {
              'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          // console.log("Building data Edit successfully:", responseData.BuildingData);
          alert("Building Edit Successfully");   
          onClose();
          buildingData();
        } else {
          console.error("Server error:", response.status);
          // alert(response.status);
          // alert(response.);
        }
      } catch (error) {
        console.error("Error Edit Building data:", error);
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
          <h5>Edit Building</h5>
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
              <br />
              <Space
                style={{
                  width: '100%',
                  marginTop: "-17px"
                }}
                direction="vertical"
              >
                <Select
                  name={user.ManagerName}
                  mode="multiple"
                  allowClear
                  style={{
                    width: '100%',
                  }}
                  placeholder="Please select"
                  defaultValue={user.ManagerName}
                  onChange={handleChange1}
                  options={options}
                />
              </Space>
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
              ></textarea>
              {errors.BuildingAddress && <p>{errors.BuildingAddress}</p>}
            </div>


            <div className="POPUP_IINPUTT">
              <div className="flex d-flex flex-row POPUP_IINPUTTPICTure">
                <h2 htmlFor="text">Upload Picture</h2>
                <div className="d-flex flex-xl-row ">
                  <input
                    type="file"
                    name="addDocument"
                    accept="application/pdf/jpj/jpeg/png/svg"
                    onChange={handleFileChange}
                    // placeholder="Enter Buliding Name"
                    className="mt-2"
                    style={{ color: "transparent" }}
                    multiple
                  />
                  {user.addDocument.length > 0 && (
                    <div className="BUildingEditSCRoll" style={{ height:"60px",  display:"flex", flexDirection:"row", width:"92px", overflow:"scroll"}}>
                      {user.addDocument.map((file, index) => (
                        <div key={index} style={{ paddingTop:"14px", fontSize: "13px",}}>{file.originalname ? file.originalname : file.name}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* {errors.Building && <p>{errors.Building}</p>} */}
            </div>




            <div className="mt-3 d-flex flex-column  POPupSubmitButton">
              <button type="submit" onClick={handleSubmit}>
                Upload
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BuildingManagementPopupEdit;


