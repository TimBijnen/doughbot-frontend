import { Redirect, useLocation } from "react-router-dom"
import { useAuth } from "./hooks/auth"

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function AuthBlocker() {
    const query = useQuery()
    const token = query.get("token")
    const [ state ] = useAuth()
    console.log(!state.user && !token ? "REDIRECT" : "FALSE" )
    if ( !state.user && !token ) {
        console.log("!!!")
        // return (<Redirect to={ { pathname: "/login", state: { message: "Niet ingelogd" } } } />)
        return <Redirect to="/login" />
    }
    return null
}

function PermissionBlocker( { children, roles, redirect }: any ) {
    const query = useQuery()
    const token = query.get("token")
    const [ { user } ] = useAuth()
    let hasAnyRole = false;

    if ( !user && !token  ) {
        return null
    }
    
    (roles||[]).forEach( ( role: any ) => {
        if ( !hasAnyRole ) {
            hasAnyRole = (user.roles || []).indexOf( role ) >= 0
        }
    } )

    if ( !hasAnyRole && !token ) {
        if ( redirect ) {
            return <Redirect to={ { pathname: redirect, state: { message: "Niet ingelogd" } } } />
        }
        return null
    }
    return children
}

export default AuthBlocker
export {
    PermissionBlocker,
}