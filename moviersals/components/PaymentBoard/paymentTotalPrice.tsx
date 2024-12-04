"use client";
import React from "react";
import { IconCurrencyUsd, IconDongSign } from "../icons";
import PaymentMethodsComponent from "./paymentMethod";
import { Button } from "@nextui-org/button";

interface PaymentTotalPriceUIProps {
    payment: {
        subcriptionid: string;
        usdPrice: string;
        vndPrice: string;
    }
}

export default function PaymentTotalPrice({ payment }: PaymentTotalPriceUIProps) {
    return (
        <div className="p-8 h-full flex flex-col border border-[#262626] rounded-lg">
            <div className="w-full h-full text-center gap-4 rounded-lg">
                <h1 className="text-2xl font-bold text-primary-500 mb-6">Tổng số tiền thanh toán</h1>
                <div className="w-full flex flex-row justify-between mb-4">
                    <div className="w-fit">Giá nội địa</div>
                    <div className="flex flex-row gap-2 justify-end items-center">
                        <h1 className="text-xl font-bold">{payment.vndPrice}</h1>
                        <IconDongSign />
                    </div>
                </div>
                {payment.usdPrice != null && (
                    <div className="w-full flex flex-row justify-between mb-4">
                        <div className="w-fit">Giá quốc tế</div>
                        <div className="flex flex-row gap-2 justify-end items-center">
                            <IconCurrencyUsd />
                            <h1 className="text-xl font-bold">{payment.usdPrice}</h1>
                        </div>
                    </div>
                )}
            </div>
            {
                (Number(payment.usdPrice) && Number(payment.vndPrice))
                    ? <PaymentMethodsComponent payment={{ subcriptionid: payment.subcriptionid, usdPrice: payment.usdPrice, vndPrice: payment.vndPrice }} />
                    : <Button color="success" size="lg">Xác nhận sử dụng</Button>
            }
        </div>
    );
}
