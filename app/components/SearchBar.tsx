import styles from './SearchBar.module.css';

import SearchResults from './SearchResults';

import { useState, useEffect } from 'react';



// Interface for search bar component props
interface SearchBarProps {
    mapboxAccessToken: string;
}



// Creates search bar component
const SearchBar : React.FC<SearchBarProps> = ({ mapboxAccessToken }) => {


    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);


    // Updates search, recalling Mapbox Geocoding API
    function updateSearch() {
        setSearch(document.getElementById("search-bar").value);
    }



    // Makes Mapbox Geocoding API call every time the search value changes
    useEffect(() => {

        
        // Fetches data from Mapbox Geocoding API
        fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${search}&access_token=${mapboxAccessToken}`)
            .then((response) => {
                
                if (!response.ok) {
                    throw new Error('Could not search')
                } else {
                    return response.json();
                }

            })
            // Sets results
            .then ((data) => {
                setResults(data.features);
            });

    }, [search]);


    return (
        <>
            <div className={styles["search-bar-container"]}>
                <input id="search-bar" className={styles["search-bar"]} onChange={updateSearch} />
                {
                    results.length > 0 ? <SearchResults results={results} /> : <></>
                }
            </div>
        </>
    )


}



export default SearchBar;