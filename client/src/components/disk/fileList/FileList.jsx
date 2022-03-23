import React from 'react';
import './fileList.css'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {useSelector} from "react-redux";
import File from "./file/File";
const FileList = () => {
    const files = useSelector(state => state.files.files)
    if(files.length === 0){
        return(
            <div>Файлы не найдены</div>
        )
    }
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">Название</div>
                <div className="filelist__date">Дата</div>
                <div className="filelist__size">Размер</div>
            </div>
            <TransitionGroup>
                {files
                .map(file =>
                    <CSSTransition 
                    timeout={500}
                    classNames={'file'}
                    exit={false}
                    key={file._id}>
                 <File file={file}/>
                 </CSSTransition>
                 )}
            </TransitionGroup>
        </div>
    );
};

export default FileList;