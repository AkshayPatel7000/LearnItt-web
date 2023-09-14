import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import CustomDropdown from '../../customComponents/customDropdown/customDropdown'
import AuthStore from '../../mobx/auth'
import StudentStore from '../../mobx/student'
import AuthServices from '../../services/AuthService'
const myStyle = { border: "1px solid #132D4B", color: "#4FA4F4 !important" }

const InstituteDropdown = () => {
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        StudentStore.setInstituteList([{ text: AuthStore.user.user.instituteName }])
        getInstitute()
        // if (AuthStore.user.user.instituteName !== "Other") {
        // }
        setToggle(true)
    }, [])
    const getInstitute = async () => {
        let res = await AuthServices.getUserInstitute();
        if (res.isSuccess) {
            let temp = res.data.studentInstitutes.map((data) => {
                return {
                    text: data.instituteName,
                    ...data
                }
            })
            StudentStore.setInstituteList(temp)
        }
    }
    const handleInstitute = (data) => {
        let key = JSON.parse(localStorage.getItem("key"))
        key.user.instituteId = data.institueId
        key.user.instituteName = data.instituteName
        AuthStore.setUser(key)
        localStorage.setItem("key", JSON.stringify(key));
        // navigate(RouteConstant.dashboard)
        window.location.reload();
        // if (data.text === "Other") {
        // }
        // else {

        // }

    }

    if (!toggle) return <></>
    return (
        <div className='py-4'>
            <CustomDropdown menu={StudentStore.instituteList} selectedValues={StudentStore.instituteList[0]} func={handleInstitute} background={"transparent"} customStyle={myStyle} />
        </div>

    )
}

export default observer(InstituteDropdown)
