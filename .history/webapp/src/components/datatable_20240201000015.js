import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "event_time", headerName: "Thời Gian Ghi Hình", width: 90 },
  {
    field: "event_type",
    headerName: "Loại Sự Kiện",
    width: 150,
  },
  {
    field: "camera_location",
    headerName: "Vị Trí Camera",
    width: 150,

    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "image_video",
    headerName: "Hình Ảnh/Video",
    width: 110,
  },
  {
    field: "priority_level",
    headerName: "Mức Độ Ưu Tiên",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "detection_detail",
    headerName: "Thông Tin Phát Hiện",
    width: 110,
    editable: true,
  },
  {
    field: "event_description",
    headerName: "Mô Tả Sự Kiện",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "age",
    headerName: "ID Camera",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "age",
    headerName: "Thông Tin Người Dùng",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "age",
    headerName: "Ghi Chú Bổ Sung",
    type: "number",
    width: 110,
    editable: true,
  },
];

const DataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Replace this URL with your actual endpoint
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRows(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Column 1</TableCell>
            <TableCell align="right">Column 2</TableCell>
            {/* Add more headers if needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.column1}
              </TableCell>
              <TableCell align="right">{row.column2}</TableCell>
              {/* Add more cells if needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
