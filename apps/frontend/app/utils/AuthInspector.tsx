import { jwtDecode } from "jwt-decode"
import { User } from "./context/UserContext"
import { useRouter } from "next/router"
import { useEffect } from "react"
export class AuthInspector{
    private constructor(){}

    public static isAuthenticated(): boolean{
        
        const token = localStorage.getItem('cryptex-token')
        console.log(token)
        window.dispatchEvent(new Event('cryptex-token'))
        if(!token){
            return false
        } else{
            return true
        }
    }
}