"use client"

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";

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
    const [checkboxState, setCheckboxState] = useState<Record<string, string[]>>({}); // This will hold colname and selected values

    // DETECT HOW MANY CHECKBOX HAVE
    useEffect(() => {
        const initialState: Record<string, string[]> = {};
        adminFormCofig.colList.forEach((col) => {
            if (col.coltype === "checkbox") {
                initialState[col.colname] = [];
            }
        });
        setCheckboxState(initialState);
    }, [adminFormCofig.colList]);

    // CHECKBOX EVENT
    const handleCheckboxChange = (colname: string, value: string) => {
        setCheckboxState(prevState => {
            const currentValues = prevState[colname];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)  // Uncheck
                : [...currentValues, value];              // Check

            return {
                ...prevState,
                [colname]: newValues,  // Update state for this checkbox group
            };
        });
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const request: Record<string, any> = {}
            adminFormCofig.colList.forEach(col => {
                if (col.coltype === "checkbox") {
                    request[col.colname] = checkboxState[col.colname];
                } else {
                    const formData = new FormData(event.currentTarget);
                    request[col.colname] = formData.get(col.colname)?.toString();
                }
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
                                            isSelected={checkboxState[col.colname]?.includes(object.key)}
                                            onChange={() => handleCheckboxChange(col.colname, object.key)}
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
                <Button size="md" className="mt-8 w-full" type="submit" disabled={isLoading} variant="shadow" color="primary">
                    {isLoading ? 'Loading...' : adminFormCofig.buttonText}
                </Button>
            </form>
        </Card>
    );
}
