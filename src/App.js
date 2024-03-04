import logo from './logo.svg';
import { useState, useEffect} from 'react'
import './App.css';
import Gallery from './Gallery'
import Buttons from './Buttons'

function App() {
  let [artId, setArtId] = useState(12720)
  let [data, setData] = useState({})
  
  useEffect(() => {
      document.title='Welcome to Artworld'
      fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
      .then(response => response.json())
      .then(resData => setData(resData))
  }, [artId])

  const handleIterate = (e) => {
    setArtId(artId + Number(e.target.value))
  }

  const displayImage = () => {
    if(!data.primaryImage) {
      return (
        <h2>No Image here!</h2>
      )
    }
    return (
      <Gallery artId={data.primaryImage} title={data.title} />
    )
  }
  
  return (
    <div className='App'>
      <h1>{data.title}</h1>
      <div style={{'width': '100%'}}>
        {displayImage()}
      </div>
      <Buttons handleIterate={handleIterate} />
    </div>
  );
}

export default App;
