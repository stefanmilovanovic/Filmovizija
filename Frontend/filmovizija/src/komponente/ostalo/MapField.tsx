import { useFormikContext } from "formik";
import { coordinateDTO } from "../interfejsi/coordinates.model";
import Map from "./Map";

export default function MapField(props:mapFieldProps){

    const objekat = useFormikContext<any>();

    function handleMapClick(coordinates: coordinateDTO){
        objekat.values[props.latField] = coordinates.lat;
        objekat.values[props.lngField] = coordinates.lng;
    }

    return(
        <Map coordinates={props.coordinates}
        handleMapClick={handleMapClick}/>
    )
}

interface mapFieldProps{
    coordinates: coordinateDTO[];
    latField: string;
    lngField: string;
}

MapField.defaultProps  = {
    coordinates: []
}