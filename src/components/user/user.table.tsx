import { PlusOutlined } from "@ant-design/icons";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { getUsersAPI } from "../../services/api";
import { useRef } from "react";
const columns: ProColumns<IUserTable>[] = [
    {
        dataIndex: "index",
        valueType: "indexBorder",
        width: 48,
    },
    {
        title: "_id",
        dataIndex: "_id",

    },
    {
        title: "Full Name",
        dataIndex: "fullName",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Phone",
        dataIndex: "phone",
    },
    {
        title: "Role",
        dataIndex: "role",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
    },
    {
        title: "Update dAt",
        dataIndex: "updatedAt",
    },
]
const UserTable = () => {
    const actionRef = useRef<ActionType>();

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
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>

                ]}

            />
        </>
    );
}
export default UserTable;