import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, TextField, Snackbar, Alert, IconButton, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar({ onSort, onSearch, onTypeSelect }) {
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const categoryOpen = Boolean(categoryAnchorEl);
  const filterOpen = Boolean(filterAnchorEl);
  const mobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchTerm, setSearchTerm] = useState('');
  const [houseTypes, setHouseTypes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const fetchHouseData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/houses/getallhouses'); 
        const data = await response.json();
        const types = [...new Set(data.map(house => house.type))]; 
        setHouseTypes(types);
      } catch (error) {
        console.error("Error fetching house data:", error);
      }
    };

    fetchHouseData();
  }, []);

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleSort = (sortType) => {
    onSort(sortType);
    handleFilterClose();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      setOpenSnackbar(true);
      return;
    }
    navigate('/createpost');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleTypeClick = (type) => {
    onTypeSelect(type);
    handleCategoryClose();
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={mobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={RouterLink} to="/">
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={handleCategoryClick}>
        <IconButton color="inherit">
          <CategoryIcon />
        </IconButton>
        <p>Categories</p>
      </MenuItem>
      <Menu anchorEl={categoryAnchorEl} open={categoryOpen} onClose={handleCategoryClose}>
        {houseTypes.map((type) => (
          <MenuItem key={type} onClick={() => handleTypeClick(type)}>
            {type}
          </MenuItem>
        ))}
      </Menu>
      <MenuItem onClick={handleCreatePostClick}>
        <IconButton color="inherit">
          <AddBoxIcon />
        </IconButton>
        <p>New Listing</p>
      </MenuItem>
      <MenuItem>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ backgroundColor: 'white', borderRadius: 1 }}
        />
      </MenuItem>
      {isAuthenticated ? (
        <MenuItem onClick={logout}>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <p>Log Out</p>
        </MenuItem>
      ) : (
        <>
          <MenuItem component={RouterLink} to="/signin">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <p>Login</p>
          </MenuItem>
          <MenuItem component={RouterLink} to="/signup">
            <Button variant="contained" color="primary" size="small">
              Sign Up
            </Button>
          </MenuItem>
        </>
      )}
      <MenuItem onClick={handleFilterClick}>
        <IconButton color="inherit">
          <FilterListIcon />
        </IconButton>
        <p>Filter</p>
      </MenuItem>
      <Menu anchorEl={filterAnchorEl} open={filterOpen} onClose={handleFilterClose}>
        <MenuItem onClick={() => handleSort('newest')}>Newest to Oldest</MenuItem>
        <MenuItem onClick={() => handleSort('oldest')}>Oldest to Newest</MenuItem>
        <MenuItem onClick={() => handleSort('highestPrice')}>Highest to Lowest Price</MenuItem>
        <MenuItem onClick={() => handleSort('lowestPrice')}>Lowest to Highest Price</MenuItem>
        <MenuItem onClick={() => handleSort('largestArea')}>Largest to Smallest Area</MenuItem>
        <MenuItem onClick={() => handleSort('smallestArea')}>Smallest to Largest Area</MenuItem>
      </Menu>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Property Seeker
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={RouterLink} to="/">
              <HomeIcon sx={{ mr: 1 }} />
              Home
            </Button>
            <Button color="inherit" onClick={handleCategoryClick}>
              <CategoryIcon sx={{ mr: 1 }} />
              Categories
            </Button>
            <Menu anchorEl={categoryAnchorEl} open={categoryOpen} onClose={handleCategoryClose}>
              {houseTypes.map((type) => (
                <MenuItem key={type} onClick={() => handleTypeClick(type)}>
                  {type}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit" onClick={handleCreatePostClick}>
              <AddBoxIcon sx={{ mr: 1 }} />
              New Listing
            </Button>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              sx={{ backgroundColor: 'white', borderRadius: 1, ml: 2 }}
            />
            {isAuthenticated ? (
              <Button color="inherit" onClick={logout}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Log Out
              </Button>
            ) : (
              <>
                <Button color="inherit" component={RouterLink} to="/signin">
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  Login
                </Button>
                <Button variant="contained" color="primary" component={RouterLink} to="/signup" sx={{ ml: 1 }}>
                  Sign Up
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleFilterClick}>
              <FilterListIcon sx={{ mr: 1 }} />
              Filter
            </Button>
            <Menu anchorEl={filterAnchorEl} open={filterOpen} onClose={handleFilterClose}>
              <MenuItem onClick={() => handleSort('newest')}>Newest to Oldest</MenuItem>
              <MenuItem onClick={() => handleSort('oldest')}>Oldest to Newest</MenuItem>
              <MenuItem onClick={() => handleSort('highestPrice')}>Highest to Lowest Price</MenuItem>
              <MenuItem onClick={() => handleSort('lowestPrice')}>Lowest to Highest Price</MenuItem>
              <MenuItem onClick={() => handleSort('largestArea')}>Largest to Smallest Area</MenuItem>
              <MenuItem onClick={() => handleSort('smallestArea')}>Smallest to Largest Area</MenuItem>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={handleMobileMenuOpen}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning">
          Please sign in first to create a new listing.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Navbar;
