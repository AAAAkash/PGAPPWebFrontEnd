import { useState } from "react";
import dbConfig from '../../../config.json';

const StudentBlock = ({ onClose , Student, fetchData}) => {
  // console.log(Student._id,"2222222222222222222");
  const [Reason, setReason] = useState("");
  // console.log(Reason);

  const handleChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(Reason);
      const response = await fetch(

        dbConfig.backendBaseUrl + `main/adminStudent/AdminstudentBlock/${Student._id}`,
        
          {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50",
          },
          body: JSON.stringify({ Reason }),
 
        });

      if (response.ok) {
        alert("Student Blocked Successfully")
        // console.log("Student blocked successfully!");
        onClose();
        fetchData();
      } else {
        console.error("Failed to block Student:", response.statusText);
      }
    } catch (error) {
      console.error("Error blocking Student:", error.message);
    }
  };
  return (
    <>
      <div className="POPup_Main_Div" >
        <div className="AddManagerCrossButton">
          <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
          </svg>
        </div>
        <div className="AddManagerHeading">
          <h5>Report Student</h5>
        </div>

        <form>
          <div className="div_BLock">

            <h4>Why do you want to report this user ?</h4>
          </div>
          <div className="Div_TextARea">
          <textarea placeholder="Write here..." value={Reason} onChange={handleChange} />
          </div>
          <div className="blockButtons">
          <button onClick={handleSubmit} className="blockButtonSubmit">Submit</button>
            <button type="button" onClick={onClose} className="blockButtonCancel">Cancel</button>
          </div>

        </form>
      </div>
    </>
  );
};

export default StudentBlock;
