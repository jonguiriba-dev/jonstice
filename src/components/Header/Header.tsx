import { IonButton, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';
import { personCircleOutline } from 'ionicons/icons';
import { useHistory } from "react-router";
import { useEffect, useState } from 'react';
import _ from 'lodash';
import UserService from '../../services/User/User';
import { Link } from 'react-router-dom';

type Props = {
    toggleContextMenuCallback: (toggle:boolean) => void
}

const Header: React.FC<Props> = (props:Props) => {
  const [ user, setUser ] = useState({} as User);
  const [ isShowContextMenu, setIsShowContextMenu ] = useState(false);
  const history = useHistory()

  
  useEffect(()=>{
    let userData = UserService.getUser()
    if(!_.isEqual(userData, user)){
        setUser(userData)
    }
  })

  const onClickUserIcon = ()=>{
    if(UserService.getUser()){
      setIsShowContextMenu(!isShowContextMenu)
    }
    props.toggleContextMenuCallback(!isShowContextMenu)
  }
  
  const loginButton = 
    <IonButton onClick={ ()=> history.push('/login') }>
        <span style={{color:"#fff"}} >Log In</span>
    </IonButton>

  return (
    <IonHeader className='header'>
        <IonToolbar>
            <IonTitle style={{textAlign:"start"}} size="large" >
              <Link className="link" to="/">Jonstice</Link>
            </IonTitle>
        </IonToolbar>
        <IonToolbar className='user-toolbar'>
            <div>
                <h6>{user ? user.displayName : "Guest"}</h6>
                <IonIcon 
                    className={`user-icon ${user ? "active":'' }`} 
                    icon={personCircleOutline} 
                    onClick={onClickUserIcon}
                />
                {user ? null : loginButton}
            </div>
        </IonToolbar>
    </IonHeader>
  );
};

export default Header;
