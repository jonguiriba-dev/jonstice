import { useHistory } from "react-router";

export default class UtilService{
    
    static nav(target: string){
        const history = useHistory()
        history.push(target)
    }
}