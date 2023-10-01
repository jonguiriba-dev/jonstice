import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  signInWithEmailAndPassword, getAuth, Auth, createUserWithEmailAndPassword, updateProfile, signOut  } from 'firebase/auth';

export default class FirebaseService{

    static app: FirebaseApp;
    static auth: Auth
    static init(){
        // TODO: move to a .env 
        const firebaseConfig = {
            apiKey: "AIzaSyCfN8de78JruhMQEeGT9TSXyeyj496LQNU",
            authDomain: "jonstice-885bc.firebaseapp.com",
            projectId: "jonstice-885bc",
            storageBucket: "jonstice-885bc.appspot.com",
            messagingSenderId: "456896739502",
            appId: "1:456896739502:web:944c385cf67506dced153f",
            measurementId: "G-85SNXGJV4E"
        };
            
        let app = initializeApp(firebaseConfig);
        FirebaseService.auth = getAuth(app)
        const analytics = getAnalytics(FirebaseService.app);
        FirebaseService.app = app
    }

    static login(email:string,password:string){
        return signInWithEmailAndPassword(FirebaseService.auth,email,password)
    }

    static signup(username:string, email:string,password:string){
        return createUserWithEmailAndPassword(FirebaseService.auth,email,password).then(res=>{
            updateProfile(res.user, {
                displayName: username
            })
        })
    }

    static signout(){
        localStorage.removeItem('user')
        return signOut(FirebaseService.auth)
    }
}