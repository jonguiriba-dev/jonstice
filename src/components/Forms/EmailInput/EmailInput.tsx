import React, { useState } from 'react';
import { IonInput } from '@ionic/react';




const EmailInput = (props:{
  dataCallback: (val:string, isValid:boolean)=>void
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();
const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

  const validateEmail = (email: string) => {
    return email.match(emailRegex);
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;

    if(props.dataCallback){
      props.dataCallback(value, isValid || false)
    }

    setIsValid(undefined);

    if (value === '') return;

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonInput
      className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
      type="email"
      fill="solid"
      label="Email"
      labelPlacement="floating"
      helperText=""
      errorText="Invalid email"
      onIonInput={(event) => validate(event)}
      onIonBlur={() => markTouched()}
    ></IonInput>
  );
}
export default EmailInput;