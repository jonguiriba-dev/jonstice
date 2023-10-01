export default class UserService{


    static getUser(){
        var userStr = localStorage.getItem("user")
        
        if(!userStr) return null

        return JSON.parse(userStr)
    }
}