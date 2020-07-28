import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  TablePagination, Typography, Grid
} from "@material-ui/core";
import { withRouter } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: { width: "100%" },
  typoGraphy:{paddingBottom:"20px"},
  table:{minWidth:"100"}
}));

const CustomTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (id, source) => {
    source === "repo" && props.history.push(`/issue/search/${id}`);
  };

  return (
    <>
     <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
    <Typography className={classes.typoGraphy} variant="h5" color="primary"> {props.source==="repo" ? "Repository Details":"Issue Details"}</Typography>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table className={classes.table} stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.searchResult
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            onClick={() => handleRowClick(row.id, props.source)}
                          >
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={props.searchResult.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      </Grid>
    </>
  );
};
export default withRouter(CustomTable);
