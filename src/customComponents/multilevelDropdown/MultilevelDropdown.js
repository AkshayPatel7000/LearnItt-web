import React, { useEffect, useState } from 'react';
import { ClockWise } from '../../Sidebar/SideBarStyled';
import { SideArrow } from '../../assets/svg';
import QuestionStore from '../../mobx/question';
import { ThemeColors } from '../../theme/theme';
import './multiLevel.css';

export default function MultilevelDropdown({ color, menu = [], menuFunc, subMenuFunc }) {
    const [toggle, setToggle] = useState(false);
    const [title, setTitle] = useState();
    // QuestionStore?.setSubMenu(0);
    // console.log("menu",toJS(menu))
    const showSubmenu = (item, index) => {
        if (index === QuestionStore?.subMenu) {
            QuestionStore?.setSubMenu("")
        } else {
            QuestionStore?.setSubMenu(index);
            menuFunc && menuFunc(item);
        }
        setToggle(!toggle)
    }
    useEffect(() => {
        QuestionStore?.setMenu(menu)
        setTitle(menu[0]?.title)
    }, [menu])

    return (
        /* eslint-disable */
        <div className="btn-group">
            <div className="dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false" style={{ color: color, fontWeight: 500, fontSize: "17px" }} onClick={() => { QuestionStore?.setSubMenu("") }}> {title}</div>
            <ul className="dropdown-menu">
                {
                    menu.map((item, i) => {
                        return (
                            <>
                                <li key={i} className="pb-1" >
                                    <a className="dropdown-item d-flex justify-content-between" style={{ color: title === item?.title && ThemeColors.lightBlue }} onClick={() => { showSubmenu(item, i) }}>{item?.title}<ClockWise onfun={QuestionStore?.subMenu === i} ><SideArrow /></ClockWise></a>
                                </li>
                                {
                                    (item?.subMenu && QuestionStore?.subMenu === i) && item?.subMenu?.map((subItem, j) => {

                                        return (
                                            <li key={j}><a className="dropdown-subItem"
                                                onClick={() => {
                                                    QuestionStore?.setSelectedQuestion(subItem); setTitle(item?.title);
                                                    subMenuFunc && subMenuFunc(item, subItem, i, j)
                                                }}>{subItem?.title}</a></li>
                                        )
                                    })

                                }
                            </>
                        )
                    })
                }
            </ul>
        </div >
    )
}
