import React from 'react'
import { useSelector } from 'react-redux'
import UploadFile from './UploadFile'
import './uploader.css'
import { useDispatch } from 'react-redux'
export default function Uploader() {
    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()
    const files = useSelector(state => state.upload.files)
  return ( isVisible &&
    <div className='uploader'>
        <div className="uploader__header">
            <div className="uploader__title">Загрузки</div>
            <button className='uploader__close' onClick={() => dispatch({type : "HIDE_UPLOADER"})}>X</button>
        </div>
        {files.map(file => 
            <UploadFile key={file._id} file={file}/>
            )}
    </div>
  )
}
