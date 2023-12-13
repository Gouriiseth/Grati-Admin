import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Circle from "../../../../Assets/images/icons/tick-circle.png";
import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import { TextField } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import "./viewReview.css";
import { grey } from "@mui/material/colors";
import GenericModal from "../../../GenericModal";
import EditReview from "./editReview";
import DeleteReview from "./deleteReview";

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "absolute",
  transform: "translate(-50%, -50%)",
  bgcolor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  width: "556px",
  maxHeight: "180px",
  // wordWrap:"break-word"
}));

const ViewReview = ({setIsModal, setIsView, setIsOpenModal}, isView) => {
  const CHARACTER_LIMIT = 250;
  const [values, setValues] = useState({
    name: "Hello",
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

    const [isEdit, setIsEdit] = useState(false);
    const [isDel, setIsDel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsDel(!isDel)
        setIsEdit(!isEdit)
    };
console.log(isDel,isEdit);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsDel(!isDel)
        setIsEdit(!isEdit)
    };

    const handleClick = () => {
        // handlePopOver();
        handleOpenModal();
        setIsEdit(!isEdit);
        setIsDel(false)
        console.log(!isView);
        
        // setIsLogoutOpen(false)
        // console.log(e, "eeeeee")
    };

    const handleDelete=()=>{
        handleOpenModal();
        setIsDel(!isDel)
        setIsEdit(false)
        // setIsView(!isView)
    }
    const title = ["Review Details"]
  return (
    <div className="h-[401px] w-[583px] flex flex-col gap-6 font-semibold">
      <div className="h-[35px] w-[138px] flex gap-[12px]">
        <img src={Circle} alt="" className="w-7 h-[35px]" />
        <p
          className="w-[98px] h-[24px] text-black text-[20px] font-bold self-center"
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            lineHeight: "24px",
          }}
        >
          Celebrate
        </p>
      </div>

      <div className="w-[583px] h-[260px] flex flex-col gap-2">
        <p
          className="w-[56px] h-[24px] text-black text-[16px] font-semi-bold "
          style={{
            fontFamily: "Plus Jakarta Sans,sans-serif",
            lineHeight: "24px",
          }}
        >
          Review
        </p>
        <div className="w-[583px] h-[204px] rounded-1 bg-[#EEEEEE] p-[12px] flex flex-col gap-[10px]">
          <TextField
            inputProps={{
              maxLength: CHARACTER_LIMIT,
              style: {
                maxHeight: "180px",
                overflow: "auto",
                height: "160px",
                fontFamily: "Plus Jakarta Sans,sans-serif",
                lineHeight: "20px",
                fontWeight: "500",
                fontStyle: "italic",
                fontSize: "14px",
                color: "#888888",
              },
            }}
            multiline
            value={values.name}
            // helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
            onChange={handleChange("name")}
            margin="normal"
            // variant='outlined'
            // max-height="200px"
            className="w-full max-h-[180px] "
            style={{ margin: "0px" }}
          />
        </div>
        <div className="flex justify-end w-[583px] h-5 ">
          <FormHelperText
            className="h-[20px] w-fit"
            style={{
              maxHeight: "180px",
              overflow: "auto",
              height: "160px",
              fontFamily: "Plus Jakarta Sans,sans-serif",
              lineHeight: "20px",
              fontWeight: "500",
              fontStyle: "italic",
              fontSize: "14px",
              color: "#888888",
            }}
          >{`${values.name.length}/${CHARACTER_LIMIT}`}</FormHelperText>
        </div>

        <div className="w-[545px] h-[58px] flex gap-9">
          <div className="w-[260px] h-[58px] flex flex-col gap-1">
            <p
              className="w-fit h-6 text-black text-[20px] font-semi-bold "
              style={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                lineHeight: "24px",
              }}
            >
              Give Thanks
            </p>
            <div className="w-[125px] h-[30px] flex gap-1">
              <img
                src={Circle}
                alt=""
                className="w-[30px] h-[30px] border-2 border-[#524CBB] rounded-full"
              />
              <p
                className="w-fit h-5 text-black text-[14px] font-medium self-center"
                style={{
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  lineHeight: "20px",
                }}
              >
                Giring Furqon
              </p>
            </div>
          </div>

          <div className="w-[260px] h-[58px] flex flex-col gap-1">
            <p
              className="w-fit h-6 text-black text-[20px] font-semi-bold "
              style={{
                fontFamily: "Plus Jakarta Sans,sans-serif",
                lineHeight: "24px",
              }}
            >
              Give Thanks
            </p>
            <div className="w-[125px] h-[30px] flex gap-1">
              <img
                src={Circle}
                alt=""
                className="w-[30px] h-[30px] border-2 border-[#524CBB] rounded-full"
              />
              <p
                className="w-fit h-5 text-black text-[14px] font-medium self-center"
                style={{
                  fontFamily: "Plus Jakarta Sans,sans-serif",
                  lineHeight: "20px",
                }}
              >
                Giring Furqon
              </p>
            </div>
          </div>
        </div>

              <div className="w-[232px] h-[45px] flex gap-[12px] mt-[45px] m-auto">
                  <button className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#EEEEEE] text-[#888888] text-4 font-bold"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }} onClick={handleDelete}>Delete</button>
                  <button className="w-[110px] rounded-[6px] py-[10px] px-4 bg-[#524CBB] text-white text-4 font-bold"
                      style={{ fontFamily: "Plus Jakarta Sans,sans-serif" }} onClick={handleClick}>Edit</button>
    </div>
                      </div>

          {isEdit &&<GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<EditReview setIsModal={setIsModal} setIsOpenModal={setIsModalOpen}/>} isCross={true} title={title[0]} width="631px" height="604px" />}
          {isDel &&<GenericModal open={isModalOpen} handleClose={handleCloseModal} content={<DeleteReview setisDelete={setIsDel} isDelete={isDel} setIsOpenModal={setIsModalOpen}/>} isCross={true} title={title[0]} width="391px" height="338px" />}
                      </div>
  );
};

export default ViewReview;
