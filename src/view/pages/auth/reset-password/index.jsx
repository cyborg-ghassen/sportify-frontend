import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";

import {Row, Col, Form, Input, Button, Alert} from "antd";

import Background from "../background";
import Header from "../header";
import Footer from "../footer";
import {api} from "../../../../utils/backend.instance";
import Error404 from "../../errors/404";
import {ErrorMessage} from "../../../components/data-entry/form/formik";
import {useDispatch} from "react-redux";
import {setAlert} from "../../../../redux/Toast/toastAction";

export default function ResetPassword() {
    const [step, setStep] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState()
    const [password1, setPassword1] = useState()
    const [valid, setValid] = useState(false)
    const history = useHistory()
    const query = new URLSearchParams(document.location.search)
    const token = query.get("token")
    const dispatch = useDispatch()

    useEffect(async () => {
        await api.post("/v1/password_reset/validate_token/", {token: token})
            .then(res => setValid(true))
            .catch(err => {
                setErrors(err.response.data)
                dispatch(setAlert("Token is not valid", "danger"))
            })
    }, [])

    if (!token || !valid) {
        return <Error404 message={errors.detail} />
    }

    async function reset(data) {
        return (await api.post("/v1/password_reset/confirm/", JSON.stringify(data))).data;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (password === password1){
            setLoading(true)
            await reset({
                password, token
            })
                .then(res => {
                    dispatch(setAlert("Password successfully changed", "success"))
                    history.push("/signin")
                }).catch(err => {
                    setErrors(err.response.data)
                    dispatch(setAlert(`${err.toString()}`, "danger"))
                });
            setLoading(false)
        }
        else dispatch(setAlert("Passwords doesn't match", "danger"))

    }

    return (
        <Row className="hp-authentication-page hp-d-flex" style={{flexDirection: "column"}}>
            <Background/>

            <Row>
                <Col span={24}>
                    <Header/>
                </Col>
            </Row>

            <Row>
                <Col flex="1 0 0" className="hp-px-32">
                    <Row className="hp-h-100 hp-m-auto" align="middle" style={{maxWidth: 360}}>
                        <Col span={24}>
                            <h1>Reset Password</h1>

                            <Form
                                layout="vertical"
                                name="basic"
                                className="hp-mt-sm-16 hp-mt-32"
                            >
                                <label>Password:</label>
                                <Input.Password
                                    id="password"
                                    placeholder="At least 6 characters"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <ErrorMessage errors={errors} error={errors.password}/>
                                {
                                    step && (
                                        <>
                                            <Form.Item label="Confirm Password :">
                                                <Input.Password
                                                    id="confirm-password"
                                                    placeholder="At least 6 characters"
                                                    onChange={(e) => setPassword1(e.target.value)}
                                                />
                                            </Form.Item>

                                            <Form.Item className="hp-mt-16 hp-mb-0">
                                                <Button block type="primary" htmlType="submit" onClick={handleSubmit}
                                                        loading={loading}>
                                                    Reset Password
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )
                                }
                            </Form>

                            {
                                !step && (
                                    <Button block type="primary" style={{marginTop: 10}} onClick={() => setStep(true)}>
                                        Continue
                                    </Button>
                                )
                            }

                            <div className="hp-form-info hp-text-center hp-mt-8">
              <span className="hp-text-color-black-80 hp-text-color-dark-40 hp-caption hp-mr-4">
                Go back to
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
            </Row>
            <Row>
                <Col span={24}>
                    <Footer/>
                </Col>
            </Row>
        </Row>
    );
}
