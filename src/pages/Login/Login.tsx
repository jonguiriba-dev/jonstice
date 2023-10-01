import { IonButton,  IonCardTitle, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import { Action } from '../../components/Etc/Action/Action';
import { Wave } from '../../components/Etc/Wave/Wave';
import { useState } from 'react';
import { useHistory } from 'react-router';
import EmailInput from '../../components/Forms/EmailInput/EmailInput';
import PasswordInput from '../../components/Forms/PasswordInput/PasswordInput';
import FirebaseService from '../../services/Firebase/Firebase';
import Header from '../../components/Header/Header';
import ContextMenu from '../../components/ContextMenu/ContextMenu';

import './Login.css';

const ERROR_MESSAGE = 'Invalid username or password'

const Login: React.FC = () => {
    const history = useHistory()

    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ isShowContextMenu, setIsShowContextMenu ] = useState(false);
    const [ errorText, setErrorText ] = useState("");

    const login = () => {
        FirebaseService.login(email,password).then(res=>{
            localStorage.setItem("user", JSON.stringify(res.user))
            history.replace("/",{loginSuccess:true})
        }).catch(err=>{
            setErrorText(ERROR_MESSAGE)
        })
    }

  return (
    <IonPage className="login-page">
        <Header toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
        <ContextMenu show={isShowContextMenu} toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
        <IonContent fullscreen>
            <div className='form-container'>
                <IonGrid className="form ion-padding">
                    <IonRow>
                        <IonCol size="12" className="heading-text">
                            <IonCardTitle>Log in</IonCardTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                         <h6 className='error-text'>{errorText}</h6>
                        </IonCol>
                    </IonRow>
                    <IonRow className="form-row">
                        <IonCol size="12">
                            <EmailInput dataCallback={(val)=>{setEmail(val)}}/>
                            <PasswordInput dataCallback={(val)=>{setPassword(val)}}/>
                            <IonButton className="custom-button" expand="block" onClick={ login }>Login</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <Action message="Don't have an account?" text="Sign up" link="/signup" />
                    </IonRow>

                </IonGrid>
            </div>
        </IonContent>
        <Wave/>
    </IonPage>
  );
};

export default Login;
