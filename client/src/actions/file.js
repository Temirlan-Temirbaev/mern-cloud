import axios from 'axios'
import {setFiles, addFile, deleteFileAction, } from "../reducers/fileReducer";

export function getFiles(dirId, sort){
    return async dispatch => {
        try {
            dispatch({type : "SHOW_LOADER"})
            let url = `http://localhost:5000/api/files`
            if(dirId) url = `http://localhost:5000/api/files?parent=${dirId}`;
            if(sort) url = `http://localhost:5000/api/files?sort=${sort}`
            if(dirId && sort) url = `http://localhost:5000/api/files?parent=${dirId}&sort=${sort}`
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }) 
            console.log(response.data)
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }   finally{
            dispatch({type : "HIDE_LOADER"})
        }
    }
}
export function createDir(dirId, name){
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/files`,{
                name,
                parent : dirId,
                type : 'dir'
            }, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response.data)
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export function uploadFile(file, dirId ){
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if(dirId) formData.append('parent', dirId)
            const uploadFile = {name : file.name , progress: 0, id : Date.now()}
            dispatch({type : "SHOW_UPLOADER"})
            dispatch({type : "ADD_UPLOAD_FILE", payload : uploadFile})
            const response = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                },
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    console.log('total', totalLength)
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch({type : "CHANGE_UPLOAD_FILE", payload : uploadFile})
                    }
                }
            })
            dispatch(addFile(response.data))
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}
export async function downloadFile(file){
    const response = await fetch(`http://localhost:5000/api/files/download?id=${file._id}`, {
        headers : {Authorization : `Bearer ${localStorage.getItem('token')}`}
    })
    if(response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        console.log(blob);
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name;
        document.body.appendChild(link)
        link.click();
        link.remove()
    }
}
export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e?.response?.data?.message)
        }
    }
}

