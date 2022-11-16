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
//import { updateProdsTemp } from '../../redux/actions/products.actions.jsx';
import ProductDetails from './ProductDetails';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // set Published
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'; // set Paused
import DangerousIcon from '@mui/icons-material/Dangerous'; // set Deleted
import axios from 'axios';
import { API_URL_BACKEND } from "../../../api/apiRoute";
import ExportToExcel from '../ExporToExcel/ExportToExcel';

const title = 'Productos'

function createData(name, pid, status, price, ownerId) {
  return {
    name,
    pid,
    status,
    price,
    ownerId,
  };
}

// const rows = [];

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
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id Producto',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Precio',
  },
  {
    id: 'ownerId',
    numeric: true,
    disablePadding: false,
    label: 'Id Propietario',
  },
  {
    id: 'details',
    numeric: true,
    disablePadding: false,
    label: '',
  },
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
        <TableCell padding="checkbox">
          {/* <Checkbox
            style={{ color: 'var(--primaryColor)' }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
  const { numSelected, selected, setSelected, setProducts} = props;

  const handlePublish = async () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}products/${p}`, {status: 'Publicado'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}products`))
    .then((response) => setProducts(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
  }
  
  const handlePause = async () => {
     setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}products/${p}`, {status: 'En pausa'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}products`))
    .then((response) => setProducts(response.data))
    .catch(error => console.log(error))
    toast.promise(promise, {
      loading: 'Cargando',
      success: 'Actualizado con éxito',
      error: 'Ocurrió un error',
    });
  }
  const handleDelete = async () => {
    setSelected([])
    let reqs = selected.map( p => axios.put(`${API_URL_BACKEND}products/${p}`, {status: 'Eliminado'}))
    let promise = Promise.all(reqs)
    .then(() => axios.get(`${API_URL_BACKEND}products`))
    .then((response) => setProducts(response.data))
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
          {numSelected} Producto(s) seleccionado(s)
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
  const { setProducts } = props;
  const rows = props.products
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
      // const aux = rows.filter((n) => n.status !== 'Vendido');
      // const newSelected = aux.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%', marginTop: '1rem' }}>
      <Toaster />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} setProducts={setProducts}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
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
              {stableSort(rows, getComparator(order, orderBy))
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
                    onClick={row.status === 'Vendido' ? null : (event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    
                    >
                      <TableCell padding="checkbox">
                        <Checkbox 
                          style={row.status === 'Vendido' ? {} : { color: 'var(--primaryColor)' }}
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          disabled={row.status === 'Vendido' ? true : false}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.id}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{row.price.toLocaleString('de-DE')}</TableCell>
                      <TableCell align="right">{row.ownerId}</TableCell>
                      <TableCell align="right">
                        <ProductDetails name={row.name} status={row.status} description={row.description} image={row.image} categories={row.categories}/>
                      </TableCell>
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
          count={rows.length}
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
        <ExportToExcel apiData={rows} fileName='Productos'/>
      </Box>
    </Box>
  );
}
