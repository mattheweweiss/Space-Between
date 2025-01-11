import styles from './SearchResult.module.css';



// Interface for search result component props
interface SearchResultProps {
    result: object;
}



// Creates search result component
const SearchResult : React.FC<SearchResultProps> = ({ result }) => {

    console.log(result);
    


    return (
        <>
            <div className={styles["search-result-container"]}>
                {result.properties.name}
            </div>
        </>
    )

}

export default SearchResult;