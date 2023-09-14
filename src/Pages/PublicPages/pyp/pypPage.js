import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { PypNotFound } from "../../../assets/icon/inputIcon";
import { HeadTitlePYP } from "../../../customComponents/headTitle/headTitle";
import NotFoundTemplate from "../../../customComponents/notFoundTemplate/NotFoundTemplate";
import Pagination from "../../../customComponents/pagination/Pagination";
import AuthStore from "../../../mobx/auth";
import PypStore from "../../../mobx/pyp";
import EbookData from "../../../services/ebookSevice";
import PypData from "../../../services/pypService";
import { ThemeColors } from "../../../theme/theme";
import PypCard from "./pypCard";
import PypFillter from "./pypFillter";
import "./pypPage.css";
import PypPupSort from "./pypShortBy";
export const dropDown = [
    { title: "Latest Added", id: 0 },
    { title: "Price - high to low", id: 1 },
    { title: "Price - low to high", id: 2 },
];
const myStyle = {
    backgroundColor: ThemeColors.inputbg,
    width: "max-content",
    display: "flex",
    height: "46px",
    padding: "9px 13px",
    paddingLeft: "18px",
    // border: "1px solid #4FA4F4 !important",
    border: "1px solid #4FA4F4",
    borderRadius: "5px",
};
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "90%",
    justifyContent: "center"
}
const PypPage = () => {
    const [pageNoSize, setPageNoSize] = useState({ no: 1, size: 10 });
    const [pypLength, setPypLengt] = useState("");
    const [pyp, setPyp] = useState([]);
    // const navigate = useNavigate();

    useEffect(() => {
        getPypByFilter();
    }, []);

    const getPypByFilter = async (no = 1, size = 10) => {
  //console.log("nhdhjfh");
        // setPageNoSize({ no: 1, size: 10 });
        let payload = {
            pageNumber: no,
            pageSize: size,
            instituteId: AuthStore?.user?.user?.instituteId,
            subcourseId: AuthStore?.user?.user?.subcourseId,
            ...PypStore.filterData
            // year: PypStore.filterData?.year,
            // languageFilter: PypStore.filterData?.languageData,
            // priceFilter: PypStore.filterData?.price,
        };
        const res = await PypData?.getPypList(payload);
        const resp = await EbookData.getAllCartItems()

        // console.log(res, "res===================>")

        if (res?.isSuccess && resp) {
            setPypLengt(res?.data.totalRecord)
            let modifiedPypList = res?.data?.previousYearPapers.map((item, index) => {
                return { ...item, isAddedToCart: resp?.showMyCart?.find(cartItem => cartItem?.productId === item?.paperId) ? true : false }
            })
            setPyp([...modifiedPypList]);
            setPageNoSize({ no: 1, size: 10 })
            return res?.data?.previousYearPapers;
        } else {
            setPyp([]);
            setPypLengt("")
        }
    };
    const updatePYPList = async () => {
        const resp = await EbookData.getAllCartItems()
        let modifiedPYPList = pyp.map((item, index) => {
            return { ...item, isAddedToCart: resp?.showMyCart?.find(cartItem => cartItem?.productId === item?.paperId) ? true : false }
        })
        setPyp(modifiedPYPList);
    }

    const handleSort = (data) => {
        PypStore.setfilterData({ priceWiseSort: data.id })
        getPypByFilter()
        //setPageNoSize({ no: 1, size: 10 });

    }
// console.log("page-Size",pageNoSize);
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <HeadTitlePYP text="Previous year paper" />
                </div>
                <div style={{ marginInline: "auto 10px" }} className="gap-2 col-xl-4">
                    <div
                        className="d-flex gap-2 fill-drop flex-wrap"
                        style={{ float: 'right' }}
                    >
                        <div>
                            <PypPupSort
                                menu={dropDown}
                                preText="Sort By :"
                                menuStyle={myStyle}
                                func={handleSort}
                            />
                        </div>
                        <div className=" gap-2 sort">
                            <PypFillter  setPageNoSize={setPageNoSize} applyFunc={getPypByFilter} />
                        </div>
                    </div>
                </div>
            </div>
            {pypLength > 0 ? (
                <>
                    <div className="row py-2 gx-3" >
                        {/* <PypCard pyp={pyp} /> */}
                        {pyp.map((elm, key) => {
                            return (
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 py-2" key={key}>
                                    <PypCard pyp={elm} subjectList={updatePYPList} />
                                </div>
                            )
                        })
                        }

                    </div>
                    <Pagination
                        totalLength={pypLength}
                        pageNoSize={pageNoSize}
                        length={pyp?.length}
                        setPageNoSize={setPageNoSize}
                        getFunction={getPypByFilter}
                    />
                </>
            ) : (
                <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "70vh" }}
                >
                    {/* <NotFoundIcon /> */}
                    <NotFoundTemplate icon={<PypNotFound />} line1={"No previous year paper available"} line2={"We're sorry, but it looks like there are no previous year papers available at this time."} cardStyle={cardStyle} title="Go Home" />

                </div>
            )}
        </>
    );
};
export default observer(PypPage);


