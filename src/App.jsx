import { useState } from 'react';
import './App.css'
import Pawn from './components/Pawn'

function App() {
  const [blackPawnPositions, setBlackPawnPositions] = useState([{ row: 1, col: 0, isFirstTime: true}, { row: 1, col: 1, isFirstTime: true}, { row: 1, col: 2, isFirstTime: true}, { row: 1, col: 3, isFirstTime: true}, { row: 1, col: 4, isFirstTime: true}, { row: 1, col: 5, isFirstTime: true}, { row: 1, col: 6, isFirstTime: true}, { row: 1, col: 7, isFirstTime: true}]);
  const [whitePawnPositions, setWhitePawnPositions] = useState([{ row: 6, col: 0, isFirstTime: true }, { row: 6, col: 1, isFirstTime: true }, { row: 6, col: 2, isFirstTime: true }, { row: 6, col: 3, isFirstTime: true }, { row: 6, col: 4, isFirstTime: true }, { row: 6, col: 5, isFirstTime: true }, { row: 6, col: 6, isFirstTime: true }, { row: 6, col: 7, isFirstTime: true }]);
  const [validMovePositions, setValidMovePositions] = useState({index: -1, openPositions: [], crossPosition: [], objectColor: ''});
  const [currSelectedObj, setCurrSelectedObj] = useState({});
  const [eleminatedObjects, setEleminatedObjects] = useState({white:{pawn:0}, black:{pawn:0}});
  const movePawn = (pawnColor, row, col, pawnIndex) => {
      if(pawnColor === 'black') setBlackPawnPositions((prevState)=> prevState.map((pos, index)=>(index === pawnIndex ? { row: row, col: col, isFirstTime: false} : pos)));
      if(pawnColor === 'white') setWhitePawnPositions((prevState)=> prevState.map((pos, index)=>(index === pawnIndex ? { row: row, col: col, isFirstTime: false} : pos)));
      setValidMovePositions({index: -1, openPositions: [], crossPosition: [], objectColor: ''});
  }

  const showMovePosition = (objectType, objectColor, row, col, isFirstTime, pawnIndex) => {
    setCurrSelectedObj({row:row, col:col});
    if(objectType === 'pawn') {
        let openPositions = [];
        if(isFirstTime){
          openPositions = objectColor === 'black' ? [{row: row+1, col: col}, {row: row+2, col: col}] : [{row: row-1, col: col}, {row: row-2, col: col}];
        }else{
          openPositions = objectColor === 'black' ? [{row: row+1, col: col}] : [{row: row-1, col: col}];
        }
        openPositions = openPositions.filter(({row,col})=>( 
          blackPawnPositions.findIndex((pos)=>(pos.row === row && pos.col === col)) === -1 &&
          whitePawnPositions.findIndex((pos)=>(pos.row === row && pos.col === col)) === -1 
        ));
        const crossPosition = getCrossPositions(objectType, objectColor, row, col);
        setValidMovePositions(validPos => ({ ...validPos , index: pawnIndex, openPositions: openPositions, crossPosition: crossPosition, objectColor: objectColor}));
    }
  }

  const getCrossPositions = (objectType, objectColor, row, col) => {
    let crossPosition = [];
    if(objectType === 'pawn') {
      if(objectColor === "black"){ 
        crossPosition = whitePawnPositions.filter(pos => (pos.row === row+1 && pos.col === col+1) || (pos.row === row+1 && pos.col === col-1));
      }else{
        crossPosition = blackPawnPositions.filter(pos => (pos.row === row-1 && pos.col === col+1) || (pos.row === row-1 && pos.col === col-1));   
      }
    }
    return crossPosition;
  }

  const eleminateObj = (objectType, objectColor, row, col) => {
    let newPosition = null;  
    if(objectType === 'pawn'){
      if(objectColor === "black"){
        newPosition = whitePawnPositions.filter(pos => (pos.row !== row && pos.col !== col));
        setWhitePawnPositions(newPosition);
        newPosition = blackPawnPositions.filter(pos => (pos.row !== currSelectedObj.row || pos.col !== currSelectedObj.col));
        setBlackPawnPositions([...newPosition, {row: row, col: col, isFirstTime: false}]);
        setEleminatedObjects(prevData => ({...prevData, white:{...prevData.white, pawn: (prevData.white.pawn)+1}}));
      }else{
        newPosition = blackPawnPositions.filter(pos => (pos.row !== row && pos.col !== col));
        setBlackPawnPositions(newPosition); 
        newPosition = whitePawnPositions.filter(pos => (pos.row !== currSelectedObj.row || pos.col !== currSelectedObj.col));
        setWhitePawnPositions([...newPosition, {row: row, col: col, isFirstTime: false}]);
        setEleminatedObjects(prevData => ({...prevData, black:{...prevData.black, pawn: (prevData.black.pawn)+1}}));  
      }
      setValidMovePositions({index: -1, openPositions: [], crossPosition: [], objectColor: ''});
    }
  }

  return (
    <div className='outer-container'>
      {Array.from({length:8},(_, rowIndex)=>(
      <div key={rowIndex} className='row' data-attr={rowIndex}>
        {Array.from({length:8},(_,index)=>(
        <div key={index} className='chess-block'>
          {validMovePositions.openPositions.map(({row, col})=>(
            rowIndex === row  && index === col && <div key={row} className='move-circle-container' onClick={()=>{ movePawn(validMovePositions.objectColor, row,col,validMovePositions.index) }}><span className='move-circle'></span></div>
          ))}
          {validMovePositions.crossPosition.map(({row, col})=>(
            rowIndex === row  && index === col && <div key={row} className='move-circle-container take-over' onClick={()=>{ eleminateObj('pawn', validMovePositions.objectColor, row,col) }}></div>
          ))}  
          {blackPawnPositions.map(({row, col, isFirstTime}, pawnIndex)=>(
            rowIndex === row  && index === col && <Pawn key={col} pawnColor="black" onClick={()=>{ showMovePosition('pawn','black', rowIndex,index,isFirstTime,pawnIndex) }}/>
          ))}
          {whitePawnPositions.map(({row, col, isFirstTime}, pawnIndex)=>(
            rowIndex === row  && index === col && <Pawn key={col} pawnColor="white" onClick={()=>{ showMovePosition('pawn', 'white', rowIndex,index,isFirstTime,pawnIndex) }}/>
          ))}
          </div>
        ))
        }
      </div>
      ))}
    </div>
  )
}

export default App
