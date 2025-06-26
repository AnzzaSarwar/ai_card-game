import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import GameCard from 'src/components/gamecard';
import CreateCardForm from 'src/components/CreateCardForm';

export default function CreateCard1() {
  const gameCards = [
    { title: 'MOVIE TRIVIA', date: 'Jan 2025', image: '/movie.png' },
    { title: 'STARDUST', date: 'Dec 2024', image: '/fire.png' },
    { title: 'MATH GAME', date: 'Mar 2024', image: '/thorin.png' },
    { title: 'SPACE EXPLORERS', date: 'Jun 2024', image: '/movie.png' },
    { title: 'OCEAN QUEST', date: 'Nov 2024', image: '/fire.png' },
    { title: 'HISTORY AI', date: 'Aug 2024', image: 'thorin.png' },
  ];

  const itemData2 = [
    {
      img: '/Math.jpg',
      title: 'Main Feature',
    },
    {
      img: '/image3.png',
      title: 'Small 1',
    },
    {
      img: '/Frame 47640.png',
      title: 'Small 2',
    },
    {
      img: '/Frame 47641.png',
      title: 'Small 3',
    },
  ];

  // --- inside CreateCard1 function ke top pe ---
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <DashboardContent maxWidth={false} sx={{ color: '#fff', margin: '2%', marginTop: '0px' }}>
        <Box sx={{ mb: 4 }}>
          <h1 style={{ margin: '0' }}>Create Your Card Design</h1>
        </Box>

        {/* Main container with responsive layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            position: 'relative',
            gap: { xs: 4, md: 5 },
          }}
        >
          {/* Left Side - Form */}
          <Box
            sx={{
              flex: 1,
              pr: { md: 4 },
              mb: { xs: 4, md: 0 },
              width: '100%',
              maxWidth: { xs: '65%', md: '70%' },
              boxSizing: 'border-box',
              '& input': {
                width: '100%',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              },
              '& .MuiFormControl-root': {
                width: '100%',
              },
              '& .MuiTextField-root': {
                width: '100%',
              },
            }}
          >
            <CreateCardForm />
          </Box>

          {/* Right Side Container */}
          <Box
            sx={{
              width: { xs: '100%', md: '55%' },
              mt: { xs: 0, md: 0 },
              mr: { xs: 0, md: 4 },
            }}
          >
            {/* Card Generation Box */}
            <Box
              sx={{
                border: '2px solid #948d96',
                borderRadius: 5,
                background: '#29193c',
                mb: 4,
                height: 'auto',
                px: 2,
                pt: 3,
                pb: 2,
              }}
            >
              <Typography variant="h6" sx={{ ml: 2, mb: 2, color: '#fff' }}>
                Generate Card Version
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  borderRadius: '15px',
                  overflow: 'hidden',
                  width: '100%',
                  p: 1,
                  gap: 2,
                }}
              >
                {/* Main Preview */}
                <Box
                  onClick={() => handleOpen(itemData2[0].img)}
                  sx={{
                    flex: 3,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    borderRadius: '15px',
                    border: '2px solid #6c6e69',
                    background: '#484a45',
                    p: 1,
                    cursor: 'pointer',
                  }}
                >
                  <img
                    src={itemData2[0].img}
                    alt={itemData2[0].title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </Box>

                {/* Vertical Thumbnails */}
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    padding: 1,
                  }}
                >
                  {itemData2.slice(1, 4).map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        borderRadius: '15px',
                        overflow: 'hidden',
                        border: '1px solid #78766f',
                        background: '#484a45',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 1,
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '10px',
                          maxHeight: '120px',
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Other Card Versions */}
            <Box>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  mt: 6,
                }}
              >
                Other Card Versions
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                {gameCards.map((game, index) => (
                  <Grid size={{xs:12 , sm:6, md:4}} key={index}>
                    <Box display="flex" justifyContent="center">
                      <GameCard title={game.title} date={game.date} image={game.image} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </DashboardContent>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '95%',
            maxWidth: 1000,
            bgcolor: '#2f2439',
            border: '2px solid #6c6e69',
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: '20px',
            textAlign: 'center',
             overflow: 'hidden',
            overflowY: 'auto',
            maxHeight: '90vh',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#3e3e3e',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(180deg, #8E2DE2, #4A00E0)', // Purple to blue
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(180deg, #a452f5, #6939f0)', // Lighter on hover
            },
          }}
        >
          {/* FLEX CONTAINER */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
              alignItems: 'center',
            }}
          >
            {/* IMAGE SIDE */}
            <Box
              sx={{
                flex: 1,
                borderRadius: '30px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 1,
              }}
            >
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '30px',
                    border: '2px solid white',
                    background: '#a8a3a3',
                    padding: '10px',
                  }}
                />
              )}
            </Box>

            {/* TEXT SIDE */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                alignItems: 'center',
              }}
            >
              <Box sx={{ width: '60px', height: '60px' }}>
                <img
                  src="/Frame 47651.png"
                  alt="Success Icon"
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>

              <Typography variant="h5" sx={{ color: '#22C55E', fontWeight: 'bold', mt: 1 }}>
                This is Success Create!
              </Typography>

              <Typography variant="body2" sx={{ color: '#fff' }}>
                Copyright You have built the most amazing art in this world
              </Typography>

              {/* Order Now Button */}
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Link to="/Ordershiping" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#8a0303',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '6px',
                      px: 3,
                      py: 1.5,
                      fontSize: '1rem',
                      mt: 1,
                      ':hover': {
                        backgroundColor: '#e6b800',
                      },
                    }}
                    fullWidth
                  >
                    <img
                      src="/Group.png"
                      alt="icon"
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: 8,
                      }}
                    />
                    Order Now
                  </Button>
                </Link>
              </Box>

              {/* Top 4 Buttons */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                  mt: 2,
                }}
              >
                {[
                  { label: 'Edit Game Rules', icon: '/Vector (2).png' },
                  { label: 'Edit Card Fonts', icon: '/Vector (2).png' },
                  { label: 'Edit Card Back', icon: '/Vector (2).png' },
                  { label: 'Edit Card Box', icon: '/Vector (2).png', link: '/EditCardBox' },
                ].map((item) => {
                  const button = (
                    <Button
                      key={item.label}
                      variant="contained"
                      sx={{
                        backgroundColor: '#8a0303',
                        color: 'white',
                        fontWeight: 600,
                        borderRadius: '9px',
                        py: 1.5,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        ':hover': {
                          backgroundColor: '#e6b800',
                        },
                      }}
                      fullWidth
                    >
                      <img src={item.icon} alt="icon" style={{ width: '20px', height: '18px' }} />
                      {item.label}
                    </Button>
                  );
                  return item.link ? (
                    <Link to={item.link} key={item.label} style={{ textDecoration: 'none' }}>
                      {button}
                    </Link>
                  ) : (
                    button
                  );
                })}
              </Box>

              {/* Social Icons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 2,
                  mt: 3,
                  flexWrap: 'wrap',
                }}
              >
                {['Instagram', 'Twitter', 'Discord', 'Dribbble', 'LinkedIn'].map((name) => (
                  <Button
                    key={name}
                    variant="text"
                    sx={{
                      minWidth: '40px',
                      height: '40px',
                      padding: 0,
                      ':hover': { backgroundColor: 'transparent' },
                    }}
                  >
                    <img
                      src={`/${name}.png`}
                      alt={name}
                      style={{ width: '30px', height: '30px' }}
                    />
                  </Button>
                ))}
              </Box>

              {/* Close Button */}
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: '#8a0303',
                  fontWeight: 'bold',
                  borderRadius: '10px',
                  px: 4,
                  py: 1.2,
                  ':hover': {
                    backgroundColor: '#e6b800',
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
