import React, { createContext, useState, useContext} from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [student, setStudent] = useState([]);
  const [room, setRoom] = useState([]);
  // console.log(room,"8888888888888888888")
  //  console.log(student,"8888888888888888888")

  return (
    <DataContext.Provider value={{ student, setStudent, room ,setRoom}}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;




