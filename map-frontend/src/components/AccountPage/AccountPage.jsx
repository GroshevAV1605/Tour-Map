import React, {useEffect} from 'react';
import {Container, Row, Col, Image, Button, ListGroup, Modal} from 'react-bootstrap';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import {fetchUserMarkers} from '../../actions/markers';
import styles from './AccountPage.module.css';
import star_empty from "../../assets/star-empty.png";
import star_full from "../../assets/star-full.png";


const AccountPage = (props) => {
    
    useEffect(()=>{
        props.fetchUserMarkers(props.user.id);
    },[])
        
    return (
        <div className={styles.personal_container}>
            <div className={styles.personal}>
                <Container>
                    <Row>
                        <Col md={3}>
                            <Image style={{marginBottom: "30px"}} fluid rounded src={props.user.photo ? props.user.photo : (process.env.PUBLIC_URL + '/userpick_placeholder.png')}/>
                            <Button variant="success" block>Сменить аватар</Button>
                            <Button variant="success" block>Сменить пароль</Button>
                            <Button variant="success" block>Сменить имя</Button>
                        </Col>
                        <Col md={{span:8, offset: 1}}>
                            <h1 className={styles.places_container}>{props.user.name}</h1>
                            <div className={styles.places_container}>
                                <h3>Метки пользователя:</h3>
                                <ListGroup variant="flush">
                                    {props.userMarkers.map((marker, i) => (
                                        <ListGroup.Item key={marker.id}>
                                            <Row>
                                                <Col md={8}>
                                                    <a href="#">{i+1}. {marker.title}</a>
                                                </Col>
                                                <Col md={2}>
                                                    <Button block variant="secondary">Edit</Button>
                                                </Col>
                                                <Col md={2}>
                                                    <Button block variant="danger">X</Button>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
        /*<div className={styles.personal_container}>
            <div className={styles.personal}>
                <Container>
                    <Row>
                        <Col md={3}>
                            <Image style={{marginBottom: "30px"}} fluid rounded src="https://lh3.googleusercontent.com/proxy/0bzaa_20zr1I4GLwjTYdaj8ZqMQm0YMk_Yraruv7kLX7VLzWzh_SX60GxWjCjVSdQFh8eg7XxK3jG-uYLaaW-JBugdUU5lI"/>
                            <Button variant="success" block>Сменить аватар</Button>
                            <Button variant="success" block>Сменить пароль</Button>
                            <Button variant="success" block>Сменить имя</Button>
                        </Col>
                        
                        <Col md={{span:8, offset: 1}}>
                            <h1 className={styles.name_h}>Test Testov</h1>
                            <div className={styles.places_container}>
                                <h3 className={styles.places_h}>Метки пользователя:</h3>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                    <Row>
                                            <Col md={8}>
                                                <a href="#">1. Театр кукол "Пьеро"</a>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="secondary">Edit</Button>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="danger">X</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={8}>
                                                <a href="#">2. Обелиск в память о погибших в годы Великой Отечественной войны</a>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="secondary">Edit</Button>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="danger">X</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={8}>
                                                <a href="#">3. Парк им. 50-летия СССР</a>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="secondary">Edit</Button>
                                            </Col>
                                            <Col md={2}>
                                                <Button block variant="danger">X</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    
                                </ListGroup>
                                <h3 className={styles.rating_h}>Оценки пользователя:</h3>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={8}>
                                                <a href="#">1. Музей истории Оренбурга</a>
                                            </Col>
                                            <Col md={4}>
                                                <Rating
                                                    emptySymbol={<img src={star_empty} className="icon" />}
                                                    fullSymbol={<img src={star_full} className="icon" />}
                                                />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={8}>
                                                <a href="#">1. Музей космонавтики</a>
                                            </Col>
                                            <Col md={4}>
                                                <Rating
                                                    emptySymbol={<img src={star_empty} className="icon" />}
                                                    fullSymbol={<img src={star_full} className="icon" />}
                                                />
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>*/
    )
}

const mapStateToProps = store => ({
    user: store.usersReducer.user,
    isAuthTryComplete: store.usersReducer.isAuthTryComplete,
    userMarkers: store.markersReducer.userMarkers,
})

const mapDispatchToProps = dispatch => ({
    fetchUserMarkers: (id) => dispatch(fetchUserMarkers(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);