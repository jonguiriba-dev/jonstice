import { IonContent, IonPage } from '@ionic/react';
import { useHistory, useLocation } from "react-router";
import UserService from '../../services/User/User';
import { useEffect, useState } from 'react';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import Header from '../../components/Header/Header';
import Posts from '../../components/Home/Posts/Posts';
import ActionCard from '../../components/Home/ActionCard/ActionCard';
import HttpService from '../../services/Http/Http';
import _ from 'lodash';
import './Home.css';


const Home: React.FC = () => {
  
  useHistory()
  useLocation();

  const [ user, setUser ] = useState({} as User);
  const [ posts, setPosts ] = useState([] as Post[]);
  const [ isShowContextMenu, setIsShowContextMenu ] = useState(false);
  
  useEffect(()=>{
    HttpService.get('posts').then(res=>{
      setPosts(res.data)
    })
  },[])

  useEffect(()=>{
    let userData = UserService.getUser()
    if(!_.isEqual(userData, user))
      setUser(userData)
  })

  return (
    <IonPage className='home-page'>
      <Header toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
      <ContextMenu 
        show={isShowContextMenu} 
        toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}
      />

      <IonContent fullscreen>
        <div className='main-container'>
          <Posts data={posts}/>
          <ActionCard/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;

