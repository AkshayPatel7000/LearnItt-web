import React, { useEffect, useState } from 'react';
import { Document, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';
import { NextIcon, PreviousIcon } from '../../../assets/icon/inputIcon';

let Pdf = {};

const ViewPYP = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();
    const pyp = location?.state?.pyp;
    const [PDFImage, setPDFImage] = useState(null);

    /*To Prevent right click on screen*/
    document.addEventListener("contextmenu", (event) => {
        event.preventDefault();
    });

    /*When document gets loaded successfully*/
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const getPage = (num) => {
        return new Promise((resolve, reject) => {
            Pdf.getPage(num).then((page) => {
                const scale = "1.5";
                const viewport = page.getViewport({
                    scale: scale,
                });
                const canvas = document.createElement("canvas");
                const canvasContext = canvas.getContext("2d");
                canvas.height =
                    viewport.height || viewport.viewBox[3]; /* viewport.height is NaN */
                canvas.width =
                    viewport.width ||
                    viewport.viewBox[2]; /* viewport.width is also NaN */
                page
                    .render({
                        canvasContext,
                        viewport,
                    })
                    .promise.then((res) => {
                        resolve(canvas.toDataURL());
                    });
            });
        });
    };

    useEffect(() => {
        if (pyp?.paperPdfUrl) {
            pdfjs.getDocument(pyp?.paperPdfUrl).promise.then((pdf) => {
                Pdf = pdf;
                getPage(pageNumber).then((result) => {
                    setPDFImage(result);
                });
            });
        }

    }, [pyp?.paperPdfUrl, pageNumber])

    const goToPrevPage = () => {
        setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
    }

    const goToNextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1,);
    }
    return (
        <>
            <div className='d-block '>
                <div className="d-flex align-items-center justify-content-center">
                    <div onClick={goToPrevPage} >
                        {pageNumber > 1 && (<PreviousIcon />)}
                    </div>
                    <Document file={pyp?.paperPdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <img src={PDFImage} alt="" />
                    </Document>
                    <div onClick={goToNextPage} >
                        {pageNumber < numPages && (<NextIcon />

                        )}
                    </div>
                </div>
                <nav className='mt-3 d-flex justify-content-center'>
                    <div className='pageNumber'>
                        Page {pageNumber} / {numPages}
                    </div>
                </nav>
            </div>
        </>
    )
}

export default ViewPYP