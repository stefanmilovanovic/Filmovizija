import { ReactElement } from "react";
import Loading from "./Ucitavanje";

export default function GenericList(props: genericListProps){

    if(!props.list){
        if(props.loadingUI){
            return props.loadingUI;
        }
        else return <Loading/>
    }else if(props.list.length === 0){
        if(props.emptyListUI){
            return props.emptyListUI;
        }
        else return <>Nema filmova u ovoj kategoriji...</>
    }else{
        return props.children;
    }
}

interface genericListProps {
    list: any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}