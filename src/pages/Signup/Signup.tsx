import {  IonButton, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonPage, IonRow } from '@ionic/react';
import './Signup.css';

import { Action } from '../../components/Etc/Action/Action';
import { Wave } from '../../components/Etc/Wave/Wave';
import { useState } from 'react';
import { useHistory } from 'react-router';
import EmailInput from '../../components/Forms/EmailInput/EmailInput';
import PasswordInput from '../../components/Forms/PasswordInput/PasswordInput';
import FirebaseService from '../../services/Firebase/Firebase';
import Header from '../../components/Header/Header';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import ConfirmPasswordInput from '../../components/Forms/ConfirmPasswordInput/ConfirmPasswordInput';

const ERROR_MESSAGE = "Something went wrong"

const Signup: React.FC = () => {
    const history = useHistory()

    const [ hasError, setHasError ] = useState(false);
    const [ email, setEmail] = useState("");
    const [ password, setPassword] = useState("");
    const [ username, setUsername] = useState("");
    const [ isShowContextMenu, setIsShowContextMenu ] = useState(false);
    const [ isEmailValid, setIsEmailValid ] = useState(false);
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);
    const [ isConfirmPasswordValid, setIsConfirmPasswordValid ] = useState(false);
  

    const submit = () => {
        if(isEmailValid && isPasswordValid && isConfirmPasswordValid && username.length > 0){
            FirebaseService.signup(username, email,password).then(res=>{
                history.push("/login")
            }).catch(err=>{
                setHasError(true)
            })
        }
    }


  return (
    <IonPage className="signup-page">
        <IonContent fullscreen>
            <Header toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
            <ContextMenu show={isShowContextMenu} toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
            <div className='form-container'>
                <IonGrid className="form ion-padding">
                    <IonRow>
                        <IonCol size="12" className="heading-text">
                            <IonCardTitle>Sign Up</IonCardTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <h6 className={`error-text ${hasError ? '' : 'hidden'}`}>{ERROR_MESSAGE}</h6>
                        </IonCol>
                    </IonRow>
                    <IonRow className="form-row ion-margin-top ion-padding-top">
                        <IonCol size="12">
                            <IonInput 
                                type='text' 
                                name='username' 
                                fill="solid" 
                                label="Username" 
                                labelPlacement="floating" 
                                onIonInput={(ev) => setUsername(ev.target.value+"")}/>
                            <EmailInput 
                                dataCallback={(val, isValid)=>{
                                    setEmail(val)
                                    setIsEmailValid(isValid)
                                }}
                                />
                            <PasswordInput 
                                dataCallback={(val, isValid)=>{
                                    setPassword(val)
                                    setIsPasswordValid(isValid)
                                }} 
                                enableValidation={true}
                            />
                            <ConfirmPasswordInput
                                value={password}
                                dataCallback={(val, isValid)=>{
                                    setIsConfirmPasswordValid(isValid)
                                }} />
                            <IonButton className="custom-button" expand="block" onClick={ submit }>Signup</IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <Action message="Already have an account?" text="Sign in" link="/login" />
                    </IonRow>

                </IonGrid>
            </div>
        </IonContent>
        <Wave/>
    </IonPage>
  );
};

export default Signup;
