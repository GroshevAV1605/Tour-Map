import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { YMaps, Map, ZoomControl } from "react-yandex-maps";
import { connect } from 'react-redux';
import {fetchCategories} from '../../actions/categories';
import {toast} from 'react-toastify'
import axios from 'axios';
import { history } from '../../utils/history';

import styles from './AddMarkerPage.module.css';
import {Formik, Field, Form as FormikForm} from 'formik'

const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]

const AddMarkerPage = (props) => {

    const [state, setState] = useState({
        coords:{
            latitude:"51.79738756",
            longitude:"55.11576118"
        },
        files: [
            
        ]
    })

    const initialValues= {
        title:"",
        title_en:"",
        category_id: "1",
        description: "",
        description_en: "",     
        videos: [
            {
                src:""
            }
        ]
    }

    useEffect(() => {
        props.actions.fetchCategories();
    }, [])

    const mapOnChange = (event, setFieldValue) => {
        let Newcoords = event.originalEvent.newCenter;
        console.log(Newcoords);
        setState({
            ...state,
            coords: {
                latitude: Newcoords[0],
                longitude: Newcoords[1]
            }
        })      
    }

    const onFileChange = (e, index) => {
        console.log(e.target.files[0]);
        if(e.target.files[0].size > 10000000){
            toast.error("Слишком большой файл");
            return;
        }

        if(!allowedFormats.includes(e.target.files[0].type)){
            toast.error("Не корректный формат. Поддерживаются только изображения формата jpg, jpeg и png");
            return;
        }

        let newFiles = [...state.files]
        newFiles[index].file = e.target.files[0];
        newFiles[index].name = e.target.files[0].name.slice(0, 20);
        setState(oldState => ({
            ...oldState,
            files: newFiles
        }))
    }

    const deleteIMG = (index) => {
        let newFiles = [...state.files];
        console.log(newFiles);
        console.log(index);
        newFiles.splice(index, 1);
        setState(oldState => ({
            ...oldState,
            files: newFiles
        }))
    }

    const submitAddMarker = values => {
        
        const formData = new FormData();
        state.files.forEach((file, i) => {
            if(file.file){
                formData.append('imagefile', file.file)
            }
        })

        formData.append('latitude', state.coords.latitude);
        formData.append('longitude', state.coords.longitude);
        formData.append('title', values.title);
        formData.append('title_en', values.title_en);
        formData.append('category_id', values.category_id);
        formData.append('description', values.description);
        formData.append('description_en', values.description_en);
        formData.append('creator_id', props.user.id)
        
        
        
        axios.post('http://localhost:5000/markers', formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
        .then(res => {
            toast.success('Маркер успешно добавлен');
            history.push('/map');
        })
        .catch(err => toast.error(err.toString()))

    }
    
    return (
        <div className={styles.marker_container}>
            <div className={styles.marker}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => submitAddMarker(values)}
                    render = {({handleChange, values, setFieldValue}) => (
                        <FormikForm>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Заголовок</Form.Label>
                                    <Field type="text" maxLength={50} placeholder="Введите заголовок" name="title" className="form-control" required/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Заголовок (англ)</Form.Label>
                                    <Field type="text" maxLength={50} placeholder="Введите заголовок (англ.)" name="title_en" className="form-control"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Категория</Form.Label>
                                    <Field as="select" name="category_id" className="form-control">
                                        {props.categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.title}</option>
                                        ))}
                                    </Field>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Описание</Form.Label>
                                    <Field as="textarea" name="description" className="form-control" rows="6" required/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Описание (англ)</Form.Label>
                                    <Field as="textarea" name="description_en" className="form-control" rows="6"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Col md={3}>
                                    <Form.Group>
                                        <Form.Label>Широта</Form.Label>
                                        <Form.Control readOnly type="text" name="latitude" value={state.coords.latitude}  />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Долгота</Form.Label>
                                        <Form.Control readOnly type="text" name="longitude" value={state.coords.longitude} />
                                    </Form.Group>
                                </Col>
                                <Col md={9}>
                                    <div style={{ height: "300px" , display:"flex", alignItems:"center", justifyContent:"center" }}>
                                        <YMaps>
                                            <Map
                                                width={"100%"}
                                                height={"100%"}
                                                onBoundsChange={mapOnChange}
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
                                        <span className={styles.circle} style={{position:"absolute"}}></span>
                                    </div>
                                </Col>
                            </Form.Row>
                            <Row style={{marginTop:"20px"}}>
                                <Col md={1}>
                                    <Form.Label>Изображения:</Form.Label>
                                </Col>
                                <Col md={5}>
                                    {state.files.map((file, i) => (
                                        <Row key={i} style={{marginBottom:"10px"}}>
                                            <Col md={10}>
                                                <Form.File id='custom-file' maxLength={30} label={file.name} onChange={(e) => onFileChange(e, i)} accept="image/*" custom />
                                            </Col>
                                            <Col md={2}>
                                                <Button variant="secondary" onClick={() => deleteIMG(i)}>X</Button>
                                            </Col>
                                        </Row>
                                    ))}
                                    <Button onClick={()=>{setState(oldState => ({...oldState, files:[...oldState.files, {file:"", name:""}]}))}}>+</Button>
                                </Col>
                                <Col md={1}>
                                    <Form.Label>Видео:</Form.Label>
                                </Col>
                                <Col md={5}>
                                    <Form.Control style={{marginBottom:"5px"}} type="text" value="https://youtu.be/B5-UWDnvKRo" />
                                    <Button variant="secondary"> + </Button>
                                </Col>
                            </Row>
                            <Button variant="success" type="submit">СОЗДАТЬ</Button>
                            
                        </FormikForm>
                    )}
                />
            </div>
        </div>
    )
}

const mapStateToProps = store => ({
    categories: store.categoriesReducer.categories,
    user: store.usersReducer.user
})

const mapDispatchToProps = dispatch => ({
    fetchCategories: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMarkerPage);