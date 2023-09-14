import React from 'react'
import { Heading } from '../DynamicText/Heading';
import './headTitle.css'
export const HeadTitle = (props) => {
    const { text, component1, component2, component3 } = props;
    return (
        <div className='d-flex justify-content-between flex-wrap p-0'>
            <div className="col-lg-6 col-md-6  col-sm-6  col-xs-6 mt-2"><Heading text={text} /></div>
            <div className="col-lg-6 col-md-6  col-xs-6  cm-justify-content d-flex  mb-3 gap-3">
                {component1} {component2} {component3}
            </div>
        </div>
    )
}
export const HeadTitlePYP = (props) => {
    const { text, component1, component2, component3 } = props;
    return (
        <div className='d-flex justify-content-between flex-wrap p-0'>
            <div ><Heading text={text} /></div>
            <div className="col-lg-6 col-md-6  col-xs-6  cm-justify-content d-flex  mb-3 gap-3">
                {component1} {component2} {component3}
            </div>
        </div>
    )
}