import axios from 'axios';
import React from 'react';
import { Link , useNavigate } from 'react-router-dom';

import { Box, Grid, Button, Typography } from '@mui/material';

import dummyData from '../_mock/create_with_deck_response.json'


const CardEditor = () => {
  // const cards = new Array(21).fill('/Math.jpg');
  const cards = new Array(21).fill(0).map((_, index) => ({
    id: `card-${index + 1}`, // Unique ID for each card
    image: '/Math.jpg', // Example image path
  }));

  const [result, setResult] = React.useState<any>(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const boxId = localStorage.getItem('boxId');
        const token = localStorage.getItem('token');
        if (!boxId || !token) {
          setResult([]);
          return;
        }
        // const res = await axios.get(`http://52.203.31.162:5001/api/boxes/${boxId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );
        const res = dummyData
        const box = res.data.box.cards;
        // console.log(res.data.box.cards)
        // box.map((card: any) => {
        //   console.log(card.cardFrontElements);
        //   card.cardFrontElements.map((element: any) => {
        //     console.log(element.imageUrl);
        //   });
        // })
        setResult(res.data.box.cards);
      } catch (error) {
        setResult([]);
        alert('Failed to fetch cards. Please try again later.');
        console.error('Error fetching cards:', error);
        // Optionally handle error (e.g., show notification)
      }
    };
    fetchData();
  }, []);

  const bottomSections = [
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Card Box' },
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Game Rules' },
    { image: '/image3.png', icon: '/Vector1.png', title: 'Edit Card Back' },
  ];

  const navigate = useNavigate()

  function handleEdit(cardId: string | number) {
   console.log('Editing card:', cardId); // Log which card is being edited
    navigate(`/drawcard/${cardId}`); // Navigate to a dynamic route
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
      {/* Header Text and Button */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" color="white" sx={{ mb: { xs: 2, sm: 0 } }}>
          Select Your Card to Edit
        </Typography>

        <Button
          component={Link}
          to="/PDFExport"
          variant="contained"
          sx={{
            backgroundColor: '#8a0303',
            textTransform: 'none',
            borderRadius: '10px',
            border: '2px solid #139EBC',
            px: 3,
            py: 1,
            display: 'flex',
            alignItems: 'center',
            width: { xs: '100%', sm: 220 },
            gap: 1,
            '&:hover': {
              backgroundColor: '#6D5A82',
            },
          }}
        >
          <Box component="img" src="/Vector (1).png" alt="Icon" sx={{ width: 24, height: 24 }} />
          Export as PDF
        </Button>
      </Box>

      {/* Cards Grid */}
      <Grid container spacing={2} justifyContent="center">
        {result?.map((card:any, index:number) => {
          // Check for locally saved canvas preview
          let localImage = null;
          try {
            const saved = localStorage.getItem('customCanvas_' + card._id);
            if (saved) {
              const data = JSON.parse(saved);
              // Render a preview of the full canvas if possible
              if (data.width && data.height) {
                // Create a hidden canvas
                const previewCanvas = document.createElement('canvas');
                previewCanvas.width = data.width;
                previewCanvas.height = data.height;
                const ctx = previewCanvas.getContext('2d');
                // Draw background (use original image as background)
                const bgImg = new window.Image();
                bgImg.src = card.cardFrontElements[0].imageUrl;
                // Draw everything after bg loads
                bgImg.onload = () => {
                  ctx.clearRect(0, 0, data.width, data.height);
                  ctx.drawImage(bgImg, 0, 0, data.width, data.height);
                  // Draw lines
                  ctx.strokeStyle = '#ff0000';
                  ctx.lineWidth = 2;
                  (data.lines || []).forEach(line => {
                    ctx.beginPath();
                    line.forEach((pt:any, i:number) => {
                      if (i === 0) ctx.moveTo(pt.x, pt.y);
                      else ctx.lineTo(pt.x, pt.y);
                    });
                    ctx.stroke();
                  });
                  // Draw shapes
                  (data.shapes || []).forEach((shape:any) => {
                    ctx.save();
                    ctx.strokeStyle = shape.color || '#00bcd4';
                    ctx.lineWidth = 2;
                    if (shape.type === 'rect') {
                      const x = shape.start.x;
                      const y = shape.start.y;
                      const w = shape.end.x - shape.start.x;
                      const h = shape.end.y - shape.start.y;
                      ctx.strokeRect(x, y, w, h);
                    } else if (shape.type === 'circle') {
                      const cx = (shape.start.x + shape.end.x) / 2;
                      const cy = (shape.start.y + shape.end.y) / 2;
                      const rx = Math.abs(shape.end.x - shape.start.x) / 2;
                      const ry = Math.abs(shape.end.y - shape.start.y) / 2;
                      ctx.beginPath();
                      ctx.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI);
                      ctx.stroke();
                    }
                    ctx.restore();
                  });
                  // Draw images
                  (data.images || []).forEach((imgObj:any) => {
                    if (imgObj.dataUrl) {
                      const img = new window.Image();
                      img.src = imgObj.dataUrl;
                      img.onload = () => {
                        ctx.drawImage(img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
                        // After all drawing, set localImage
                        localImage = previewCanvas.toDataURL();
                      };
                    }
                  });
                  // Draw texts
                  ctx.save();
                  ctx.font = '20px Arial';
                  (data.texts || []).forEach((t:any) => {
                    ctx.fillStyle = '#222';
                    ctx.fillText(t.text, t.x, t.y);
                  });
                  ctx.restore();
                  // Set localImage after all drawing
                  localImage = previewCanvas.toDataURL();
                };
              }
            }
          } catch {}
          return (
            <Grid
              size={{ xs: 4, sm: 3, md: 2.4, lg: 2, xl: 1.5 }}
              key={card._id}
              display="flex"
              justifyContent="center"
            >
              <Box
                onClick={() => handleEdit(card._id)}
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
                    transform: 'scale(1.03)',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                <img
                  src={localImage || card.cardFrontElements[0].imageUrl}
                  alt={`Card ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Bottom 3 Icon Boxes */}
      <Box mt={5}>
        <Grid container spacing={4} justifyContent="center">
          {bottomSections.map((section, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#6D5A826E',
                  borderRadius: '16px',
                  p: 2,
                  height: '100%',
                }}
              >
                {/* Left side icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
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
                      width: '88%',
                      height: '84%',
                      padding: '1px',
                      borderRadius: '8px',
                    }}
                  />
                </Box>

                {/* Right side: Text and Icon vertically aligned */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
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
    </Box>
  );
};

export default CardEditor;
