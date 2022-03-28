const defaultState = {
    src : '',
    fileType : '',
    opened : false,
}


export default function readFileReducer(state = defaultState, action){
    switch(action.type){
        case "SHOW_READER":
            return {...state, opened : true}
        case "HIDE_READER": return {...state, opened : false}
        case "READ_FILE":
            return {...state, src : action.payload.src, fileType : action.payload.type}
        default:
            return state
    }
}