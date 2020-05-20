import React, {useEffect, useState} from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { YMaps, Map, ZoomControl, Placemark, ObjectManager } from "react-yandex-maps";
import { connect } from 'react-redux';
import fetchCategories from '../../actions/categories';

import styles from './AddMarkerPage.module.css';
import { bindActionCreators } from 'redux';
import {Formik, Field, Form as FormikForm, ErrorMessage} from 'formik'

const AddMarkerPage = (props) => {

    const [coords, setCoords] = useState({
        latitude:"51.79738756",
        longitude:"55.11576118"
    })

    const initialValues= {
        title:"",
        title_en:"",
        category: "park",
        description: "",
        description_en: "",     
        images:[
            {
                src:""
            }
        ],
        videos: [
            {
                src:""
            }
        ]
    }

    let map = null;

    useEffect(() => {
        props.actions.fetchCategories();
    }, [])
    console.log(props.categories);

    const mapOnChange = (event, setFieldValue) => {
        let Newcoords = event.originalEvent.newCenter;
        console.log(Newcoords);
        setCoords({
            latitude: Newcoords[0],
            longitude: Newcoords[1]
        })
        
    }

    const submitAddMarker = values => {
        console.log(values);
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
                                    <Field type="text" placeholder="Введите заголовок" name="title" className="form-control" required/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Заголовок (англ)</Form.Label>
                                    <Field type="text" placeholder="Введите заголовок" name="title_en" className="form-control"/>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Категория</Form.Label>
                                    <Field as="select" name="category" className="form-control">
                                        {props.categories.map(cat => (
                                            <option key={cat.id} values={cat.name}>{cat.title}</option>
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
                                        <Form.Control readOnly type="text" name="latitude" value={coords.latitude}  />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Долгота</Form.Label>
                                        <Form.Control readOnly type="text" name="longitude" value={coords.longitude} />
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
                                    <Form.File style={{marginBottom:"5px"}} label="image1.jpg" custom />
                                    <Form.File style={{marginBottom:"5px"}} label="image2.jpg" custom/>
                                    <Form.File style={{marginBottom:"5px"}} label="image3.jpg" custom/>
                                    <Button variant="secondary"> + </Button>
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
        /*<div className={styles.marker_container}>
            <div className={styles.marker}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Заголовок</Form.Label>
                            <Form.Control type="text" placeholder="Введите заголовок" required />
                            <Form.Control.Feedback type="invalid">Введите заголовок</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Заголовок (англ)</Form.Label>
                            <Form.Control type="text" placeholder="Введите заголовок (англ)" />
                            <Form.Control.Feedback type="invalid">Введите заголовок</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Категория</Form.Label>
                            <Form.Control as="select" value="Выбирите категорию" required>
                                <option>Театр</option>
                                <option>Парк</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Описание</Form.Label>
                            <Form.Control as="textarea" rows="6"/>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Описание (англ)</Form.Label>
                            <Form.Control as="textarea" rows="6"/>
                        </Form.Group>
                    </Form.Row>
                    <Row>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Широта</Form.Label>
                                <Form.Control readOnly type="text" value="51.79738756"></Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Долгота</Form.Label>
                                <Form.Control readOnly type="text" value="55.11576118"></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={9}>
                            <div style={{ width: "100%", height: "300px" }}>
                                <YMaps>
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
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col md={1}>
                            <Form.Label>Изображения:</Form.Label>
                        </Col>
                        <Col md={5}>
                            <Form.File style={{marginBottom:"5px"}} label="image1.jpg" custom />
                            <Form.File style={{marginBottom:"5px"}} label="image2.jpg" custom/>
                            <Form.File style={{marginBottom:"5px"}} label="image3.jpg" custom/>
                            <Button variant="secondary"> + </Button>
                        </Col>
                        <Col md={1}>
                            <Form.Label>Видео:</Form.Label>
                        </Col>
                        <Col md={5}>
                            <Form.Control style={{marginBottom:"5px"}} type="text" value="https://youtu.be/B5-UWDnvKRo" />
                            <Button variant="secondary"> + </Button>
                        </Col>
                    </Row>
                    <Button style={{marginTop:"10px"}} variant="success">СОЗДАТЬ</Button>
                </Form>
            </div>
        </div>*/
    )
}

const mapStateToProps = store => ({
    categories: store.categoriesReducer.categories
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        fetchCategories: fetchCategories
    }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMarkerPage);