import React, {useEffect} from 'react';

import styles from './MapPage.module.css';
import Navigation from '../Navigation/Navigation';
import MapContainer from '../MapContainer/MapContainer';
import {fetchCategories} from '../../actions/categories';
import {fetchMapMarkers} from '../../actions/markers';

import {connect} from 'react-redux';
import { toast } from 'react-toastify';

const MapPage = (props) => {

    useEffect(()=>{
        console.log("useEffect:  ");
        console.log(props);
        
        
        props.fetchCategories();
        props.fetchMapMarkers();
    }, [])
    
    for(let er of props.errors){
        if(er){
            toast.error("Error! " + er);
            return null;
        }
    }
    if(props.loading){
        return <h3>Loading...</h3>
    }
    console.log(props);
    
    return (
        <div className={styles.mainDiv}>
            <div className={styles.nav}>
                <Navigation categories={props.categories}/>
            </div>
            <div className={styles.content}>
                <MapContainer categories={props.categories} markers={props.markers}/>
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    markers: store.markersReducer.markers,
    categories: store.categoriesReducer.categories,
    errors: [store.markersReducer.error, store.categoriesReducer.error],
    loading: store.markersReducer.pending || store.categoriesReducer.pending
})

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories()),
    fetchMapMarkers: () => dispatch(fetchMapMarkers())

})

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);