"use client";
import React, { useEffect, useState } from "react";
import { Card, Table, Spacer, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import getOrderHistory from "@/app/api/order/getOrderHistory";
import Transition from "@/components/MotionFramer/transition";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  // Fetching data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderHistory(1);
        setOrders(response.content);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    { name: "Mã Đơn Hàng", uid: "orderid" }, // Order ID
    { name: "Mã Gói Đăng Ký", uid: "subcriptionid" }, // Subscription ID
    { name: "Phương Thức", uid: "paymentmethod" }, // Payment Method
    { name: "Mã Thanh Toán", uid: "paymentid" }, // Payment ID
    { name: "Số tiền (VND)", uid: "amount" }, // Amount
    { name: "Ngày Tạo", uid: "createddate" }, // Created Date
    { name: "Ngày Thanh Toán", uid: "paymentdate" }, // Payment Date
    { name: "Trạng Thái", uid: "status" }, // Status
    { name: "Liên Kết Thanh Toán", uid: "paymenturl" }, // Payment URL
  ];

  return (
    <Transition>
      <div className="p-[20px] h-screen">
        <h2 className="text-2xl font-bold mb-4 mt-4">Lịch sử thanh toán</h2>
        <Spacer y={2} />
        <Card>
          <Table
            aria-label="Order History Table"
            style={{ height: "auto", width: "100%" }}>
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.uid}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.orderid}>
                  <TableCell>{order.orderid}</TableCell>
                  <TableCell>{order.subcriptionid}</TableCell>
                  <TableCell>{order.paymentmethod}</TableCell>
                  <TableCell>{order.paymentid}</TableCell>
                  <TableCell className="text-green-500 font-semibold">{order.amount}</TableCell>
                  <TableCell>
                    {new Date(order.createddate).toLocaleDateString() + "  " + new Date(order.createddate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    {new Date(order.paymentdate).toLocaleDateString() + "  " + new Date(order.paymentdate).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{order.status == "PAID" ? "Đã thanh toán" : "Chưa thanh toán"}</TableCell>
                  <TableCell>
                    {order.paymenturl ? (
                      <a
                        className="text-blue-500 hover:underline"
                        href={order.paymenturl}
                        target="_blank"
                        rel="noopener noreferrer">
                        Xem liên kết
                      </a>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Transition>
  );
}