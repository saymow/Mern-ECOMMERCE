import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { TState } from "../../@types/redux";
import { OrderlistState } from "../../@types/redux/order";
import { UserDeletedState, UserListState } from "../../@types/redux/user";
import { listOrders } from "../../actions/orderActions";
import { deleteUser, listUsers } from "../../actions/userActions";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const OrderListScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { orders, error, loading } = useSelector<TState, OrderlistState>(
    (state) => state.orderList
  );

  console.log(orders);

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  async function handleDelete(id: string) {
    if (window.confirm("Are you sure you want to delete this user?")) {
      ((dispatch(deleteUser(id)) as unknown) as Promise<void>).then(() => {
        dispatch(listUsers());
      });
    }
  }

  return (
    <Layout>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.message}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Layout>
  );
};

export default OrderListScreen;
