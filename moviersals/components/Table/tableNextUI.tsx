import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Image } from "@nextui-org/react";
import { useState } from "react";

interface HeaderDataItem {
    colname: string;
    colsub: string;
}

export interface TableData {
    headerData: HeaderDataItem[];
    bodyData: Record<string, any>[];
    optionsButtonContent?: JSX.Element; // Options button JSX or null
    optionsButtonValue?: string,
    optionsHandler?: (id: any) => void; // Optional function to handle the edit button click
}

export default function TableNextUI({
    tableData
}: {
    tableData: TableData
}) {
    const [pageNum, setPageNum] = useState<number>(1);
    const recordPerPage = 5;

    // Config img tag
    const imgColname = ["thumbnail", "avatar"];

    // Dynamically enhance data during render
    const enhancedHeaderData = [
        ...tableData.headerData,
        ...(tableData.optionsButtonContent
            ? [{ colname: "options", colsub: "Chức năng" }]
            : [])
    ];

    const enhancedBodyData = tableData.bodyData.map((row) => ({
        ...row,
        ...(tableData.optionsButtonContent
            ? {
                options: (
                    <Button
                        size="sm"
                        onPress={() => tableData.optionsHandler?.(row[tableData.optionsButtonValue])}
                        color="primary"
                    >
                        {tableData.optionsButtonContent}
                    </Button>
                )
            }
            : {})
    }));

    // SPLIT DATA BASED ON RECORD PER PAGE
    const splitData = () => {
        const resultData: Record<string, any>[] = [];
        for (let i = 0; i < enhancedBodyData.length; i += recordPerPage) {
            resultData.push(enhancedBodyData.slice(i, i + recordPerPage));
        }
        return resultData;
    };

    // Paginated data for current page
    const dataByPage = splitData();

    return (
        <>
            <Table>
                <TableHeader>
                    {enhancedHeaderData.map((header, index) => (
                        <TableColumn
                            key={index}
                            style={{
                                width:
                                    (header.colname === "options" || imgColname.includes(header.colname))
                                        ? "3rem"
                                        : "auto",
                                textAlign:
                                    (header.colname === "options" || imgColname.includes(header.colname))
                                        ? "center"
                                        : "left",
                            }}
                        >
                            {header.colsub}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={"Chưa có dữ liệu"}>
                    {dataByPage.length
                        ? dataByPage[pageNum - 1].map((rowData: Record<string, any>, index: number) => (
                            <TableRow key={index}>
                                {enhancedHeaderData.map((header) => (
                                    <TableCell key={header.colname}>
                                        {imgColname.includes(header.colname) ? (
                                            <Image className="object-cover" src={rowData[header.colname]} alt={header.colname} width="250px" height="50px" />
                                        ) : header.colname === "options" ? (
                                            rowData.options
                                        ) : (
                                            String(rowData[header.colname])
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                        : []}
                </TableBody>
            </Table>
            <div className="flex justify-end my-4">
                <Pagination
                    showControls
                    isCompact
                    total={Math.ceil(enhancedBodyData.length / recordPerPage)}
                    page={pageNum}
                    onChange={(e) => setPageNum(e)}
                />
            </div>
        </>
    );
}
