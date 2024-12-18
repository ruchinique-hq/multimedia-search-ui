import './App.css';

function App() {

  const handleFileInput = (e) => {
    console.log(e);
  }


  return (
    <div className="App">
      Upload file
      <input type="file" onChange={handleFileInput} />
    </div>
  );
}

export default App;
