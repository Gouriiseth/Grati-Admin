import React from 'react'
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';
import cross_icon from '../Assets/images/icons/cross_icon.png'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const GenericModal = ({ open, handleClose, title, content, isCross, width, height }) => {
    // const [open, setOpen] = React.useState(true);
    // const handleClose = () => setOpen(false);

  return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Paper sx={style} className='font-semibold h-auto p-6 flex flex-col gap-5' style={{"width":width, "height":height}}>
              {isCross &&
                <div className={`flex flex-row justify-between ${title&&"items-center"}`}>
                    <p className="text-5 m-auto" style={{fontSize:"20px", fontWeight:"700",fontFamily:"inherit"}}>{title}</p>
                    {!title && content}
                    <img src={cross_icon} alt="" className='cursor-pointer w-[14px] h-[14px]' onClick={handleClose}></img>
                </div>
                }
              {title && content }
              {!isCross && content}
          </Paper>
      </Modal>
  )
}

export default GenericModal