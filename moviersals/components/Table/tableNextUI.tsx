import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Image } from "@nextui-org/react";
import { useState } from "react";

interface HeaderDataItem {
  colname: string;
  colsub: string;
}

export interface TableData {
  headerData: HeaderDataItem[];
  bodyData: any;
  optionsButtonContent?: JSX.Element; // Options button JSX or null
  optionsButtonValue?: string;
  optionsButtonCustom?: {
    size?: "sm" | "md" | "lg";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  };
  optionsHandler?: (id: any) => void; // Optional function to handle the edit button click
  changePage?: (page: number) => void;
}

export default function TableNextUI({ tableData }: { tableData: TableData }) {
  // Config img tag
  const imgColname = ["thumbnail", "avatar"];

  // Dynamically enhance data during render
  const enhancedHeaderData = [
    ...tableData.headerData,
    ...(tableData.optionsButtonContent ? [{ colname: "options", colsub: "Chức năng" }] : []),
  ];

  const processData = tableData?.bodyData?.list ?? tableData?.bodyData;
  const enhancedBodyData = processData?.map((row) => ({
    ...row,
    ...(tableData.optionsButtonContent
      ? {
          options: (
            <Button
              size={tableData?.optionsButtonCustom?.size || "sm"}
              onPress={() => tableData.optionsHandler?.(row[tableData.optionsButtonValue])}
              color={tableData?.optionsButtonCustom?.color || "primary"}>
              {tableData.optionsButtonContent}
            </Button>
          ),
        }
      : {}),
  }));

  function handleChangePage(e: number) {
    console.log(e);
    tableData.changePage?.(e);
    // setPageNum(pageNum);
  }

  return (
    <>
      <Table>
        <TableHeader>
          {enhancedHeaderData.map((header, index) => (
            <TableColumn
              key={index}
              style={{
                width: header.colname === "options" || imgColname.includes(header.colname) ? "3rem" : "auto",
                textAlign: header.colname === "options" || imgColname.includes(header.colname) ? "center" : "left",
              }}>
              {header.colsub}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"Chưa có dữ liệu"}>
          {enhancedBodyData?.map((rowData: Record<string, any>, index: number) => (
            <TableRow key={index}>
              {enhancedHeaderData.map((header) => (
                <TableCell key={header.colname}>
                  {imgColname.includes(header.colname) ? (
                    <Image
                      className="object-cover"
                      src={rowData[header.colname]}
                      alt={header.colname}
                      width="250px"
                      height="50px"
                    />
                  ) : header.colname === "options" ? (
                    rowData.options
                  ) : (
                    String(rowData[header.colname])
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end my-4">
        <Pagination
          showControls
          isCompact
          total={tableData?.bodyData?.total}
          // page={pageNum}
          onChange={(e) => handleChangePage(e)}
        />
      </div>
    </>
  );
}
