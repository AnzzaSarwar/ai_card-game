import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import StyleIcon from '@mui/icons-material/Style';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { DashboardContent } from 'src/layouts/dashboard';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Game card data
  const gameCards = [
    {
      title: 'Movie Trivia Real',
      date: 'January 18 2025',
      image: 'movie.png'
    },
    {
      title: 'Stardust Wanderer',
      date: 'December 25 2024',
      image:
        '/fire.png',
    },
    {
      title: 'Thorin Stoneheim',
      date: 'August 05 2024',
      image:
        '/thorin.png',
    },
    {
      title: 'Math Adventure',
      date: 'March 29 2024',
      image:
        '/Math.jpg',
    },
  ];

return (
  <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, mt: 0 }}>
    <Box className="dashboard-container" sx={{ overflow: 'hidden' }}>
      {/* Header */}
      <Box
  className="dashboard-header"
  sx={{
    mb: 2,
    textAlign: { xs: 'center', sm: 'left' },
    height: { xs: '200px', sm: '300px' } // 👈 change values as needed
  }}
>
  <h1 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>Dashboard</h1>
</Box>
      {/* Main Content */}
      <Box className="dashboard-content">
        {/* Search Bar */}
        <TextField
          sx={{ px: { xs: 0, sm: 2 }, py: 2 }}
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="search-icon" />
              </InputAdornment>
            ),
          }}
        />

        {/* Stats Cards Section */}
        <Grid container spacing={3} sx={{ mt: 4 }} justifyContent="center">
          {[
            {
              icon: <StyleIcon fontSize="large" sx={{ color: 'white' }} />,
              title: 'My Game Cards',
              value: '04',
            },
            {
              icon: <Inventory2Icon fontSize="large" sx={{ color: 'white' }} />,
              title: 'Total Order',
              value: '04',
            },
            {
              icon: <GroupIcon fontSize="large" sx={{ color: 'white' }} />,
              title: 'Order Received',
              value: '02',
            },
            {
              icon: <MonetizationOnIcon fontSize="large" sx={{ color: 'white' }} />,
              title: 'Total Purchase',
              value: '$375K',
            },
          ].map((stat, index) => (
            <Grid size={{xs:12 , sm:6, md:2.5}} key={index} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Card
                sx={{
                  background: '#696363',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  p: 3,
                  width: '100%',
                  maxWidth: 280,
                  minHeight: '130px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.25)',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                  },
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  {stat.icon}
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.95rem',
                        color: 'rgba(255, 255, 255, 0.75)',
                        mb: 0.5,
                        fontWeight: 500,
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '1.24rem',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </Box>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Game Cards Section */}
        <Grid container spacing={4} sx={{ mt: 4, mb: 6 }} justifyContent="center">
          {gameCards.map((game, index) => (
            <Grid size={{xs:12 , sm:6, md:3}} key={index} display="flex" justifyContent="center">
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #534e54',
                  backgroundColor: 'transparent',
                  width: '100%',
                  maxWidth: 280,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    backgroundColor: 'transparent',
                  }}
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '85%',
                      objectFit: 'contain',
                      marginTop: '40px',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      fontSize: '1.1rem',
                      color: 'white',
                    }}
                  >
                    {game.title.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {game.date}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  </Box>
);

}
