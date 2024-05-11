import React, { useState, useContext } from 'react';
// import DataContext from "./DataContext";
import SideBar from './componets/SideBar';
import Navbar from './componets/Navbar';
import axios from 'axios';
import dbConfig from './config.json';


const YourComponent = () => {
  // const { room } = useContext(DataContext);
  // console.log(room,"22222222")
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [roomsData, setRoomsData] = useState({
    'Building A': {
      'Room 1': ['Bed 1', 'Bed 2'],
      'Room 2': ['Bed 1', 'Bed 2', 'Bed 3'],
    },
    'Building B': {
      'Room 1': ['Bed 1', 'Bed 2', 'Bed 3'],
      'Room 2': ['Bed 1', 'Bed 2'],
    },
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(dbConfig.backendBaseUrl + '/process_payment', {
        amount,
        card_number: cardNumber,
        expiry_date: expiryDate,
        cvv,
      });

      setMessage(response.data.message);
      // You can handle the response here as needed
    } catch (error) {
      setMessage('Error processing payment.');
      // Handle error cases
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBuildingSelect = (event) => {
    setSelectedBuilding(event.target.value);
    setSelectedRoom('');
  };

  const handleRoomSelect = (event) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <div className="mainDivNAV">
      <div>      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="second-Div">

        <div>  <SideBar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /></div>
        <div className="h-scree three">
          <div className="four m-4">
            <form action="" className='mb-4'>
              <div className="POPUP_IINPUTT">
                <label htmlFor="text">Building Name</label>
                <select
                  name="Building_Name"
                  className="mt-2"
                  value={selectedBuilding}
                  onChange={handleBuildingSelect}
                >
                  <option value="">Select Building</option>
                  {Object.keys(roomsData).map((building) => (
                    <option key={building} value={building}>
                      {building}
                    </option>
                  ))}
                </select>
              </div>

              {selectedBuilding && (
                <div className="POPUP_IINPUTT mt-4">
                  <label htmlFor="text">Room Name</label>
                  <select
                    name="Room_Name"
                    className="mt-2"
                    value={selectedRoom}
                    onChange={handleRoomSelect}
                  >
                    <option value="">Select Room</option>
                    {Object.keys(roomsData[selectedBuilding]).map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedRoom && (
                <div className="POPUP_IINPUTT mt-4">
                  <label htmlFor="text">NO. of beds</label>
                  <select name="Beds" className="mt-2">
                    <option value="">Select Bed</option>
                    {roomsData[selectedBuilding][selectedRoom].map((bed) => (
                      <option key={bed} value={bed}>
                        {bed}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </form>
            <div>
              <h2>Payment Form</h2>
              <form onSubmit={handlePayment}>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input type="text" placeholder="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                <input type="text" placeholder="CVV" value={cvv} onChange={(e) => setCVV(e.target.value)} />
                <button type="submit">Pay Now</button>
              </form>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default YourComponent;



















// {
//   "Students_Details": [
//       {
//           "_id": "65ceedbb2a03be2104f334d4",
//           "studentName": "mukal Singh",
//           "email": "mukal776@gmail.com",
//           "phoneNumber": "66666111",
//           "password": "",
//           "assignedBuilding": "65cef2b15cae3dbeb6cc3efe",
//           "BuildingDetails": {
//               "_id": "65cef2b15cae3dbeb6cc3efe",
//               "ManagerName": [
//                   "65cd9a20f1826a520fd7dc3f"
//               ],
//               "Building": "35 A",
//               "BuildingAddress": "Chandigarh, 34 Secter",
//               "Per_Unit_Cost": "3000",
//               "addDocument": [
//                   {
//                       "filename": "1708061361924-IMG_20240102_170612.jpg",
//                       "originalname": "IMG_20240102_170612.jpg"
//                   }
//               ],
//               "__v": 0
//           },
//           "Room_No": "65cf1e730d39eccad085b29c",
//           "RoomDetails": {
//               "_id": "65cf1e730d39eccad085b29c",
//               "Room_No": "2",
//               "Beds": 4,
//               "BuildingId": "65cef2b15cae3dbeb6cc3efe",
//               "Available_Beds": [
//                   "2 C",
//                   "2 D",
//                   "2 A"
//               ],
//               "Occupied_Beds": [
//                   "2 B"
//               ],
//               "Status": "1",
//               "CreatedAt": "2024-02-16T07:47:21.354Z",
//               "updatedAt": "2024-02-16T07:47:21.354Z",
//               "__v": 5
//           },
//           "Bed_No": "2 B",
//           "rentAmount": "50301",
//           "securityAmount": "10001",
//           "ElectricityBill": "001",
//           "paymentStatus": "",
//           "dueDate": "2024-02-18",
//           "createdAt": "2024-02-16T05:07:43.978Z"
//       },
//       {
//           "_id": "65cf1b9d0d39eccad0859882",
//           "studentName": "Puneet",
//           "email": "Puneet@gmail.com",
//           "phoneNumber": "1234567890",
//           "password": "",
//           "assignedBuilding": "65cef2b15cae3dbeb6cc3efe",
//           "BuildingDetails": {
//               "_id": "65cef2b15cae3dbeb6cc3efe",
//               "ManagerName": [
//                   "65cd9a20f1826a520fd7dc3f"
//               ],
//               "Building": "35 A",
//               "BuildingAddress": "Chandigarh, 34 Secter",
//               "Per_Unit_Cost": "3000",
//               "addDocument": [
//                   {
//                       "filename": "1708061361924-IMG_20240102_170612.jpg",
//                       "originalname": "IMG_20240102_170612.jpg"
//                   }
//               ],
//               "__v": 0
//           },
//           "Room_No": "65cf1e730d39eccad085b29c",
//           "RoomDetails": {
//               "_id": "65cf1e730d39eccad085b29c",
//               "Room_No": "2",
//               "Beds": 4,
//               "BuildingId": "65cef2b15cae3dbeb6cc3efe",
//               "Available_Beds": [
//                   "2 C",
//                   "2 A"
//               ],
//               "Occupied_Beds": [
//                   "2 B",
//                   "2 D"
//               ],
//               "Status": "1",
//               "CreatedAt": "2024-02-16T07:47:21.354Z",
//               "updatedAt": "2024-02-16T07:47:21.354Z",
//               "__v": 6
//           },
//           "Bed_No": "2 D",
//           "rentAmount": "13000",
//           "securityAmount": "1000",
//           "ElectricityBill": "1000",
//           "paymentStatus": "",
//           "dueDate": "10/02/2024",
//           "createdAt": "2024-02-16T07:47:21.356Z"
//       }
//   ],
//   "RoomDetails": [
//       {
//           "_id": "65cf1e730d39eccad085b29c",
//           "Room_No": "2",
//           "Beds": 4,
//           "BuildingId": "65cef2b15cae3dbeb6cc3efe",
//           "Available_Beds": [
//               "2 C",
//               "2 A"
//           ],
//           "Occupied_Beds": [
//               "2 B",
//               "2 D"
//           ],
//           "Status": "1",
//           "CreatedAt": "2024-02-16T07:47:21.354Z",
//           "updatedAt": "2024-02-16T07:47:21.354Z",
//           "__v": 6
//       }
//   ],
//   "message": "Particular Rooms And Students"
// }