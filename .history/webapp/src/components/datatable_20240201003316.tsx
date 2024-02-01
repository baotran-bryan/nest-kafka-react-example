import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "eventTime", headerName: "Thời Gian Ghi Hình", width: 110 },
  {
    field: "eventType",
    headerName: "Loại Sự Kiện",
    width: 110,
  },
  {
    field: "cameraLocation",
    headerName: "Vị Trí Camera",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "imageVideo",
    headerName: "Hình Ảnh/Video",
    width: 150,
  },
  {
    field: "priorityLevel",
    headerName: "Mức Độ Ưu Tiên",
    width: 110,
    sortable: false,
  },
  {
    field: "detectionDetail",
    headerName: "Thông Tin Phát Hiện",
  },
  {
    field: "eventDescription",
    headerName: "Mô Tả Sự Kiện",
  },
  {
    field: "cameraID",
    headerName: "ID Camera",
    type: "number",
    editable: true,
  },
  {
    field: "adminUserInfo",
    headerName: "Thông Tin Người Dùng",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "additionalNotes",
    headerName: "Ghi Chú Bổ Sung",
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
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 25,
            },
          },
        }}
        pageSizeOptions={[25]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
