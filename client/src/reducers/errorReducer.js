const defaultState = {
    errorName : '',
    errorType : '',
}

export default function errorReducer(state = defaultState, action){
    switch(action.type){
        case 'AUTH_ERROR':
            return {...state, errorName : 'Ошибка авторизации, попробуйте перезапустить страницу', errorType : 'Auth'}
        case 'LOG_ERROR':
            return {...state, errorName: 'Ошибка регистраци, некорректная почта', errorType : 'Login error'}
    }
}