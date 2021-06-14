import React from 'react';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

function createData(name: string, part: string, mail: string, github: string) {
  return { name, part, mail, github};
}

const rows = [
  createData('김규빈', "model,data","aaa@naver.com","www.abc.com"),
  createData('권태확', "model,data","bbb@naver.com","www.abc.com"),
  createData('김상훈', "front","bbb@naver.com","www.abc.com"),
  createData('박경환', "back","bbb@naver.com","www.abc.com"),
  createData('전주영', "front","bbb@naver.com","www.abc.com"),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            
            <StyledTableCell>name</StyledTableCell>
            <StyledTableCell align="center">part&nbsp;</StyledTableCell>
            <StyledTableCell align="center">mail&nbsp;</StyledTableCell>
            <StyledTableCell align="center">github&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.part}</StyledTableCell>
              <StyledTableCell align="center">{row.mail}</StyledTableCell>
              <StyledTableCell align="center">{row.github}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}