import React, { useState, useEffect } from "react";
import dbConfig from '../config.json';
import Item from "antd/es/list/Item";

const AvilableBdesByBuilding = ({ onClose, viewOneData }) => {
  // console.log(viewOneData,".333333333");

  const [getdata, setGetdata] = useState([]);
  // console.log(getdata, "2222222222");

  const fetchData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + `/main/Manager/GetRooms/${viewOneData.building._id}`,
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

        const data = fetchedData.filter(Item => Item.Available_Beds && Item.Available_Beds.length > 0);

        // console.log(data, "22222222222222");
        setGetdata(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [viewOneData.building._id]);


  return (
    <div className="POPup_Main_Div bg-white">
      <div className="AddManagerCrossButton">
        <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
        </svg>
      </div>
      <div className='PopupHeadingAndVacantBeds'>
        <h5>Building {viewOneData.building.Building}</h5>
        <p>Vacant Beds- {viewOneData.totalAvailableBedsCount} </p>
      </div>

      <div className='TableHeadingAndVacantBeds'>
        <h5>Room No.</h5>
        <h5>Bed No.</h5>
      </div>
      <div className='TableDataRoomAndVacantBeds'>



        {getdata && getdata.length > 0 ? (
          getdata.map((filteredItem, index) => (
            <div key={index} className='TableDataRoomAndVacantBedsOne'>
              <h5>{filteredItem.Room_No}</h5>
              <h5>
                {filteredItem.Available_Beds.map(bed => {
                  const number = bed.slice(0, -1); // Extract the number part
                  const alphabet = bed.slice(-1); // Extract the alphabet part
                  return `${number}${alphabet}`;
                }).join(', ')}
              </h5>
            </div>
          ))
        ) : (
          <></>
        )}

      </div>

    </div>
  )
}

export default AvilableBdesByBuilding
