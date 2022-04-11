import actions from "./actions"

const initialReducerState = {
    isLoggedIn: localStorage.getItem( "isLoggedIn" ) === "true",
    user: JSON.parse( localStorage.getItem( "user" ) || "false" ),
}

const reducer = ( initialState: any, { type, data }: any ) => {
    const state = { ...initialState, isLoggedIn: localStorage.getItem( "isLoggedIn" ), isLoading: false }
    switch (type) {
        case actions.LOAD:
            return { ...state, isLoading: true, error: null };
        case actions.ERROR:
            return { ...state, ...data };
        case actions.AUTHENTICATED:
            return { ...state, ...data }
        case actions.UNAUTHENTICATED:
            return { ...state, user: null }
        case actions.AUTHENTICATION_ERROR:
            return { ...state, user: null, error: "Fout tijdens inloggen" }
        default:
            throw new Error(`Unhandled action type: ${type}`)
    }
}

export default reducer
export { initialReducerState }