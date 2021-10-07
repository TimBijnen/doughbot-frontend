import { createContext, useReducer } from 'react'
import reducer, { initialReducerState } from "./hooks/reducer"

const AuthBlocker = createContext<any|undefined>( undefined )

function AuthProvider( { children }: any ) {
    const [ state, dispatch ] = useReducer( reducer, initialReducerState )
    const value = { state, dispatch }
    return <AuthBlocker.Provider value={ value }>
        { children }
    </AuthBlocker.Provider>
}

export {
    AuthProvider,
    AuthBlocker,
}