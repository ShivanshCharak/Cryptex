'use client'

import { toast } from "react-toastify";
import { useUserAuth,User } from "./context/UserProvider";
import { jwtDecode, JwtPayload } from "jwt-decode";


export class AuthInspector {
  private constructor() {}

  public static async isAuthenticated():Promise<JwtPayload|null> {
    try {

      const res = await fetch('http://localhost:3003/auth/me', {
        credentials: 'include',
        method:"GET"
      });
      if(res.ok){
        const data = await res.json()
        localStorage.setItem("cryptex-token",data.accessToken)
        toast.success(data.message)
        const user  = jwtDecode(data)
        return user
      }

      return null
    } catch (e) {
      return null;
    }
  }
}


