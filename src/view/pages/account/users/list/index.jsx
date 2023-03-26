import React, {useEffect, useMemo, useRef, useState} from "react";

import {Row, Col, Card, Button, Table, Space, Input, Popconfirm, Tag} from "antd";
import PageContent from "../../../../../layout/components/content/page-content";
import reqwest from "reqwest";
import {Link, useHistory, useLocation} from "react-router-dom";
import {api} from "../../../../../utils/backend.instance";
import Highlighter from "react-highlight-words";
import PropTypes from "prop-types";

function SearchOutlined(props) {
    return null;
}

SearchOutlined.propTypes = {style: PropTypes.shape({color: PropTypes.any})};
export default function Blank() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([false]);
    const [checkedCode, setCheckedCode] = useState(false);
    const [codeClass, setCodeClass] = useState(false);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    })

    const searchInput = useRef(null);
    const history = useHistory()
    const useQuery = () => {
        const {search} = useLocation();

        return useMemo(() => new URLSearchParams(search), [search]);
    };

    let query = useQuery();

    const getUsers = async () => {
        return (await api.get(`/v1/accounts/user/`, {params: query})).data
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        query.set(dataIndex, selectedKeys[0])
        history.push({search: query.toString()});
        getUsers()
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    function toggleChecked() {
        setTimeout(() => setCodeClass(!codeClass), 100);
        setCheckedCode(!checkedCode);
    }

    const handleDelete = async (id) => {
        await api.delete(`/v1/accounts/user/${id}/`)
            .then(async () => {
                const d = (await api.get(`/v1/accounts/user/?${query}`)).data
                setData(d.results)
            })
    }

    const getColumnSearchProps = (dataIndex, name) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters, close}) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${name}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <i className={"ri-search-2-line"}
               style={{
                   color: filtered ? '#1890ff' : undefined,
               }}
            ></i>
        ),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    let color;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            fixed: "left",
            render: name => name.first_name + ' ' + name.last_name,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            sorter: true,
            render: text => <Link to={`/user-edit/${text.id}`}>{text.username}</Link>
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: "20%"
        },
        {
            title: 'Main Sport',
            dataIndex: 'main_sport',
        },
        {
            title: 'Sports',
            dataIndex: 'sports',
            render: sports => sports.map((sport) => <p>{sport} </p>)
        },
        {
            title: 'Groups',
            dataIndex: 'group',
            render: groups => groups.map((group) => <p>{group} </p>)
        },
        {
            title: "Active",
            key: "is_active",
            dataIndex: "is_active",
            filters: [
                {
                    text: 'Oui',
                    value: 'True',
                },
                {
                    text: 'Non',
                    value: 'False',
                },
            ],
            render: (tag) => (
                color = tag === "oui" ? "green" : "red",
                    <>
                        <Tag className="hp-mb-md-8" color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    </>
            ),
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            dataIndex: "action",
            render: (text) => (
                <Space size="middle">
                    <Link to={`/user-edit/${text}`}>
                        <Button type="primary" size="small"
                                className="hp-bg-success-1 hp-border-color-success-1 hp-hover-bg-success-2 hp-hover-border-color-success-2">
                            <i className="ri-edit-2-fill"/>
                        </Button>
                    </Link>
                    <Popconfirm
                        title="Delete this entry"
                        description="Are you sure to delete this entry ?"
                        onConfirm={(e) => handleDelete(text)}
                    >
                        <Button type="primary" size="small"
                                className="hp-bg-danger-1 hp-border-color-danger-1 hp-hover-bg-danger-2 hp-hover-border-color-danger-2"><i
                            className="ri-delete-bin-6-fill"/></Button>
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const Data = data.map(item => ({
        key: item.id,
        id: item.id,
        name: item,
        username: item,
        phone: item.phone_number,
        email: item.email,
        main_sport: item.main_sport,
        sports: item.sports,
        group: item.groups_name,
        is_active: item.is_active ? "oui" : "non",
        action: item.id
    }))

    useEffect(() => {
        fetch(pagination);
    }, [])

    const handleTableChange = (pagination, filters, sorter) => {
        fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    const fetch = (params = {}) => {
        setLoading(true)

        getUsers().then(data => {
            setLoading(false)
            setData(data.results);
            setPagination({
                ...params.pagination,
                total: data.count,
            });
        });
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <>
            <Row gutter={[32, 32]}>
                <Col span={24}>
                    <PageContent
                        title="Users List"
                        breadcrumb={[
                            {
                                title: "Users",
                            }
                        ]}
                    />
                </Col>
            </Row>
            <Row gutter={[32, 32]} style={{marginTop: 15}}>
                <Col span={24}>
                    <Card className="hp-border-color-black-40">
                        <Row>
                            <Col className="hp-mb-16" lg={24} span={24}>
                                <h4>Users list</h4>
                                <p className="hp-p1-body">
                                    List of all registered users in the sport club application. This table displays key
                                    information for each user, including their unique identifier, name, birthdate,
                                    address, phone number, and primary sport. Use the search and filter functions
                                    to quickly find and sort users based on specific criteria.
                                </p>
                            </Col>

                            <Col span={24}>
                                    <Table
                                        title={() => <Link
                                            to={"/user-create"}>
                                            <Button type="primary"
                                                    className="hp-bg-info-1 hp-border-color-info-1 hp-hover-bg-info-2 hp-hover-border-color-info-2">
                                                Add
                                            </Button>
                                        </Link>}
                                        rowSelection={rowSelection}
                                        columns={columns}
                                        rowKey={record => record.id}
                                        dataSource={Data}
                                        pagination={pagination}
                                        loading={loading}
                                        onChange={handleTableChange}
                                        scroll={{x: 1300}}
                                    />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
