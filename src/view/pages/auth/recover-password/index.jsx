import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";

import {Row, Col, Form, Input, Button, Alert} from "antd";

import Background from "../background";
import Header from "../header";
import Footer from "../footer";
import {api} from "../../../../utils/backend.instance";
import {setAlert} from "../../../../redux/Toast/toastAction";
import {ErrorMessage} from "../../../components/data-entry/form/formik";
import {useDispatch} from "react-redux";

export default function RecoverPassword() {
    const [email, setEmail] = useState();
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    async function resetRequest(data) {
        return (await api.post("/v1/password_reset/", JSON.stringify(data))).data;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true)
        await resetRequest({
            email
        })
            .then(data => {
                dispatch(setAlert("Recover password email sent", "success"))
            })
            .catch(err => {
                setErrors(err.response.data)
                dispatch(setAlert(`${err.toString()}`, "danger"))
            });
        setLoading(false)
    }

    return (
        <Fragment className="hp-authentication-page hp-d-flex" style={{flexDirection: "column"}}>
            <Background/>

            <Col span={24}>
                <Header/>
            </Col>

            <Col flex="1 0 0" className="hp-px-32">
                <Row className="hp-h-100 hp-m-auto" align="middle" style={{maxWidth: 400}}>
                    <Col span={24}>
                        <h1>Recover Password</h1>

                        <Form
                            layout="vertical"
                            name="basic"
                            className="hp-mt-sm-16 hp-mt-32"
                        >
                            <label>E-mail:</label>
                                <Input id="validating" placeholder="you@example.com"
                                       onChange={(e) => setEmail(e.target.value)}/>
                            <ErrorMessage errors={errors} error={errors.email} />


                            <Form.Item className="hp-mt-16 hp-mb-8">
                                <Button block type="primary" htmlType="submit" loading={loading}>
                                    <Link onClick={handleSubmit}>Reset Password</Link>
                                </Button>
                                <ErrorMessage errors={errors} error={errors.detail}/>
                            </Form.Item>
                        </Form>

                        <div className="hp-form-info hp-text-center">
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

            <Col span={24}>
                <Footer/>
            </Col>
        </Fragment>
    );
}
