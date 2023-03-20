import React, {Fragment, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {Row, Col, Form, Input, Button, Checkbox, Alert} from "antd";

import Background from "../background";
import Header from "../header";
import Footer from "../footer";
import {api} from "../../../../utils/backend.instance";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {setAlert} from "../../../../redux/Toast/toastAction";
import {ErrorMessage} from "../../../components/data-entry/form/formik";

export default function Login({setToken}) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    async function loginUser(credentials) {
        return (await api.post("/v1/account/auth/login/", JSON.stringify(credentials))).data;
    }

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            history.push('/home');
        }
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        await loginUser({
            username, password
        })
            .then(token => {
                setToken(token)
                localStorage.setItem('isAuthenticated', true);
                history.push('/home')
                dispatch(setAlert("Login successful", "success"))
            })
            .catch(err => {
                setErrors(err.response.data)
                dispatch(setAlert(`${err.toString()}`, "danger"))
            });
        setLoading(false)
    }

    return (
        <Fragment>

            <Background/>

            <Col span={24}>
                <Header/>
            </Col>

            <Col flex="1 0 0" className="hp-px-32">
                <Row className="hp-h-100 hp-m-auto" align="middle" style={{maxWidth: 360}}>
                    <Col span={24}>
                        <h1>Login</h1>

                        <Form
                            layout="vertical"
                            name="basic"
                            initialValues={{remember: true}}
                            className="hp-mt-sm-16 hp-mt-32"
                        >
                            <label>Username</label>
                            <Input id="error" onChange={e => setUserName(e.target.value)}/>
                            <ErrorMessage errors={errors} error={errors.username}/>


                            <>
                                <label>Password</label>
                                <Input.Password id="warning2" onChange={e => setPassword(e.target.value)}/>
                                <ErrorMessage errors={errors} error={errors.password}/>

                                <Row align="middle" justify="space-between">
                                    <Form.Item className="hp-mb-0">
                                        <Checkbox name="remember">Remember me</Checkbox>
                                    </Form.Item>

                                    <Link
                                        className="hp-button hp-text-color-black-80 hp-text-color-dark-40"
                                        to="recover-password"
                                    >
                                        Forgot Password?
                                    </Link>
                                </Row>

                                <Form.Item className="hp-mt-16 hp-mb-0">
                                    <Link to="/home">
                                        <Button block type="primary" htmlType="submit" onClick={handleSubmit}
                                                loading={loading}>
                                            Sign in
                                        </Button>
                                        <ErrorMessage errors={errors} error={errors.detail}/>
                                    </Link>
                                </Form.Item>
                            </>

                        </Form>

                        <Col className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-font-weight-400 hp-mr-4">
                Don’t you have an account?
              </span>

                            <Link
                                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                                to="/register"
                            >
                                Create an account
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Footer/>
            </Col>
        </Fragment>
    );
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
