import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay, setCurrentDir} from '../../reducers/fileReducer'
import {getFiles,  uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from './Popup'
import './disk.css'
import { useState } from 'react';
import Uploader from './uploader/Uploader';
import UsedSpace from '../usedSpaceBar/UsedSpace';
import Reader from '../reader/Reader';
const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')
    useEffect(() => {
        dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
        dispatch({type : "HIDE_READER"})
    }
    function backClickHandler(){
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }   
    function fileUploadHandler(e){
        const files = [...e.target.files]
        let count = 0;
        setInterval(() => {
            dispatch(uploadFile(files[count], currentDir));
            count++
        }, 1000)
        if(count === files.length) clearInterval();
    }
    function dragEnterHandler(event){
        event.preventDefault();
        event.stopPropagation()
        dispatch({type : "HIDE_READER"})
        setDragEnter(true)
    }
    function dragLeaveHandler(event){
        event.preventDefault();
        event.stopPropagation()
        setDragEnter(false)
    }
    function dragOverHandler(event){
        event.preventDefault();
        event.stopPropagation()
        setDragEnter(true)
    }
    function dropHandler(event){
        event.preventDefault();
        event.stopPropagation()
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }
    if(loader === true){
        dispatch({type : "HIDE_READER"})
        return (
            <div className="loader">
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    return ( !dragEnter ?
        <div className="disk" 
        onDragEnd={dragEnterHandler} 
        onDragLeave={dragLeaveHandler} 
        onDragOver={dragOverHandler}>
            <UsedSpace />
            <Reader />
            
            <div className="disk__btns">
                <div className="file__btns">
                    <button className="disk__back" onClick={() => backClickHandler()}>??????????</button>
                    <button className="disk__create" onClick={() => showPopupHandler()}>?????????????? ??????????</button>
                    <button className="disk__upload">
                        <label htmlFor="disk__upload-input" className="disk__upload-label">?????????????????? ????????</label>
                        <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id='disk__upload-input' />
                    </button>
                </div>
                <div className="view__btns">
                    <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk__select'>
                    <option value="name">???? ??????????</option>
                    <option value="type">???? ????????</option>
                    <option value="date">???? ????????</option>
                    </select>
                    <button className="disk__plate" onClick={() => dispatch({type : "SET_VIEW", payload : 'plate'})} />
                    <button className="disk__list" onClick={() => dispatch({type : "SET_VIEW", payload : 'list'})}/>
                </div>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        : 
        <div style={{marginTop : '30px'}}>
        <UsedSpace />
            <div className='drop-area' 
            onDrop={dropHandler}
            onDragEnd={dragEnterHandler} 
            onDragLeave={dragLeaveHandler} 
            onDragOver={dragOverHandler}>
                ???????????????????? ????????
            </div>
        </div>
    );
};

export default Disk;