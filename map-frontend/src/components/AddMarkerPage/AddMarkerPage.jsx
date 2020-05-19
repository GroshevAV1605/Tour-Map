import React from 'react';
import {Form, Col, Row, Button} from 'react-bootstrap';
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";


import styles from './AddMarkerPage.module.css';

const AddMarkerPage = () => {
    return (
        <div className={styles.marker_container}>
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
        </div>
    )
}

export default AddMarkerPage;