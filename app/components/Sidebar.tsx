"use client"

import styles from './Sidebar.module.css';

import SearchBar from './SearchBar';



// Interface for sidebar component props
interface SidebarProps {
    mapboxAccessToken: string;
}



// Creates sidebar component
const SidebarComponent : React.FC<SidebarProps> = ({ mapboxAccessToken }) => {


    // Returns sidebar component
    return (
        <>
            <div className={styles["sidebar-container"]}>
                <h3 className={styles["sidebar-title"]}>Search</h3>
                <div className={styles["sidebar"]}>
                    <div className={styles["search-bar-group-container"]}>
                        <p className={styles["search-bar-title"]}>Location 1</p>
                        <SearchBar mapboxAccessToken={mapboxAccessToken} />
                    </div>
                    <div className={styles["search-bar-group-container"]}>
                        <p className={styles["search-bar-title"]}>Location 2</p>
                        <SearchBar mapboxAccessToken={mapboxAccessToken} />
                    </div>
                </div>
            </div>
        </>
    )

} 



export default SidebarComponent;