/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = e => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setFile(file);
  
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      }
      reader.readAsDataURL(file);
    }
  }
  

  const handleSubmit = async e => {
    console.log('Button');
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='container'>
      <nav>
        <h1> Blood cancer prediction </h1>
          <link rel="stylesheet" href="App.css"></link>
      </nav>  
      <form id="predict-form" onSubmit={handleSubmit}>
      <h2><label htmlFor="image">Select an image to upload:</label></h2>
        <input type="file" id="image" name="file" className="file" onChange={handleFileChange}></input>
        
        <input type="submit" className="sub" value="Predict" ></input>
        </form>    
      {imagePreviewUrl && (
        <img src={imagePreviewUrl} alt="Selected file" width="300" />
      )}
      {result && (
        <div>
          <h2>Prediction Result:</h2>
          <p>{result}</p>
        </div>
      )};
    </div>
  );
}

export default App;


<script src="App.js">
/*function previewImage() {
  var preview = document.getElementById('preview');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}*/

</script>   
</body>
</html>

<form onSubmit={handleSubmit}>
  <input type="file" onChange={handleFileChange} />
  <button type="submit">Predict</button>
</form>