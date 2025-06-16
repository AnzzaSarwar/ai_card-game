import type { SetStateAction} from 'react';

import axios from 'axios';


import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import { Box , Grid,  Card, Button, Select, Typography, Chip, CardContent } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

const CategoryButton = styled(Button)(({ theme }) => ({
  '&.MuiButton-contained': {
    backgroundColor: '#807a79',
    color: '#ffffff',
    border: '2px solid white',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
  '&.MuiButton-text': {
    color: '#b0a9a9',
    border: '2px solid #807a79',
    '&:hover': {
      backgroundColor: '#333333',
    },
  },
}));

const FilterSelect = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#807a79',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffffff',
  },
  color: '#b0a9a9',
  border: '2px solid #807a79',
  borderRadius: '4px',
}));

export default function Projects() {

  const [data, setData] = useState(null)

    const fetchcard = async () => {
    axios.get('http://52.203.31.162:5001/api/cards/684ddc146e5e85165924172c')
    .then(response => {
      console.log(response.data.data);
      setData(response.data.data)
      
    }).catch(error => {
      console.log(error);
      
    })    
  }

  useEffect(() => {
    fetchcard()
  }, [])
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event: { target: { value: SetStateAction<string> } }) => {
    setFilter(event.target.value);
  };

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

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
  ];

  function setSelectedFilm(newValue: any): void {
    throw new Error('Function not implemented.');
  }

  return (
      <>
      <title>{`Project - ${CONFIG.appName}`}</title>
          <DashboardContent maxWidth="xl" sx={{ color: '#fff', px: { xs: 2, sm: 3, md: 5 } }}>
      

      <div className="">
{
  // data?.map((card) => (
    <Card
  sx={{
    position: 'relative',
    maxWidth: 400,
    mx: 'auto',
    mb: 4,
    borderRadius: 4,
    boxShadow: 8,
    background: 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 60%, #fce7f3 100%)',
    overflow: 'visible',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.03)',
      boxShadow: 16,
    },
  }}
>
  {/* Decorative Icon */}
  <Box
    sx={{
      position: 'absolute',
      top: -32,
      left: '50%',
      transform: 'translateX(-50%)',
      bgcolor: 'primary.main',
      borderRadius: '50%',
      p: 1.5,
      boxShadow: 3,
      border: '4px solid white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2a7 7 0 0 1 7 7c0 3.87-3.13 7-7 7s-7-3.13-7-7a7 7 0 0 1 7-7Zm0 16c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>
  </Box>
  <CardContent sx={{ pt: 5 }}>
    <Typography variant="h5" color="primary" fontWeight={700} align="center" gutterBottom>
      My Math Deck - Card 1
    </Typography>
    <Box sx={{ color: 'text.secondary', fontSize: 14, mb: 2, textAlign: 'center' }}>
      <div><b>Card ID:</b> <span style={{ color: '#6366f1' }}>684ddc146e5e85165924172c</span></div>
      <div><b>Box ID:</b> <span style={{ color: '#a21caf' }}>684ddc146e5e85165924172a</span></div>
      <div><b>Created:</b> {new Date('2025-06-14T20:31:16.237Z').toLocaleString()}</div>
      <div><b>Updated:</b> {new Date('2025-06-14T20:31:16.237Z').toLocaleString()}</div>
      <div><b>Dimensions:</b> <span style={{ color: '#db2777' }}>315px × 440px</span></div>
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
      <Chip label="Guest Card" size="small" sx={{ bgcolor: 'warning.light', color: 'warning.dark', fontWeight: 600 }} />
      <Chip label="Front Elements: 2" size="small" sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 600 }} />
      <Chip label="Back Elements: 1" size="small" sx={{ bgcolor: 'secondary.light', color: 'secondary.dark', fontWeight: 600 }} />
    </Box>
    <Box sx={{ bgcolor: 'white', opacity: 0.9, p: 2, borderRadius: 2, boxShadow: 1, border: '1px solid #e0e7ff', textAlign: 'left' }}>
      <Typography variant="subtitle2" color="primary" fontWeight={600} gutterBottom>
        AI Prompt:
      </Typography>
      <Typography variant="body2" color="text.secondary" fontStyle="italic">
        User Request: Generate 5 unique, concise but compelling educational math questions for kids, vibrant style...
      </Typography>
    </Box>
  </CardContent>
</Card>
  // ))
}
      </div>

      {/* <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, margin: '4%', marginTop: '0' }}> */}
        {/* <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'stretch', md: 'center' }}
          justifyContent="space-between"
          spacing={2}
          mt={3}
          mb={4}
        >
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            rowGap={2}
            columnGap={2}
          >
            <CategoryButton variant="contained">All Theme</CategoryButton>
            <CategoryButton variant="text">Discovery</CategoryButton>
            <CategoryButton variant="text">Abstract</CategoryButton>
            <CategoryButton variant="text">Sci-fi</CategoryButton>
            <CategoryButton variant="text">Adventure</CategoryButton>
          </Stack>

          <Autocomplete
            disablePortal
            options={top100Films}
            getOptionLabel={(option) => option.title}
            onChange={(event, newValue) => setSelectedFilm(newValue)}
            sx={{ width: { xs: '100%', sm: 300 } }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Filter"
                sx={{
                  color: 'white',
                  '& .MuiInputBase-input': { color: 'white' },
                  '& .MuiInputBase-input::placeholder': { color: 'white' },
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        pl: 1,
                        pr: 1,
                        borderRadius: '20px',
                      }}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.9266 2.29224L6.29824 9.70894M5.73495 2.29224H18.1274C19.1601 2.29224 20.0051 3.13718 20.0051 4.16988V6.2353C20.0051 6.98635 19.5357 7.92518 19.0662 8.39459L15.0293 11.9621C14.466 12.4315 14.0905 13.3704 14.0905 14.1214V18.1584C14.0905 18.7216 13.7149 19.4727 13.2455 19.7544L11.9312 20.5993C10.7107 21.3504 9.02083 20.5054 9.02083 19.0033V14.0275C9.02083 13.3704 8.6453 12.5254 8.26977 12.056L4.70224 8.30071C4.23283 7.8313 3.8573 6.98635 3.8573 6.42306V4.26377C3.8573 3.13718 4.70224 2.29224 5.73495 2.29224Z" stroke="#D1D5DB" stroke-width="1.40824" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>`,
                        }}
                      />
                    </Box>
                  ),
                }}
              />
            )}
          />
        </Stack> */}

        <h1 style={{margin: '0'}} >
          My Projects
        </h1>

        <Grid container spacing={4}>
          {gameCards.map((game, index) => (
            <Grid  key={index}>
              <Card
                sx={{
                  borderRadius: '16px',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  width: '280px',
                  flexDirection: 'column',
                  border: '1px solid #534e54',
                  backgroundColor: '#2b1233',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box
                  sx={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    backgroundColor: '#2b1233',
                  }}
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      backgroundColor: '#2b1233',
                      marginTop: '40px',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem', color: 'white' }}
                  >
                    {game.title.toUpperCase()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b0a9a9', fontSize: '0.9rem' }}>
                    {game.date}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      {/* </Box> */}
      </DashboardContent>
      </>
  );
}
