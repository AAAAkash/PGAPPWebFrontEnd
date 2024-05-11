import { useState, useEffect } from 'react'
import Navbar from "../Navbar";
import SideBar from "../SideBar";
import dbConfig from "../../config.json";

const HistoryOne = ({ onClose, viewOneData, fetchData }) => {
    // console.log(viewOneData, "22222222");
    const [advancedAmount, setAdvancedAmount] =  useState(viewOneData.AdvancedAmount);
    const [securityAmount, setSecurityAmount] =  useState(viewOneData.securityAmount);
    const [RentAmount, setRentAmount] =  useState(viewOneData.rentAmount);
    const electricityBill = viewOneData.ElectricityBill === "NaN" ? 0 : Number(viewOneData.ElectricityBill);

    const [ElectricityBill, setElectricityBill] =  useState(electricityBill);
    const [Firstpayment, setFirstpayment] =  useState(viewOneData.Firstpayment);

    // console.log(advancedAmount,"AdvancedAmount");
    // console.log(securityAmount,"securityAmount");
    // console.log(RentAmount,"rentAmount");  
    // console.log(ElectricityBill,"ElectricityBill");
    // console.log(Firstpayment,"Firstpayment");

    // const data = advancedAmount > 0 ? (advancedAmount) :  Firstpayment > 0 ? (Number(Firstpayment) - Number(securityAmount)) :(RentAmount);
    // // console.log(data,"data");

    const all = advancedAmount > 0 ? (Number(advancedAmount) + Number(securityAmount)) : Firstpayment > 0 ? Firstpayment : (Number(RentAmount) + Number(ElectricityBill));

    // console.log(all, "TotalAmount");
    

    const rentAmount = Number(viewOneData.rentAmount);
    const totalAmount = Number(rentAmount + electricityBill);
    // console.log(rentAmount,"rentAmount");
    // console.log(electricityBill,"electricityBill");
    // console.log(totalAmount,"totalAmount");

    const advanceAmount = Number(viewOneData.AdvancedAmount);
    // console.log(advanceAmount, "advanceAmount");
    const SecurityAmount = Number(viewOneData.securityAmount);
    const totalAdvanceAmount = (advanceAmount + SecurityAmount)
    // console.log(totalAdvanceAmount);

    const [isSidebarOpen, setIsSidebarOpen] =  useState(window.innerWidth >= 700);
    const [getdata, setGetdata] = useState([]);
    // console.log(getdata, "66666666666666666666");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleButtonClick = () => {
        onClose();
        fetchData();
    };

    useEffect(() => {
        Data();
    }, []);

    const Data = async () => {
        try {
            const response = await fetch(
                dbConfig.backendBaseUrl + `main/students/StudenTranscition/${viewOneData._id}`,
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
                setGetdata(fetchedData.StudenTranscition);
                console.log(fetchedData);
            } else {
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const formatDate = (dateString) => {
        const months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const date = new Date(dateString);
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const paddedDay = day < 10 ? `0${day}` : day;
        const monthWithLeadingZero = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${monthName} (${paddedDay}/${monthWithLeadingZero}/${year})`;
    };



    const formatDate2 = (dateString) => {
        const months = [
            "January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"
        ];
        const date = new Date(dateString);
        const monthName = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const paddedDay = day < 10 ? `0${day}` : day;
        return `${day} ${monthName} ${year}/${formattedHours}:${formattedMinutes} ${ampm}`;
    };


    // const currentDate = new Date(); 
    // const currentYear = currentDate.getFullYear();
    // const currentMonth = currentDate.getMonth() + 1;
    // const formattedMonth = currentMonth < 10 ? `0${currentMonth}` : currentMonth;   
    // const firstDateOfMonth = `01/${formattedMonth}/${currentYear}`;  
    const currentDate = new Date();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = monthNames[currentMonthIndex];
    const formattedMonthIndex = currentMonthIndex < 9 ? `0${currentMonthIndex + 1}` : currentMonthIndex + 1;
    const firstDateOfMonth = `${currentMonthName} ${""}01/${formattedMonthIndex}/${currentYear}`;




    return (
        <>
            <div className="mainDivNAV">
                <div>
                    <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                </div>
                <div className="second-Div">
                    <div>
                        <SideBar
                            isSidebarOpen={isSidebarOpen}
                            toggleSidebar={toggleSidebar}
                            activePage="paymentHistory"
                        />
                    </div>
                    <div className="h-scree three">
                        <div className="NAMEandBUTTON">
                            <div className="NAMEandBUTTONLeft2">
                                <svg onClick={handleButtonClick}
                                    width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="38" height="38" rx="19" fill="#F4E2DE" />
                                    <path d="M10.2929 18.2929C9.90237 18.6834 9.90237 19.3166 10.2929 19.7071L16.6569 26.0711C17.0474 26.4616 17.6805 26.4616 18.0711 26.0711C18.4616 25.6805 18.4616 25.0474 18.0711 24.6569L12.4142 19L18.0711 13.3431C18.4616 12.9526 18.4616 12.3195 18.0711 11.9289C17.6805 11.5384 17.0474 11.5384 16.6569 11.9289L10.2929 18.2929ZM27 20C27.5523 20 28 19.5523 28 19C28 18.4477 27.5523 18 27 18V20ZM11 20H27V18H11V20Z" fill="#EE6C4E" />
                                </svg>

                                <h6>
                                    Student List
                                </h6>

                            </div>
                        </div>
                        <div className='HistoryOnePersonData'>
                            <div className='HistoryOnePerson '>
                                <div className='mt-3'>
                                    <img
                                        src="../public/cashpic.png"
                                        alt="done"
                                        width="60px"
                                        height="60px"
                                    />
                                </div>
                                <div className="HistoryOnePerson_text">
                                    <h5>{viewOneData.studentName}</h5>
                                    <h6>Mob No : {viewOneData.phoneNumber}</h6>
                                    <h6>Email ID: {viewOneData.email}</h6>
                                    <h6>Budling Assigned : {viewOneData.BuildingDetails.Building}</h6>
                                    {/* <div className="HistoryOnePerson_text_TextRECEIVED grid gap-1">
                                        <h6>Payment Status :</h6>
                                        <p className="" style={{ color: viewOneData.paymentStatus === 'Pending' ? '#F94242' : '#50AB41' }}>
                                            {viewOneData.paymentStatus}
                                        </p>
                                    </div> */}
                                </div>
                                {/* 
                                <div className='HistoryOnePerson_Reminder'>
                                    {viewOneData.paymentStatus === 'Pending' && (
                                        <div className="CHECKBOXofStudent mt-2">
                                            <svg className="" width="25" height="20" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_485_7828)">
                                                    <path d="M6.91909 2.31275C7.02013 2.31968 7.09468 2.32975 7.16922 2.32975C7.9381 2.33101 8.70697 2.32345 9.47522 2.33541C9.68408 2.33856 9.7463 2.2668 9.73028 2.06411C9.71611 1.88471 9.72289 1.70217 9.73336 1.52151C9.76786 0.937368 10.2256 0.501148 10.7973 0.500518C11.3697 0.500518 11.8287 0.93422 11.8601 1.52088C11.8755 1.80351 11.8718 2.06474 11.8662 2.348C11.8662 2.348 12.7552 2.33541 12.8267 2.33541C13.5568 2.33352 14.2881 2.31716 15.0169 2.34674C15.9139 2.38325 16.6378 3.15561 16.6477 4.07211C16.6606 5.24418 16.6507 6.41687 16.6532 7.58957C16.6532 7.774 16.5879 7.90241 16.3944 7.90493C16.1961 7.90745 16.1345 7.77085 16.1338 7.59083C16.1338 7.19741 16.1332 6.80399 16.1326 6.41058C16.1326 6.31805 16.1326 6.22551 16.1326 6.11536H0.521688C0.517376 6.20348 0.510599 6.28657 0.510599 6.37029C0.510599 8.91208 0.509367 11.4532 0.510599 13.995C0.510599 14.8473 1.03119 15.3773 1.86537 15.378C4.6094 15.3792 7.35405 15.378 10.0981 15.378C10.1751 15.378 10.2724 15.3509 10.3242 15.388C10.4135 15.4535 10.5219 15.5555 10.5306 15.6505C10.5373 15.7254 10.4154 15.8274 10.331 15.8891C10.2841 15.9237 10.1967 15.9048 10.1277 15.9048C7.36822 15.9048 4.60817 15.9073 1.84873 15.9042C0.916597 15.9029 0.229049 15.3584 0.0362148 14.4791C0.0128036 14.3727 0.00233023 14.2613 0.00233023 14.1518C0.000481982 10.7917 -0.00444668 7.4322 0.00541065 4.07211C0.00787498 3.2324 0.601779 2.53307 1.40207 2.36626C1.55116 2.33541 1.70765 2.33227 1.86105 2.33101C2.48391 2.32723 3.10616 2.32975 3.72902 2.32912C3.8855 2.32912 4.76095 2.39206 4.76712 2.29513C4.7856 1.99739 4.76096 1.69462 4.80285 1.40128C4.88664 0.821546 5.3795 0.455826 5.96663 0.504295C6.48784 0.547099 6.90492 1.01164 6.91786 1.56872C6.92341 1.81044 6.91909 2.05278 6.91909 2.31275ZM11.3512 2.52803C11.3512 2.23722 11.3549 1.9464 11.3506 1.65622C11.345 1.28546 11.1214 1.03368 10.8004 1.02738C10.485 1.02172 10.2478 1.27854 10.2441 1.64804C10.2385 2.23722 10.2385 2.8264 10.2441 3.41558C10.2478 3.78444 10.4881 4.04064 10.8035 4.03182C11.1257 4.02301 11.3444 3.77311 11.35 3.39984C11.3543 3.10903 11.3506 2.81821 11.3506 2.52803H11.3512ZM5.30249 2.52551C5.30249 2.83143 5.2988 3.13798 5.30372 3.4439C5.30865 3.77311 5.51935 4.01042 5.81507 4.03057C6.11757 4.05134 6.37941 3.82914 6.38865 3.48797C6.40713 2.85283 6.40713 2.21644 6.39049 1.58131C6.38125 1.23825 6.12558 1.0129 5.82431 1.02801C5.52243 1.04249 5.30742 1.28798 5.30311 1.63041C5.29941 1.92878 5.30249 2.22714 5.30311 2.52488L5.30249 2.52551Z" fill="#EE6C4E" />
                                                    <path d="M16.8166 15.907C16.4722 17.0445 15.9547 17.5115 15.0743 17.5002C14.2346 17.4895 13.6924 16.9802 13.4029 15.9057C12.9679 15.9057 12.5237 15.9139 12.0802 15.9039C11.4906 15.89 11.1166 15.3789 11.2447 14.7878C11.3057 14.5071 11.4339 14.2628 11.6637 14.1048C12.1492 13.7706 12.3192 13.3016 12.3032 12.7263C12.2909 12.3021 12.3081 11.8765 12.3001 11.4516C12.2841 10.5628 12.6716 9.89938 13.3715 9.40651C13.4596 9.34419 13.5495 9.27495 13.6487 9.2397C14.0005 9.11443 14.2334 8.89727 14.364 8.52147C14.4755 8.20108 14.7749 8.0947 15.0965 8.09092C15.4267 8.08714 15.7323 8.19038 15.8537 8.51959C15.9861 8.87901 16.2196 9.06345 16.5449 9.23214C17.4561 9.7055 17.9527 10.4621 17.9188 11.5448C17.9034 12.032 17.9237 12.5198 17.9305 13.0077C17.9366 13.4307 18.1153 13.7637 18.448 14.0104C18.7265 14.2169 18.9193 14.4781 18.984 14.8319C19.0856 15.3871 18.7135 15.8793 18.1627 15.9039C17.9403 15.9133 17.7173 15.907 17.4943 15.907C17.2719 15.907 17.0495 15.907 16.8178 15.907H16.8166ZM15.1039 15.3669V15.3638C15.6725 15.3638 16.2406 15.3638 16.8092 15.3638C17.2392 15.3638 17.6699 15.3682 18.0999 15.3613C18.3747 15.3569 18.5151 15.2058 18.44 14.9383C18.3913 14.7639 18.2687 14.5858 18.1313 14.4668C17.636 14.0369 17.3791 13.5056 17.384 12.8402C17.3871 12.4078 17.384 11.9754 17.384 11.5429C17.3834 10.5597 16.9971 9.92959 16.0976 9.58087C15.7508 9.44679 15.5444 9.24977 15.4434 8.90293C15.3947 8.73486 15.2838 8.63667 15.1076 8.63352C14.9277 8.63037 14.8186 8.73298 14.7724 8.90041C14.6726 9.26173 14.4465 9.44994 14.0966 9.5859C13.2242 9.92456 12.833 10.5622 12.8324 11.5152C12.8324 11.9477 12.8287 12.3801 12.8324 12.8125C12.8392 13.4949 12.5884 14.0488 12.0635 14.4737C11.9865 14.536 11.8861 14.6065 11.8621 14.6921C11.8159 14.8564 11.7653 15.0541 11.8171 15.2007C11.8491 15.2914 12.0654 15.3581 12.2003 15.36C13.1682 15.3732 14.136 15.3669 15.1039 15.3669ZM14.006 15.9561C14.083 16.5591 14.5599 16.9513 15.1612 16.9337C15.7077 16.9173 16.1716 16.4886 16.203 15.9561H14.006Z" fill="#EE6C4E" />
                                                    <path d="M5.35992 11.9602C5.35992 11.8501 5.35869 11.7399 5.35992 11.6298C5.3667 11.1205 5.70062 10.7227 6.19841 10.673C6.47996 10.6446 6.76829 10.6459 7.04984 10.6742C7.47863 10.7177 7.80639 11.0167 7.85444 11.4541C7.8951 11.8243 7.89018 12.2095 7.83719 12.5784C7.7762 13.0039 7.40347 13.2827 6.98269 13.2928C6.75227 13.2985 6.52186 13.2972 6.29144 13.2941C5.75422 13.2859 5.36855 12.8887 5.36054 12.3373C5.35869 12.2114 5.36054 12.0855 5.36054 11.9596L5.35992 11.9602ZM7.34371 11.9917C7.34371 11.8897 7.34494 11.7871 7.34371 11.6852C7.33817 11.3478 7.21248 11.2181 6.88103 11.2131C6.69682 11.2099 6.51261 11.2086 6.32841 11.2131C6.03761 11.2206 5.90454 11.3515 5.89591 11.6442C5.88914 11.8639 5.89037 12.0842 5.8953 12.3039C5.90269 12.6124 6.03084 12.7427 6.33457 12.7559C6.41897 12.7596 6.50337 12.7571 6.58778 12.7578C7.31414 12.7578 7.34371 12.7275 7.34371 11.9911V11.9917Z" fill="#EE6C4E" />
                                                    <path d="M3.14942 13.2832C2.98061 13.2832 2.80811 13.3071 2.64361 13.2788C2.22652 13.2058 1.91848 12.8212 1.9037 12.3761C1.89569 12.1325 1.89938 11.8889 1.90246 11.6453C1.90801 11.1537 2.19387 10.7634 2.66271 10.6961C2.99232 10.6489 3.33917 10.6495 3.66939 10.698C4.1296 10.7647 4.41608 11.1512 4.42471 11.6264C4.42902 11.8625 4.4284 12.0979 4.42471 12.3339C4.41608 12.8948 4.02487 13.2882 3.47224 13.2958C3.36443 13.297 3.25723 13.2958 3.14942 13.2958C3.14942 13.292 3.14942 13.2876 3.14942 13.2838V13.2832ZM3.88933 11.9877C3.88933 11.87 3.89364 11.7517 3.88872 11.634C3.87639 11.3558 3.74394 11.2217 3.46793 11.2135C3.26093 11.2078 3.05331 11.2072 2.8463 11.2141C2.58447 11.2236 2.45078 11.3583 2.44154 11.6239C2.43414 11.836 2.43722 12.0482 2.43907 12.2603C2.44277 12.6241 2.5666 12.7494 2.92947 12.7563C2.99848 12.7576 3.06748 12.7563 3.13648 12.7563C3.8573 12.7563 3.89056 12.723 3.88933 11.9859V11.9877Z" fill="#EE6C4E" />
                                                    <path d="M6.59825 7.09875C7.62033 7.01566 7.95055 7.5954 7.88463 8.38412C7.86615 8.60254 7.88648 8.82978 7.83349 9.03813C7.73677 9.42148 7.47863 9.66886 7.08803 9.706C6.77691 9.73558 6.4584 9.73495 6.14666 9.706C5.71109 9.66571 5.3784 9.27733 5.36239 8.82915C5.35376 8.58555 5.35869 8.34194 5.35992 8.09771C5.363 7.50727 5.72279 7.12456 6.29822 7.09938C6.40541 7.09434 6.51323 7.09875 6.59825 7.09875ZM7.34371 8.41559C7.34371 8.30543 7.34617 8.19528 7.34371 8.08575C7.3357 7.79494 7.20139 7.64764 6.92231 7.63757C6.7153 7.63002 6.50768 7.62939 6.30068 7.63883C6.04254 7.65016 5.907 7.79116 5.89776 8.05554C5.88975 8.2834 5.89098 8.51127 5.89653 8.73914C5.90392 9.04443 6.03946 9.1785 6.34011 9.18795C6.42451 9.19046 6.50892 9.18858 6.59332 9.18858C7.30736 9.18858 7.34432 9.15018 7.34432 8.41622L7.34371 8.41559Z" fill="#EE6C4E" />
                                                    <path d="M4.44257 8.40444C4.42348 8.61469 4.43087 8.83185 4.37912 9.03328C4.2787 9.42796 4.01378 9.67156 3.61394 9.70933C3.31761 9.73702 3.01511 9.73765 2.71877 9.71059C2.25733 9.66841 1.92156 9.2857 1.90431 8.81045C1.89446 8.54356 1.89384 8.2754 1.90431 8.00914C1.92403 7.51627 2.28505 7.13733 2.76929 7.10774C3.02928 7.09201 3.29173 7.09138 3.55172 7.10774C4.05629 7.13859 4.41239 7.53011 4.42471 8.05068C4.42779 8.16839 4.42471 8.28673 4.42471 8.40444C4.43025 8.40444 4.43641 8.4057 4.44196 8.40633L4.44257 8.40444ZM2.43846 8.41829C2.43846 8.51271 2.43722 8.60713 2.43846 8.70155C2.444 9.04776 2.57646 9.18309 2.91654 9.1875C3.10075 9.19002 3.28557 9.19317 3.46978 9.18624C3.74086 9.17554 3.87886 9.03517 3.8881 8.75946C3.89549 8.5316 3.89488 8.3031 3.8881 8.07523C3.88071 7.7882 3.74024 7.64845 3.45746 7.63587C3.37305 7.63209 3.28865 7.63461 3.20425 7.63461C2.47296 7.63461 2.43846 7.66923 2.43907 8.41766L2.43846 8.41829Z" fill="#EE6C4E" />
                                                    <path d="M10.0699 13.2878C9.90847 13.2878 9.7452 13.3048 9.58687 13.2846C9.17163 13.2305 8.83402 12.8421 8.82046 12.4109C8.81245 12.1516 8.81615 11.8923 8.81862 11.6329C8.82354 11.1268 9.1359 10.7378 9.62815 10.6786C9.92325 10.6434 10.2288 10.6447 10.5239 10.6799C10.9724 10.7328 11.2774 11.057 11.323 11.5215C11.3526 11.8249 11.355 12.1365 11.3242 12.4393C11.27 12.9705 10.8967 13.2897 10.3699 13.2953C10.2701 13.2966 10.1703 13.2953 10.0705 13.2953C10.0705 13.2928 10.0705 13.2903 10.0705 13.2884L10.0699 13.2878ZM10.7999 11.9955C10.7999 11.8778 10.803 11.7594 10.7993 11.6417C10.7901 11.3641 10.6558 11.2257 10.3853 11.2137C10.3009 11.2099 10.2165 11.2124 10.1321 11.2118C9.36323 11.2118 9.34105 11.2345 9.34105 12.0175C9.34105 12.7036 9.39404 12.7578 10.0613 12.7578C10.763 12.7578 10.8006 12.7187 10.7999 11.9955Z" fill="#EE6C4E" />
                                                    <path d="M10.0477 7.09952C11.0599 7.01895 11.3476 7.57666 11.3526 8.39182C11.3581 9.3228 11.0143 9.80434 10.0298 9.73384C9.86164 9.72188 9.69037 9.7288 9.52526 9.69796C9.14513 9.62683 8.83463 9.24663 8.82046 8.84378C8.81183 8.59262 8.81615 8.34083 8.81799 8.08904C8.82169 7.50994 9.17532 7.12848 9.73781 7.09952C9.8524 7.09386 9.96822 7.09889 10.0483 7.09889L10.0477 7.09952ZM10.7999 8.42581C10.7999 8.3081 10.803 8.18976 10.7993 8.07205C10.7907 7.79949 10.6515 7.65282 10.3865 7.63709C10.3021 7.63205 10.2177 7.6352 10.1333 7.6352C9.37308 7.6352 9.34105 7.6673 9.34105 8.44469C9.34105 9.12892 9.39834 9.18746 10.06 9.18746C10.7568 9.18746 10.8005 9.14214 10.7999 8.42518V8.42581Z" fill="#EE6C4E" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_485_7828">
                                                        <rect width="19" height="17" fill="white" transform="translate(0 0.5)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <p>Send Reminder</p>
                                        </div>
                                    )}
                                </div> */}
                            </div>

                            <div className='HistoryOnePersonALLtran mt-4'>
                                <h5>Previous Months</h5>

                                {viewOneData.paymentStatus === "Pending" || viewOneData.CashTaken === "Manager" ? (
                                    <div className='HistoryOnePersonALLtranDiv'>
                                        <div className='HistoryOnePersonALLtranDivMonth'>{firstDateOfMonth}</div>
                                        <div className='HistoryOnePersonALLtranDivDetail'>Payment status :  Pending</div>
                                        <div className='HistoryOnePersonALLtranDivDetail'>Amount : ₹ {Number(all).toFixed(2)}</div>
                                        {/* {(Number(filteredItem.totalAmount).toFixed(2))} */}
                                    </div>
                                ) :
                                    (<></>)}

                                {getdata
                                    .filter(filteredItem => filteredItem.PaymentStatus === "Recived")
                                    .reverse() // Reverse the array
                                    .map((filteredItem, index) => (
                                        viewOneData.CashTaken === "Manager" ? (<></>) : (
                                            <div key={index} className='HistoryOnePersonALLtranDiv'>
                                                <div className='HistoryOnePersonALLtranDivMonth'>{formatDate(filteredItem.Desposit_Date)}</div>
                                                {filteredItem.Payment_mode === "Cash" ? <></> :
                                                    <div className='HistoryOnePersonALLtranDivDetail'>Transaction ID : {filteredItem.TransactionID}</div>
                                                }
                                                <div className='HistoryOnePersonALLtranDivDetail'>Date and Time : {formatDate2(filteredItem.Desposit_Date)}</div>
                                                <div className='HistoryOnePersonALLtranDivDetail'>Payment status : {filteredItem.PaymentStatus}</div>

                                                <div className='HistoryOnePersonALLtranDivDetail'>Amount : ₹ {Number(filteredItem.totalAmount).toFixed(2)}</div>
                                                <div className='HistoryOnePersonALLtranDivDetail'>Payment Mode: : {filteredItem.Payment_mode}</div>
                                            </div>
                                        )
                                    ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default HistoryOne
