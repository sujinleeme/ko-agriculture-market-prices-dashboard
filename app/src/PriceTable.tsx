import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'name' | 'rank' | 'day3' | 'day4' | 'day5';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: '품목' },
  { id: 'rank', label: '품질' },
  {
    id: 'day3',
    label: '1주일전',
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'day4',
    label: '2주일전',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'day5',
    label: '1개월전',
    minWidth: 170,
    align: 'right',
    // format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  rank: string;
  day3: string;
  day4: string;
  day5: string;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export interface Item {
  item_name: string;
  rank: string;
  dpr3: string;
  dpr4: string;
  dpr5: string;
}

interface PriceTableProps {
  items: Item[];
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  selectedItemIndex?: number;
};

export const PriceTable: React.FC<PriceTableProps> = ({ items, onClick, selectedItemIndex }: PriceTableProps) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function createData(name: string, rank: string, day3: string, day4: string, day5: string): Data {
    return { name, rank, day3, day4, day5 };
  }

  const rows = items.map((item) =>
    createData(`${item.item_name}`, `${item.rank}`, `${item.dpr3}`, `${item.dpr4}`, `${item.dpr5}`)
  );

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={`${column.id}-${column.label}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow key={uuidv4()} hover onClick={onClick} selected={index === selectedItemIndex}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={`${column.id}-${value}`} align={column.align} data-tabid={index}> 
                          {column.format && typeof value === 'number' ? column.format(value) : value}
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PriceTable;
