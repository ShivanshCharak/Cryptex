export class AuthInspector{
    private constructor(){}

    public static isAuthenticated(): boolean{
        
        const token = localStorage.getItem('cryptex-token')
        console.log(token)
        if(!token){
            return false
        } else{
            return true
        }
    }
}