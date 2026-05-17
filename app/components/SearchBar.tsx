import styles from './SearchBar.module.css';

import SearchResults from './SearchResults';

import { useState } from 'react';



// Interface for search bar component props
interface SearchBarProps {
    id: string;
    mapboxAccessToken: string;
}



// Creates search bar component
const SearchBar : React.FC<SearchBarProps> = ({ id, mapboxAccessToken }) => {


    // State for results
    const [results, setResults] = useState([]);


    
    // Resets the search results
    // Sent to search result children
    function resetSearchResults() {
        setResults([]);    
    }


    // Makes Mapbox Geocoding API call every time the search value changes
    function updateSearch(update: Object) {

        // Gets search
        const search = update.target.value;

        // If search is blank, resets search results
        if (search.trim() === "") {
            setResults([]);
        } else {
        
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
                    console.log(data.features);
                });
        
        }

    };


    // Returns search bar container
    return (
        <>
            <div className={styles["search-bar-container"]}>
                <input id={id} className={`search-bar ${styles["search-bar"]}`} onChange={updateSearch.bind(this)} />
                {
                    results.length > 0 ? <SearchResults results={results} resetSearchResults={resetSearchResults} /> : <></>
                }
            </div>
        </>
    );


}



export default SearchBar;