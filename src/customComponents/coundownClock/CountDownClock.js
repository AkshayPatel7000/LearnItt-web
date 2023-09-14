import { useEffect, useRef, useState } from 'react';

 const CountDownClock = ({time, setState}) => {
    
    const Ref = useRef(null);
    const [timer, setTimer] = useState('00:00:00');
    /* eslint-disable */
    // console.log(timer)
    useEffect(() => {
        const today = new Date()
        var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let t1 = currentTime.split(":");
        t1 = t1[0] + t1[1] + t1[2];
        let t2 = time?.slice(11)?.split(":");
        // console.log("first-useEffect-first",currentTime,t2)
        if (t2) {
            t2 = t2[0] + t2[1] + t2[2];
            let diff = t2 - t1;
            // console.log("first-useEffect",diff,t2,t1)
            if (diff > 0) {
                
                clearTimer();
            }
        }
        return () => {
            clearInterval(Ref.current)
        }
    }, []);

    useEffect(() => {
    
        setState && setState(timer)
        // if (timer === '00:00:00') {
        //     setState && setState(false)
        // }
        // else{
        //     setState && setState(true)
        // }
        
    }, [timer])

    const clearTimer = (e) => {
        setTimer('00:00:00');
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(time);
        //    console.log("first",time)
        }, 1000)
        Ref.current = id;
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } = getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    // const getDeadTime = () => {
    //     let deadline = new Date();
    //     deadline.setSeconds(deadline.getSeconds());
    //     return deadline;
    // }

    // const onClickReset = () => {
    //     clearTimer(getDeadTime());
    // }

    // return (
    //     <div className="App">
    //         <label style={{ fontWeight: 600, fontSize: "14px", color: ThemeColors.purple }}>{timer}</label>
    //         {/* <button onClick={onClickReset}>Reset</button> */}
    //     </div>
    // )
    return timer
    // return <PriceText text={timer} />
}

export default CountDownClock