import React from 'react';
import './file.css'
import fileLogo from '../../../../assets/img/file.png';
import dirLogo from '../../../../assets/img/folder.png';
import deleteLogo from '../../../../assets/img/delete.png'
import downloadLogo from '../../../../assets/img/upload.png'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir,pushToStack} from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile, readFile } from '../../../../actions/file';
const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const view = useSelector(state => state.files.view)
    function openHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }
    function openPlayerHandler(e){
        e.stopPropagation()
        dispatch(readFile(file))
    }
    function calculateSize(){
        if(file.size > 1024*1024*1024) {
            return (file.size/(1024*1024*1024)).toFixed(1)+"Гб"
        }
        if(file.size > 1024*1024) {
            return (file.size/(1024*1024)).toFixed(1)+"Мб"
        }
        if(file.size > 1024) {
            return (file.size/(1024)).toFixed(1)+"Кб"
        }
        return file.size+"Б"

    }

    function downloadClickHandler(e){
        e.stopPropagation()
        downloadFile(file)
    }
    function deleteClickHandler(e){
        e.stopPropagation();
        dispatch(deleteFile(file))
    }
    if(view === 'list'){
        if(file.name.length >= 20){
            file.name = file.name.slice(0,17) + `...${file.type}`
        }
    return (
        <div className="file" onClick={file.type === 'dir' ? () => openHandler() : (e) => openPlayerHandler(e)}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} width={48} height={48} alt="" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{calculateSize()}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} 
            className='file__btn file__download'><img height={34} width={34} src={downloadLogo} alt="Скачать"/></button>}
            <button 
            onClick={(e) => {deleteClickHandler(e)}}
            className='file__btn file__delete'><img height={32} width={32} src={deleteLogo} alt="Удалить"/></button>
        </div>
    )
    }
    if(view === 'plate'){
        if(file.name.length >= 12){
            file.name = file.name.slice(0,10) + `...${file.type}`
        }
        return <div className='file-plate' onClick={file.type === 'dir' ? () => openHandler() : (e) => openPlayerHandler(e)}>
        <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
            {file.type !== 'dir' &&
            <button 
                onClick={(e) => downloadClickHandler(e)} 
                className="file-plate__btn file-plate__download">
                   <img height={34} width={34} src={downloadLogo} alt="Скачать"/>
            </button>}
            <button 
                onClick={(e) => deleteClickHandler(e)} 
                className="file-plate__btn file-plate__delete">
                    <img height={32} width={32} src={deleteLogo} alt="Удалить"/>
            </button>
        </div>
    </div>
    }
};

export default File;