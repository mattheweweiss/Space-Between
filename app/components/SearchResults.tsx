import styles from './SearchResults.module.css';

import SearchResult from './SearchResult';



// Interface for search results component props
interface SearchResultsProps {
    results: Array<any>,
    resetSearchResults: () => void
}



// Creates search results component
const SearchResults : React.FC<SearchResultsProps> = ({ results, resetSearchResults }) => {


    // Returns search results container
    return (
        <>
            <div className={styles["search-results-container"]}>
                {
                    results.map((result: any, index: Number) : any => {
                        return <SearchResult key={`result${index}`} result={result} resetSearchResults={resetSearchResults} />
                    })
                }
            </div>
        </>
    );


}



export default SearchResults;