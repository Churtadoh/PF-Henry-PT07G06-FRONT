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
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { visuallyHidden } from '@mui/utils';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // set Published
import DangerousIcon from '@mui/icons-material/Dangerous'; // set Deleted
import axios from 'axios';
import { API_URL_BACKEND } from "../../../api/apiRoute";
import ExportToExcel from '../ExporToExcel/ExportToExcel';
import { styled } from '@mui/material/styles';

const title = 'Usuarios registrados'

// const StyledTableRow = styled(TableRow)({

// })

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
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'phone',
    numeric: false,
    disablePadding: true,
    label: 'Teléfono',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Estado',
  },
  {
    id: 'type',
    numeric: false,
    disablePadding: true,
    label: 'Tipo',
  },,
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Fecha de registro',
  },
  // {
  //   id: 'products',
  //   numeric: false,
  //   disablePadding: false,
  //   label: 'Productos',
  // },
];

function EnhancedTableHead(props) {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            /* color="primary" */
            style={{ color: 'var(--primaryColor)' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
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
  const { numSelected, selected, users, setSelected, setUsers} = props;

  const handleActivate = () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}users/${p}`, {status: 'active'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}users`))
    .then((response) => setUsers(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
  }
  
  const handleBan = () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}users/${p}`, {status: 'banned'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}users`))
    .then((response) => setUsers(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
  }
  const handleDelete = () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}users/${p}`, {status: 'deleted'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}users`))
    .then((response) => setUsers(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
  }

  const handleTypeChange = () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}users/${p}`, {isAdmin: true}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}users`))
    .then((response) => setUsers(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
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
          {numSelected} Usuario(s) seleccionado(s)
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
        <Box sx={{width:'15rem'}}>
        <Tooltip title="Activar">
          <IconButton onClick={() => handleActivate() }>
            <CheckCircleIcon /> {/* Published */}
          </IconButton>
        </Tooltip>

        <Tooltip title="Banear">
          <IconButton onClick={() => handleBan() }>
            <RemoveCircleRoundedIcon /> {/* Paused */}
          </IconButton>
        </Tooltip>

        <Tooltip title="Convertir en Administrador" onClick={() => handleTypeChange() }>
          <IconButton>
            <WorkspacePremiumRoundedIcon /> {/* Deleted */}
          </IconButton>
        </Tooltip>

        <Tooltip title="Eliminar" onClick={() => handleDelete() }>
          <IconButton>
            <DangerousIcon color='error'/> {/* Deleted */}
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
  const { users, setUsers } = props

  // products && rows.length===0 && products.forEach( p => rows.push(createData(p.name, p.id, p.status, p.price, p.ownerId) ) )
  // let products = productsA.map( p => createData(p.name, p.id, p.status, p.price, p.ownerId))
// console.log(products)
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [update, setUpdate] = React.useState([])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <Box sx={{ width: '100%', marginTop: '1rem' }} >
      <Toaster />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} users={users} setSelected={setSelected} setUsers={setUsers}/>
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
              rowCount={users.length}
            />
            <TableBody >
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(users, getComparator(order, orderBy))
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
                    // hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    // color = {row.status === 'banned' ? color = 'error' : null}
                    // color='success'
                    sx={{
                      // color: 'success.main',
                      background: row.status === 'banned' ? '#FFCA99' : row.status === 'deleted' ? 'rgb(211, 211, 211)' : null
                    }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox 
                          /* sx={{color: 'var(--primaryColor)'}} */
                          style={{ color: 'var(--primaryColor)' }}
                          /* color="primary" */
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                        // padding="none"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.emailAddress}</TableCell>
                      <TableCell align="center">{row.phoneNumber}</TableCell>
                      <TableCell align="center">{row.status}</TableCell>
                      <TableCell align="center">{row.isAdmin ? 'Admin' : 'Usuario'}</TableCell>
                      <TableCell align="center">{row.id}</TableCell>
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
          count={users.length}
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
        <ExportToExcel apiData={users} fileName='Usuarios'/>
      </Box>
    </Box>
  );
}
