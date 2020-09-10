import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { size, toArray } from 'lodash'

import { uploadFile, successUploadFile } from '../../redux/actions/upload/uploadActions'
import UploadFile from '../upload/UploadFile'
import Styles from './UploadProgress.module.css'

const UploadProgress = props => {
  const { fileProgress, uploadFile, previewFile } = props
  const uploadedFileAmount = size(fileProgress)

  useEffect(() => {
    const fileToUpload = toArray(fileProgress).filter(file => file.progress === 0)
    uploadFile(fileToUpload)
  }, [uploadedFileAmount])

  return uploadedFileAmount > 0 ? (
    <div className={Styles.wrapper}>
      <h4>Uploading Files</h4>
      {size(fileProgress)
        ? toArray(fileProgress).map(file => <UploadFile key={file.id} file={file} previewFile={previewFile[file.id]}/>)
        : null}
    </div>
  ) : null
}

const mapStateToProps = state => ({
  fileProgress: state.upload.fileProgress,
})

const mapDispatchToProps = dispatch => ({
  uploadFile: files => dispatch(uploadFile(files)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProgress)
