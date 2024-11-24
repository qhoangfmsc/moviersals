"use client";

import { convertArrayToLowercaseArray, convertRequestToFormData, preexecuteRequest } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@nextui-org/react";
import { FormEvent, useEffect, useState } from "react";

export interface AdminFormCofig {
    label: string;
    colList: {
        colname: string;
        colsub: string;
        coltype: "inputtext" | "inputnumber" | "inputfile" | "radio" | "checkbox";
        colvalues: {
            key: any;
            value: any;
        }[] | null;
    }[];
    buttonText: string;
    handler: (request: Record<string, any>) => void;
}

export default function AdminForm({
    adminFormCofig,
    rerenderData,
}: {
    adminFormCofig: AdminFormCofig;
    rerenderData: Object | null;
}) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [checkboxState, setCheckboxState] = useState<Record<string, string[]>>({});
    const [fileState, setFileState] = useState<Record<string, File | null>>({});

    useEffect(() => {
        const initialCheckboxState: Record<string, string[]> = {};
        const initialFileState: Record<string, File | null> = {};

        adminFormCofig.colList.forEach((col) => {
            if (col.coltype === "checkbox") {
                initialCheckboxState[col.colname] = rerenderData?.[col.colname]
                    ? JSON.parse(rerenderData[col.colname] as string)
                    : [];
            }
            if (col.coltype === "inputfile") {
                initialFileState[col.colname] = null;
            }
        });
        setCheckboxState(initialCheckboxState);
        setFileState(initialFileState);
    }, [adminFormCofig.colList]);

    const handleCheckboxChange = (colname: string, value: string) => {
        setCheckboxState((prevState) => {
            const currentValues = prevState[colname];
            const newValues = currentValues.includes(value)
                ? currentValues.filter((v) => v !== value)
                : [...currentValues, value];
            return { ...prevState, [colname]: newValues };
        });
    };

    const handleFileChange = (colname: string, file: File | null) => {
        setFileState((prevState) => ({ ...prevState, [colname]: file }));
    };

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.currentTarget);
            const request: Record<string, any> = {};

            adminFormCofig.colList.forEach((col) => {
                if (col.coltype === "checkbox") {
                    request[col.colname] = checkboxState[col.colname];
                } else if (col.coltype === "inputfile") {
                    request[col.colname] = fileState[col.colname];
                } else {
                    request[col.colname] = formData.get(col.colname);
                }
            });

            const payloadFormData = convertRequestToFormData(preexecuteRequest(request));
            adminFormCofig.handler(payloadFormData);
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
            <h1 className="text-xl">{adminFormCofig.label}</h1>
            <form className="flex flex-col" onSubmit={onSubmit} encType="multipart/form-data">
                <Input
                    className="w-full"
                    type="text"
                    name="id"
                    variant="underlined"
                    isDisabled
                    label="ID (không thể chỉnh sửa)"
                    value={(rerenderData as any)?.id}
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
                                    value={(rerenderData as any)?.[col.colname]}
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
                                    value={(rerenderData as any)?.[col.colname]}
                                />
                            );
                        case "inputfile":
                            return (
                                <div key={index}>
                                    <h1 className="text-sm text-zinc-400 pl-1 pt-3">{col.colsub}</h1>
                                    <Input
                                        id={`fileupload${index}`}
                                        className="w-full pt-2"
                                        type="file"
                                        name={col.colname}
                                        onChange={(e) =>
                                            handleFileChange(col.colname, e.target.files?.[0] || null)
                                        }
                                    />
                                </div>
                            );
                        case "radio":
                            return (
                                <RadioGroup
                                    key={index}
                                    label={col.colsub}
                                    orientation="horizontal"
                                    name={col.colname}
                                    className="mt-2"
                                    value={(rerenderData as any)?.[col.colname]}
                                    onChange={(value) => {
                                        (rerenderData as any)[col.colname] = value;
                                    }}
                                >
                                    {col.colvalues?.map((object) => (
                                        <Radio key={object.key} value={object.key}>
                                            <span className="text-sm">{object.value}</span>
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            );
                        case "checkbox":
                            let setupDefaultValue = (rerenderData)
                                ? (typeof rerenderData?.[col.colname] == "string")
                                    ? JSON.parse(rerenderData?.[col.colname] as any)
                                    : rerenderData?.[col.colname] as any
                                : []

                            setupDefaultValue = convertArrayToLowercaseArray(setupDefaultValue);
                            return (
                                <CheckboxGroup
                                    key={index}
                                    label={col.colsub}
                                    orientation="horizontal"
                                    name={col.colname}
                                    className="mt-2"
                                    defaultValue={setupDefaultValue}
                                >
                                    {col.colvalues?.map((object) => (
                                        <Checkbox
                                            key={object.key}
                                            value={object.key}
                                            onChange={() => handleCheckboxChange(col.colname, object.key)}
                                        >
                                            <span className="text-sm">{object.value}</span>
                                        </Checkbox>
                                    ))}
                                </CheckboxGroup>
                            );
                        default:
                            return null;
                    }
                })}
                <Button
                    size="md"
                    className="mt-8 w-full"
                    type="submit"
                    disabled={isLoading}
                    variant="shadow"
                    color="primary"
                >
                    {isLoading ? "Loading..." : adminFormCofig.buttonText}
                </Button>
            </form>
        </Card>
    );
}
