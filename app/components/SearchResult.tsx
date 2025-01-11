import styles from './SearchResult.module.css';

import { centerMap } from './Map';

import { SyntheticEvent } from 'react';



// Interface for search result component props
interface SearchResultProps {
    result: object
}



// Creates search result component
const SearchResult : React.FC<SearchResultProps> = ({ result }) => {

    
    // Updates search bar text with selected search
    function updateSearchBarText(event: SyntheticEvent<HTMLElement>) {

        var target = event.target as HTMLElement;
        
        // Finds appropriate search bar input from event
        // Needs different pathing depending on if action was with the p element or div element
        if (target.tagName == "P") {

            let searchBar = target.parentElement.parentElement.previousElementSibling as HTMLInputElement;
            searchBar.value = result.properties.name;
        
        } else if (target.tagName == "DIV") {

            let searchBar = target.parentElement.previousElementSibling as HTMLInputElement;
            searchBar.value = result.properties.name;
        
        }

    }


    // Returns search result container
    return (
        <>
            <div className={styles["search-result-container"]} onClick={(event) => {
                centerMap(result.properties.coordinates);
                updateSearchBarText(event);
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