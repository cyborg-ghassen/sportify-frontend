import React, {useEffect, useState} from "react";

import {Row, Col, Card} from "antd";
import PageContent from "../../../../../layout/components/content/page-content";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {api} from "../../../../../utils/backend.instance";

export default function Blank() {
    const [isActive, setIsActive] = useState(false)
    const [groups, setGroups] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const filteredGroups = groups.filter((o) => !selectedGroups.includes(o));
    const filteredPermissions = permissions.filter((o) => !selectedPermissions.includes(o));
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false);
    const [loadings, setLoadings] = useState([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        number: "",
        website: "",
        email: "",
        password: "",
        avatar: null,
        is_active: false,
        groups: [],
        user_permissions: []
    })

    const {id} = useParams()
    const isAddMode = !id

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(async () => {
        if (!isAddMode) {
            await api.get(`/v1/accounts/user/${id}/`)
                .then(res => {
                    setFormData(res.data)
                    setSelectedGroups(res.data.groups_id)
                    setSelectedPermissions(res.data.user_permissions)
                })
        }
    }, [])

    useEffect(async () => {
        await api.get(`/v1/accounts/group/`)
            .then(res => {
                setGroups(res.data.results)
            })
    }, [])

    useEffect(async () => {
        await api.get(`/v1/accounts/permission/`)
            .then(res => {
                setPermissions(res.data.results)
            })
    }, [])

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onCheck = (e) => {
        formData.is_active = e.target.checked
        setIsActive(e.target.checked)
    }

    return (
        <>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <PageContent
                        title={isAddMode ? "Add User" : "Edit User"}
                        breadcrumb={[
                            {
                                title: "Users",
                                link: "/user"
                            },
                            {
                                title: isAddMode ? "Add User" : "Edit User " + id,
                            }
                        ]}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 32]} style={{marginTop: 15}}>
                <Col span={24}>
                    <Card title={isAddMode ? "Add User" : "Edit User "}>

                    </Card>
                </Col>
            </Row>
        </>
    );
}
