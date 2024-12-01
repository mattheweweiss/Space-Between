"use client"

import styles from './Map.module.css';

import { useEffect, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';



// Interface for map component props
interface MapProps {
    mapboxAccessToken: string;
}



// Creates map component
const MapComponent : React.FC<MapProps> = ({mapboxAccessToken}) => {

    // Initializes map container and map as null
    const mapContainer = useRef<HTMLDivElement>(null)
    let map : Map | null = null;



    // Loads map on initial render
    useEffect(() => {

        // Creates map when map container has been created
        if (mapContainer.current) {

            // Creates map
            map = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [-77.0369, 38.9072],
                zoom: 5,
                accessToken: mapboxAccessToken,
                attributionControl: false
            });
        }

    
    }, []);


    // Returns map container
    return (
        <div ref={mapContainer} id="map-container" className={styles["map-container"]}></div>
    );


};



export default MapComponent;