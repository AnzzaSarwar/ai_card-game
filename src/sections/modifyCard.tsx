import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ModifyCards() {
  const cards = new Array(21).fill(0).map((_, index) => ({
    id: `card-${index + 1}`, // Unique ID for each card
    image: '/Math.jpg', // Example image path
  }));

  const bottomSections = [
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Card Box' },
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Game Rules' },
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Card Back' },
  ];

  const navigate = useNavigate();

  function handleEdit(cardId: string | number) {
    console.log('Editing card:', cardId); // Log which card is being edited
    navigate(`/drawcard/${cardId}`); // Navigate to a dynamic route
  }

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DashboardContent maxWidth="xl" sx={{ color: '#fff', px: { xs: 2, sm: 3, md: 5 } }}>
      <h1 style={{ margin: '0' }}>Modify Cards</h1>

      {/* Buttons Section */}

      <Box mt={0} mb={5}>
        <Grid container spacing={4} justifyContent="center">
          {bottomSections.map((section, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#6D5A826E',
                  borderRadius: '16px',
                  p: 5,
                  height: '100%',
                }}
              >
                {/* Left side icon */}
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    backgroundColor: '#29193C82',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    mr: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={section.image}
                    alt="section image"
                    sx={{
                      width: '100%',
                      height: '100%',
                      padding: '5px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>

                {/* Right side: Text and Icon vertically aligned */}
                <Box
                  sx={{
                    display: 'flex',
                    // justifyContent: 'center',
                    flexDirection: 'spaceBetween',
                    alignItems: 'end',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 1,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box
                    component="img"
                    src={section.icon}
                    alt="section right icon"
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Card Grid */}
      {/* <Grid container spacing={3}>
        {_products.map((product) => (
          <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid> */}

      <Grid container spacing={2} justifyContent="center">
              {cards.map((card, index) => (
                <Grid
                  size={{ xs: 4, sm: 3, md: 2.4, lg: 2, xl: 1.5 }}
                  key={card.id}
                  display="flex"
                  justifyContent="center"
                >
                  <Box
                  onClick={() => handleEdit(card.id)}
                    sx={{
                      position: 'relative',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: '#fff',
                      border: '2px solid #ccc',
                      height: { xs: 140, sm: 160, md: 220, lg: 220, xl: 220 },
                      width: { xs: 90, sm: 110, md: 140, lg: 160, xl: 180 },
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)', // Add a subtle hover effect
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                  >
                    <img
                      src={card.image}
                      alt={`Card ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    {/* {index === 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          backgroundColor: '#87739E',
                          color: 'white',
                          padding: '6px 12px',
                          borderRadius: '12px',
                          width: 80,
                          fontSize: '0.8rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Button onClick={handleEdit}>
                        Edit
      
                        </Button>
                      </Box>
                    )} */}
                  </Box>
                </Grid>
              ))}
            </Grid>

      {/* Pagination */}
      <Box
        sx={{
          mt: 8,
          display: 'block',
          justifyContent: 'center',
          color: '#fff',
          '& .MuiPaginationItem-root': {
            color: '#fff',
            borderColor: '#fff',
          },
        }}
      >
        {/* <Pagination
          count={10} // or however many pages you have
          color="primary"
          size="large"
          siblingCount={10} // 👈 shows all pages
          boundaryCount={0}
        /> */}

        <Box
          sx={{
            mb: 5,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: { sm: 'flex-end' },
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:eye-bold" />}
            sx={{
              bgcolor: '#8a0303',
              fontSize: '2vh',
              fontWeight: 600,
              '&:hover': { backgroundColor: 'crimson', },
              flexShrink: 0,
            }}
            onClick={() => setModalOpen(true)}
          >
            Preview
          </Button>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="solar:cart-3-bold" />}
            sx={{
              bgcolor: '#8a0303',
              fontSize: '2vh',
              fontWeight: 600,
              backgroundBlendMode: 'overlay',
              '&:hover': {
                backgroundColor: 'crimson',
              },
              flexShrink: 0,
            }}
            onClick={() => setModalOpen(true)}
          >
            Add to Cart
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<Iconify icon="material-symbols:file-export" />}
            sx={{
              border: '0px solid',

              bgcolor: '#8a0303',
              fontSize: '2vh',
              fontWeight: 600,
              color: '#fff',
              '&:hover': {
                backgroundColor: 'crimson',
              },
              flexShrink: 0,
            }}
            onClick={() => setModalOpen(true)}
          >
            Export as PDF
          </Button>
        </Box>
      </Box>
    </DashboardContent>
  );
}
