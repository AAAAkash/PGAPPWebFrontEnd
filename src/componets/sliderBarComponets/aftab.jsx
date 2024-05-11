// import React, { useState } from 'react';

// const YourComponent = () => {


//   return (
//     <form action="">
//           <div className="POPUP_IINPUTT">
//             <label htmlFor="text">Student Name</label>
//             <select
//               name="Student_Name"            
//               className="mt-2"
//             >
//               <option value="">Select Student</option>
             
//                 <option>5 </option>
                
              
        
//             </select>
          
//           </div>
//           <div className="POPUP_IINPUTT">
//             <label htmlFor="text">Building Name</label>
//             <select
//               name="Student_Name"            
//               className="mt-2"
//             >
//               <option value="">Room Name</option>
             
//                 <option>5  </option>
                
              
        
//             </select>
          
//           </div>
//           <div className="POPUP_IINPUTT">
//             <label htmlFor="text">NO. of beds</label>
//             <select
//               name="Student_Name"            
//               className="mt-2"
//             >
//               <option value="">Select Student</option>
             
//                 <option>5  </option>
                
              
        
//             </select>
          
//           </div>
//     </form>
//   );
// };

// export default YourComponent;



import React, { useState ,useContext } from 'react';
import DataContext from "../../DataContext";


const YourComponent = () => {
  const { room } = useContext(DataContext);
console.log(room,"22222222")
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

  const handleBuildingSelect = (event) => {
    setSelectedBuilding(event.target.value);
    setSelectedRoom('');
  };

  const handleRoomSelect = (event) => {
    setSelectedRoom(event.target.value);
  };

  return (
    <form action="">
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
        <div className="POPUP_IINPUTT">
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
        <div className="POPUP_IINPUTT">
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
  );
};

export default YourComponent;
