import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useState } from "react";

interface HeaderDataItem {
    colname: string;
    colsub: string;
}

export interface TableData {
    headerData: HeaderDataItem[];
    bodyData: Record<string, any>[];
}

export default function TableNextUI({
    tableData
}: {
    tableData: TableData
}) {
    const [pageNum, setPageNum] = useState<number>(1);
    const recordPerPage = 5;

    // SPLIT DATA BASED ON RECORD PER PAGE
    function splitData() {
        const resultData: Record<string, any>[] = [];
        const data = tableData.bodyData
        for (let i = 0; i < data.length; i += recordPerPage) {
            resultData.push(data.slice(i, i + recordPerPage));
        }
        return resultData;
    }

    // DATA PER PAGE
    const dataByPage: Record<string, any>[] = splitData();

    return (
        <>
            <Table>
                <TableHeader>
                    {tableData.headerData.map((header, index) => (
                        <TableColumn key={index}>{header.colsub}</TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent={"Chưa có dữ liệu"}>
                    {(dataByPage.length) ? dataByPage[pageNum - 1].map((rowData: Record<string, any>, index: number) => (
                        <TableRow key={index}>
                            {tableData.headerData.map((header) => (
                                <TableCell key={header.colname}>{String(rowData[header.colname])}</TableCell>
                            ))}
                        </TableRow>
                    )) : []}
                </TableBody>
            </Table>
            <div className="flex justify-end my-4">
                <Pagination showControls isCompact total={Math.ceil(tableData.bodyData.length / recordPerPage)} initialPage={pageNum} onChange={(e) => setPageNum(e)} />
            </div>
        </>
    );
}