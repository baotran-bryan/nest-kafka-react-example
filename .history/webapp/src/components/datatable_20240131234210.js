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

const DataTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Replace this URL with your actual endpoint
    fetch("http://localhost:3000/events")
      .then((response) => response.json())
      .then((data) => {
        setRows(data)}
        )
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
