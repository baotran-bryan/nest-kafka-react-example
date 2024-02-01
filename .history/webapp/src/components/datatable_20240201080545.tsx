import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridToolbar,
} from "@mui/x-data-grid";
const drawerWidth = 240;
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
    valueGetter: (params: GridValueGetterParams) => {
        console.log("Camera", params.row);
        return `${params.row.cameraLocation.name}`;
    }
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
    description: "This column has a value getter and is not sortable.",
    sortable: false,
  },
  {
    field: "detectionDetail",
    headerName: "Thông Tin Phát Hiện",
    width: 300,
  },
  {
    field: "eventDescription",
    headerName: "Mô Tả Sự Kiện",
    width: 300,
  },
  {
    field: "cameraID",
    headerName: "ID Camera",
    type: "number",
    editable: true,
    width: 110,
  },
  {
    field: "adminUserInfo",
    headerName: "Thông Tin Người Dùng",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.userID || ""} ${params.row.notificationStatus || ""}`,
  },
  {
    field: "additionalNotes",
    headerName: "Ghi Chú Bổ Sung",
  },
];

const VISIBLE_FIELDS = [
  "eventType",
  "cameraID",
  "priorityLevel",
  "eventTime",
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
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
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
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
};

export default DataTable;
