import React from "react";
import PlantGrid from "../plant_grid";
import "../index.css";
import Shelves from "../images/shelves.png";

export default function HomeScreen(props) {
    return(
        <>
        <div className="background" >
          <PlantGrid plants={props.plants} pots={props.pots}/>

      </div>
        
        
        </>
    );
}