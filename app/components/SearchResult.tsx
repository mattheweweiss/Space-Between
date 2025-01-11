import styles from './SearchResult.module.css';

import { centerMap } from './Map';



// Interface for search result component props
interface SearchResultProps {
    result: object;
}



// Creates search result component
const SearchResult : React.FC<SearchResultProps> = ({ result }) => {

    // Updates search bar text with selected search
    function updateSearchBarText() {
        document.getElementById("search-bar").value = result.properties.name;
    }


    // Returns search result container
    return (
        <>
            <div className={styles["search-result-container"]} onClick={() => {
                centerMap(result.properties.coordinates);
                updateSearchBarText();
            }}>
                {result.properties.name}
            </div>
        </>
    );

}

export default SearchResult;