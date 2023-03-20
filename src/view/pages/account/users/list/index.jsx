import React, {useEffect, useMemo, useRef, useState} from "react";

import {Row, Col, Card, Button, Table, Space, Input, Popconfirm} from "antd";
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
        return (await api.get(`/v1/account/user/`, {params: query})).data
    }

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        query.set(dataIndex, selectedKeys[0])
        history.push({ search: query.toString() });
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
        await api.delete(`/v1/account/user/${id}/`)
            .then(async () => {
                const d = (await api.get(`/v1/account/user/?${query}`)).data
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

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: name => name.first_name + ' ' + name.last_name,
            width: '20%',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: "Action",
            key: "action",
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
        phone: item.phone_number,
        email: item.email,
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
                                    rowSelection={rowSelection}
                                    columns={columns}
                                    rowKey={record => record.id}
                                    dataSource={Data}
                                    pagination={pagination}
                                    loading={loading}
                                    onChange={handleTableChange}
                                    scroll={{x: 800}}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
