"use client"

import styles from './Sidebar.module.css';

import SearchBar from './SearchBar';

import { useState, useId, createContext } from 'react';



// Initializing locations dictionary
let locationsDict : { [id: string] : Object } = {};



// Interface for sidebar component props
interface SidebarProps {
    mapboxAccessToken: string;
}



// Creates sidebar component
const SidebarComponent : React.FC<SidebarProps> = ({ mapboxAccessToken }) => {


    // State for locations
    const [locations, setLocations] = useState<Object>({});


    // Setting search bar IDs
    const searchBarId1 : string = useId();
    const searchBarId2 : string = useId();



    // Adds location to locations
    // Replaces location if updated
    function addLocation(searchBar: HTMLInputElement, location: Object) {

        locationsDict[searchBar.id] = location;
        setLocations(locationsDict);

    }



    // Finds center between two locations
    function calculateDistance() {


        // Ensures that each search bar has a selected value
        if (locations[`${searchBarId1}`] && locations[`${searchBarId2}`]) {


            // Formats coordinates for API call
            const coordinates1 : Array<number> = locations[`${searchBarId1}`].geometry.coordinates;
            const formattedCoordinates1 = `${coordinates1[0]},${coordinates1[1]}`;

            const coordinates2 : Array<number> = locations[`${searchBarId2}`].geometry.coordinates;
            const formattedCoordinates2 = `${coordinates2[0]},${coordinates2[1]}`;


            // Calculates coordinates for midpoint
            const midpointCoordinates : Array<number> = [(coordinates1[0] + coordinates2[0]) / 2, (coordinates1[1] + coordinates2[1]) / 2];
            // Formats midpoint coordinates for API call
            const formattedMidpointCoordinates = `${midpointCoordinates[0]},${midpointCoordinates[1]}`;



            // Fetches directions from first input to midpoint
            fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${formattedCoordinates1};${formattedMidpointCoordinates}?access_token=${mapboxAccessToken}`)
                .then((response) => {
                    
                    if (!response.ok) {
                        throw new Error('Could not search');
                    } else {
                        return response.json();
                    }

                })
                .then((data) => {
                    console.log(data); 
                });
            

            // Fetches matrix for first input to midpoint, which contains array of durations, array of distances, and array of sources
            // Sources are waypoint objects, which contains waypoint name, location (long, lat), and time zone.
            fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${formattedCoordinates1};${formattedMidpointCoordinates}?access_token=${mapboxAccessToken}`)
                .then((response) => {
                    
                    if (!response.ok) {
                        throw new Error('Could not search');
                    } else {
                        return response.json();
                    }

                })
                .then((data) => {
                    console.log(data); 
                });



            // Fetches directions from second input to midpoint
            fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${formattedCoordinates2};${formattedMidpointCoordinates}?access_token=${mapboxAccessToken}`)
                .then((response) => {
                    
                    if (!response.ok) {
                        throw new Error('Could not search');
                    } else {
                        return response.json();
                    }

                })
                .then((data) => {
                    console.log(data); 
                });


            // Fetches matrix for second input to midpoint, which contains array of durations, array of distances, and array of sources
            // Sources are waypoint objects, which contains waypoint name, location (long, lat), and time zone.
            fetch(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${formattedCoordinates1};${formattedMidpointCoordinates}?access_token=${mapboxAccessToken}`)
                .then((response) => {
                    
                    if (!response.ok) {
                        throw new Error('Could not search');
                    } else {
                        return response.json();
                    }

                })
                .then((data) => {
                    console.log(data); 
                });


        }
        
    }



    // Returns sidebar component
    return (
        <>
            <div className={styles["sidebar-container"]}>
                <button className={styles["search-button"]} type="button" onClick={calculateDistance}>Search</button>
                <div className={styles["sidebar"]}>
                    <div className={styles["search-bar-group-container"]}>
                        <p className={styles["search-bar-title"]}>Location 1</p>
                        <LocationContext.Provider value={{ addLocation }}>
                            <SearchBar id={searchBarId1} mapboxAccessToken={mapboxAccessToken} />
                        </LocationContext.Provider>
                            
                    </div>
                    <div className={styles["search-bar-group-container"]}>
                        <p className={styles["search-bar-title"]}>Location 2</p>
                        <LocationContext.Provider value={{ addLocation }}>
                            <SearchBar id={searchBarId2} mapboxAccessToken={mapboxAccessToken} />
                        </LocationContext.Provider>
                    </div>
                </div>
            </div>
        </>
    )

} 



export default SidebarComponent;



// Dictates structure of location context
export type LocationContextShape = {
    addLocation: (searchBar: HTMLInputElement, location: Object) => void;
}



// Creates context for location
// Used to access update locations in nested components
export const LocationContext = createContext({} as LocationContextShape);