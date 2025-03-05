//author Andrew Pasimio

import React from "react";
import { useState } from "react";


//use props to pass in the hotel info when we grab it from the api
const Hotel = (/*{props}*/) => {
    const [inTrip, setInTrip] = useState(false);

    const props ={
        name: "Hotel Name",
        description: "Hotel Description",
        location: "Hotel Location",
        price: "Hotel Price",
        image: "https://as1.ftcdn.net/v2/jpg/00/29/13/38/1000_F_29133877_bfA2n7cWV53fto2BomyZ6pyRujJTBwjd.jpg"
    }
    const handleClick = () => {
        if(inTrip){
            handleRemoveFromTrip();
        }
        else {
            handleAddToTrip();
        }
    }
    const handleRemoveFromTrip = () => {
        console.log("Removed ${props.name} from trip");
        setInTrip(false);
    }
    const handleAddToTrip = () => {
        console.log("Added ${props.name} to trip");
        setInTrip(true);
    }
    return (
        <div>
            <img src={props.image} alt="hotel" />
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>{props.location}</p>
            <p>{props.price}</p>
            <button onClick={() => setInTrip(!inTrip)}>{inTrip ? "Remove from Trip" : "Add to Trip"}</button>
        </div>
    );
}

export default Hotel;