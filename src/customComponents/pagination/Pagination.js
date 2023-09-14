import React, { useEffect, useState } from "react";
import { LeftArrowIcon, RightArrowIcon } from "../../assets/icon/inputIcon";
import { ThemeColors } from "../../theme/theme";
import "./pagination.css";
const menuStyle1 = {
  color: ThemeColors.black,
  backgroundColor: ThemeColors.white,
  fontFamily: "Medium",
  width: "80px",
  height: "39px",
};

const Pagination = ({ getFunction, totalLength, setPageNoSize, pageNoSize, length }) => {
  //  console.log("",pageNoSize)
  const [currentPage, setCurrentPage] = useState(pageNoSize?.no);
  const [maxItems, setMaxItems] = useState(10);
  const [noOfpages, setNoOfpages] = useState(1);
  const [result, setResult] = useState({ from: 1, to: 10 });

 /* eslint-disable */
  useEffect(() => {
    setCurrentPage(pageNoSize?.no)
    // console.log("length==>>>>",length);
   // setPageNoSize({ ...pageNoSize, no: 1, size: 10 })
    let FROM = pageNoSize?.no * maxItems - maxItems + 1;
    let TO = pageNoSize?.no * maxItems - maxItems + length;
    setResult({ ...result, from: FROM, to: TO });
  }, [pageNoSize, length])

  useEffect(() => {
    let page = Math.ceil(totalLength / maxItems);
    setNoOfpages(page);
  }, [maxItems, getFunction]);

  const handlePageSize = async (pageSize) => {
    
    setMaxItems(pageSize)
    let itemslength = await getFunction(1, pageSize)
    setResultFn(1, maxItems, itemslength)
    setPageNoSize({ ...pageNoSize, no: 1, size: pageSize })
  }
  
  const setResultFn = (currentPage, maxItems, itemslength) => {
    let FROM = currentPage * maxItems - maxItems + 1;
    let TO = currentPage * maxItems - maxItems + itemslength;
    setResult({ ...result, from: FROM, to: TO });
    setPageNoSize((value) => ({ ...value, no: currentPage, size: maxItems }))
  };
  
  let items = [];
  for (let number = 1; number <= noOfpages; number++) {
    items.push(
      <div
        key={number}
        className={
          number === currentPage ? "round-effect activepage" : "round-effect"
        }
        onClick={async () => {
          let itemslength = await getFunction(number, maxItems)
          setResultFn(number, maxItems, itemslength)
          setPageNoSize({ ...pageNoSize, no: number })
        }}
      >
        {number}
      </div>
    );
  }

  const nextPage = async () => {
    if (currentPage < noOfpages) {
      let itemslength = await getFunction(currentPage + 1, maxItems);
      setPageNoSize({ ...pageNoSize, no: currentPage + 1 })
      setResultFn(currentPage + 1, maxItems, itemslength)
    }
  };

  const prevPage = async () => {
    if (currentPage > 1) {
      let itemslength = await getFunction(currentPage - 1, maxItems);
      setPageNoSize({ ...pageNoSize, no: currentPage - 1 })
      setResultFn(currentPage - 1, maxItems, itemslength)
    }
  };

  const paginationRender = (
    <div className="row m-0 justify-content-between gap-2">
      <div className="col-auto p-0 d-flex align-items-center text-muted gap-3">
        Showing {result?.from}-{result?.to} of {totalLength} results{" "}
        <p className="p-0 m-0"> Item per page</p>
        <div className="bg-white ps-1 px-2 ">
          <select
            style={menuStyle1}
            value={parseInt(pageNoSize?.size)}
            onChange={(e) => handlePageSize(parseInt(e?.target.value))}
            className="border-0 px-1"
          >
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
        </div>
      </div>

      <div className="col-auto p-0 paginate-ctn float-end gap-2 flex-wrap">
        <div className="arrows" onClick={prevPage}>       
          <LeftArrowIcon/>
        </div>
        {items}
        <div className="arrows" onClick={nextPage}>
          <RightArrowIcon />
        </div>
      </div>
    </div>
  );
  return paginationRender;
};

export default Pagination;
