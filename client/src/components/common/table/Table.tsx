import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Props, TableData } from "./types";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomTable: React.FC<Props> = ({
  data = [],
  handleDelete,
  handleEdit,
}) => {
  const labels = data?.length ? Object.keys(data[0]) : [];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {labels.map((key, index) => {
              return (
                <StyledTableCell key={`${key}${index}`}>{key}</StyledTableCell>
              );
            })}
            <StyledTableCell align="left">Delete</StyledTableCell>
            <StyledTableCell align="left">Edit</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: TableData) => {
            return (
              <StyledTableRow key={row.name}>
                {labels.map((key: string, index: number) => {
                  return (
                    <StyledTableCell align="left" key={row[key] + index}>
                      {row[key]}
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell align="center">
                  <DeleteIcon onClick={() => handleDelete(row.id)} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <EditIcon onClick={() => handleEdit(row.id)} />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
