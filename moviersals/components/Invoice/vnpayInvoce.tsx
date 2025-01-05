"use client";

import Transition from "@/components/MotionFramer/transition";
import { showResponseToast } from "@/lib/utils";
import { Button, Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VNPayInvoice() {
  const searchParams = useSearchParams();

  useEffect(() => {
    showResponseToast({ result: "success", content: "Thanh toán thành công, xin cảm ơn quý khách" });
  }, []);

  // Get data from URL params using useSearchParams
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");

  // Function to format the date from vnp_PayDate
  const formatDate = (vnpPayDate) => {
    if (!vnpPayDate) return ""; // Handle case where date is not provided
    const year = vnpPayDate.substring(0, 4);
    const month = vnpPayDate.substring(4, 6);
    const day = vnpPayDate.substring(6, 8);
    const hours = vnpPayDate.substring(8, 10);
    const minutes = vnpPayDate.substring(10, 12);
    const seconds = vnpPayDate.substring(12, 14);

    return `${year}-${month}-${day}   ${hours}:${minutes}:${seconds}`;
  };

  // Prepare the data for the table
  const tableData = [
    { field: "Mã gói thành viên", value: vnp_TxnRef || "-", className: "text-lg font-semibold" },
    { field: "Mã giao dịch", value: vnp_BankTranNo || "-", className: "text-md" },
    {
      field: "Tổng số tiền",
      value: vnp_Amount ? `${Number(parseInt(vnp_Amount) / 100).toLocaleString()} VNĐ` : "-",
      className: "text-md font-semibold text-green-600",
    },
    { field: "Mã ngân hàng", value: vnp_BankCode || "-", className: "text-sm  dark:text-gray-500" },
    { field: "Loại thẻ", value: vnp_CardType || "-", className: "text-sm" },
    { field: "Ngày thanh toán", value: formatDate(vnp_PayDate) || "-", className: "text-sm" },
    { field: "Nội dung", value: vnp_OrderInfo || "-", className: "text-sm" },
    {
      field: "Trạng thái",
      value: vnp_TransactionStatus == "00" ? "Thanh toán thành công" : "Thanh toán thất bại" || "-",
      className: vnp_TransactionStatus == "00" ? "text-sm text-success" : "text-sm text-danger",
    },
  ];

  return (
    <Transition>
      <div className="flex justify-center mb-10">
        <Card className="w-[800px] items-center p-8">
          <h1 className="text-2xl py-4 color-blue">Chi tiết đơn hàng đã thanh toán VNPay</h1>
          <Table
            hideHeader
            removeWrapper
            style={{ height: "auto" }}>
            <TableHeader>
              <TableColumn> </TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              {tableData?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="pr-[100px] py-[20px]">{item.field}</TableCell>
                  <TableCell className={item.className + " max-w-[200px]"}>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            as={Link}
            href="/order/history"
            variant="flat">
            Xem lịch sử thanh toán
          </Button>
        </Card>
      </div>
    </Transition>
  );
}
