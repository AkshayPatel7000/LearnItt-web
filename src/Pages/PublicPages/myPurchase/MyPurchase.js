import React, { useEffect, useState } from 'react';
import { NoOrder } from '../../../assets/icon/inputIcon';
import CustomButton from '../../../customComponents/button/customButton';
import { HeadTitle } from '../../../customComponents/headTitle/headTitle';
import NotFoundTemplate from '../../../customComponents/notFoundTemplate/NotFoundTemplate';
import Pagination from '../../../customComponents/pagination/Pagination';
import MyPurchaseService from '../../../services/MyPurchaseService';
import { ThemeColors } from '../../../theme/theme';
import MockTestCard from '../mockTest/components/mockTestCard';
import PypCard from '../pyp/pypCard';
import VideoCard from '../videos/VideoCard';
import EbookCard from '../ebook/ebookCard';
const cardStyle = {
    display: "flex",
    width: "100%",
    height: "90%",
    justifyContent: "center",
};
/*eslint-disable */
const MyPurchase = () => {
    const [moduleList, setModuleList] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([]);
    const [selectedModule, setSelectedModule] = useState("");
    const [PurchaseItemsLength, setPurchaseItemsLength] = useState("");
    const [pageNoSize, setPageNoSize] = useState({ no: 1, size: 10 });

    useEffect(() => {
        getModuleList()
    }, [])

    const getModuleData = (no, size, moduleName) => {
        setPurchaseItems([])

        switch (moduleName || selectedModule) {
            case "Mock Test": return getPurchasedMocktest(no, size)
            case "Videos": return getPurchasedVideos(no, size)
            case "Previous Year Paper": return getPurchasedPYP(no, size)
            case "eBooks": return getPurchasedEbooks(no, size)
            default: break;
        }
    }

    const getModuleList = async () => {
        const res = await MyPurchaseService.getModuleList()
        if (res.isSuccess) {
            setModuleList(res.data.studentModules)
            setSelectedModule(res.data.studentModules[0].moduleCategoryName)
            getPurchasedMocktest()
        }
    }

    const getPurchasedMocktest = async (no = 1, size = 10) => {
        const res = await MyPurchaseService.getPurchasedMocktest({ pageNumber: no, pageSize: size })

        if (res.isSuccess) {
            setPurchaseItems(res.data.myPurchasedMockTests)
            setPurchaseItemsLength(res.data?.totalRecords)
        }
        else {
            setPurchaseItems([])
            setPurchaseItemsLength()
        }
    }

    const getPurchasedEbooks = async (no = 1, size = 10) => {
        const res = await MyPurchaseService.getPurchasedEbooks({ pageNumber: no, pageSize: size })

        if (res.isSuccess) {
            setPurchaseItems(res.data.myPurchasedEbooks)
            setPurchaseItemsLength(res.data?.totalRecords)
        }
        else {
            setPurchaseItems([])
        }
    }

    const getPurchasedVideos = async (no = 1, size = 10) => {
        const res = await MyPurchaseService.getPurchasedVideos({ pageNumber: no, pageSize: size })

        if (res.isSuccess) {
            setPurchaseItems(res.data.myPurchasedVideos)
            setPurchaseItemsLength(res.data?.totalRecords)
        }
        else {
            setPurchaseItems([])
        }
    }

    const getPurchasedPYP = async (no = 1, size = 10) => {
        const res = await MyPurchaseService.getPurchasedPYP({ pageNumber: no, pageSize: size })

        if (res.isSuccess) {
            setPurchaseItems(res.data.myPurchasedPYPs)
            setPurchaseItemsLength(res.data?.totalRecords)
        }
        else {
            setPurchaseItems([])
        }
    }

    return (
        <div>
            <HeadTitle text="My Purchased" />
            <div className='d-flex gap-3 mt-3 flex-wrap'>
                {moduleList.map((module, key) => {
                    return (
                        <div style={{ minWidth: "max-content" }} >
                            <CustomButton
                                title={module?.moduleCategoryName}
                                background={selectedModule === module?.moduleCategoryName ? ThemeColors.lightBlue : ThemeColors.inputbg}
                                color={selectedModule === module?.moduleCategoryName ? ThemeColors.white : ThemeColors.lightBlue}
                                border={"1px solid #4FA4F4"}
                                height="39px"
                                titleStyle={{ fontWeight: 500, fontSize: "18px" }}
                                func={(e) => {
                                    setSelectedModule(module?.moduleCategoryName)
                                    getModuleData(e.no, e.size, module?.moduleCategoryName)
                                }}
                            />
                        </div>
                    )
                })}
            </div>
            {
                purchaseItems.length > 0 ?

                    <div>
                        <div className="row py-2">
                            {
                                purchaseItems.map((item, key) => {
                                    return (
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            {selectedModule === "Mock Test" ? <MockTestCard mockTest={{ ...item, isPurchased: true }} /> : selectedModule === "Previous Year Paper" ? <PypCard pyp={{ ...item, isPurchased: true }} /> : selectedModule === "Videos" ? <VideoCard videoData={{ ...item, isPurchased: true }} /> : selectedModule === "eBooks" ? <EbookCard ebook={{ ...item, isPurchased: true }} /> : ""}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <Pagination
                            totalLength={PurchaseItemsLength}
                            pageNoSize={pageNoSize}
                            length={purchaseItems?.length}
                            setPageNoSize={setPageNoSize}
                            getFunction={getModuleData}
                        />
                    </div>
                    :
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "70vh" }}
                    >
                        <NotFoundTemplate icon={<NoOrder />} line1={"No order yet"} line2={"You haven’t placed any orders yet, When you do. their status will appear here."} cardStyle={cardStyle} title="Go Home" />
                    </div>

            }
        </div >
    )
}

export default MyPurchase
