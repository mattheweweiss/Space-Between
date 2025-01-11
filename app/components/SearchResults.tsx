import styles from './SearchResults.module.css';

import SearchResult from './SearchResult';



// Interface for search results component props
interface SearchResultsProps {
    results: Array<any>;
}



// Creates search results component
const SearchResults : React.FC<SearchResultsProps> = ({ results }) => {


    // Returns search results container
    return (
        <>
            <div className={styles["search-results-container"]}>
                {
                    results.map((result: any) : any => {
                        return <SearchResult result={result} />
                    })
                }
            </div>
        </>
    )


}



export default SearchResults;