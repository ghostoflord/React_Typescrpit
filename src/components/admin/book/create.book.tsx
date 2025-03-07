import { ActionType } from "@ant-design/pro-components";
import { App, Divider, Form, Input, InputNumber, Modal } from "antd";
import { useRef, useState } from "react";
import { createBookAPI } from "../../../services/api";
import { FormProps } from "antd/lib";
interface IProps {
    openModalCreate: boolean;
    setOpenModalCreate: (v: boolean) => void;
}
type FieldType = {
    thumbnail: string;
    slider: string;
    mainText: string;
    author: string;
    price: string;
    quantity: string;
    category: string;
};
const CreateBook = (props:IProps) => {
    const { openModalCreate, setOpenModalCreate } = props
   const [isSubmit, setIsSubmit] = useState<boolean>(false);
   const { message, notification } = App.useApp();
   const [form] = Form.useForm();
   const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
           const { thumbnail,slider,mainText,author,price,quantity,category } = values;
           setIsSubmit(true);
           const res = await createBookAPI(thumbnail,slider,mainText,author,price,quantity,category);
           if (res && res.data) {
               message.success('Tạo mới user thành công');
               form.resetFields();
               setOpenModalCreate(false);
           } else {
               notification.error({
                   message: 'Đã có lỗi xảy ra',
                   description: res.message
               })
           }
           setIsSubmit(false)
       };
    return (
        <>
            <Modal title="Thêm mới người dùng"
                open={openModalCreate}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setOpenModalCreate(false);
                    form.resetFields();
                }}
                okText={"Tạo mới"}
                cancelText={"Hủy"}
                confirmLoading={isSubmit}>
                <Divider />
                <Form
                   form={form}
                   name="basic"
                   style={{ maxWidth: 600 }}
                   onFinish={onFinish}
                   autoComplete="off"
                >
                   <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="main Text"
                        name="mainText"
                        rules={[{ required: true, message: 'Please input your mainText!' }]}
                    >
                        <Input />
                    </Form.Item>
                    {/* thumbnail,slider,mainText,author,price,quantity,category */}
                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="author"
                        name="author"
                        rules={[{ required: true, message: 'Please input your author!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="price"
                        name="price"
                        rules={[{ required: true, message: 'Please input your price!' }]}
                    >
                        <InputNumber />
                    </Form.Item>

                    <Form.Item<FieldType>
                        labelCol={{ span: 24 }}
                        label="quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input your quantity!' }]}
                    >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default CreateBook;