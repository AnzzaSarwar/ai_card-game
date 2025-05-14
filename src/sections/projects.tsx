import type { SetStateAction } from 'react';

import { useState } from 'react';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box,  Card, Stack, Button, Select, Typography } from '@mui/material';
import { Grid } from '@mui/material';


import { CONFIG } from 'src/config-global';

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
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
        <Stack
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
        </Stack>

        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 'bold',
            mb: 2,
            color: 'white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          My Projects
        </Typography>

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
      </Box>
      </>
  );
}
