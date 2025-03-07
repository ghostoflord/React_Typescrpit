
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import { deleteUserAPI, getUsersAPI } from '../../../services/api';
import CreateUser from './create.user';
import UserDetail from './user.detail';

const TableUser = () => {
    const actionRef = useRef<ActionType>();
    const [deleteUser, setDeleteUser] = useState(false);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [dataViewDetail, setDataViewDetail] = useState<IUserTable | null>(null);
    const [openModalDetail, setOpenModelDetail] = useState<boolean>(false);
    const handleDeleteUser = async (_id: string) => {
        setDeleteUser(true);
        const res = await deleteUserAPI(_id);
        if (res && res.data) {
            message.success("delete user success")
        } else {
            notification.error({
                message: 'error',
                description: res.message
            })
        }
        setDeleteUser(false)
    }

    const columns: ProColumns<IUserTable>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true,
            render(dom, entity) {
                return (
                    <a
                        onClick={() => {
                            setDataViewDetail(entity);
                            setOpenModelDetail(true);
                        }}
                        href='#'>{entity._id}</a>
                )
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
        },
        {
            title: 'Action',
            render(dom, entity,) {
                return (
                    <>
                        <EditOutlined
                            twoToneColor="#ff4d4f"
                            style={{ cursor: "pointer", marginRight: 15 }}
                            onClick={() => {
                                setOpenModelDetail(true);
                                // alert("on click")
                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => handleDeleteUser(entity._id)}
                            okText="Xác nhận"
                            cancelText="Hủy"
                            okButtonProps={{ loading: deleteUser }}
                        >
                            <DeleteOutlined
                                twoToneColor="#ff4d4f"
                                style={{ cursor: "pointer" }}
                            />
                        </Popconfirm>
                    </>
                )
            },

        },

    ];

    return (
        <>
            <ProTable<IUserTable>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params, sort, filter) => {
                    console.log(sort, filter);
                    const res = await getUsersAPI();

                    return {
                        data: res.data?.result,
                        "page": 1,
                        "success": true,
                        "total": res.data?.meta.total
                    }
                }}
                rowKey="id"
                pagination={{
                    pageSize: 5,
                    onChange: (page) => console.log(page),
                }}
                headerTitle="Table user"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setOpenModalCreate(true);
                            // alert("on click")
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>
                ]}
            />
            <CreateUser
                openModalCreate={openModalCreate}
                setOpenModalCreate={setOpenModalCreate}
            />
            <UserDetail
                openModalDetail={openModalDetail}
                setOpenModelDetail={setOpenModelDetail}
                dataViewDetail={dataViewDetail}
                setDataViewDetail={setDataViewDetail}

            />
        </>
    );
};

export default TableUser;