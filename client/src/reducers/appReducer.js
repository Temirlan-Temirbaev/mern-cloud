const defaultState = {
    loader:false
}

export default function appReducer(state = defaultState, action){
    switch (action.type){
        case "SHOW_LOADER": return {...state, loader: true}
        case "HIDE_LOADER": return {...state, loader: false}

        default : return state
    }
}


export const deleteFileAction = (dirId) => ({type: "DELETE_FILE", payload: dirId})