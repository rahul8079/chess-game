import './App.css'

function App() {

  return (
    <div className='outer-container'>
      {Array.from({length:8},(_, rowIndex)=>(
      <div className='row' data-attr={rowIndex}>
        {Array.from({length:8},(_,index)=>(
        <div className='chess-block'><img src="/images/pawn-black.png" alt="" /></div>
        ))
        }
      </div>
      ))}
    </div>
  )
}

export default App
