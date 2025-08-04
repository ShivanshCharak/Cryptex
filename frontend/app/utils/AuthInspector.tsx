'use client'

import { toast } from "react-toastify";
import { jwtDecode, JwtPayload } from "jwt-decode";

export class AuthInspector {
  private constructor() {}

  private static isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch {
      return true;
    }
  }

  public static async isAuthenticated(): Promise<JwtPayload | null> {
    const token = localStorage.getItem("cryptex-token");

    if (!token || this.isTokenExpired(token)) {
      // Try refreshing the token
      try {
        const res = await fetch("http://localhost:3003/auth/me", {
          credentials: "include",
          method: "GET",
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("cryptex-token", data.accessToken);
          toast.success(data.message);

          const user = jwtDecode<JwtPayload>(data.accessToken);
          console.log("user", user);
          return user;
        }

        // Not authenticated
        return null;
      } catch (e) {
        return null;
      }
    }

    // Token exists and is valid
    return jwtDecode<JwtPayload>(token);
  }
}
