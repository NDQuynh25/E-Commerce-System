import React from "react";
import { Card, Row, Col, Form, Button, Popover, Spin } from "antd";
import FloatingLabelInput from "../FloatingLabelInput";
import { useState, useEffect } from "react";
import { IOrder } from "../../types/backend";

interface Ward {
  name: string;
  code: number;
}
interface District {
  name: string;
  code: number;
  wards: Ward[];
}
interface Province {
  name: string;
  code: number;
  districts: District[];
}
interface AddressSectionProps {
  form: import('antd').FormInstance;
}
const AddressSection: React.FC<AddressSectionProps> = ({ form }) => {
  const [visible, setVisible] = useState(false);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<IOrder>({
    recipientName: "",
    recipientPhoneNumber: "",
    recipientCodeProvince: "0",
    recipientCodeDistrict: "0",
    recipientCodeWard: "0",
    recipientAddress: "",
    orderItems: [],
    subtotalAmount: 0,
    grandTotal: 0,
    shippingFee: 0,
    discountAmount: 0,
    paymentMethodId: "0",
  });

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data: Province[]) => {
        const sorted = [...data].sort((a, b) => {
          const cleanName = (name: string) =>
            name
              .replace(/^Tỉnh\s+/i, "")
              .replace(/^Thành phố\s+/i, "")
              .replace(/^TP\.\s*/i, "")
              .trim();

          return cleanName(a.name).localeCompare(cleanName(b.name), "vi", {
            sensitivity: "base",
          });
        });
        form.setFieldsValue({
          province: 95,
          district: 956,
          ward: 31846,
          phoneNumber: "0987654321",
          recipientName: "Nguyễn Văn A",
          address: "123 Đường ABC",
        });
        setProvinces(sorted);
        setLoading(false);
      });
  }, [form]);
  useEffect(() => {
    setDistricts(
      provinces.find((p) => p.code === form.getFieldValue("province"))
        ?.districts || []
    );
  }, [provinces, form]);

  useEffect(() => {
    console.log(form.getFieldsValue());
  }, [form]);

  useEffect(() => {
    setWards(
      districts.find((d) => d.code === form.getFieldValue("district"))?.wards ||
        []
    );
  }, [districts, form]);

  const handleProvinceChange = (code: number) => {
    const selectedProvince = provinces.find((p) => p.code === code);
    setDistricts(selectedProvince?.districts || []);
    setWards([]);
    form.setFieldsValue({ district: undefined, ward: undefined });
  };

  const handleDistrictChange = (code: number) => {
    const selectedDistrict = districts.find((d) => d.code === code);
    setWards(selectedDistrict?.wards || []);
    form.setFieldsValue({ ward: undefined });
  };

  const handleWardChange = (code: number) => {
    const selectedWard = wards.find((w) => w.code === code);
    setFormData({
      ...formData,
      recipientCodeWard: selectedWard?.name || "",
    });

    //form.setFieldsValue({ ward: selectedWard?.code });
  };

  if (loading) return <Spin tip="Đang tải dữ liệu địa phương..." />;

  const handleConfirm = () => {
    setFormData({
      ...formData,
      recipientPhoneNumber: form.getFieldValue("phoneNumber"),
      recipientName: form.getFieldValue("recipientName"),
      recipientCodeWard: form.getFieldValue("ward"),
      recipientCodeDistrict: form.getFieldValue("district"),
      recipientCodeProvince: form.getFieldValue("province"),
      recipientAddress: form.getFieldValue("address"),
      
    });
    setVisible(false);
  };

  const handleCancel = () => {
    console.log(formData);
    setVisible(false);
    // form.setFieldValue("phoneNumber", formData.phoneNumber);
    // form.setFieldValue("recipientName", formData.recipientName);
    // form.setFieldValue("address", formData.address);
    // form.setFieldValue("province", formData.province);
    // form.setFieldValue("district", formData.district);
    // form.setFieldValue("ward", formData.ward);
  };
  const handleClickOutside = (open: boolean) => {
    // Không đóng popover khi click ra ngoài
    if (!open) return;
    setVisible(true);
  };

  const content = (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleConfirm}
      style={{
        padding: "16px",
        maxWidth: "750px",
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <FloatingLabelInput
            name="recipientName"
            label="Tên người nhận hàng"
            type="text"
            form={form}
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          />
        </Col>

        <Col xs={24} md={12}>
          <FloatingLabelInput
            name="phoneNumber"
            label="Số điện thoại"
            type="text"
            form={form}
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^0\d{9}$/,
                message:
                  "Số điện thoại không hợp lệ (bắt đầu bằng 0 và đủ 10 số)",
              },
            ]}
          />
        </Col>

        <Col xs={24} md={8}>
          <FloatingLabelInput
            name="province"
            label="Tỉnh / Thành phố"
            type="select"
            form={form}
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh / thành phố" },
            ]}
            selectProps={{
              placeholder: "Chọn tỉnh",
              showSearch: true,
              optionFilterProp: "label",
              filterOption: (input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase()),
              options: provinces.map((p) => ({
                label: p.name,
                value: p.code,
              })),
              onChange: handleProvinceChange,
            }}
          />
        </Col>
        <Col xs={24} md={8}>
          <FloatingLabelInput
            name="district"
            label="Quận / Huyện"
            type="select"
            form={form}
            rules={[{ required: true, message: "Vui lòng chọn quận / huyện" }]}
            selectProps={{
              placeholder: "Chọn huyện",
              showSearch: true,
              optionFilterProp: "label",
              filterOption: (input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase()),
              options: districts.map((d) => ({
                label: d.name,
                value: d.code,
              })),
              onChange: handleDistrictChange,
              disabled: districts.length === 0,
            }}
          />
        </Col>
        <Col xs={24} md={8}>
          <FloatingLabelInput
            name="ward"
            label="Phường / Xã"
            type="select"
            form={form}
            rules={[{ required: true, message: "Vui lòng chọn quận / huyện" }]}
            selectProps={{
              placeholder: "Chọn huyện",
              showSearch: true,
              optionFilterProp: "label",
              filterOption: (input, option) =>
                (option?.label as string)
                  .toLowerCase()
                  .includes(input.toLowerCase()),
              options: wards.map((d) => ({
                label: d.name,
                value: d.code,
              })),
              onChange: handleWardChange,
              disabled: wards.length === 0,
            }}
          />
        </Col>
        <Col xs={24} md={16}>
          <FloatingLabelInput
            name="address"
            label="Địa chỉ cụ thể"
            type="text"
            form={form}
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
          />
        </Col>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "30px",
            }}
          >
            <Button
              style={{
                backgroundColor: "#fff",
                color: "#000",
                border: "1px solid #000",
              }}
              onClick={handleCancel}
            >
              HỦY
            </Button>
            <Button
              style={{ backgroundColor: "rgb(238, 77, 45)", border: "none" }}
              type="primary"
              htmlType="submit"
            >
              XÁC NHẬN
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );

  return (
    <div>
      {/* Stripe pattern */}
      <div
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)",
          height: "3px",
          backgroundPositionX: "-30px",
          backgroundSize: "116px 3px",
          marginTop: 24,
        }}
      />

      <Card
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg height="20" viewBox="0 0 12 16" width="15">
              <path
                d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                fill-rule="evenodd"
                fill="rgb(238, 77, 45)"
              ></path>
            </svg>
            <span
              style={{
                color: "rgb(238, 77, 45)",
                fontSize: "17px",
              }}
            >
              Địa chỉ nhận hàng
            </span>
           
           
           
          </div>
        }
        style={{ borderRadius: "0 0px 10px 10px" }}
        extra={
          <Popover
            trigger="click"
            open={visible}
            onOpenChange={handleClickOutside}
            content={content}
          >
            <Button type="link" style={{ padding: 0 }}>
              Thay đổi
            </Button>
          </Popover>
      
        }
      >
        
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                padding: "16px 0",
              }}
            >
              <span style={{ fontSize: "16px", fontWeight: "700" }}>
                {form.getFieldValue("recipientName")?.toUpperCase()}{" "}
                {`(+84) ${form.getFieldValue("phoneNumber")}`}
              </span>
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "500",
                  color: "#000",
                  opacity: 0.6,
                  fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC", 微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", SHPBurmese, sans-serif',
                }}
              >
                {`${form.getFieldValue("address")}, ${
                  wards.find((w) => w.code === form.getFieldValue("ward"))?.name
                }, 
                ${
                  districts.find(
                    (d) => d.code === form.getFieldValue("district")
                  )?.name
                }, 
                ${
                  provinces.find(
                    (p) => p.code === form.getFieldValue("province")
                  )?.name
                }`}
              </span>
            </div>
         

            
          </div>
      
      </Card>
    </div>
  );
};

export default AddressSection;
