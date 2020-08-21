import React from 'react';
import Styles from './UploadItem.module.css';

const UploadFile = props => {
  const { file, progress } = props.file
  const { previewFile } = props;

  return (
    <div className={Styles.wrapperItem}>
      <div className={Styles.leftSide}>
        <div className={Styles.progressBar}>
          <div style={{ width: `${progress}%` }} />
        </div>
        <label>{file.name}</label>
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <img style={{ width: '100%' }} src={previewFile} alt='' />
          </div>
        </div>
      </div>
      <span className={Styles.percentage}>{progress}%</span>
    </div>
  )
}

export default UploadFile