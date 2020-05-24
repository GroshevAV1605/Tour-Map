import React, {useEffect, useRef, useState} from 'react';
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import AttractionCard from '../AttractionCard/AttractionCard';
import {fetchMapMarkers} from '../../actions/markers';
import { connect } from 'react-redux';
import {history} from '../../utils/history';
import { Route } from 'react-router-dom';


const MapContainer = (props) => {

  let mapEl = useRef(null);

  let {markers, categories} =props;

  markers = markers.map(marker => {
    let markerCat = categories.find(cat => cat.id === marker.category_id);
    return({
      ...marker,
      preset: markerCat.preset,
      color: markerCat.color
    })
  })  
  
  const onMarkerClick = marker => {
    history.push(`/map/${marker.id}`);
    
    mapEl.current.setCenter(
      [parseFloat(marker.latitude) + 0.007, parseFloat(marker.longitude)],
      15,
      {duration: 500, checkZoomRange: true}
    );
  };
  
    return (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <YMaps >
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
                    instanceRef={mapEl}
                >
                  <ZoomControl/>
                  {markers.filter(m => props.selectedCats.includes(m.category_id)).map(marker => (
                    <Placemark
                      key = {marker.id}
                      defaultGeometry={[marker.latitude, marker.longitude]}
                      properties={{hintContent: marker.title}}
                      options={{
                        preset: marker.preset.trim(),
                        iconColor: marker.color.trim()
                      }}
                      onClick={() => onMarkerClick(marker)}
                    />
                    ))}
                </Map>
            </YMaps>
            
            {markers.length && (<Route path="/map/:markerId">
              <AttractionCard markers={markers}/>
            </Route>)}   
          
                                
        </div>

    )
}


export default MapContainer;