import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Form, InputNumber, Select, Button } from "antd";
import { AxiosError } from "axios";
import { createOrder } from "../services/orderService";
import { NotificationsContext } from "../services/notificationsContext";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { tokenSelector } from "../store/selectors/authSelectors";
import { OrderStatus } from "../store/interfaces/order";
import { ContentWrapper } from "../components/ContentWrapper";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Container = styled.div`
  width: 100%;
  padding: 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
`;

export const OrderAdd: React.FC = () => {
  const { openNotification } = useContext(NotificationsContext);
  const token = useAppSelector(tokenSelector);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: { status: OrderStatus; amount: number }) => {
    setLoading(true);
    try {
      if (!token) {
        throw new Error("No token found");
      }
      await createOrder(values.status, values.amount, token);
      openNotification(
        "Order created successfully",
        "Your order has been created successfully!",
        "success"
      );
      form.resetFields(); // Clear the form inputs
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string; error: string }>).response?.data
          ?.message || "An unexpected error occurred";
      openNotification("Order creation failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContentWrapper>
      <Container>
        <TitleWrapper>
          <Title>Add New Order</Title>
          <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
        </TitleWrapper>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select a status">
              <Option value={OrderStatus.PROCESSING}>
                {OrderStatus.PROCESSING}
              </Option>
              <Option value={OrderStatus.SHIPPED}>{OrderStatus.SHIPPED}</Option>
              <Option value={OrderStatus.DELIVERED}>
                {OrderStatus.DELIVERED}
              </Option>
              <Option value={OrderStatus.CANCELED}>
                {OrderStatus.CANCELED}
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter an amount!" }]}
          >
            <InputNumber
              min={1}
              placeholder="Enter amount"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Container>
    </ContentWrapper>
  );
};
