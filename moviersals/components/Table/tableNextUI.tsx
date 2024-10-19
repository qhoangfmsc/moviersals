import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

interface HeaderDataItem {
    colname: string;
    colsub: string;
}

export interface TableData<T> {
    headerData: HeaderDataItem[];
    bodyData: T[];
}

export default function TableNextUI<T extends Record<string, any>>({
    tableData
}: {
    tableData: TableData<T>
}) {
    return (
        <Table>
            <TableHeader>
                {tableData.headerData.map((header, index) => (
                    <TableColumn key={index}>{header.colsub}</TableColumn>
                ))}
            </TableHeader>
            <TableBody>
                {tableData.bodyData.map((rowData, index) => (
                    <TableRow key={index}>
                        {tableData.headerData.map((header) => (
                            <TableCell key={header.colname}>{String(rowData[header.colname])}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}