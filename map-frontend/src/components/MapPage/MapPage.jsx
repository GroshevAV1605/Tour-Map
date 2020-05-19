import React from 'react';

import styles from './MapPage.module.css';
import Navigation from '../Navigation/Navigation';
import MapContainer from '../MapContainer/MapContainer';

const MapPage = () => {
    return (
        <div className={styles.mainDiv}>
            <div className={styles.nav}>
                <Navigation/>
            </div>
            <div className={styles.content}>
                <MapContainer/>
            </div>
        </div>
    )
}

export default MapPage;