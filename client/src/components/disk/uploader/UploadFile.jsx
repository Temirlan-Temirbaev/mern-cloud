import React from 'react'
import { useDispatch } from 'react-redux'
import './uploader.css'
export default function UploadFile({file}) {
    const dispatch = useDispatch()
    if(file.name.length >= 12){
      file.name = file.name.slice(0,12)
    }
  return (
    <div className='upload-file'>
        <div className="upload-file__header">
            <div className="upload-file__name">{file.name}</div>
            <button className="upload-file__remove" 
            onClick={() => dispatch({type : "REMOVE_UPLOAD_FILE", payload : file.id})}>X</button>
        </div>
        <div className='upload-file__progress-bar'>
            <div className="upload-file__upload-bar" style={{width : file.progress + "%"}}/>
            <div className="upload-file__percent">{file.progress}</div>
        </div>
    </div>
  )
}
