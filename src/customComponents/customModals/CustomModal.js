import React, { useEffect, useRef } from "react";
import { ThemeColors } from "../../theme/theme";
import CustomButton from "../button/customButton";
import "./modal.css";
import { CrossBlueIcon } from "../../assets/svg";
const ModalPopup = ({
  CloseModalFunc,
  children,
  submitFunc,
  submitBtn,
  submitBtnSize,
  closeBtn = true,
  closeBtnSize = "122px",
  maxModalWidth = "560px",
  width,
  wrap,
  backgroundColor,
  me = "",
  isFooter = true,
  closeCrossbtn = false,
  closeCrossbtnfunc
}) => {

  const modalRef = useRef();
  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        CloseModalFunc();
      }
    }
    const listener = (event) => {
      if (!modalRef.current || modalRef.current.contains(event.target)) {
        return;
      }
      CloseModalFunc();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    //For click outside
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);

      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [CloseModalFunc]);

  return (
    <div className="modal__backdrop">
      <div className="modal__container rounded-3 position-relative" ref={modalRef} style={{ maxWidth: maxModalWidth, width: width }} >
        {closeCrossbtn && <div style={{float:"right"}} onClick={closeCrossbtnfunc} ><CrossBlueIcon /></div>}
        {children}
        {isFooter && <div className={`modal-footer mt-4 gap-3 mb-3 ${me}`} style={{ flexWrap: wrap }}>
          {submitBtn && (
            <CustomButton title={submitBtn} func={submitFunc} width={submitBtnSize} background={backgroundColor} />
          )}
          {closeBtn && (
            <CustomButton
              title="Cancel"
              func={CloseModalFunc}
              background={ThemeColors.secondary}
              width={closeBtnSize}
            />
          )}
        </div>}
      </div>
    </div>
  );
};
export default ModalPopup;
