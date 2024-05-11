import React from "react";
import { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "./SideBar";
import Navbar from "./Navbar";
// import ComplaitPopup from "./Complaint/ManagerComplaint";
import dbConfig from '../config.json';
import Graph from "./graph"
import GraphTwo from "./graphTwo"
import ComplaitPopup from "./Complaint/Complaint"
import Pending from "../componets/ReceivedPayments"
import Received from "../componets/PendingPayments"
import BuildingBedsData from "./AvilableBdesByBuilding"

import { exportExcel } from "./utils/exportExcel";


// import DataContext from '../DataContext';

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const { student, setStudent } = useContext(DataContext);
  // //  console.log(student,"55555555555555");
  // const { room, setRoom } = useContext(DataContext);
  // //  console.log(room,"55555555555555");

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 700);
  const [received, setReceived] = useState(false);
  const [pending, setPending] = useState(false);

  const [buildingData, setBuildingData] = useState([]);
  // console.log(buildingData);
  const [buildingId, setBuildingId] = useState("");
  const [buildingIdOne, setBuildingIdOne] = useState("");

  const [getdata, setGetdata] = useState([]);
  // console.log(getdata,"222222222");


    const [pendingData, setPendingData] = useState();
    // console.log(pendingData,"22222222");
    const [receivedData, setReceivedData] = useState();

    const [isBuildingPopupOpen, setIsBuildingPopupOpen] = useState(false);

    const [avilableData, setAvilableData] = useState([]);
    // console.log(avilableData);
    const [totalBeds, setTotalBeds] = useState(null);
    const [viewOneData, setViewOneData] = useState(null);
    // console.log(viewOneData);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openReceived = () => {
    setReceived(true);
  };

  const closeReceived = () => {
    setReceived(false);
  };

  const openPending = () => {
    setPending(true);
  };

  const closePending = () => {
    setPending(false);
  };

  useEffect(() => {
    fetchBuildingData();  
  }, []);

  const fetchBuildingData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/building/Dashboard",
        // "http://192.168.1.6:3030/main/building/Dashboard",
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
        // console.log("888888888",fetchedData);
        setBuildingData(fetchedData.buildingData);

      } else {
        console.error("Failed to fetch building data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching building data:", error);
    }
  };


  const handleBuildingChange = (e) => {
    setBuildingId(e.target.value);
  };

  const handleBuildingChangeOne = (e) => {
    setBuildingIdOne(e.target.value);
  };

  const excelData = [];

  buildingData.forEach((building, buildingIndex) => {
    excelData.push(['Building Name', building.building]);

    building.roomData.forEach((room, roomIndex) => {
        excelData.push(['Room Name', room.Room_No]);

        room.Available_Beds.forEach((bed, bedIndex) => {
            excelData.push(['Available Bed', bed]);
        });

        // Add an empty row between rooms
        excelData.push([]);
    });

    // Add an empty row between buildings
    excelData.push([]);
  });


  const handleExportExcel = () => {
    exportExcel(excelData, 'building_data'); // Call the exportExcel function with data and file name
  };


  useEffect(() => { 
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/students/AllComplaintData",
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
        // console.log(fetchedData, "55555555555555555555555555");
        setGetdata(fetchedData.ComplaintData);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const pendingComplaints = getdata.filter(item => item.ComplaintStatus === 'Pending');
  const inProgressComplaints = getdata.filter(item => item.ComplaintStatus === 'In Progress');
  const resolvedComplaints = getdata.filter(item => item.ComplaintStatus === 'Resolved');



  useEffect(() => { 
    payment();
    AvilableBeds();
  }, []);

  const payment = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/adminStudent/Adminstudentget",
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
        // console.log(fetchedData,"333333333");
        const a = fetchedData.OnlineAmount;
        const b = fetchedData.AdminCashTaken;      
        setReceivedData(a + b)

        const c = fetchedData.PendingAmount;        
        const d = fetchedData.ManagerCashTaken;
        setPendingData(c + d );
        // console.log(b - a ,"qqqqqqqqqqqqqqqq");
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };



  const buildingPopupOpen = () => {
    setIsBuildingPopupOpen(true);
  };

  // Function to close the popup
  const buildingPopupClose = () => {
    setIsBuildingPopupOpen(false);
  };


  const AvilableBeds = async () => {
    try {
      const response = await fetch(
        dbConfig.backendBaseUrl + "/main/building/AvailableBeds",       
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
        // console.log(fetchedData,"222222");
        
        const BedData = fetchedData.combinedData.filter(item => item.totalAvailableBedsCount !== 0 )
        // console.log(BedData);
        setAvilableData(BedData)
        const totalAvailableBedsCounts = fetchedData.combinedData.map(item => item.totalAvailableBedsCount);
        const totalAvailableBedsCountsSum = totalAvailableBedsCounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        setTotalBeds(totalAvailableBedsCountsSum)      
        
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleOneView = (id) => {
    const BedsView = avilableData.find((Building) => Building.building._id === id );
    // console.log(BedsView,"2222222222");
    setViewOneData(BedsView);
    setIsBuildingPopupOpen(true);
  };

  return (
    <>
      <div>
        <div className="popupComplain">
          {isPopupOpen && (
            <div className="bg-white">
              <ComplaitPopup onClose={closePopup} 
              Data={fetchData}
              />
            </div>
          )}

          {received && (
            <div className="bg-white">
              <Received onClose={closeReceived} />
            </div>
          )}

          {pending && (
            <div className="bg-white">
              <Pending onClose={closePending} />
            </div>
          )}
        </div>
      </div>

      <div className="popup">
      {isBuildingPopupOpen && (
          <div className="popupbackground">
            <BuildingBedsData 
            onClose={buildingPopupClose}
            viewOneData={viewOneData}
              />
          </div>
        )}

        </div>

      <div className="mainDivNAV">
        <div className="">
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="second-Div">
          <div>
            <SideBar
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              activePage="home"
            />
          </div>
          <div className="h-scree three ">
            {/* <div className="four "> */}
            {/* <div onClick={openPopup} className="HomeDivOption1"></div> */}
            {/* box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.07); */}
          
              <div className=" DashBoard-Main-Div">
              <h5 className="mt-3">
                Dashboard
              </h5>
              <div className="pendingANDreceivedAndcomplaint">

      
                  
                  
                <div className="pendingANDreceived" onClick={openReceived}>
                  <div className="pendingANDreceivedLeft">
                    <div className="pendingANDreceivedLeftPending">Pending</div>
                    <div className="pendingANDreceivedLeftPayments">Payments</div>
                    <div className="pendingANDreceivedLeftText">
                      <h4>₹ {pendingData
                    ? Number(pendingData).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                      })
                   :'0'}</h4>
                    {/* <h4>₹ {Number(pendingData).toFixed(2)}</h4> */}
                    </div>
                  </div>
                  <div className="pendingANDreceivedRight">
                    <div className="pendingANDreceivedRightImg">
                      <img
                        src="../public/cash.png"
                        alt="Manager"
                        width="50px"
                        height="50px"
                      />
                    </div>
                  </div>
                </div>

                <div className="pendingANDreceived" onClick={openPending}>
                  <div className="pendingANDreceivedLeft">
                    <div className="pendingANDreceivedLeftPending">Received</div>
                    <div className="pendingANDreceivedLeftPayments">Payments</div>
                    <div className="pendingANDreceivedLeftText">
                    <h4>₹ {receivedData
                    ? Number(receivedData).toLocaleString('en-IN', {
                        maximumFractionDigits: 2,
                      })
                    : '0'}</h4>
                    {/* <h4>₹ {Number(receivedData).toFixed(2)}</h4> */}
                      {/* <h4>${receivedData}</h4> */}
                    </div>
                  </div>
                  <div className="pendingANDreceivedRight">
                    <div className="pendingANDreceivedRightImg">
                      <img
                        src="../public/cash.png"
                        alt="Manager"
                        width="50px"
                        height="50px"
                      />
                    </div>
                  </div>
                </div>
            
       
                

                <div className="ComplaintCARt" onClick={openPopup}>
                  {/* <Link to="/complaint"> */}
              
                    <div className="ComplaintCARtUPPER">
                      <div className="ComplaintCARtUPPERLEFT">
                        <div className="ComplaintCARtUPPERLEFTNAME">Complaint</div>
                        <div className="ComplaintCARtUPPERLEftNumber">{getdata.length}</div>
                      </div>
                      <div className="ComplaintCARtUPPERRight">
                        <img
                          src="../public/complaint.png"
                          alt="Manager"
                          width="40px"
                          height="40px"
                        />
                      </div>
                    </div>
                    <div className="ComplaintCARtLower">

                      <div className="ComplaintCARtLowerall">
                        <div className="ComplaintCARtLowerallUP"> Pending</div>
                        <div className="ComplaintCARtLoweralldOWN">{pendingComplaints.length}</div>

                      </div>

                      <div className="ComplaintCARtLowerall">
                        <div className="ComplaintCARtLowerallUP"> In Progress</div>
                        <div className="ComplaintCARtLoweralldOWN">{inProgressComplaints.length}</div>

                      </div>

                      <div className="ComplaintCARtLowerall">
                        <div className="ComplaintCARtLowerallUP"> Completed</div>
                        <div className="ComplaintCARtLoweralldOWN">{resolvedComplaints.length}</div>

                      </div>

                    </div>
                 

                  {/* </Link> */}


                </div>


              </div>
              </div>

              {/* <div className="AllGRAph">
                <div className="AllGRAphLEFT">
                  <div>
                    <h6>Unit Collection</h6>
                  </div>

                  <div className="GRAphLEFTDiv">
                    <div className="GRAphLEFTDivButton ">

                      <select
                        name="assignedBuilding"
                        onChange={handleBuildingChange}
                        value={buildingId}
                      >
                        <option value="">Building</option>
                        {buildingData.map((building) => (
                          <option key={building._id} value={building._id}>
                            {building.Building}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>  <Graph />
                    </div>

                  </div>

                </div>
                <div className="AllGRAphRGHIT">
                  <div>
                    <h6>Student status</h6>
                  </div>

                  <div className="GRAphLEFTDiv">
                    <div className="GRAphLEFTDivButton">

                    <select
                    name="assignedBuilding"
                    onChange={handleBuildingChangeOne}
                    value={buildingIdOne}
                  >
                    <option value="">Building</option>
                    {buildingData.map((building) => (
                      <option key={building._id} value={building._id}>
                        {building.Building}
                      </option>
                    ))}
                  </select>
                    </div>
                    <GraphTwo />
                  </div>


                </div>

              </div> */}
              {/* <div>
              <div className=" download" onClick={handleExportExcel}>
              
              <div className="download1">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4166 16.4168H0.583252V7.7085H2.16659V14.8335H14.8333V7.7085H16.4166V16.4168Z" fill="#EE6C4E"/>
                    <path d="M8.49992 12.7864L4.21367 8.50016L5.33325 7.38058L7.70825 9.75558V0.583496H9.29158V9.75558L11.6666 7.38058L12.7862 8.50016L8.49992 12.7864Z" fill="#EE6C4E"/>
                  </svg>
         
                </div>
              </div>
                <div className='BuildingAllTable '>
                  <div className='BuildingAllData'>
                    <div>Building Name</div>
                    <div>Room Name</div>
                    <div>Available Beds</div>
                  </div>
                  {buildingData
                    .map((filteredItem, index) => (
                      <div key={index} className='BuildingData'>
                        <div className='BuildingName'>{filteredItem.building}</div>
                        <div className='RoomDataContainer '>
                          {filteredItem.roomData.map((room, roomIndex) => (
                            <div key={roomIndex} className='RoomData'>
                              <div className='RoomNumber'> {room.Room_No}</div>
                              <div className='AvailableBeds'>

                                <ul>
                                  {room.Available_Beds.map((bed, bedIndex) => (
                                    <li key={bedIndex}>{bed}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}


                </div>
                
              </div> */}
         

                <div className="HomeScreenAllBuilding">
                  <div className="VacantBedsDiv">
                    <h5>
                    Vacant Beds
                    </h5>
                    <div className="VacantBedsDiv1">
                      <h5>Vacant Beds - {totalBeds}</h5>
                      <div className="VacantBedsDiv1Heading">
                        <h4 className="">Building Name</h4>
                        <h4 className="text-center">Vacant Bed</h4>
                        <h4 className="text-center">Action</h4>
                      </div>

                      <div className="VacantBedsDiv1Data">

                      {avilableData && avilableData.length > 0 ? (
                        avilableData.map((filteredItem, index) => (
                        <div key={index} className="VacantBedsDiv1DataOne">
                          <h4 className="">{filteredItem.building.Building}</h4>
                        <h4 className="text-center">{filteredItem.totalAvailableBedsCount}</h4>
                        {/* <h4 className="text-center">{filteredItem.building._id}</h4> */}
                        <h4 className="text-center">
                        <svg  onClick={() => handleOneView(filteredItem.building._id)}width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 8.89094C9.40909 8.89094 10.1818 8.57011 10.8182 7.92844C11.4545 7.28678 11.7727 6.50761 11.7727 5.59094C11.7727 4.67428 11.4545 3.89511 10.8182 3.25344C10.1818 2.61178 9.40909 2.29094 8.5 2.29094C7.59091 2.29094 6.81818 2.61178 6.18182 3.25344C5.54545 3.89511 5.22727 4.67428 5.22727 5.59094C5.22727 6.50761 5.54545 7.28678 6.18182 7.92844C6.81818 8.57011 7.59091 8.89094 8.5 8.89094ZM8.5 7.57094C7.95455 7.57094 7.49091 7.37844 7.10909 6.99344C6.72727 6.60844 6.53636 6.14094 6.53636 5.59094C6.53636 5.04094 6.72727 4.57344 7.10909 4.18844C7.49091 3.80344 7.95455 3.61094 8.5 3.61094C9.04545 3.61094 9.50909 3.80344 9.89091 4.18844C10.2727 4.57344 10.4636 5.04094 10.4636 5.59094C10.4636 6.14094 10.2727 6.60844 9.89091 6.99344C9.50909 7.37844 9.04545 7.57094 8.5 7.57094ZM8.5 11.0909C6.7303 11.0909 5.11818 10.5929 3.66364 9.59678C2.20909 8.60067 1.15455 7.26539 0.5 5.59094C1.15455 3.9165 2.20909 2.58122 3.66364 1.58511C5.11818 0.588998 6.7303 0.0909424 8.5 0.0909424C10.2697 0.0909424 11.8818 0.588998 13.3364 1.58511C14.7909 2.58122 15.8455 3.9165 16.5 5.59094C15.8455 7.26539 14.7909 8.60067 13.3364 9.59678C11.8818 10.5929 10.2697 11.0909 8.5 11.0909ZM8.5 9.62428C9.8697 9.62428 11.1273 9.26066 12.2727 8.53344C13.4182 7.80622 14.2939 6.82539 14.9 5.59094C14.2939 4.3565 13.4182 3.37566 12.2727 2.64844C11.1273 1.92122 9.8697 1.55761 8.5 1.55761C7.1303 1.55761 5.87273 1.92122 4.72727 2.64844C3.58182 3.37566 2.70606 4.3565 2.1 5.59094C2.70606 6.82539 3.58182 7.80622 4.72727 8.53344C5.87273 9.26066 7.1303 9.62428 8.5 9.62428Z" fill="#333333"/>
                        </svg>

                        </h4>
                        </div>
                      
                        ))
                        ) : (
                        <></>
                        )}

                   

                      

                      


                      </div>


                    </div>

                  </div>


                  <div className="TransactionsDiv">
                  <h5>
                  Transactions 
                    </h5>
                    <div className="TransactionsDiv1">
                    <div className="TransactionsDiv1Upper">                     
                      
                      <div className="TransactionsDiv1UpperHeading">
                        <h5>
                          Total Transactions
                        </h5>
                        <h6>
                          ₹20 Lac
                        </h6>

                      </div>
                      <div className="TransactionsDiv1UpperSecond">
                        <label htmlFor="fromDate">From Date</label>
                        <input type="date" name="fromDate"/>
                        
                        </div>
                        <div className="TransactionsDiv1UpperSecond">
                        <label htmlFor="fromDate">To Date</label>
                        <input type="date" name="fromDate"/>
                        
                        </div>
                        </div>

                        <div className="VacantBedsDiv1Heading">
                        <h4 className="">Building Name</h4>
                        <h4 className="text-center">Total Transactions</h4>
                        <h4 className="text-center">Pending Transactions</h4>
                      </div>

                      <div className="TransactionsDiv1Data">
                        <div className="TransactionsDiv1DataOne">
                      <h4 className="">₹80,000</h4>
                        <h4 className="text-center">22</h4>
                        <h4 className="text-center">₹25,000</h4>

                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>

                        <div className="VacantBedsDiv1DataOne">
                          <h4 className="">₹80,000</h4>
                          <h4 className="text-center">22</h4>
                          <h4 className="text-center">₹25,000</h4>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>
      


           
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};


export default Home;











  // <div key={index} className='PaymentAndPendingTableData'>

                      //   <div>{filteredItem.building}</div>
                      //   <div>
                      //   {filteredItem.roomData.map((room, roomIndex) => (
                      //     <>
                      //       <div>{room.Room_No} </div>
                      //       {/* <div>{room.Available_Beds}</div> */}
                      //     </>
                      //   ))}
                      //   </div>

                      //   <div>
                      //   {filteredItem.roomData.map((room, roomIndex) => (
                      //     <>
                      //       {/* <div>{room.Room_No} </div> */}
                      //       <div className="flex float-right">{room.Available_Beds}</div>
                      //     </>
                      //   ))}
                      //   </div>
                        

                        

                      // </div>
