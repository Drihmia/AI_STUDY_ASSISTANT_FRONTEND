
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);

  const params = useParams();
  const pdfPath = params['*']; // Get the path from the wildcard route

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setIsLoading(false);
  };

  const onDocumentLoadError = (error) => {
    console.error('Error while loading document!', error);
    setPdfError('Failed to load PDF file. Please check the file path and ensure it exists in the `public/pdfs` directory.');
    setIsLoading(false);
  };

  const goToPrevPage = () => setPageNumber(prevPageNumber => Math.max(prevPageNumber - 1, 1));
  const goToNextPage = () => setPageNumber(prevPageNumber => Math.min(prevPageNumber + 1, numPages));

  useEffect(() => {
    setNumPages(null);
    setPageNumber(1);
    setIsLoading(true);
    setPdfError(null);
  }, [pdfPath]);

  if (!pdfPath) {
    return <div className="p-4 text-center text-red-500">No PDF file specified.</div>;
  }

  const pdfFile = `/pdfs/${pdfPath}`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {isLoading && <div className="text-lg p-4">Loading PDF...</div>}
      {pdfError && <div className="p-4 text-center text-white bg-red-500 rounded-lg">{pdfError}</div>}
      
      {!isLoading && !pdfError && (
        <div className="flex justify-center items-center mb-4 bg-white p-2 rounded-lg shadow-md">
          <button 
            onClick={goToPrevPage} 
            disabled={pageNumber <= 1}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mx-2"
          >
            Prev
          </button>
          <span className="text-lg font-semibold text-gray-700">
            Page {pageNumber} of {numPages}
          </span>
          <button 
            onClick={goToNextPage} 
            disabled={pageNumber >= numPages}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mx-2"
          >
            Next
          </button>
        </div>
      )}

      <div className="shadow-lg mb-4">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          options={{ cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`, cMapPacked: true }}
        >
          <Page pageNumber={pageNumber} renderTextLayer={false} />
        </Document>
      </div>

      {!isLoading && !pdfError && (
         <p className="text-lg font-semibold text-gray-700">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};

export default PdfViewer;
