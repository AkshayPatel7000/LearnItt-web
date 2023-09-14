import React from 'react'
import { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from 'react-router-dom';
import "./ebook.css";
import { NextIcon, PreviousIcon } from '../../../assets/icon/inputIcon';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const EbookViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const location = useLocation();
    const ebook = location?.state?.ebook;
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
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
                    <Document
                        file={ebook?.ebookPdfURL}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className='row align-items-center justify-content-center'
                    >
                        {/* <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} size="A4" className="pdfPage" ></Page> */}
                        <Page pageNumber={pageNumber} scale={1.2} size="A4" className="pdfPage" renderAnnotationLayer={false} renderTextLayer={false} ></Page>
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

export default EbookViewer