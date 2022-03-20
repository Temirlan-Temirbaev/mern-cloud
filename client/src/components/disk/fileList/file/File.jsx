import React from 'react';
import './file.css'
import fileLogo from '../../../../assets/img/file.svg';
import dirLogo from '../../../../assets/img/folder.svg';
import deleteLogo from '../../../../assets/img/delete.svg'
import downloadLogo from '../../../../assets/img/download.svg'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir,pushToStack} from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../../actions/file';
const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    function openHandler() {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }
    function openPlayerHandler(){
        console.log("its not dir")
    }
    function calculateSize(){
        if(file.size >= 1000) return `${file.size / 1000} КБ`
        if(file.size === 0 ) return '0 Байт'
        if(file.size >= 1000000) return `${file.size / 1000000} МБ`
        if(file.size >= 1000000000) return `${file.size / 1000000000} ГБ`
        if(file.size <= 1000) return `${file.size} Байт`

    }

    function downloadClickHandler(e){
        e.stopPropagation()
        downloadFile(file)
    }
    function deleteClickHandler(e){
        e.stopPropagation();
        dispatch(deleteFile(file))
    }
    return (
        <div className="file" onClick={file.type ? () => openHandler() : () => openPlayerHandler()}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{calculateSize()}</div>
            {file.type !== 'dir' && <button onClick={(e) => downloadClickHandler(e)} 
            className='file__btn file__download'><img height={40} width={30} src={downloadLogo} alt="Скачать"/></button>}
            <button 
            onClick={(e) => {deleteClickHandler(e)}}
            className='file__btn file__delete'><img height={40} width={20} src={deleteLogo} alt="Удалить"/></button>
        </div>
    );
};

export default File;