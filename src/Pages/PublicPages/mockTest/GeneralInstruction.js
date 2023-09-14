import { MathJax } from 'better-react-mathjax'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Heading, SubHeading } from '../../../customComponents/DynamicText/Heading'
import CustomButton from '../../../customComponents/button/customButton'
import Checkbox from '../../../customComponents/checkbox/Checkbox'
import QuestionStore from '../../../mobx/question'
import MockTestData from '../../../services/MockTestService'
import QuestionService from '../../../services/QuestionService'
import { ThemeColors } from '../../../theme/theme'
import { RouteConstant } from '../../../utils/routes/constant'
import Legend from './components/Legend'

export default function GeneralInstruction() {
    const navigate = useNavigate();
    const location = useLocation();
    /* eslint-disable */
    const [isChecked, setIsChecked] = useState(false);
    const [instructions, setInstructions] = useState();

    useEffect(() => {
        getById()
    }, [location?.state?.id]);

    const getById = async () => {
        const res = await QuestionService?.getQuestionPanel({ mockTestId: location?.state?.id, isCustome: location?.state?.isCustome });
        // const res = await MockTestData.getGeneralInst({ mockTestId: location?.state?.id, isCustome: location?.state?.isCustome });
        if (res?.isSuccess) {
            setInstructions(res?.data?.generalInstructions)
        }
    };
    
    const startTest = async () => {
        let post = {
            mockTestId: location?.state?.id,
            isStarted: true,
            isCustome: location?.state?.isCustome,
            isCompleted: false
        }
        const res = await MockTestData.saveMocktestStatus(post);
        if (res?.isSuccess) {
            QuestionStore?.setCorrectAnswer(false)
            QuestionStore.setQuestionIndex(0)
            QuestionStore.setSectionIndex(0)
            QuestionStore.setSubjectIndex(0)
            localStorage.setItem('questionParams',JSON.stringify({ id: location?.state?.id, isCustome: location?.state?.isCustome }))
            navigate(RouteConstant?.viewmockTest)
            window.open(RouteConstant?.questionPage, '_blank', 'height='+screen.height+', width='+screen.width)
        }


    }
    return (
        <div className='card border-0 radius-0 px-5 py-4 gap-3'>
            <Heading text="GENERAL INSTRUCTION:" />
            <SubHeading text="Please read the instructions carefully" />
            <div className="d-flex py-3 px-4 mt-2 flex-wrap" style={{ background: ThemeColors.inputbg, rowGap: '25px', columnGap: "55px" }}>
                <Legend color={"#E3E9EE"} text="NOT VISITED" border={"1px solid #787f86"} width={"22px"} height={"23px"} borderRadius={"5px"} padding="8px 6px" />
                <Legend color={ThemeColors.completed} text="ANSWERED" border={""} width={"22px"} height={"23px"} borderRadius={"5px"} padding="8px 6px" />
                <Legend color={ThemeColors?.expired} text="NOT ANSWERED" border={""} width={"22px"} height={"23px"} borderRadius={"5px"} padding="8px 6px" />
                <Legend color={"#E3E9EE"} text="CURRENT QUESTIONS" border={"1px solid #0075FF"} width={"22px"} height={"23px"} borderRadius={"5px"} padding="8px 6px" />
                <Legend color={ThemeColors.lightBlue} text="MARK FOR REVIEW" border={""} width={"22px"} height={"23px"} borderRadius={"5px"} padding="8px 6px" />
            </div>
            <MathJax>
                {/* <p dangerouslySetInnerHTML={{ __html: GI.html, }} /> */}
                <p dangerouslySetInnerHTML={{ __html: instructions, }} />
            </MathJax>
            <label className='d-flex align-items-center gap-3 pointer'>
                <Checkbox handleClick={(e) => setIsChecked(e?.target?.checked)} />
                I have read and understood the instruction.
            </label>
            <div style={{ columnWidth: "20rem", maxWidth: "450px" }}>
                <CustomButton title="Start Test" disable={!isChecked} func={() => { startTest() }} />
            </div>
        </div>
    )
}
