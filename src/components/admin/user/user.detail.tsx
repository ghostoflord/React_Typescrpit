import { Descriptions, Drawer } from "antd";

interface IProps {
    openModalDetail: boolean;
    setOpenModelDetail: (v: boolean) => void;
    dataViewDetail: IUserTable | null;
    setDataViewDetail: (v: IUserTable | null) => void;
}

const UserDetail = (props: IProps) => {
    const { openModalDetail, setOpenModelDetail, dataViewDetail, setDataViewDetail } = props;

    const onClose = () => {
        setOpenModelDetail(false);
        setOpenModelDetail(null);
    }
    return (
        <>
            <Drawer
                title="Chức năng xem chi tiết"
                width={"50vw"}
                onClose={onClose}
                open={openModalDetail}
            >
                <Descriptions title="User Info">
                    <Descriptions.Item label="Id">{dataViewDetail?._id}</Descriptions.Item>
                    <Descriptions.Item label="Tên hiển thị">{dataViewDetail?.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{dataViewDetail?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
                </Descriptions>;
            </Drawer>
        </>
    );
}
export default UserDetail;