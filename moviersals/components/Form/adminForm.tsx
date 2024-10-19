"use client"

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useState } from "react";

export interface AdminFormCofig {
    colList: {
        colname: string,
        colsub: string,
        coltype: "inputtext" | "inputnumber" | "radio" | "checkbox",
        colvalues: {
            key: any,
            value: any,
        }[] | null;
    }[],
    buttonText: string,
    handler: (request: Record<string, any>) => void,
}

export default function AdminForm({
    adminFormCofig
}: {
    adminFormCofig: AdminFormCofig
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const request: Record<string, any> = {}
            adminFormCofig.colList.forEach(col => {
                request[col.colname] = formData.get(col.colname)?.toString();
            });
            adminFormCofig.handler(request)
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="p-4">
            <h1 className="text-xl">Tạo mới</h1>
            <form className="flex flex-col" onSubmit={onSubmit}>
                <Input
                    className="w-full"
                    type="text"
                    name="id"
                    variant="underlined"
                    isDisabled
                    label="ID (không thể chỉnh sửa)"
                />
                {adminFormCofig.colList.map((col, index) => {
                    switch (col.coltype) {
                        case "inputtext":
                            return (
                                <Input
                                    key={index}
                                    className="w-full"
                                    type="text"
                                    name={col.colname}
                                    variant="underlined"
                                    label={col.colsub}
                                />
                            );
                        case "inputnumber":
                            return (
                                <Input
                                    key={index}
                                    className="w-full"
                                    type="number"
                                    name={col.colname}
                                    variant="underlined"
                                    label={col.colsub}
                                />
                            );
                        case "radio":
                            return (
                                <RadioGroup
                                    key={index}
                                    label={col.colsub}
                                    orientation="horizontal"
                                    name={col.colname}
                                    className="mt-6"
                                >
                                    {col.colvalues?.map((object) => (
                                        <Radio
                                            key={object.key}
                                            value={object.key}
                                        >
                                            <span className="text-sm">
                                                {object.value}
                                            </span>
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            );
                        case "checkbox":
                            return (
                                <CheckboxGroup
                                    key={index}
                                    label={col.colsub}
                                    orientation="horizontal"
                                    name={col.colname}
                                    className="mt-6"
                                >
                                    {col.colvalues?.map((object) => (
                                        <Checkbox
                                            key={object.key}
                                            value={object.key}
                                        >
                                            <span className="text-sm">
                                                {object.value}
                                            </span>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            )
                        default:
                            return null;
                    }
                })}
                <Button size="lg" className="mt-8 w-[350px]" type="submit" disabled={isLoading} variant="shadow" color="primary">
                    {isLoading ? 'Loading...' : adminFormCofig.buttonText}
                </Button>
            </form>
        </Card>
    );
}
