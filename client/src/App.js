import React, { Fragment, useState } from 'react';
import './App.css';

//Redux files
import { connect } from "react-redux";

//Actions
import { setUploadFile } from './redux/actions/upload/uploadActions';

//import components
import Progress from './components/progress/Progress';

function App(props) {

  const [file, setFile] = useState(['']);

  const imgTypes = ['jpg', 'jpeg', 'png', 'gif'];

  let imgArray = [''];

  const handleUploadChange = e => {
    e.preventDefault();
    let files = e.target.files || [];
    for (let index = 0; index < files.length; index++) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          let extension = files[index].name.split('.').pop().toLowerCase();
          if( imgTypes.indexOf(extension) > -1 )
            {
              imgArray.push(reader.result);
            }
          else 
            {
              imgArray.push('');}
          setFile(imgArray);
        }
      }
    
      reader.readAsDataURL(e.target.files[index]);
  }
    props.setUploadFile(e.target.files);
  }

  return (
    <div className="App">
      <div className="container mt-4">
      <h4>Multiple File Upload</h4>
        <Fragment>
          <form>
            <div className="custom-file mt-4">
              <input type="file" className="custom-file-input" id="customFile" multiple onChange={handleUploadChange}/>
              <label className="custom-file-label" htmlFor="customFile">Choose file</label>
            </div>
          </form>
          <Progress previewFile={file}/>
        </Fragment>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  setUploadFile: files => dispatch(setUploadFile(files)),
});

export default connect(null, mapDispatchToProps)(App);
