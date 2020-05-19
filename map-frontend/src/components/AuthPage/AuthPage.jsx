import React, {useState} from 'react';
import { useFormik } from 'formik';
import {Button, Form, Popover, OverlayTrigger, Col} from 'react-bootstrap';
import styles from './AuthPage.module.css';

const AuthPage = () => {

    const [state, setState] = useState({
        isAuth: true
    })

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                Пароль должен состоять не меньше чем из 8 символов, содержать цифры, строчные и заглавные латинские буквы
            </Popover.Content>
        </Popover>
    )

    return (
        <div className={styles.auth_container}>
            <div className={styles.auth}>
                <div className={styles.auth_header}>
                    <div className={styles.auth_header_button} style={state.isAuth ? {backgroundColor:"rgb(207, 206, 206)"}: null} onClick={()=>setState({isAuth:true})}>
                        Войти
                    </div>
                    <div className={styles.auth_header_button} style={!state.isAuth ? {backgroundColor:"rgb(207, 206, 206)"}:null} onClick={()=>setState({isAuth:false})}>
                        Регистрация
                    </div>
                </div>
                <div className={styles.auth_form}>
                    {state.isAuth && <Form>
                        <Form.Group>
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" placeholder="Введите логин" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type="checkbox" label="Оставаться в сети" />
                        </Form.Group>
                        <Button variant="success" type="submit">Войти</Button>
                    </Form>}
                    {!state.isAuth && <Form>
                           
                        <Form.Group >
                            <Form.Label>Логин</Form.Label>
                            <Form.Control type="text" placeholder="Введите уникальный логин" required />
                            <Form.Control.Feedback type="invalid">Введите уникальный логин</Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Row>
                            <OverlayTrigger  placement="right" overlay={popover}>
                                <Form.Group as={Col}>
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="text" placeholder="Введите пароль" required/>
                                    <Form.Control.Feedback type="invalid">Введите корректный пароль</Form.Control.Feedback>
                                </Form.Group>
                            </OverlayTrigger>
                            <Form.Group as={Col}>
                                <Form.Label>Повторите пароль</Form.Label>
                                <Form.Control type="text" placeholder="Повторно введите пароль" required/>
                                <Form.Control.Feedback type="invalid">Введите корректный пароль</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group>
                            <Form.Label>Имя пользователя</Form.Label>
                            <Form.Control type="text" placeholder="Введите ваше имя" required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Адрес электронной почты" />
                        </Form.Group>
                        <Button variant="success" type="submit">Зарегистрироваться</Button>
                    </Form>}

                </div>
            </div>
        </div>
    )
}

export default AuthPage;