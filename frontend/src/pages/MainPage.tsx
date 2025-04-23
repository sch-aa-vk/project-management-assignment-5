import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Spin, Button, Popconfirm, Input, Select } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getOrders, deleteOrder } from "../services/orderService";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { tokenSelector } from "../store/selectors/authSelectors";
import { NotificationsContext } from "../services/notificationsContext";
import { ContentWrapper } from "../components/ContentWrapper";
import { routes } from "../configs/routes";
import { IOrder, OrderStatus } from "../store/interfaces/order";

const MainPageContainer = styled.div`
  width: 100%;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

export const MainPage: React.FC = () => {
  const { openNotification } = useContext(NotificationsContext);
  const token = useAppSelector(tokenSelector);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [customerIdFilter, setCustomerIdFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | undefined>(undefined);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      const response = await getOrders(token, { customer_id: customerIdFilter, status: statusFilter });
      console.log("Orders fetched successfully:", response);
      setOrders(response);
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string; error: string }>).response?.data
          ?.message || "An unexpected error occurred";
      openNotification("Request for orders failed", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      await deleteOrder(orderId, token);
      openNotification("Success", "Order deleted successfully", "success");
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.order_id !== orderId)
      );
    } catch (error) {
      const errorMessage =
        (error as AxiosError<{ message: string; error: string }>).response?.data
          ?.message || "Failed to delete order";
      openNotification("Delete failed", errorMessage, "error");
    }
  };

  useEffect(() => {
    fetchOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Edit",
      key: "edit",
      render: (_: unknown, record: IOrder) => (
        <Button
          style={{ padding: 0 }}
          type="link"
          onClick={() => navigate(`${routes.ordersEdit}/${record.order_id}`)}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_: unknown, record: IOrder) => (
        <Popconfirm
          title="Are you sure you want to delete this order?"
          onConfirm={() => handleDelete(record.order_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ padding: 0 }} type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <ContentWrapper>
      <MainPageContainer>
        <Header>
          <Title>All Orders</Title>
          <Button type="primary" onClick={() => navigate(routes.ordersAdd)}>
            Add Order
          </Button>
        </Header>
        <FiltersContainer>
          <Input
            placeholder="Customer ID"
            value={customerIdFilter}
            onChange={(e) => setCustomerIdFilter(e.target.value)}
          />
          <Select
            placeholder="Status"
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            style={{ width: 200 }}
          >
            <Select.Option value={undefined}>All</Select.Option>
            <Select.Option value={OrderStatus.PROCESSING}>{OrderStatus.PROCESSING}</Select.Option>
            <Select.Option value={OrderStatus.DELIVERED}>{OrderStatus.DELIVERED}</Select.Option>
            <Select.Option value={OrderStatus.SHIPPED}>{OrderStatus.SHIPPED}</Select.Option>
            <Select.Option value={OrderStatus.CANCELED}>{OrderStatus.CANCELED}</Select.Option>
          </Select>
          <Button type="primary" onClick={fetchOrders}>
            Filter
          </Button>
        </FiltersContainer>
        {loading ? (
          <Spin
            size="large"
            style={{ display: "block", margin: "50px auto" }}
          />
        ) : (
          <Table dataSource={orders} columns={columns} rowKey="id" />
        )}
      </MainPageContainer>
    </ContentWrapper>
  );
};
