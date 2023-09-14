import React, { forwardRef, useEffect, } from "react";
import QuestionStore from "../../mobx/question";

const Timer = forwardRef(function (props, ref) {
  const dateCreated = props.remainingTime;
  const currentDate = new Date().getTime();
  const setDueDate = new Date(dateCreated);
  setDueDate.setDate(setDueDate.getDate());
  const dueDate = setDueDate.getTime();

  useEffect(() => {

    if (props?.isActive && props?.isPaused === false) {
      ref.current = setInterval(() => {
        if (props?.newDiff === 0) {
          return clearInterval(ref.current);
          // return toast.error(`Time Over`)
        }


        props.setNewDiff(prevState => prevState - 1000)
        props.setTimerInfo(`${("0" + Math.floor((props.newDiff / 3600000) % 60)).slice(-2)}:${("0" + Math.floor((props.newDiff / 60000) % 60)).slice(-2)}:${("0" + Math.floor((props.newDiff / 1000) % 60)).slice(-2)}`)
        QuestionStore.setRemainingDuration(`${("0" + Math.floor((props.newDiff / 3600000) % 60)).slice(-2)}:${("0" + Math.floor((props.newDiff / 60000) % 60)).slice(-2)}:${("0" + Math.floor((props.newDiff / 1000) % 60)).slice(-2)}`)
       
      }, 1000);
    }
    else {
      clearInterval(ref.current);
    }

    // clears interval while unmounting the component.
    return () =>{ 
        
        clearInterval(ref.current);
    }
  }, [currentDate, dueDate, props, ref, props?.isPaused]);

  return (

    <div>
      <span className="digits">
        {("0" + Math.floor((props.newDiff / 3600000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.newDiff / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((props.newDiff / 1000) % 60)).slice(-2)}
      </span>
      {/* <span className="digits mili-sec">
        {("0" + ((props.newDiff / 10) % 100)).slice(-2)}
      </span> */}
    </div>
  );
})
export default Timer