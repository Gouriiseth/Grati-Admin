import React, { useState } from 'react'
import ProfileDets from './profile_details/profile_details'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GenericModal from '../../GenericModal';
import LogoutPage from './logoutPage';
// import { authActions } from '../../redux/reducers/auth';
// import Profile_details from './profile_details/profile_details';
// import Delete from '../Dashboard/user_management/delete';
// import UserBlock from '../Dashboard/user_management/block';
// import UserUnblock from '../Dashboard/user_management/unblock';
// import DeleteReview from '../Dashboard/review_management/deleteReview';
// import DeleteQuery from '../Dashboard/grati_support/deleteQuery';
// import DeleteAdmin from '../Dashboard/manage_admins/deleteAdmin';
// import DeleteSuccess from '../Dashboard/user_management/deleteSuccess';
// import BlockSuccess from '../Dashboard/user_management/blockSuccess';
// import UnBlockSuccess from '../Dashboard/user_management/unBlockSuccess';
// import ReviewDeleted from '../Dashboard/review_management/reviewDeleted';
// import DeleteAdminSuccess from '../Dashboard/manage_admins/deleteSuccess';
// import UserView from '../Dashboard/user_management/userView';
// import ViewTransaction from '../Dashboard/finance_management/viewTransaction';
// import ManageView from '../Dashboard/manage_admins/manageView';
// import ManageEdit from '../Dashboard/manage_admins/manageEdit';
// import ViewReview from '../Dashboard/review_management/viewReview';

const ProfilePopUp = ({ setProfilePopupOpen,handleClosee}) => {

    // const handlePopOver = () => {
    //     setProfilePopupOpen(isProfilePopupOpen => !isProfilePopupOpen);
    // }
    const [isProfileDetspOpen, setIsProfileDetsOpen] = useState(false);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    let title = ["Profile", "Edit Details"]
    const dispatch=useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        // setProfilePopupOpen(true)
        setIsModalOpen(true);
    };
    
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    // console.log(isModalOpen);
    
    const handleClick = (e) => {
        // handleClosee()
        setProfilePopupOpen(false)
        // console.log(setProfilePopupOpen);
        handleOpenModal();
        // handlePopOver();
        setIsProfileDetsOpen(!isProfileDetspOpen);
        setIsLogoutOpen(false)
        console.log(e,"eeeeee")
    };

    const navigate = useNavigate();

    const handleLogout = (e) => {
        // localStorage.clear();
        // sessionStorage.clear();
        // dispatch(authActions.logout());
        // if(localStorage.getItem("token")==null)
        //     navigate("/");
        handleOpenModal();
        setIsLogoutOpen(!isLogoutOpen)
        setIsProfileDetsOpen(false)
    }

    // const handleClose = () => {
    //     setIsProfileDetsOpen(false);
    // }
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
   

  return (
    //   <div className="w-[233px] h-fit p-3 pl-5 bg-white rounded-[5px] shadow flex-col justify-start items-start gap-2.5 inline-flex  absolute mt-[45px] z-10">
    //           <div className="w-[209px] h-[0px] border border-zinc-100"></div>
    //           <div className="flex-col justify-start items-start gap-3 flex">
    //               <div className="text-neutral-800 text-sm font-medium font-['Inter']"><button onClick={handleClick}>My Account</button></div>
    //               <div className="text-neutral-800 text-sm font-medium font-['Inter'] leading-tight">Logout</div>
    //           </div>
    //       {/* </div> */}
    //       { isProfileDetspOpen && <ProfileDets onClose={handleClose} />}
    //   </div>
      <div className="w-[233px] h-fit p-5 bg-white rounded-[5px] flex flex-col gap-2.5">
          <div className="flex-col justify-start items-start gap-3 flex">
              <div className="text-neutral-800 text-sm font-medium font-['Inter']"><button onClick={handleClick}>My Account</button></div>
              <div className="text-neutral-800 text-sm font-medium font-['Inter']"><button onClick={handleLogout}>Logout</button></div>
          </div>
          {/* {isProfileDetspOpen && <ProfileDets />} */}
          {/* {isProfileDetspOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<ViewReview />} isCross={true} title={title[1]} width="631px" height="758px" />} */}
          {/* {isProfileDetspOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<ManageView />} isCross={true} title={title[1]} width="631px" height="474px" />} */}

          {isProfileDetspOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<ProfileDets />} isCross={true} title={title[0]} width="738px" height="auto" />}
          {isLogoutOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<LogoutPage setIsModalOpen={setIsModalOpen} />} />}


          {/* {isLogoutOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<DeleteAdmin />} isCross={true}/>} */}

          {/* {isLogoutOpen && <GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<UserView />} isCross={false} width={"251px"} height={"154px"} />} */}


      </div>


)
}

export default ProfilePopUp