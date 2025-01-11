import styles from './SearchBar.module.css';

import SearchResults from './SearchResults';

import { useState, useEffect } from 'react';



// Interface for search bar component props
interface SearchBarProps {
    mapboxAccessToken: string;
}



// Creates search bar component
const SearchBar : React.FC<SearchBarProps> = ({ mapboxAccessToken }) => {


    const [results, setResults] = useState([]);



    // Makes Mapbox Geocoding API call every time the search value changes
    function updateSearch(update: Object) {

        // Gets search
        const search = update.target.value;

        
        // Fetches data from Mapbox Geocoding API
        fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${search}&access_token=${mapboxAccessToken}`)
            .then((response) => {
                
                if (!response.ok) {
                    throw new Error('Could not search');
                } else {
                    return response.json();
                }

            })
            // Sets results
            .then ((data) => {
                setResults(data.features);
            });

    };


    // Returns search bar container
    return (
        <>
            <div className={styles["search-bar-container"]}>
                <input className={styles["search-bar"]} onChange={updateSearch.bind(this)} />
                {
                    results.length > 0 ? <SearchResults results={results} /> : <></>
                }
            </div>
        </>
    );


}



export default SearchBar;