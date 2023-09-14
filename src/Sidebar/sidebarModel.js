import { useEffect, useRef } from "react";
import "./Sidebarmodal.css";
const SidebarModalPopup = ({
  CloseModalFunc,
  children,
  onfun,
  maxModalWidth = "560px",
  width,
}) => {
  /* eslint-disable */
  const modalRef = useRef();
  useEffect(() => {
    const listener = (event) => {
      if (!modalRef.current || modalRef.current.contains(event.target)) {
        return;
      }
      onfun();
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", listener);
    return () => {
      document.body.style.overflow = "visible";

      document.removeEventListener("mousedown", listener);
    };
  }, [CloseModalFunc]);

  return (
    <div className="modal__backdrop1">
      <div style={{ height: "100%" }}>
        <div
          className="modal__container1 rounded-4 position-relative"
          ref={modalRef}
          style={{ maxWidth: maxModalWidth, width: width }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export default SidebarModalPopup;
