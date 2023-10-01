import { IonCol, IonRouterLink, IonRow } from "@ionic/react";

type Props = {
    message:String,
    text:string
    link:string,
}


export const Action : React.FC<Props> = (props:Props) => (
    <IonRow className="ion-text-center ion-justify-content-center">
        <IonCol size="12">
            <p>
                { props.message }
                <IonRouterLink className="custom-link" routerLink={ props.link }> { props.text } &rarr;</IonRouterLink>
            </p>
        </IonCol>
    </IonRow>
);