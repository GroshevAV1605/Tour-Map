import React, {useEffect, useState} from 'react';
import {Container, Row, Col, Image, Button, ListGroup, Modal, Popover, Form, OverlayTrigger} from 'react-bootstrap';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import {fetchUserMarkers} from '../../actions/markers';
import styles from './AccountPage.module.css';
import star_empty from "../../assets/star-empty.png";
import star_full from "../../assets/star-full.png";
import { toast } from 'react-toastify';
import {changeName, changeAvatar} from '../../actions/users';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const allowedFormats = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"]

const AccountPage = (props) => {
    
    const [showRename, setShowRename] = useState(false);
    const [showPassChange, setShowPassChange] = useState(false);
    const [showAvatarChange, setShowAvatarChange] = useState(false);

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
                            <Button variant="success" onClick={()=>setShowAvatarChange(true)} block>Сменить аватар</Button>
                            <Button variant="success" onClick={()=>setShowPassChange(true)} block>Сменить пароль</Button>
                            <Button variant="success" onClick={() => setShowRename(true)} block>Сменить имя</Button>
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
            <NameChangeModal show={showRename} onHide={()=>setShowRename(false)} changeName={props.changeName} userID = {props.user.id}/>
            <PassChangeModal show={showPassChange} onHide={()=>setShowPassChange(false)} userID = {props.user.id}/>
            <AvatarChangeModal show={showAvatarChange} onHide={() => setShowAvatarChange(false)} changeAvatar={props.changeAvatar} userID={props.user.id}/>
        </div>
    )
}

const NameChangeModal = props => {
    const [newName, setNewName] = useState("");

    const changeNameClick = () => {
        if(newName===""){
            toast.error("Введите новое имя");
            return;
        }
        console.log(props);
        
        props.changeName(newName, props.userID);
        props.onHide();
        setNewName("");
        
    }

    return (
        <Modal
            show={props.show}
            onHide ={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Сменить имя
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>              
                    <Form.Group>
                        <Form.Label>Новое имя</Form.Label>
                        <Form.Control type="text" value={newName} onChange={(e)=> setNewName(e.target.value)} placeholder="Введите новое имя" required></Form.Control>
                    </Form.Group>
                    <Button variant='success' onClick={changeNameClick} type='submit'>Сменить</Button>               
            </Modal.Body>
        </Modal>
    )
}

const PassChangeModal = props => {
    let initialValues = {
        password:"",
        password_rep:""
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                Пароль должен состоять не меньше чем из 8 символов, содержать цифры, строчные и заглавные латинские буквы
            </Popover.Content>
        </Popover>
    )

    const submitPassChange = values => {
        console.log(values);
        axios.post("http://localhost:5000/users/changePass", {password: values.password, id: props.userID})
            .then(() => toast.success("Пароль успешно изменен!"))
            .catch((err) => toast.error(err.toString()))
        props.onHide();
        
    }

    return (
        <Modal
            show={props.show}
            onHide ={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Сменить пароль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().required('Введите пароль!')
                        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен состоять не меньше чем из 8 символов, содержать цифры, строчные и заглавные латинские буквы'),
                        password_rep: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают!')
                    })}
                    onSubmit={(values) => submitPassChange(values)}
                    render={({errors, touched}) => (
                        <FormikForm>
                            <Form.Row>
                                <OverlayTrigger placement='bottom' overlay={popover}>
                                    <Form.Group as={Col}>
                                        <Form.Label>Пароль<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></Form.Label>
                                        <Field type="password" placeholder="Введите пароль" name="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </Form.Group>
                                </OverlayTrigger>
                                <Form.Group as={Col}>
                                    <Form.Label>Повторите пароль<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></Form.Label>
                                    <Field type="password" placeholder="Повторно введите пароль" name="password_rep" className={'form-control' + (errors.password_rep && touched.password_rep ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password_rep" component="div" className="invalid-feedback" />
                                </Form.Group>
                            </Form.Row>
                            <Button variant="success" type="submit">Сменить пароль</Button>
                        </FormikForm>
                    )}
                />
            </Modal.Body>
        </Modal>
    )
}

const AvatarChangeModal = props => {
    const [file, setFile] = useState({
        file:"",
        name:""
    })

    const onFileChange = (e) => {
        if(e.target.files[0].size > 10000000){
            toast.error("Слишком большой файл");
            return;
        }

        if(!allowedFormats.includes(e.target.files[0].type)){
            toast.error("Не корректный формат. Поддерживаются только изображения формата jpg, jpeg и png");
            return;
        }

        setFile({
            file:e.target.files[0],
            name:e.target.files[0].name.slice(0, 50)
        })
    }

    const changeAvatarClick = () => {
        console.log(file);
        
        if(file.file===""){
            toast.error("Выберите файл");
            return;
        }
        props.changeAvatar(file.file, props.userID);
        props.onHide();
    }

    return(
        <Modal
            show={props.show}
            onHide ={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Сменить аватар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>              
                <Form.Group>
                    <Form.File id='custom-file' label={file.name} onChange={onFileChange} accept="image/*" custom/>
                </Form.Group>
                <Button variant='success' onClick={changeAvatarClick}>Сменить</Button>               
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = store => ({
    user: store.usersReducer.user,
    isAuthTryComplete: store.usersReducer.isAuthTryComplete,
    userMarkers: store.markersReducer.userMarkers,
})

const mapDispatchToProps = dispatch => ({
    fetchUserMarkers: (id) => dispatch(fetchUserMarkers(id)),
    changeName: (newName, id) => dispatch(changeName(newName, id)),
    changeAvatar: (newPhoto, id) => dispatch(changeAvatar(newPhoto, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);