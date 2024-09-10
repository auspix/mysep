import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './App.css';

function App() {
  const [topGridHeight, setTopGridHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const separatorRef = useRef(null);

  // Sample data and column definitions
  const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
  ];

  const columnDefs = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' }
  ];

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newTopGridHeight = e.clientY;
      setTopGridHeight(newTopGridHeight);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="App">
      <div className="ag-theme-alpine" style={{height: topGridHeight, width: '100%'}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
      
      <div 
        ref={separatorRef}
        className="separator"
        onMouseDown={handleMouseDown}
        style={{
          cursor: 'row-resize', 
          padding: '2px', 
          background: '#f0f0f0', 
          textAlign: 'center',
          userSelect: 'none'
        }}
      >

      </div>

      <div className="ag-theme-alpine" style={{height: `calc(100vh - ${topGridHeight}px - 30px)`, width: '100%'}}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
        />
      </div>
    </div>
  );
}

export default App;
