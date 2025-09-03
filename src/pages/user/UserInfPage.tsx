import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  Select,
  Card,
  Col,
  Row,
  DatePicker,
  Spin,
} from "antd";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";
import { message } from "antd";
import { useAppSelector } from "../../redux/hooks";
import dayjs from "dayjs";
import { callGetUser, callUpdateUser } from "../../api/userApi";
import { IUser } from "../../types/backend";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const UserInfPage: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateLoading, setUpdateLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const [userData, setUserData] = useState<IUser>();

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onFinish = async (values: any) => {
    setUpdateLoading(true);
    console.log(values.dateOfBirth.format("YYYY-MM-DD"));
    console.log(userData);
    if (!userData) {
      return;
    }
    const formData = new FormData();
    formData.append("fullName", values.fullName || "");
    formData.append("email", values.email || "");
    formData.append("phoneNumber", values.phoneNumber || "");
    formData.append("gender", values.gender || "");
    formData.append("address", userData?.address || "");
    if (values.dateOfBirth) {
      formData.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
    }
    formData.append("roleId", userData?.role?.id || "");
    formData.append("isActive", "1");

    if (fileList.length > 0 && fileList[0].originFileObj) {
      console.log(fileList[0].originFileObj);
      formData.append("avatarFile", fileList[0].originFileObj as Blob);
    }

    const res = await callUpdateUser(userData.id as string, formData);
    if (res.status === 200) {
      message.success("Cập nhật thông tin thành công");
      setUpdateLoading(false);
    } else {
      message.error("Có lỗi xảy ra!");
      setUpdateLoading(false);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await callGetUser(auth.account_info.id as string);
      if (res.status === 200) {
        setUserData(res.data as IUser);
      } else {
        console.log(res);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        email: userData.email,
        fullName: userData.fullName,
        phoneNumber: userData.phoneNumber
          ? userData.phoneNumber.toString()
          : "",
        dateOfBirth: userData.dateOfBirth ? dayjs(userData.dateOfBirth) : null,
        gender: userData.gender,
      });
      if (userData.avatar) {
        setFileList([
          {
            uid: "-1",
            name: "avatar.png",
            status: "done",
            url: userData.avatar,
          },
        ]);
      }
      setFileList([
        {
          uid: "-1",
          name: "avatar.png",
          status: "done",
          url: userData.avatar,
        },
      ]);
    }
  }, [userData]);

  return (
    <Spin
      style={{
        position: "fixed",
        top: "23%",
        left: "-20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      spinning={updateLoading}
      indicator={<LoadingOutlined style={{ fontSize: 60, color: "#ee4d2d" }} />}
    >
      <Card
        title={<span style={{ fontSize: "18px" }}>Thông tin tài khoản</span>}
      >
        <Form
          {...formItemLayout}
          form={form}
          initialValues={{
            prefix: "84",
          }}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row>
            <Col xl={13}>
              <Form.Item
                name="email"
                label={<span style={{ fontSize: "15px" }}>E-mail</span>}
                rules={[
                  {
                    type: "email",
                    message: "E-mail không hợp lệ!",
                  },
                  {
                    required: true,
                    message: "Vui lòng nhập E-mail",
                  },
                ]}
                hasFeedback
              >
                <Input size="large" placeholder="E-mail" />
              </Form.Item>

              <Form.Item
                name="fullName"
                label={<span style={{ fontSize: "15px" }}>Họ và tên</span>}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên",
                  },
                ]}
                hasFeedback
              >
                <Input size="large" placeholder="Họ và tên" />
              </Form.Item>

              <Form.Item
                name="phoneNumber"
                label={<span style={{ fontSize: "15px" }}>Số điện thoại</span>}
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || /^[0-9]{9,11}$/.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Số điện thoại không hợp lệ");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input
                  size="large"
                  placeholder="Số điện thoại"
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                name="dateOfBirth"
                label={<span style={{ fontSize: "15px" }}>Ngày sinh</span>}
                hasFeedback
              >
                <DatePicker
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Ngày sinh"
                />
              </Form.Item>

              <Form.Item
                name="gender"
                initialValue="male"
                label={<span style={{ fontSize: "15px" }}>Giới tính</span>}
              >
                <Radio.Group>
                  <Radio value="MALE">Nam</Radio>
                  <Radio value="FEMALE">Nữ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="link" htmlType="submit">
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#ee4d2d",
                      fontWeight: "bold",
                    }}
                  >
                    Lưu
                  </span>
                </Button>
              </Form.Item>
            </Col>
            <Col xl={2}></Col>
            <Col xl={9}>
              <ImgCrop rotationSlider>
                <Upload
                  style={{
                    width: "50px",
                  }}
                  accept="image/*"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                  beforeUpload={() => false}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
        </Form>
      </Card>
    </Spin>
  );
};

export default UserInfPage;
