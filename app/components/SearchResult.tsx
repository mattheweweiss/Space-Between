import styles from './SearchResult.module.css';

import { LocationContext } from './Sidebar';
import { centerMap } from './Map';

import { SyntheticEvent, useContext } from 'react';



// Interface for search result component props
interface SearchResultProps {
    result: object
}



// Creates search result component
const SearchResult : React.FC<SearchResultProps> = ({ result }) => {


    // Getting addLocation function via context
    const { addLocation } = useContext(LocationContext);



    // Finds and returns search bar input element
    function getSearchBar(event: SyntheticEvent<HTMLElement>) {

        var target = event.target as HTMLElement;
        
        // Finds appropriate search bar input from event
        // Needs different pathing depending on if action was with the p element or div element
        if (target.tagName == "P") {
            return target.parentElement.parentElement.previousElementSibling as HTMLInputElement;
        } else if (target.tagName == "DIV") {
            return target.parentElement.previousElementSibling as HTMLInputElement;
        }

    }

    
    // Updates search bar text with selected search
    function updateSearchBar(searchBar: HTMLInputElement) {
        searchBar.value = result.properties.name;
    }



    // Returns search result container
    return (
        <>
            <div className={styles["search-result-container"]} onClick={(event) => {
                centerMap(result.geometry.coordinates);
                updateSearchBar(getSearchBar(event));
                addLocation(getSearchBar(event), result);
            }}>
                
                <p className={styles["search-result"]}>{result.properties.name}</p>
                {
                    result.properties.place_formatted
                    ? <p className={styles["search-result-context"]}>{result.properties.place_formatted}</p>
                    : <></>
                }
                
            </div>
        </>
    );

}



export default SearchResult;