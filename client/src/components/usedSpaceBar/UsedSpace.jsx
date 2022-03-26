import React from 'react'
import { useSelector } from 'react-redux'
import './usedSpace.css'
export default function UsedSpace() {
    const diskSpace = useSelector(state => state.user.currentUser.diskSpace)
    const usedSpace = useSelector(state => state.user.currentUser.usedSpace)
    const diskPercent = parseInt((usedSpace / diskSpace) * 100)
    console.log(diskSpace, usedSpace);
    function calculateSize(size){
        if(size > 1024*1024*1024) {
            return (size/(1024*1024*1024)).toFixed(1)+"Гб"
        }
        if(size > 1024*1024) {
            return (size/(1024*1024)).toFixed(1)+"Мб"
        }
        if(size > 1024) {
            return (size/(1024)).toFixed(1)+"Кб"
        }
        return size+"Б"

    }
    return (
    <>
        <div className='usedSpace'>
            <div className="used-space__upload-bar" style={{width : diskPercent + "%"}}/>
            <div className="used-space__percent">{diskPercent}%</div>
        </div>
        <div className="usedSpace-text__info">
            <div className="usedSpace-text">Занято : {calculateSize(usedSpace)}</div>
            <div className="diskSpace-text">Всего места : {calculateSize(diskSpace)}</div>
        </div>
    </>
  )
}
