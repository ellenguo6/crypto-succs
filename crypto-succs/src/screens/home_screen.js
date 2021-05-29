import PlantGrid from "../plant_grid";

export default function HomeScreen(props) {
    return(
        <PlantGrid plants={props.plants}/>
    );
}