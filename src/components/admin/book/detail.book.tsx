import { Descriptions, Drawer } from "antd";

interface IProps {
    openViewDetail: boolean,
    setOpenViewDetail: (v: boolean) => void
    dataViewTable: IBookTable | null,
    setDataviewTable: (v: IBookTable | null) => void
}

const DetailBook = (props: IProps) => {
    const { openViewDetail, setOpenViewDetail, dataViewDetail, setDataViewDetail } = props;
    const onClose = () => {
        setOpenViewDetail(false);
        setOpenViewDetail(null);
    }
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openViewDetail}
            >
                <Descriptions title="User Info">
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Nội dung chính">{dataViewDetail?.mainText}</Descriptions.Item>
                    <Descriptions.Item label="Tác Giả">{dataViewDetail?.author}</Descriptions.Item>
                    <Descriptions.Item label="Giá tiền">{new Intl.NumberFormat(
                        'vi-VN',
                        { style: 'currency', currency: 'VND' }).format(dataViewDetail?.price)}</Descriptions.Item>
                    <Descriptions.Item label="Ngaỳ cập nhập">{dataViewDetail?.createdAt}</Descriptions.Item>

                </Descriptions>;
            </Drawer>
        </>
    )
}

export default DetailBook;