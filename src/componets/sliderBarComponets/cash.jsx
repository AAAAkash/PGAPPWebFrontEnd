import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../SideBar";
import Navbar from "../Navbar";
import dbConfig from '../../config.json';
import { auto } from "@popperjs/core";

const cash = () => {

    const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);
    const [showManagerContent, setShowManagerContent] = useState(true);
    const [buildingData, setBuildingData] = useState([]);
    const [buildingId, setBuildingId] = useState("");
    // console.log(buildingId);

    // const [ cash, setCash] = useState([]);
    // console.log(cash,"555555555");

    const [cashApproved, setCashApproved] = useState([]);
    // console.log(cashApproved,"11111111");

    const [cashNotApproved, setCashNotApproved] = useState([]);
    const [totalCashApproved, setTotalCashApproved] = useState();
    // console.log(cashNotApproved,"7777777");
    const [totalCashNotApproved, setTotalCashNotApproved] = useState();
    // console.log(cashNotApproved,"22222222");

    const [checkedItems, setCheckedItems] = useState({});

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    const handleManagerClick = () => {
        setShowManagerContent(true);
    };

    const handleStudentClick = () => {
        setShowManagerContent(false);
    };

    useEffect(() => {
        fetchBuildingData();
    }, []);

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


    const handleBuildingChange = (e) => {
        setBuildingId(e.target.value);
    };

    useEffect(() => {
        Cash();
    }, []);
    // [cashApproved,cashNotApproved,totalCashApproved,totalCashNotApproved]

    const Cash = async () => {
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
                // console.log(fetchedData,"3333");                    
                const cashNot = fetchedData.students.filter(item => item.CashTaken === "Manager");
                setTotalCashNotApproved(fetchedData.ManagerCashTaken)
                // console.log(fetchedData.ManagerCashTaken,"3333333333");  
                setCashNotApproved(cashNot)
                // console.log(cashNot,"444444444");  
                const cash = fetchedData.students.filter(item => item.CashTaken === "Admin");
                setTotalCashApproved(fetchedData.AdminCashTaken)
                // console.log(fetchedData.AdminCashTaken,"555555555555");  
                setCashApproved(cash)
                // console.log(cash,"6666666666");  
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleCheckboxChange = async (Id) => {
        try {
            const response = await fetch(
                dbConfig.backendBaseUrl + `/main/adminStudent/CashApprovedByAdmin/${Id}`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
                    },
                }
            );

            const responseData = await response.json();
            if (response.ok) {
                Cash();
                console.log("Payment marked as received in cash successfully.");
                // alert(responseData.message)
            } else {
                console.error("Server error:", response.status);
                if (responseData && responseData.message) {
                    console.log(responseData.message);
                } else {
                    alert("Server error occurred");
                }
            }
        } catch (error) {
            console.error("Error marking payment as received in cash:", error);
        }
    };

    // const handleCheckboxChange = async (filteredItemId) => {
    //     // Toggle the checked state of the checkbox
    //     console.log(filteredItemId,"555555555555");
    //     const updatedCheckedItems = { ...checkedItems, [filteredItemId]: !checkedItems[filteredItemId] };
    //     setCheckedItems(updatedCheckedItems);

    //     try {
    //         if (updatedCheckedItems[filteredItemId]) {
    //             // Make the API call only when the checkbox is checked
    //             const response = await fetch
    //             ( dbConfig.backendBaseUrl + `/main/adminStudent/CashApprovedByAdmin/${filteredItemId}`,

    //                 {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50'
    //                     }
    //                 }
    //             );

    //             if (response.ok) {
    //                 console.log("Payment marked as received in cash successfully.");
    //                 Cash();

    //             } else {
    //                 console.error("Server error:", response.status);
    //                 const responseData = await response.json();
    //                 if (responseData && responseData.message) {
    //                     console.log(responseData.message);
    //                 } else {
    //                     console.log("Server error occurred");
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error marking payment as received in cash:", error);           
    //     }
    // };

    return (

        <div className="mainDivNAV">
            <div>
                <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>
            <div className="second-Div">
                <div>
                    <SideBar
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        activePage={"cash"}
                    />
                </div>


                <div className="h-scree three">
                    <div className="NAMEandBUTTON">
                        <div className="NAMEandBUTTONLeft">
                            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                                <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                            </svg>

                            <h6>Cash Payment</h6>

                        </div>
                        <div className="compailntbuttonbuildingSecond mt-2">
                            <select
                                name="assignedBuilding"
                                onChange={handleBuildingChange}
                                value={buildingId}
                            >
                                <option value="">Building Name</option>
                                {buildingData.map((building) => (
                                    <option key={building._id} value={building._id}>
                                        {building.Building}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="compailntbuttonbuilding ">

                        <div className="ComplainPopupBTNDIV">
                            <button
                                onClick={handleManagerClick}
                                style={{
                                    backgroundColor: showManagerContent ? "#EE6C4E" : "",
                                    color: showManagerContent ? "white" : "",
                                }}
                            >
                                Cash Approved
                            </button>
                            <button
                                onClick={handleStudentClick}
                                style={{
                                    backgroundColor: !showManagerContent ? "#EE6C4E" : "",
                                    color: !showManagerContent ? "white" : "",
                                }}
                            >
                                Cash Not Approved
                            </button>
                        </div>

                        {showManagerContent ? (
                            <div className="compailntbuttonbuildingSecond">
                                <select>
                                    <option>Till Date</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                            </div>
                        ) : (
                            <></>

                        )}



                    </div>


                    {showManagerContent ? (
                        <div className="TotalCASh">
                            <div className="TotalCAShLEFT">
                                <p>Total Cash</p>
                                <h3>₹ {totalCashApproved
                                    ? Number(totalCashApproved).toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                    })
                                    : "0"}
                                </h3>
                            </div>
                            <div className="TotalCAShRIGHT">
                                <label>Matched as manager Given Cash</label>
                                <input
                                    type="checkbox"
                                    // defaultValue={true}
                                    defaultChecked={true}


                                />
                            </div>

                        </div>
                    ) : (
                        <div className="TotalCASh">
                            <div className="TotalCAShLEFT">
                                <p>Total Cash</p>
                                <h3>₹ {totalCashNotApproved
                                    ? Number(totalCashNotApproved).toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                    })
                                    : "0"}
                                </h3>
                            </div>
                            <div className="TotalCAShRIGHT">
                                <label>Matched as manager Given Cash </label>
                                <input
                                    type="checkbox"
                                    // defaultValue={true}   
                                    defaultChecked={false}
                                />
                            </div>

                        </div>
                    )}


                    <div className="ComplainPopup">
                        {showManagerContent ? (
                            <div className="ComplaintAllDATA">
                                <div className="ComplainPopupData  ">
                                    {cashApproved && cashApproved.length > 0 ? (
                                        <>
                                            {cashApproved.filter((item) => {
                                                if (buildingId === "" || buildingId === null) {
                                                    return true;
                                                } else {
                                                    return item.assignedBuilding === buildingId;
                                                }
                                            }).map((filteredItem, index) => (

                                                <div key={index} className="CAshALLDATa">
                                                    {/* <div className="contant_icon">
                                            <svg

                                                xmlns="http://www.w3.org/2000/svg"
                                                width="4"
                                                height="18"
                                                viewBox="0 0 4 18"
                                                fill="none"
                                            >
                                                <circle cx="2" cy="9" r="2" fill="black" />
                                                <circle cx="2" cy="2" r="2" fill="black" />
                                                <circle cx="2" cy="16" r="2" fill="black" />
                                            </svg>
                                        </div> */}
                                                    <div className="contant_Image mt-4">
                                                        <img
                                                            src="../public/cashpic.png"
                                                            alt="Manager"
                                                            width="70px"
                                                            height="70px"
                                                        />
                                                    </div>

                                                    <div className="contant_Text">
                                                        <h5>{filteredItem.studentName}</h5>
                                                        <h6>Email ID: {filteredItem.email}</h6>
                                                        <h6>Phone No : {filteredItem.phoneNumber}</h6>
                                                        <h6>Building No : {filteredItem.BuildingDetails.Building}</h6>
                                                        <h6>Total Amount: {filteredItem.Firstpayment ? Number(filteredItem.Firstpayment).toFixed(2) :(Number(filteredItem.ElectricityBill) + Number(filteredItem.rentAmount)).toFixed(2)}</h6>
                                                        <div className="contant_TextRECEIVED">
                                                            <h6>Payment Status :</h6>
                                                            <p>{filteredItem.paymentStatus}</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                            {cashApproved.filter((item) => {
                                                if (buildingId === "" || buildingId === null) {
                                                    return true;
                                                } else {
                                                    return item.assignedBuilding === buildingId;
                                                }
                                            }).length === 0 && (
                                                    <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "120px" }}>No record found</p>
                                                )}
                                        </>
                                    ) : (
                                        <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "120px" }}>No record found</p>

                                    )}







                                </div>

                            </div>




                        ) : (
                            <>
                                <div className="ComplaintAllDATA">
                                    <div className="ComplainPopupData">
                                        {cashNotApproved && cashNotApproved.length > 0 ? (
                                            <>
                                                {cashNotApproved.filter((item) => {
                                                    if (buildingId === "" || buildingId === null) {
                                                        return true;
                                                    } else {
                                                        return item.assignedBuilding === buildingId;
                                                    }
                                                }).map((filteredItem, index) => (


                                                    <div key={index} className="CAshALLDATa">
                                                        {/* <div className="contant_icon">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="4"
                                                    height="18"
                                                    viewBox="0 0 4 18"
                                                    fill="none"
                                                >
                                                    <circle cx="2" cy="9" r="2" fill="black" />
                                                    <circle cx="2" cy="2" r="2" fill="black" />
                                                    <circle cx="2" cy="16" r="2" fill="black" />
                                                </svg>
                                            </div> */}
                                                        <div className="contant_Image mt-4">
                                                            <img
                                                                src="../public/cashpic.png"
                                                                alt="Manager"
                                                                width="70px"
                                                                height="70px"
                                                            />
                                                        </div>
                                                        <div className="contant_Text">
                                                            <h5>{filteredItem.studentName}</h5>
                                                            <h6>Email ID: {filteredItem.email}</h6>
                                                            <h6>Phone No : {filteredItem.phoneNumber}</h6>
                                                            <h6>Building No : {filteredItem.BuildingDetails.Building}</h6>
                                                            {/* <h6>Total Amount: {filteredItem.Firstpayment   ? Number(filteredItem.Firstpayment)  : (Number(filteredItem.ElectricityBill) + Number(filteredItem.rentAmount)).toFixed(2)}</h6> */}
                                                            <h6>Total Amount: {filteredItem.AdvancedAmount ? (Number(filteredItem.AdvancedAmount) +Number(filteredItem.securityAmount) ).toFixed(2)  :(Number(filteredItem.ElectricityBill) + Number(filteredItem.rentAmount)).toFixed(2)}</h6>
                                                            <div className="contant_TextRECEIVED">
                                                                <h6>Payment Status :</h6>
                                                                <p style={{ color: "red" }}> Pending</p>
                                                            </div>
                                                            <div className="CHECKBOXofReceived mt-3">
                                                                <label>Payment Received in Cash</label>
                                                                <input
                                                                    type="checkbox"
                                                                    //  checked={checkedItems[filteredItem._id]} 
                                                                    onChange={() => handleCheckboxChange(filteredItem._id)}
                                                                ></input>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {cashNotApproved.filter((item) => {
                                                    if (buildingId === "" || buildingId === null) {
                                                        return true;
                                                    } else {
                                                        return item.assignedBuilding === buildingId;
                                                    }
                                                }).length === 0 && (
                                                        <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "120px" }}>No record found</p>
                                                    )}

                                            </>
                                        ) : (
                                            <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "120px" }}>No record found</p>
                                        )}





                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default cash