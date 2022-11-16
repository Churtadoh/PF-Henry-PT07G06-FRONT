import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Products from './Products/Products'
import ShoppinOrders from './ShoppingOrder/ShoppingOrders'
import Transactions from './Transactions/Transactions'
import Users from './Users/Users.jsx'
import { Container } from '@mui/system';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import ChartsGrid from './Charts/ChartsGrid';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardAdmin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ boxShadow: '0 0 15px 5px #cccccc55', padding: 5, width: '100' }}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Resumen" {...a11yProps(0)} icon={<FeedRoundedIcon/>} iconPosition='start'/>
          <Tab label="Productos" {...a11yProps(1)} icon={<CategoryRoundedIcon/>} iconPosition='start'/>
          <Tab label="Usuarios" {...a11yProps(2)} icon={<PeopleAltRoundedIcon/>} iconPosition='start'/>
          <Tab label="Ódernes de compra" {...a11yProps(3)} icon={<ShoppingBagRoundedIcon/>} iconPosition='start'/>
          <Tab label="Transacciones" {...a11yProps(4)} icon={<PaidRoundedIcon/>} iconPosition='start'/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ChartsGrid/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Products/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Users/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ShoppinOrders/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Transactions/>
      </TabPanel>
    </Box>
    </Container>
  );

}

