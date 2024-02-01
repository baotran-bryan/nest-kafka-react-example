import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "eventTime", headerName: "Thời Gian Ghi Hình", width: 90 },
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
  },
  {
    field: "event_description",
    headerName: "Mô Tả Sự Kiện",
    width: 110,
  },
  {
    field: "camera_id",
    headerName: "ID Camera",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "admin_info",
    headerName: "Thông Tin Người Dùng",
    width: 110,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
  {
    field: "additional_note",
    headerName: "Ghi Chú Bổ Sung",
    width: 110,
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
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
