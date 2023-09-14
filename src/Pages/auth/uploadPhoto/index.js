import React from "react";
import { Upload } from "./upload";
import img from "../../../assets/images/Group 33630.png";

export default function UploadPage() {

 const divCenter ={
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width:'100%',
  height:'90vh',
}
   return (
    <div className="outerflex">
      <div className="left-flex">
        <div className="container" style={divCenter}>
          <Upload />
        </div>
      </div> 
      <img src={img} alt="" className="right-flex"/>
    </div>
  );
}
