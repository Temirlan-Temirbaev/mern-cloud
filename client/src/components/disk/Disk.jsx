import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay, setCurrentDir} from '../../reducers/fileReducer'
import {getFiles,  uploadFile} from "../../actions/file";
import FileList from "./fileList/FileList";
import Popup from './Popup'
import './disk.css'
import { useState } from 'react';
import Uploader from './uploader/Uploader';
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
    }
    function backClickHandler(){
        const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    function fileUploadHandler(e){
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
    }
    function dragEnterHandler(event){
        event.preventDefault();
        event.stopPropagation()
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
        return (
            <div className="loader">
                <div className="lds-dual-ring"></div>
            </div>
        )
    }
    return ( !dragEnter ?
        <div className="disk" 
        onDragEnd={dragEnterHandler} 
        onDragLeave={dragLeaveHandler} 
        onDragOver={dragOverHandler}>
            <div className="disk__btns">
                <button className="disk__back" onClick={() => backClickHandler()}>Назад</button>
                <button className="disk__create" onClick={() => showPopupHandler()}>Создать папку</button>
                <button className="disk__upload">
                    <label htmlFor="disk__upload-input" className="disk__upload-label">Загрузить файл</label>
                    <input multiple={true} onChange={(e) => fileUploadHandler(e)} type="file" id='disk__upload-input' />
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className='disk__select'>
                    <option value="name">По имени</option>
                    <option value="type">По типу</option>
                    <option value="date">По дате</option>
                </select>
            </div>
            <FileList />
            <Popup />
            <Uploader />
        </div>
        : 
        <div className='drop-area' 
        onDrop={dropHandler}
        onDragEnd={dragEnterHandler} 
        onDragLeave={dragLeaveHandler} 
        onDragOver={dragOverHandler}>
            Перетащите файлы
        </div>
    );
};

export default Disk;