import { useContext, useCallback } from 'react'
import { AuthBlocker } from '../Provider'
import actions from "./actions"
import axios from "axios"
import { useToasts } from "react-toast-notifications"

const headers = { "Content-Type": "multipart/form-data" }
const API = process.env.REACT_APP_API_URL?.replace("5000", "5001")

function useAuth() {
    const context = useContext( AuthBlocker )
    const { addToast } = useToasts()
    
    if ( context === undefined ) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    const { state, dispatch } = context

    const authenticate = async ( loginForm: FormData ) => {
        try {
            addToast("Inloggen...", { appearance: "info", autoDismiss: true } )
            const { data } = await axios.post( `${ API }/login`, loginForm, { headers });
            if ( data.user ) {
                localStorage.setItem( "user", JSON.stringify( data.user ) )
                addToast("Ingelogd", { appearance: "success", autoDismiss: true } )
                
                dispatch( { type: actions.AUTHENTICATED, data: { user: data.user } } )
            } else {
                localStorage.removeItem( "user" )
                addToast("Ongeldige gebruikersinformatie", { appearance: "warning", autoDismiss: true } )
            }
        } catch ( e ) {
            addToast("Fout tijdens inloggen", { appearance: "error", autoDismiss: true } )
        }
    }
    
    const logout = async () => {
        await axios.post( "/api/logout" )
        localStorage.removeItem( "user" )
        addToast("Uitgelogd", { appearance: "warning", autoDismiss: true } )
        dispatch( { type: actions.UNAUTHENTICATED } )
    }

    const handleUnauthenticated = useCallback( async () => {
        localStorage.removeItem( "user" )
        dispatch( { type: actions.UNAUTHENTICATED } )
    }, [ dispatch ] )

    return [ 
        state,
        {
            authenticate,
            logout,
            handleUnauthenticated,
        },
    ]
}

export { useAuth }