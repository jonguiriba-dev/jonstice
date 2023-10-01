import React, { useState } from 'react';
import { IonInput } from '@ionic/react';

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
const INVALID_PASSWORD_MESSAGE = "Password should be at least six characters. At least one letter, one number and one special character."

type Props = {
  dataCallback:(val:string, isValid:boolean)=>void,
  enableValidation?: boolean
}

const PasswordInput :React.FC<Props> = (props:Props) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  
  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    let isValid = passwordRegex.test(value)

    if(props.enableValidation){
      setIsValid(isValid)
    }
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
      label="Password"
      labelPlacement="floating"
      helperText=""
      errorText={INVALID_PASSWORD_MESSAGE}
      onIonInput={(event) => validate(event)}
      onIonBlur={() => markTouched()}
    ></IonInput>
  );
}
export default PasswordInput;