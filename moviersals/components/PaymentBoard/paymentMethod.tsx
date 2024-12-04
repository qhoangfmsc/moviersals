"use client";
import PaypalButon from "@/components/Button/paypalPaymentButton";
import VNPayButon from "@/components/Button/vnpayPaymentButton";
import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import { IconCurrencyUsd, IconDongSign, IconInfoCircle } from "../icons";
import { Divider } from "@nextui-org/react";
import getUSDConversionRate from "@/app/api/conversion/getUSDConversionRate";
import VNPPaymentWarning from "./paymentWarning";
import PaymentTotalPrice from "./paymentTotalPrice";

interface PaymentMethodsComponentUIProps {
    payment: {
        subcriptionid: string;
        usdPrice: string;
        vndPrice: string;
    }
}

export default function PaymentMethodsComponent({ payment }: PaymentMethodsComponentUIProps) {
    return (
        <div className="w-full p-8 h-fit flex flex-row items-center gap-4 rounded-lg">
            {payment.usdPrice != null && (
                <PaypalButon
                    price={payment.usdPrice}
                    subcriptionid={payment.subcriptionid}
                />
            )}
            <VNPayButon
                price={payment.vndPrice}
                subcriptionid={payment.subcriptionid}
            />
        </div>
    );
}
