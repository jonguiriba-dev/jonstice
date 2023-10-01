import React, { useState } from 'react';
import { IonInput } from '@ionic/react';

const INVALID_CONFIRM_PASSWORD_MESSAGE = "Password and Confirm Password should match"

type Props = {
  dataCallback:(val:string, isValid:boolean)=>void,
  value: string
}

const ConfirmPasswordInput :React.FC<Props> = (props:Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    let isValid = value === props.value
    
    setIsValid(isValid)
    
    if(props.dataCallback){
      props.dataCallback(value, isValid || false)
    }

  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <IonInput
      className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
      type="password"
      fill="solid"
      label="Confirm Password"
      labelPlacement="floating"
      helperText=""
      errorText={INVALID_CONFIRM_PASSWORD_MESSAGE}
      onIonInput={(event) => validate(event)}
      onIonBlur={() => markTouched()}
    ></IonInput>
  );
}
export default ConfirmPasswordInput;