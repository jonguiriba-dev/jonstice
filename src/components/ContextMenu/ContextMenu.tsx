import { IonButton, IonCard, IonCardContent, IonCardTitle, IonContent, IonHeader, IonIcon, IonItem, IonList, IonPage, IonTitle, IonToolbar, useIonModal } from '@ionic/react';
import './ContextMenu.css';
import { useHistory, useLocation } from "react-router";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import FirebaseService from '../../services/Firebase/Firebase';



type Props = {
    show:boolean,
    toggleContextMenuCallback:(toggle:boolean)=>void
}

const ContextMenu: React.FC<Props> = (props:Props) => {
  return (
      <IonCard className={`context-menu ${!props.show ? 'hidden' : ''}`} >
        <IonCardContent>
          <IonList lines="none">
            <IonItem>
             <h4>Profile</h4>
            </IonItem>
            <IonItem>
              <h4>Settings</h4>
            </IonItem>
            <IonItem 
                onClick={()=>{
                    FirebaseService.signout()
                    props.toggleContextMenuCallback(false)
                }}>
              <h4>Logout</h4>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
      
  );
};

export default ContextMenu;

