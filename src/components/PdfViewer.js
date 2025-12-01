
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';

// Worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const pdfContainerRef = useRef(null);

  const params = useParams();
  const pdfPath = params['*'];

  useEffect(() => {
    const fetchPdf = async () => {
      if (!pdfPath) {
        setPdfError('No PDF file specified.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setPdfError(null);
      setPdfData(null);
      setNumPages(null);
      setPageNumber(1);

      try {
        const response = await fetch(`/pdfs/${pdfPath}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
        }
        const data = await response.arrayBuffer();
        setPdfData(data);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setPdfError('Failed to load PDF file. Please check the file path and ensure it exists in the `public/pdfs` directory.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPdf();
  }, [pdfPath]);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  const onDocumentLoadError = useCallback((error) => {
    console.error('Error while loading document from data!', error);
    setPdfError('The downloaded file is not a valid PDF.');
  }, []);

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

  if (isLoading) {
    return <div className="text-lg p-4 text-center">Loading PDF...</div>;
  }

  if (pdfError) {
    return <div className="p-4 text-center text-white bg-red-500 rounded-lg">{pdfError}</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4" onContextMenu={(e) => e.preventDefault()}>
      <div className="flex justify-center items-center mb-4 bg-white p-2 rounded-lg shadow-md z-10">
        <button 
          onClick={goToPrevPage} 
          disabled={pageNumber <= 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mx-2"
        >
          Prev
        </button>
        <span className="text-lg font-semibold text-gray-700">
          Page {pageNumber} of {numPages || '--'}
        </span>
        <button 
          onClick={goToNextPage} 
          disabled={!numPages || pageNumber >= numPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed mx-2"
        >
          Next
        </button>
      </div>

      {pdfData && (
        <div ref={pdfContainerRef} className="w-full max-w-4xl shadow-lg mb-4">
          <Document
            file={{ data: pdfData }}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            renderMode="canvas"
            loading=""
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false} 
              renderAnnotationLayer={false}
              width={pdfContainerRef.current?.clientWidth}
            />
          </Document>
        </div>
      )}

      {numPages && (
         <p className="text-lg font-semibold text-gray-700">
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
};

export default PdfViewer;
