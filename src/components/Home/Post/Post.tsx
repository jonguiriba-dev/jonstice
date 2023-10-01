import { IonCard, IonCardContent, IonCardTitle } from "@ionic/react"
import './Post.css'

const Post: React.FC<Post> = (props:Post) => {
    return (
        <IonCard className='post'>
            <IonCardTitle className='ion-padding'>{props.title}</IonCardTitle>
            <IonCardContent>{props.text}</IonCardContent>
        </IonCard>
    )
}

export default Post