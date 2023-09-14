import React from 'react'
import ModalPopup from '../../../../customComponents/customModals/CustomModal'
import "./Modal.css"
import CustomButton from '../../../../customComponents/button/customButton'
const TimeWarningModal = ({ModalData}) => {
  return (
   
        <ModalPopup isFooter={false} width={"100%"}  >
            <div className='max-w-450 w-100 bg-white text-center py-5 pt-4 px-4'>
                      {ModalData?.icon}
                   <h3>{ModalData?.heading}</h3>
             <p className='my-1 mb-2'>{ModalData?.paragraph} </p>
             <CustomButton func={()=>ModalData?.onClick("hellp")} background={"#0B1C30"} title={ModalData?.buttonText} style={{marginInline:"auto",maxWidth:"170px",marginTop:"15px"}} />
            </div>
        </ModalPopup>
    
  )
}

export default TimeWarningModal