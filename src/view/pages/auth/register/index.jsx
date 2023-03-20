import React, {Fragment, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {Row, Col, Form, Input, Button} from "antd";

import Background from "../background";
import Header from "../header";
import Footer from "../footer";
import {api} from "../../../../utils/backend.instance";
import PropTypes from "prop-types";
import Login from "../login";
import {useDispatch} from "react-redux";
import {setAlert} from "../../../../redux/Toast/toastAction";
import {ErrorMessage} from "../../../components/data-entry/form/formik";

export default function SignUp({setToken}) {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword1] = useState();
    const [password2, setPassword2] = useState();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    async function registerUser(credentials) {
        return (await api.post("/v1/account/auth/register/", JSON.stringify(credentials))).data;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        await registerUser({
            first_name: firstName, last_name: lastName, username, email, password, password2, is_active: true
        }).then(async res => {
            setToken(res)
            const refresh = localStorage.getItem("refresh")
            const response = await api.post('/v1/account/auth/refresh/', {refresh: refresh});
            const data = response.data;
            localStorage.setItem("user", JSON.stringify(data.user))
            history.push("/home")
        })
        setLoading(false)
    }

    return (
        <Fragment className="hp-authentication-page hp-d-flex" style={{flexDirection: "column"}}>
            <Background/>

            <Col span={24}>
                <Header/>
            </Col>

            <Col flex="1 0 0" className="hp-px-32">
                <Row className="hp-h-100 hp-m-auto" align="middle" style={{maxWidth: 360}}>
                    <Col span={24}>
                        <h1>Create Account</h1>

                        <Form
                            layout="vertical"
                            name="basic"
                            className="hp-mt-sm-16 hp-mt-32"
                        >
                            <Row>
                                <Col span={11}>
                                    <label>First name</label>
                                    <Input id="error" onChange={e => setFirstName(e.target.value)}/>
                                    <ErrorMessage errors={errors} error={errors.first_name}/>
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11}>
                                    <label>Last name</label>
                                    <Input id="error" onChange={e => setLastName(e.target.value)}/>
                                    <ErrorMessage errors={errors} error={errors.last_name}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={11}>
                                    <label>Username</label>
                                    <Input id="error" onChange={e => setUserName(e.target.value)}/>
                                    <ErrorMessage errors={errors} error={errors.username}/>
                                </Col>
                                <Col span={2}></Col>
                                <Col span={11}>
                                    <label>Email</label>
                                    <Input id="validating" onChange={e => setEmail(e.target.value)}/>
                                    <ErrorMessage errors={errors} error={errors.email}/>
                                </Col>
                            </Row>
                            <>
                                <>
                                    <label>Password</label>
                                    <Input.Password id="password" onChange={e => setPassword1(e.target.value)}/>
                                    <ErrorMessage errors={errors} error={errors.password}/>

                                    <>
                                        <label>Confirm Password</label>
                                        <Input.Password id="confirm-password"
                                                        onChange={e => setPassword2(e.target.value)}/>
                                        <ErrorMessage errors={errors} error={errors.password}/>
                                        <Form.Item className="hp-mt-16 hp-mb-0">
                                            <Button block type="primary" htmlType="submit" loading={loading}
                                                    onClick={handleSubmit}>
                                                Sign up
                                            </Button>
                                        </Form.Item>
                                    </>
                                </>
                            </>
                        </Form>

                        <div className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Already have an account?
              </span>

                            <Link
                                to="/signin"
                                className="hp-text-color-primary-1 hp-text-color-dark-primary-2 hp-caption"
                            >
                                Login
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Footer/>
            </Col>
        </Fragment>
    );
};

SignUp.propTypes = {
    setToken: PropTypes.func.isRequired
}