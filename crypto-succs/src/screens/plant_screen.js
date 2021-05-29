export default function PlantScreen(props) {
    const plant = props.plant;

    return(
        <div>
            <h1>Name: {plant.name}</h1>
            <h1>DNA: {plant.dna}</h1>
            <h1>Happiness: {plant.happiness}</h1>
            <h1>Growth: {plant.growth}</h1>
        </div>
    );
}