import {useParams} from "react-router-dom";

export default function PlantScreen(props) {
    const plants = props.plants;
    const {id} = useParams();
    const plant = plants[id];

    return(
        <div>
            <h1>Name: {plant.name}</h1>
            <h1>ID: {id}</h1>
            <h1>DNA: {plant.dna}</h1>
            <h1>Happiness: {plant.happiness}</h1>
            <h1>Growth: {plant.growth}</h1>
        </div>
    );
}