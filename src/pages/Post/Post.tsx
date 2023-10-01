import { IonButton, IonCard, IonContent, IonInput, IonItem, IonPage, IonTextarea, IonTitle } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../../components/Header/Header';
import ContextMenu from '../../components/ContextMenu/ContextMenu';
import HttpService from '../../services/Http/Http';

import './Post.css';

const Post: React.FC = () => {
  const history = useHistory()
  const [title,setTitle] = useState('')
  const [text,setText] = useState('')
  const [ isShowContextMenu, setIsShowContextMenu ] = useState(false);

  const submit = ()=>{
    HttpService.post("post", {title,text}).then((res)=>{
        history.push("/", {fromSubmit:true})
    }).catch(err=>{
        console.log("err ",err)
    })
  }


  return (
    <IonPage className="post-page">
        <Header toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}/>
        <ContextMenu 
            show={isShowContextMenu} 
            toggleContextMenuCallback={(toggle)=> setIsShowContextMenu(toggle)}
        />
        <IonContent fullscreen>
                <IonCard className='post-form-container'>
                    <IonTitle style={{color:"#fff"}}>Post</IonTitle>
                    <IonCard>
                            <IonInput 
                                type="text"
                                fill="solid"
                                placeholder="Title"
                                value={title}
                                onIonInput={(e) => setTitle(e.target.value+"")}
                            />
                    </IonCard>
                    <IonCard>
                        <IonItem>
                            <IonTextarea 
                                placeholder="Text(optional)"
                                value={text}
                                onIonInput={(e) => setText(e.target.value+"")}
                            />
                        </IonItem>
                    </IonCard>
                    <div style={{display:"flex", justifyContent:"end", padding:"0.6rem"}}>
                        <IonButton onClick={submit}>Post</IonButton>
                    </div>
                </IonCard>
        </IonContent>
    </IonPage>
  );
};

export default Post;
