import React, {useState} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {Button, Popover, OverlayTrigger, Col, Form as FormB} from 'react-bootstrap';
import styles from './AuthPage.module.css';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {register, auth, authStayOn} from '../../actions/users';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {hasUpperCase, hasLowerCase, hasNmber} from '../../utils/validateFuntions'
import { bindActionCreators } from 'redux';

const AuthPage = (props) => {

    const [state, setState] = useState({
        isAuth: true,      
    })

    const initialValues={
        registrationData: {
            login:"",
            password:"",
            password_rep:"",
            username:"",
            email:""
        },
        authData: {
            login:"",
            password: "",
            stayOn: true
        }
    }

    const submitRegister = values => {
        let dataToFetch = Object.assign({}, values);
        delete dataToFetch.password_rep;
        
        props.actions.register(dataToFetch);
    }

    const submitAuth = values => {
        let dataToFetch = Object.assign({}, values);
        console.log(dataToFetch);
        authStayOn(dataToFetch.stayOn);
        
        props.actions.auth(dataToFetch)
        

    }


    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                Пароль должен состоять не меньше чем из 8 символов, содержать цифры, строчные и заглавные латинские буквы
            </Popover.Content>
        </Popover>
    )
        
    if(props.success){
        toast.success(props.success);
    }

    if(props.error){
        toast.error(props.error);
    }

    return (
        <div className={styles.auth_container}>
            <div className={styles.auth}>
                <div className={styles.auth_header}>
                    <div className={styles.auth_header_button} style={state.isAuth ? {backgroundColor:"rgb(207, 206, 206)"}: null} onClick={()=>setState({...state, isAuth:true})}>
                        Войти
                    </div>
                    <div className={styles.auth_header_button} style={!state.isAuth ? {backgroundColor:"rgb(207, 206, 206)"}:null} onClick={()=>setState({...state, isAuth:false})}>
                        Регистрация
                    </div>
                </div>
                <div className={styles.auth_form}>
                    {state.isAuth && (
                        <Formik
                            initialValues={initialValues.authData}
                            onSubmit={(values) => submitAuth(values)}
                            render= {({errors, status, touched, handleChange, values}) => (
                                <Form>
                                    <FormB.Group>
                                        <FormB.Label>Логин</FormB.Label>
                                        <Field type="text" placeholder="Введите логин" name='login' className="form-control" />
                                    </FormB.Group>
                                    <FormB.Group>
                                        <FormB.Label>Пароль</FormB.Label>
                                        <Field type="password" placeholder="Введите пароль" name='password' className="form-control" />
                                    </FormB.Group>
                                    <FormB.Group>
                                        <FormB.Check
                                            checked={values.stayOn}
                                            name="stayOn"
                                            type='checkbox'
                                            label='Оставаться в сети'
                                            onChange={handleChange}
                                        />
                                    </FormB.Group>
                                    <Button variant='success' type='submit'>Войти</Button>
                                </Form>
                            )}
                        />
                    )}

                    {!state.isAuth && (
                        <Formik 
                        initialValues={initialValues.registrationData}
                        validationSchema={Yup.object().shape({
                            login: Yup.string().required('Заполните поле логин!').min(8, "Короткий логин!").max(50, "Слишком длинный логин!"),
                            email: Yup.string().email("Некорректный email!"),
                            username: Yup.string().required('Введите имя!').max(50, "Слишком длинное имя!"),
                            password: Yup.string().required('Введите пароль!')
                            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Пароль должен состоять не меньше чем из 8 символов, содержать цифры, строчные и заглавные латинские буквы'),
                            password_rep: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Пароли не совпадают!')
                            .required("Подтвердите пароль!")
                        })}
                        onSubmit={(values, actions) => submitRegister(values)}
                        render={({errors, status, touched}) => (
                            <Form>
                                <FormB.Group>
                                    <FormB.Label>Логин<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></FormB.Label>
                                    <Field type="text" placeholder="Введите уникальный логин" name="login" className={'form-control' + (errors.login && touched.login ? ' is-invalid' : '')} />
                                    <ErrorMessage name="login" component="div" className="invalid-feedback" />
                                </FormB.Group>
                                <FormB.Row>
                                    <OverlayTrigger placement='bottom' overlay={popover}>
                                        <FormB.Group as={Col}>
                                            <FormB.Label>Пароль<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></FormB.Label>
                                            <Field type="password" placeholder="Введите пароль" name="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                        </FormB.Group>
                                    </OverlayTrigger>
                                    <FormB.Group as={Col}>
                                        <FormB.Label>Повторите пароль<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></FormB.Label>
                                        <Field type="password" placeholder="Повторно введите пароль" name="password_rep" className={'form-control' + (errors.password_rep && touched.password_rep ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password_rep" component="div" className="invalid-feedback" />
                                    </FormB.Group>
                                </FormB.Row>
                                <FormB.Group>
                                    <FormB.Label>Имя пользователя<span style={{color: "red", fontSize:'14px', marginLeft:"3px"}}>*</span></FormB.Label>
                                    <Field type="text" placeholder="Введите ваше имя" name="username" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                    <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </FormB.Group>
                                <FormB.Group>
                                    <FormB.Label>Email</FormB.Label>
                                    <Field type="text" placeholder="Введите адрес электронной почты" name="email" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </FormB.Group>
                                <Button variant="success" type="submit">Зарегистрироваться</Button>
                            </Form>
                        )}
                    />
                    )}
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.alertReducer.error,
    success: state.alertReducer.success,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({
        register: register,
        auth: auth
    }, dispatch),
    authStayOn: () => dispatch(authStayOn())
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);