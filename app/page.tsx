import MapComponent from './components/Map'

export default function Page() {
    
    return (
        <>
            <MapComponent mapboxAccessToken={process.env.MAPBOX_ACCESS_TOKEN} />
        </>
    )

}