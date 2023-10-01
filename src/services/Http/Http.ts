import axios from 'axios';

export default class HttpService{
    
    static SERVER_URL = 'http://localhost:3000'

    static get(path:string){
        return axios.get(`${HttpService.SERVER_URL}/${path}`)
    }
    
    static post(path:string, data:any){
        return axios.post(`${HttpService.SERVER_URL}/${path}`, data)
    }
}