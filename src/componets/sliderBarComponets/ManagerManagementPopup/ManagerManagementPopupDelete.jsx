import { useState } from 'react'
import dbConfig from '../../../config.json';


const Delete = ({ onClose, DeleteManager, fetchData }) => {

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                dbConfig.backendBaseUrl + `/main/AdminManager/DeleteManager/${DeleteManager._id}`,
                {
                    method: "DELETE",
                    headers: {
                        "x-access-token":
                            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.bV2ubb6lDRYiFJ8VLoeRPz7qx0JI7mz9XyDK_E5KI50",
                    },
                }
            );

            if (response.ok) {
                alert("Manager Deleted Successfully"); 
                // console.log("Manager deleted successfully");
                onClose();
                fetchData();
            } else {
                console.error("Server error:", response.status);                
            }
        } catch (error) {
            console.error("Error deleting manager:", error);           
        }
    };

    return (
        <div className="DELETEROOM">
            <div className="AddManagerCrossButton">
                <svg onClick={onClose} width="23" height="23" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6777 12.799L18.8094 20.9307L20.9307 18.8094L12.799 10.6777L20.9307 2.54593L18.8094 0.424611L10.6777 8.55634L3.25305 1.13172L1.13173 3.25304L8.55635 10.6777L0.42462 18.8094L2.54594 20.9307L10.6777 12.799Z" fill="black" />
                </svg>
            </div>

            <div className='DELETEROOMIcon'>
                <svg width="75" height="80" viewBox="0 0 81 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M36.5417 32.1249V67.7499H28.625V32.1249H36.5417Z" fill="#EE6C4E" />
                    <path d="M52.375 32.1249V67.7499H44.4584V32.1249H52.375Z" fill="#EE6C4E" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.8137 0.458252H59.1864L63.1447 12.3333H80.0834V20.2499H72.1667V87.5416H8.83335V20.2499H0.916687V12.3333H17.8553L21.8137 0.458252ZM26.2002 12.3333H54.7998L53.4804 8.37492H27.5197L26.2002 12.3333ZM16.75 20.2499V79.6249H64.25V20.2499H16.75Z" fill="#EE6C4E" />
                </svg>
            </div>

            <div className='DELETEROOMHeading'>
                <h6>Do you want to Delete the Manager ?</h6>
            </div>

            <div className='DELETEROOMBUtton'>
                <button onClick={handleDelete}>Yes</button>
                <button onClick={onClose}>No</button>
            </div>
        </div>
    )
}

export default Delete
