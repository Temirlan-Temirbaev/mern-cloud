import React from 'react';
import './fileList.css'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {useSelector} from "react-redux";
import File from "./file/File";
const FileList = () => {
    const files = useSelector(state => state.files.files);
    const view = useSelector(state => state.files.view);
    if(files.length === 0){
        return(
            <div className='empty'>Файлы не найдены...</div>
        )
    }
    if(view === 'list'){
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
    }
    if(view === 'plate'){
        return (
            <div className="fileplate">
                    {files
                    .map(file =>
                     <File key={file._id} file={file}/>
                     )}
            </div>
        );
    }
};

export default FileList;