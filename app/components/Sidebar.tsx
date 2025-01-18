"use client"

import styles from './Sidebar.module.css';

import SearchBar from './SearchBar';

import { SyntheticEvent, useState, useId, createContext } from 'react';



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



    // Find distance between locations
    function pressButton() {

        console.log(locations);
        
    }



    // Returns sidebar component
    return (
        <>
            <div className={styles["sidebar-container"]}>
                <button className={styles["search-button"]} type="button" onClick={pressButton}>Search</button>
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