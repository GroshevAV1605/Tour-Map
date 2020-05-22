import React from 'react';
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";

import styles from './MapContainer.module.css';
import AttractionCard from '../AttractionCard/AttractionCard';
import { connect } from 'react-redux';
const MapContainer = () => {
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <YMaps style={{position: "absolute"}}>
                <Map
                    width={"100%"}
                    height={"100%"}
                    defaultState={{
                      center: [51.79738756, 55.11576118],
                      zoom: 12,
                      controls: []
                    }}
                    options={{
                      restrictMapArea: [
                        [51.88179012, 54.91760822],
                        [51.71621862, 55.29639333]
                      ],
                      suppressMapOpenBlock: true
                    }}
                >
                    <ZoomControl/>
                </Map>
            </YMaps>
        </div>

    )
}

const mapStateToProps = store => ({
  markers: store.markersReducer.markers
})

export default connect(mapStateToProps)(MapContainer);