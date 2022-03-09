import { baseActions } from "."

const reducer = ( state, { type, data } ) => {
    switch (type) {
        case baseActions.LOAD:
            return { ...state, ...data, isLoading: true }
        case baseActions.SET_DATA:
            return { ...state, ...data, isLoading: false }
        default:
            console.error("Not implemented", type)
            return { ...state, ...data, isLoading: false }
    }
}

export default reducer