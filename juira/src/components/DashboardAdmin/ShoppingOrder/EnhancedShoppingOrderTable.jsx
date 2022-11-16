import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../../../redux/actions/products.actions';
//import { updateProdsTemp } from '../../redux/actions/products.actions.jsx';

import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // set Published
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'; // set Paused
import DangerousIcon from '@mui/icons-material/Dangerous'; // set Deleted
import axios from 'axios';
import { API_URL_BACKEND } from "../../../api/apiRoute";
import ExportToExcel from '../ExporToExcel/ExportToExcel';

const title = 'Órdenes de compra'

function createData(name, pid, status, price, ownerId) {
  return {
    name,
    pid,
    status,
    price,
    ownerId,
  };
}

// let rows = orders

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'No. de Orden',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Fecha',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Estado de la orden',
  },
  {
    id: 'amount',
    numeric: false,
    disablePadding: false,
    label: 'Monto',
  },
  {
    id: 'payment',
    numeric: false,
    disablePadding: false,
    label: 'Pago recibido',
  },
  {
    id: 'buyer',
    numeric: false,
    disablePadding: false,
    label: 'Id. Comprador',
  },
  // {
  //   id: 'orders',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Productos',
  // },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox"> */}
          {/* <Checkbox
            style={{ color: 'var(--primaryColor)' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        {/* </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            width="16%"
            align={headCell.numeric ? 'right' : 'center'}
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected, orders, setSelected} = props;
  const [data, setData] = React.useState('')
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.productsReducer.allProducts);
  
  React.useEffect(() => {
    // dispatch(getAllProducts());
    setData('')
  }, [selected])

  const handlePublish = async () => {

  }
  
  const handlePause = async () => {

  }
  const handleDelete = async () => {

  }
  
  const getProductsArrayFromIds = (/* selectedIdsGlobal, productsGlobal */) =>  {
  }
  
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          /* bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), */
            bgcolor: () => //console.log('theme: ',theme)
            alpha('#23c197', 0.12 /* theme.palette.action.activatedOpacity */),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} Orden(es) seleccionada(s)
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Box sx={{width:'10rem'}}>
        <Tooltip title="Publicar">
          <IconButton onClick={() => handlePublish() }>
            <CheckCircleIcon /> {/* Published */}
          </IconButton>
        </Tooltip>

        <Tooltip title="Pausar">
          <IconButton onClick={() => handlePause() }>
            <PauseCircleFilledIcon /> {/* Paused */}
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar" onClick={() => handleDelete() }>
          <IconButton>
            <DangerousIcon /> {/* Deleted */}
          </IconButton>
        </Tooltip>
        </Box>
      ) : ( "" )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable( props ) {
  const { orders, setOrders } = props
  const rows = props.orders

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  return (
    <Box sx={{ width: '100%', marginTop: '1rem' }}>
      <Toaster />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} orders={orders} setSelected={setSelected}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(orders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  const styles = theme => ({
                    tableRow: {
                      "&$selected, &$selected:hover": {
                        backgroundColor: "purple"
                      }
                    },
                    tableCell: {
                      "$selected &": {
                        color: "yellow"
                      }
                    },
                    selected: {}
                  });
                  
                  return (
                    <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox 
                          style={{ color: 'var(--primaryColor)' }}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                        // padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.createdAt.slice(0, 10) + ' ' + row.createdAt.slice(11,16)}</TableCell>
                      <TableCell align="center">{row.state}</TableCell>
                      <TableCell align="center">{row.total.toLocaleString('de-DE')}</TableCell>
                      <TableCell align="center">{row.paymentReceived ? 'Si' : 'No' }</TableCell>
                      <TableCell align="center">{row.transactionList[0].buyerId}</TableCell>
                      {/* <TableCell align="right">{row.transactionList.map( e => `${e.productId}, `)}</TableCell> */}

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box
        sx={
          { 
            minWidth: 650, display: 'flex', justifyContent: 'space-between',
          }
        }
      >
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Diseño compacto"
          />
        <ExportToExcel apiData={orders} fileName='Ordenes de compra'/>
      </Box>
    </Box>
  );
}
