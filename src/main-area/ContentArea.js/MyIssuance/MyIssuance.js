import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import './MyIssuance.scss';

function createData(id, name, type, issuanceType, targetRaise, preMoneyValuation, amountRaise, location, status) {
  return {
    id,
    industry: {
      name,
      type
    },
    issuanceType,
    targetRaise,
    preMoneyValuation,
    amountRaise,
    location,
    status
  };
}

const rows = [
  createData(0, 'Energy Infrastructure', 'Financial Services', 'Equity', '23', '1', '1', 'Europe', 'InProgress'),
  createData(1, 'ABC', 'Financial Services', 'Investment Fund', '23', '1', '1', 'U.S.', 'InProgress'),
  createData(2, 'Alternative Gas Extraction', 'Space', 'Debt', '23', '1', '1', 'U.S.', 'Close'),
];

function desc(a, b, orderBy) {
  if(orderBy === 'name') {
    return b['industry'][orderBy] < a['industry'][orderBy] ? -1 : (b['industry'][orderBy] > a['industry'][orderBy]) ? 1 : 0
  } else {
    return b[orderBy] < a[orderBy] ? -1 : (b[orderBy] > a[orderBy]) ? 1 : 0;
  }
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name & Industry Type' },
  { id: 'issuanceType', numeric: false, disablePadding: false, label: 'Issuance Type' },
  { id: 'targetRaise', numeric: true, disablePadding: false, label: 'Target Raise' },
  { id: 'preMoneyValuation', numeric: true, disablePadding: false, label: 'Pre-Money Valuation' },
  { id: 'amountRaised', numeric: true, disablePadding: false, label: 'Amount Raised' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className="table-row">
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function MyIssuance(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected] = React.useState([]);
  const [page] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, index) => {
    const selectedIndex = rows.findIndex((val) => {
      return val.id === index;
    });
    props.getInfo(event, index, rows[selectedIndex]);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.id)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" scope="row" id={labelId}>
                        <div>{row.industry.name}</div>
                        <div className="industry-type">{row.industry.type}</div>
                      </TableCell>
                      <TableCell align="left">{row.issuanceType}</TableCell>
                      <TableCell align="right">${row.targetRaise}M</TableCell>
                      <TableCell align="right">${row.preMoneyValuation}M</TableCell>
                      <TableCell align="right">${row.amountRaise}M</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
}