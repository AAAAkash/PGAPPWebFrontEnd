import { useState, useEffect } from 'react'
import SideBar from "./SideBar";
import Navbar from "./Navbar";
import { useLocation } from 'react-router-dom';
import dbConfig from '../config.json';

const ReceivedPayments = ({ onClose }) => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 700);

    const [paymentData, setPaymentData] = useState([]);
    // console.log(paymentData);  
    const [receivedData, setReceivedData] = useState([]);


    const [buildingData, setBuildingData] = useState([]);
    // console.log(buildingData, "2222222");

    const [buildingId, setBuildingId] = useState("");
    // console.log(buildingId,"3333333333");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const location = useLocation();

    useEffect(() => {
        payment();
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
                const a = fetchedData.OnlineAmount;
                const b = fetchedData.AdminCashTaken;
                // console.log( a,"online");
                // console.log( b,"admin");
                setReceivedData(a + b);
                // setReceivedData(fetchedData.ReceivedAmount)
                const data = fetchedData.students;
                const filteredData = data.filter(item => item.CashTaken !== "Manager");
                const filtered = filteredData.filter(item => item.paymentStatus !== "Pending");
                // console.log(filtered,"222222222");
                setPaymentData(filtered)
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
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



    return (
        <>
            <div className="mainDivNAV">
                <div className="">
                    <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="second-Div">
                    <div>
                        <SideBar
                            isSidebarOpen={isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                            activePage={location.pathname.split('/').slice(1).join('/')}
                        />
                    </div>
                    <div className="h-scree three ">
                        <div className="NAMEandBUTTON">
                            <div className="NAMEandBUTTONLeft">
                                <svg onClick={onClose}
                                    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                                    <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                                </svg>

                                <h6>
                                    Received Payments
                                </h6>

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

                        <div className="PaymentsAndReminder1">
                            <div className="PaymentsAndReminderLeft">
                                <p style={{ fontWeight: "500" }}>Received Payments</p>
                                <h3>₹ {receivedData
                                    ? Number(receivedData).toLocaleString('en-IN', {
                                        maximumFractionDigits: 2,
                                    })
                                    : '0'}</h3>
                                {/* <h3>₹ {Number(receivedData).toFixed(2)}</h3> */}
                                {/* <h3>₹ {receivedData}</h3> */}
                            </div>
                        </div>

                        <div className='PaymentAndPendingTable'>
                            <div className='PaymentAndPendingTabletwo'>
                                <div className='PaymentAndPendingTableHeading'>
                                    <div>Student Name</div>
                                    <div>Mobile No.</div>
                                    <div>Email ID</div>
                                    <div>Building Name</div>
                                    <div> Amount</div>
                                    <div>Status</div>
                                    <div>Payment Mode</div>
                                </div>


                                {paymentData && paymentData.length > 0 ? (
                                    <>
                                        {paymentData
                                            .filter((item) => {
                                                if (buildingId === "" || buildingId === null) {
                                                    return true;
                                                } else {
                                                    return item.assignedBuilding === buildingId;
                                                }
                                            })
                                            .map((filteredItem, index) => (
                                                <div key={index} className='PaymentAndPendingTableData'>
                                                    {/* <div className='PaymentAndPendingTableDataImg'> */}
                                                    <div>
                                                        {/* <img src="../public/cashpic.png" alt="img" height="40px" width="40px" /> */}
                                                        {/* <h2> */}
                                                        {filteredItem.studentName}
                                                        {/* </h2> */}
                                                    </div>
                                                    <div>{filteredItem.phoneNumber}</div>
                                                    <div>{filteredItem.email}</div>
                                                    <div>{filteredItem.BuildingDetails.Building}</div>
                                                    <div>{filteredItem.Firstpayment.length > 0 ?
                                                        (Number(filteredItem.Firstpayment)).toFixed(2)
                                                        : (Number(filteredItem.rentAmount) + Number(filteredItem.ElectricityBill)).toFixed(2)
                                                    }
                                                    </div>
                                                    <div className='PaymentAndPendingTableDataReceived'><h2>{filteredItem.paymentStatus}</h2></div>
                                                    <div>{filteredItem.CashTaken === "Admin" ? "Cash" : filteredItem.CashTaken}</div>

                                                </div>
                                            ))}
                                        {paymentData.filter((item) => {
                                            if (buildingId === "" || buildingId === null) {
                                                return true;
                                            } else {
                                                return item.assignedBuilding === buildingId;
                                            }
                                        }).length === 0 && (
                                                <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "150px" }}>No record found</p>
                                            )}
                                    </>
                                ) : (
                                    <>
                                        <p style={{ color: "black", textAlign: "center", width: "100%", marginTop: "150px" }}>No record found</p>

                                    </>
                                )}




                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default ReceivedPayments
