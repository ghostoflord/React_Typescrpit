import { useRef, useState } from 'react';
import { Popconfirm, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import DetailBook from './detail.book';
import { ProTable } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { getBooksAPI } from '../../../services/api';

type TSearch = {
    mainText: string;
    author: string;
    createdAt: string;
    createdAtRange: string;
    updatedAt: string;
    updatedAtRange: string;
    price: number;
}
const BookTable = () => {

    const actionRef = useRef<ActionType>();

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    });


    const columns: ProColumns<IBookTable>[] = [
        {
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true
        },
        {
            title: 'Tên sách',
            dataIndex: 'mainText',
            sorter: true
        },
        {
            title: 'Thể loại',
            dataIndex: 'category',
            hideInSearch: true,
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
            sorter: true,
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            hideInSearch: true,
            sorter: true,
            // https://stackoverflow.com/questions/37985642/vnd-currency-formatting
            render(dom, entity,) {
                return (
                    <>{new Intl.NumberFormat(
                        'vi-VN',
                        { style: 'currency', currency: 'VND' }).format(entity.price)}
                    </>
                )
            }
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            sorter: true,
            valueType: 'date',
            hideInSearch: true
        },

        {
            title: 'Action',
            hideInSearch: true,
            render(dom, entity,) {
                return (
                    <>
                        <EditTwoTone
                            twoToneColor="#f57800" style={{ cursor: "pointer", margin: "0 5px" }}
                            onClick={() => {
                                alert("on click")
                            }}
                        />

                        <Popconfirm
                            placement="leftTop"
                            title={"Xác nhận xóa book"}
                            description={"Bạn có chắc chắn muốn xóa book này ?"}
                            okText="Xác nhận"
                            cancelText="Hủy"
                        >
                            <span style={{ cursor: "pointer" }}>
                                <DeleteTwoTone twoToneColor="#ff4d4f" />
                            </span>
                        </Popconfirm>
                    </>
                )
            }
        }
    ];

    return (
        <>
            <ProTable<IBookTable, TSearch>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async () => {

                    const res = await getBooksAPI();

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
                headerTitle="Table book"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            alert("on click")
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>
                ]}
            />

            <DetailBook />
        </>
    )
}

export default BookTable;