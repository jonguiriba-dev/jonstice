import { IonCard, IonCardContent, IonButton, IonGrid, IonRow, IonCol } from "@ionic/react"
import './ActionCard.css'

type Props = {
}

const ActionCard: React.FC<Props> = (props:Props) => {
    return (
          
          <IonCard className='action-container'>
            <div className='banner'>
              <h6 style={{textAlign:"center"}}>COOL BANNER</h6>
            </div>
            <IonCardContent>
              <div className='action-row'>
                <IonButton routerLink="/post">Post</IonButton>
              </div>
              <hr/>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <h6>Privacy Policy</h6>
                  </IonCol>
                  <IonCol>
                    <h6>User Agreement</h6>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <h6>Content Policy</h6>
                  </IonCol>
                  <IonCol>
                    <h6>Code of Conduct</h6>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
    )
}

export default ActionCard