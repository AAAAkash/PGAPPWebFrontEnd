import React, { useState, useEffect } from "react";
import dbConfig from '../../../config.json';

const Ele = ({ onClose, electricityData, Data }) => {
    // console.log(electricityData);
    const [ElectricityUnit, setElectricityUnit] = useState("");
    // console.log(ElectricityUnit);
    const [bedsData, setBedsData] = useState([]);

    useEffect(() => {
        const distributeElectricity = () => {
            if (ElectricityUnit !== "" && electricityData) {
                const totalUnits = parseFloat(ElectricityUnit);
                const totalOccupiedBeds = electricityData.Occupied_Beds.length;
                let unitsPerBed = 0;
                
                if (totalUnits !== 0 && totalOccupiedBeds !== 0) {
                    unitsPerBed = totalUnits / totalOccupiedBeds;
                }
                
                const newBedsData = electricityData.Occupied_Beds.map((bed, index) => ({
                    bedName: bed,
                    units: unitsPerBed,
                }));
    
                setBedsData(newBedsData);
            } else {
                // Handle the case where ElectricityUnit is empty or electricityData is not available
                setBedsData([]);
            }
        };
        distributeElectricity();
    }, [ElectricityUnit, electricityData]);
    

    const handleElectricityChange = (e) => {
        setElectricityUnit(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();     
        try {
            const response = await fetch(
              dbConfig.backendBaseUrl + `/main/RoomsData/Addelectricity/${electricityData._id}`,
              {
                method: "POST",
                body: JSON.stringify({ ElectricityUnit }),
                headers: {
                  "content-type": "application/json",
                  "x-access-token":
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50",
                    },
              }
            );    
            const responseData = await response.json();    
            if (response.ok) {
              console.log("Electricity Unit divided successfully", responseData.status);
            //   alert("Electricity Unit divided successfully")
              onClose();
              if (typeof Data === 'function') {
                Data();
              }
            //   fetchData(); // Call the fetchData function here
            } else {
              console.error("Server error:", response.status);
              if (responseData && responseData.message) {
                console.error(`Server error: ${responseData.message}`);
              } else {
                console.error("Server error occurred");
              }
            }
          } catch (error) {
            console.error("Error adding Electricity Unit data:", error);
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
                <h3>Electricity Units</h3>
                <div className='EleDiv'>
                    <div className='EleDivUp'>
                        <label >Electricity Meter<br />Reading </label>
                        <input
                            type='number'
                            placeholder='Enter Units'
                            value={ElectricityUnit}
                            onChange={handleElectricityChange}
                        />
                        <div className='EleDivUp1'></div>
                    </div>
                    <div className='EleDivDown'>

                        {bedsData.length === 0 ? (
                            electricityData.Occupied_Beds.map((filteredItem, index) => (
                                <div key={index} className='EleDivDownOne'>
                                    <label >{filteredItem}</label>
                                    <input type='text' placeholder='N/A Unit' readOnly />
                                </div>
                            ))
                        ) : (
                            bedsData.map((bed, index) => (
                                <div key={index} className='EleDivDownOne'>
                                    <label>{bed.bedName}</label>
                                    <input type="text" placeholder={`${bed.units} Units`} readOnly />
                                </div>
                            ))
                        )}
                    </div>
                    <div className='EleDivButton'>
                        <button onClick={handleSubmit}>Add Units</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ele;
