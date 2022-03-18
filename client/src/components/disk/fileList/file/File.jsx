import React from 'react';
import './file.css'
import fileLogo from '../../../../assets/img/file.svg'
import dirLogo from '../../../../assets/img/folder.svg'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentDir,pushToStack} from '../../../../reducers/fileReducer'
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
    return (
        <div className="file" onClick={file.type ? () => openHandler() : () => openPlayerHandler()}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{file.size}</div>
        </div>
    );
};

export default File;