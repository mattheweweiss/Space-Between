import './page.css';

import SidebarComponent from './components/Sidebar';
import MapComponent from './components/Map';



// Gets mapbox access token environment variable
const mapboxAccessToken : string = process.env.MAPBOX_ACCESS_TOKEN;



export default function Page() {
    
    return (
        <>
            <div className="page-container">
                <SidebarComponent mapboxAccessToken={mapboxAccessToken} />
                <MapComponent mapboxAccessToken={mapboxAccessToken} />
            </div>
        </>
    )

}