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
import Button from '@mui/material/Button';
//import DeleteIcon from '@mui/icons-material/Delete';
//import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import toast, { Toaster } from 'react-hot-toast';
//import { useSelector, useDispatch } from 'react-redux';
//import { updateProdsTemp } from '../../redux/actions/products.actions.jsx';

import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // set Published
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'; // set Paused
import DangerousIcon from '@mui/icons-material/Dangerous'; // set Deleted
import axios from 'axios';
import { API_URL_BACKEND } from "../../api/apiRoute";
import ExportToExcel from '../DashboardAdmin/ExporToExcel/ExportToExcel';

import MailIcon from '@mui/icons-material/Mail';
import UserDashViewQA from './UserDashViewQA';
import SimpleBadge from './SimpleBadge';

const title = 'Productos'

function createData(id, name, status, price, ownerId, productQAndA) {
  return {
    id,
    name,
    status,
    price,
    ownerId,
    productQAndA,
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
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'Id Producto',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombre',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Estado',
  },
  {
    id: 'productQAndA',
    numeric: false,
    disablePadding: false,
    label: 'Mensajes',
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
            align={headCell.numeric ? 'center' : 'left'}
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
  const { numSelected, selected, setSelected, setProducts } = props;

  const handlePublish = async () => {
    setSelected([])
    let reqs = selected.map(p => axios.put(`${API_URL_BACKEND}products/${p}`, { status: 'Publicado' }))
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
    let reqs = selected.map(p => axios.put(`${API_URL_BACKEND}products/${p}`, { status: 'En pausa' }))
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
    let reqs = selected.map(p => axios.put(`${API_URL_BACKEND}products/${p}`, { status: 'Eliminado' }))
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

  const getProductsArrayFromIds = (/* selectedIdsGlobal, productsGlobal */) => {
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
        <Box sx={{ width: '10rem' }}>
          <Tooltip title="Publicar">
            <IconButton onClick={() => handlePublish()}>
              <CheckCircleIcon /> {/* Published */}
            </IconButton>
          </Tooltip>

          <Tooltip title="Pausar">
            <IconButton onClick={() => handlePause()}>
              <PauseCircleFilledIcon /> {/* Paused */}
            </IconButton>
          </Tooltip>

          <Tooltip title="Eliminar" onClick={() => handleDelete()}>
            <IconButton>
              <DangerousIcon /> {/* Deleted */}
            </IconButton>
          </Tooltip>
        </Box>
      ) : ("")}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedProductsTable(props) {
  const { title, list, setProducts, fetchProducts } = props;
  // const [rows, setRows] = React.useState(list);
  let rows = list
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



  const [modal, setModal] = React.useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const [clickedProduct, setClickedProduct] = React.useState({});

  const handleViewQA = (e, productId, productName) => {
    //setClickedProduct(e.target.value); // <-- product id
    const product = { id: productId, name: productName }
    setClickedProduct(product); // <-- product id
    openModal();
  }

  React.useEffect(()=>{
    !modal && fetchProducts() 
  }, [modal])

  return (
    <div>
      
      {modal && <UserDashViewQA openModal={openModal} closeModal={closeModal} product={clickedProduct} />}
      <Box sx={{ width: '100%', marginTop: '1rem' }}>
        <Toaster />
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} setProducts={setProducts} />
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
                        onClick={
                          row.status === "Vendido"
                            ? null
                            : (event) => handleClick(event, row.id)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            style={
                              row.status === "Vendido"
                                ? {}
                                : { color: "var(--primaryColor)" }
                            }
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            disabled={row.status === "Vendido" ? true : false}
                          />
                        </TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.status}</TableCell>
                        <TableCell align="center">
                          <Button
                            /* size="large" */
                            aria-label={`Ver preguntas del producto`}
                            color="inherit"
                            value={row.id} // ................... productId ...........................................................
                            id={row.id} // ................... productId ...........................................................
                            onClick={(e) => handleViewQA(e, row.id, row.name)}
                            sx={{ zIndex: "100" }}
                          >
                            <SimpleBadge
                              number={row.productQAndA.reduce(
                                (unanswered, ele) => {
                                  return !ele.answer
                                    ? ++unanswered
                                    : unanswered;
                                },
                                0
                              )} /* color="primary" */ /* showZero */
                              /* classes={{ badge: classes.customBadge }}
                                                    className={classes.margin}
                                                    badgeContent={row.productQAndA.length} */
                            >
                              <MailIcon color="action" />
                            </SimpleBadge>
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {row.price.toLocaleString("de-DE")}
                        </TableCell>
                        <TableCell align="center">{row.ownerId}</TableCell>
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
          <ExportToExcel apiData={rows} fileName='Productos' />
        </Box>
      </Box>
    </div>
  );
}
