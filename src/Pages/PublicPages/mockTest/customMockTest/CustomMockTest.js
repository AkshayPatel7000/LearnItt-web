import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomButton from '../../../../customComponents/button/customButton'
import CustomInput from '../../../../customComponents/customTextInput'
import Dropdown from '../../../../customComponents/dropdown/dropdown'
import { Heading14600, TileHeading } from "../../../../customComponents/DynamicText/Heading"
import { HeadTitle } from '../../../../customComponents/headTitle/headTitle'
import AuthStore from '../../../../mobx/auth'
import MockTestData from '../../../../services/MockTestService'
import StudentDetail from '../../../../services/StudentService'
import { ThemeColors } from '../../../../theme/theme'
import { AllLevels, Languages, RouteConstant } from '../../../../utils/routes/constant'

const CustomMockTest = () => {
    const navigate = useNavigate();
    const [subjects, setSubjects] = useState([])
    const [payload, setPayload] = useState({ subCourseId: AuthStore?.user?.user?.subcourseId, instituteId: AuthStore?.user?.user?.instituteId })

    useEffect(() => {
        getSubjects()
    }, []);

    const getSubjects = async () => {
        const res = await StudentDetail.getSubjectByMaster({ subCourseId: AuthStore?.user?.user?.subcourseId });
        if (res?.isSuccess) {
            let subjectList = res?.data?.subjects?.map((elm) => {
                return {
                    id: elm?.id,
                    Title: elm?.subjectName,
                };
            });
            setSubjects(subjectList)
        }
    }

    const setInputValue = (data, name) => {
        setPayload({ ...payload, [name]: data?.id })
    }

    const generateMockTest = async () => {
        const res = await MockTestData.generateCustomMock(payload)
        if (res.isSuccess) {
            navigate(RouteConstant.customMock, { state: { type: 2 }, })
            toast.success(res?.messages)
        }
        else {
            toast.error(res?.messages)
        }
    }

    return (
        <div>
            <HeadTitle text="Create Mock Test" />
            <div className="card rounded-0 border-0 p-3 d-flex flex-column justify-content-between" style={{ height: "80vh" }}>
                <div>
                    <TileHeading text="Create your own mock test " color={ThemeColors.black} />
                    <div className="row m-0 mb-5">
                        <div className='col-xl-2 col-md-2 col-sm-2 ps-0'>
                            <label >Total Questions</label>
                            <Heading14600 text="25" />
                        </div>
                        <div className='col-xl-2 col-md-2 col-sm-2 ps-0'>
                            <label >Time Duration</label>
                            <Heading14600 text="1 Hour" />
                        </div>
                        <div className='col-xl-2 col-md-2 col-sm-2 ps-0'>
                            <label >Question Type</label>
                            <Heading14600 text="Single choice" />
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-3'>
                        <div className="col-xl-6 col-md-8 col-sm-12 ">
                            <CustomInput label="Mock Test Name" placeholder="Enter Mock Test Name" onChange={(e) => { setPayload({ ...payload, mockTestName: e?.target?.value }) }} />
                        </div>
                        <div className="col-xl-6 col-md-8 col-sm-12">
                            <Dropdown option={subjects} label="Subject" placeholder="Select Subject" handlefunc={(data) => { setInputValue(data, "subjectId") }} />
                        </div>
                        <div className=" col-xl-6 col-md-8 col-sm-12">
                            <Dropdown option={AllLevels} label="Difficulty Level" placeholder="Select Difficulty Level" handlefunc={(data) => { setInputValue(data, "questionLevel") }} />
                        </div>
                        <div className=" col-xl-6 col-md-8 col-sm-12">
                            <Dropdown option={Languages} label="Language" placeholder="Select Language" handlefunc={(data) => { setInputValue(data, "language") }} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className=" col-xl-6 col-md-8 col-sm-12">
                        <CustomButton title="Generate Mock Test" disable={!(payload?.subjectId && payload?.questionLevel && payload?.language)} func={() => { generateMockTest() }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomMockTest
