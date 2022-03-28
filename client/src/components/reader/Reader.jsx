import React from 'react'
import { useSelector } from 'react-redux'
import './reader.css'
export default function Reader() {
    const content = useSelector(state => state.reader.src);
    const fileType = useSelector(state => state.reader.fileType);
    const opened = useSelector(state => state.reader.opened)
    const display = opened ? 'flex' : 'none'
    if(fileType === 'text'){
        return <div className='fileReader' style={{display : display}}>
            <p>{content}</p>
        </div>
    }
    if(fileType === 'image'){
        return <div className='fileReader' style={{display : display}}>
            <img src={content} alt=''/>
        </div>
    }
    if(fileType === 'video'){
        return <div className='fileReader' style={{display : display}}>
            <video src={content} controls></video>
        </div>
    }
    if(fileType === 'audio'){
        return <div className='fileReader' style={{display : display}}>
            <audio controls src={content}></audio>
        </div>
    }
    else return <></>
}
