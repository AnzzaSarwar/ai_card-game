import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DashboardContent } from "src/layouts/dashboard";
import { Button, Grid } from "@mui/material";
import CreateCardForm from "src/components/CreateCardForm";
import GameCard from "src/components/gamecard";
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import React from "react";


export default function CreateCard1() {
  const gameCards = [
    { title: 'MOVIE TRIVIA', date: 'Jan 2025', image: '/movie.png' },
    { title: 'STARDUST', date: 'Dec 2024', image: '/fire.png' },
    { title: 'MATH GAME', date: 'Mar 2024', image: '/thorin.png' },
    { title: 'SPACE EXPLORERS', date: 'Jun 2024', image: '/movie.png' },
    { title: 'OCEAN QUEST', date: 'Nov 2024', image: '/fire.png' },
    { title: 'HISTORY AI', date: 'Aug 2024', image: 'thorin.png' }
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
    <DashboardContent maxWidth={false} sx={{ color: '#fff' }}>
  {/* Main container with divider */}
  <Box sx={{ 
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    width: '100%',
    position: 'relative'
  }}>
    {/* Left Side - Form Component with divider */}
    <Box sx={{
      flex: 1,
      pr: { md: 4 },
      mb: { xs: 4, md: 0 },
      width: 500,

    }}>
      <CreateCardForm />
    </Box>

    {/* Right Side Container with divider */}
    <Box sx={{
      width: { xs: '100%', md: '40%' },
      mr:10,
      mt:10
    
    }}>
      {/* Card Generation Box */}
      <Box sx={{ 
        border: '2px solid #948d96',
        borderRadius: 5,
        background: '#29193c',
        mb: 4,
        height:"40%",
      }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ ml: 2, mb: 2, color: '#fff' }}>
            Generate Card Version
          </Typography>
          
          <Box sx={{
            display: 'flex',
            borderRadius: '15px',
            overflow: 'hidden',
            height: 500,
            width: '80%',
            p: 1,
            ml:5
          }}>
            <Box 
              onClick={() => handleOpen(itemData2[0].img)}
              sx={{
                flex: 3,
                height: '100%',
                borderRight: '2px solid #78766f',
                overflow: 'hidden',
                borderRadius: '15px',
                border: '2px solid #6c6e69',
                background: '#484a45',
                p: 2,
                mr: 2,
                cursor: 'pointer'

              }}
            >
              <img
                src={itemData2[0].img}
                alt={itemData2[0].title}
                style={{
                  width: '130%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
            </Box>
{/* Vertical Thumbnails (Right side) */}
<Box sx={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  padding: '15px',
}}>
  {itemData2.slice(1, 4).map((item, index) => (
    <Box
      key={index}
      sx={{
        flex: 1,
        borderRadius: '15px',
        overflow: 'hidden',
        border: '1px solid #78766f',
        width: '120%', 
        background: '#484a45',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 1 // Reduced padding
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
          maxHeight: '120px' 
        }}
      />
    </Box>
  ))}
</Box>
          </Box>
        </Box>
      </Box>

      {/* Other Card Versions Section */}
      <Box>
        <Typography variant="h6" sx={{ 
          mb: 2, 
          color: '#fff',
          fontSize: '1.25rem',
          fontWeight: 'bold',
          textAlign: 'center',
          mt:10,
        }}>
          Other Card Versions
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {gameCards.map((game, index) => (
            <Grid  key={index}>
              <Box display="flex" justifyContent="center">
                <GameCard 
                  title={game.title}
                  date={game.date}
                  image={game.image}
                />
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
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',  // Increased width
    maxWidth: 1000,  // Maximum width
    bgcolor: '#2f2439',
    border: '2px solid #6c6e69',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px',
    textAlign: 'center'
  }}>
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },  // Responsive layout
      gap: '20px',
      alignItems: 'center'
    }}>
     {/* Left Side - Image */}
<Box
  sx={{
    flex: 1,
    borderRadius: '30px',
    overflow: 'hidden',
    maxHeight: '600px',
    width:'130%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    mr:2
  }}
>
  {selectedImage && (
    <img
      src={selectedImage}
      alt="Selected"
      style={{
        width: '70%',
        height: '100%',
        objectFit: 'contain', // better for card-style fit
        borderRadius: '30px',
        border: '2px solid white', // dashed border like card
        background: '#a8a3a3',
        padding: '20px',
      }}
    />
  )}
</Box>


      {/* Right Side - Content */}
      <Box sx={{
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  alignItems: 'center'
}}>
  

  {/* Your Icon - Centered below heading */}
  <Box sx={{
    width: '70px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mt:4
  }}>
    <img 
      src="/Frame 47651.png" 
      alt="Success Icon"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain'
      }}
    />
  </Box>
{/* H3 Heading - Topmost element */}
<Typography 
  variant="h4" 
  sx={{ 
    color: '#22C55E',
    fontWeight: 'bold',
    textAlign: 'center',
    mb: 0.5, // very little space after heading
     mt:3
  }}
>
  This is Success Create!
</Typography>

{/* Paragraph under heading */}
<Typography 
  variant="body2" 
  sx={{ 
    color: '#ffffff',
    textAlign: 'center',
    mt: 0, // no extra margin-top
    mb:2
  }}
>
  Copyright You have built the most amazing art in this world
</Typography>

{/* Order Now Button */}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    fontSize: '10px'
  }}
>
  {/* Correctly wrap the Button with the Link */}
  <Link
    to="/Ordershiping" // Link to your internal route
    style={{ textDecoration: 'none' }}
  >
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#2f354f',
        width: 400,
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '6px',
        padding: '14px',
        ml: 2,
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px', // space between icon and text
        ':hover': {
          backgroundColor: '#e6b800',
        }
      }}
    >
      {/* Small Icon before text */}
      <img
        src={'/Group.png'} // put your icon image path here
        alt="icon"
        style={{
          width: '20px',
          height: '20px',
          marginBottom: 3,
          marginRight: 3
        }}
      />
      Order Now
    </Button>
  </Link>
</Box>


        {/* Top 4 Buttons */}
{/* Top 4 Buttons */}
<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  }}
>
  {[
    { label: 'Edit Game Rules', icon: '/Vector (2).png' },
    { label: 'Edit Card Fonts', icon: '/Vector (2).png' },
    { label: 'Edit Card Back', icon: '/Vector (2).png' },
    { label: 'Edit Card Box', icon: '/Vector (2).png', link: '/EditCardBox' }, // Added link property
  ].map((item) => {
    const button = (
      <Button
        key={item.label}
        variant="contained"
        sx={{
          backgroundColor: '#9f7bb5',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '9px',
          width: 170,
          mt: 1,
          padding: '16px',
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          ':hover': {
            backgroundColor: '#e6b800',
          },
        }}
      >
        <img 
          src={item.icon} 
          alt="icon"
          style={{
            width: '20px',
            height: '18px',
            marginBottom: 3
          }}
        />
        {item.label}
      </Button>
    );
    
    return item.link ? (
      <Link to={item.link} key={item.label} style={{ textDecoration: 'none' }}>
        {button}
      </Link>
    ) : button;
  })}
</Box>

          

     {/* Bottom 4 Icons */}
     <Box sx={{
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  mt: 2,
   
}}>
  {/* Instagram Icon */}
  <Button 
    variant="text" // changed to "text" to remove borders
    sx={{
      minWidth: '40px',
      height: '40px',
      padding: 0,
      ':hover': {
        backgroundColor: 'transparent', // no hover background
      }
    }}
  >
    <img src="/Instagram.png" alt="Instagram" style={{ width: '30px', height: '30px', }} />
  </Button>

  {/* Twitter Icon */}
  <Button 
    variant="text" // changed to "text" to remove borders
    sx={{
      minWidth: '40px',
      height: '40px',
      padding: 0,
      ':hover': {
        backgroundColor: 'transparent', // no hover background
      }
    }}
  >
    <img src="/Twitter.png" alt="Twitter" style={{ width: '30px', height: '30px' }} />
  </Button>

  {/* YouTube Icon */}
  <Button 
    variant="text" // changed to "text" to remove borders
    sx={{
      minWidth: '40px',
      height: '40px',
      padding: 0,
      ':hover': {
        backgroundColor: 'transparent', // no hover background
      }
    }}
  >
    <img src="/Discord.png" alt="YouTube" style={{ width: '30px', height: '30px' }} />
  </Button>

  {/* LinkedIn Icon */}
  <Button 
    variant="text" // changed to "text" to remove borders
    sx={{
      minWidth: '40px',
      height: '40px',
      padding: 0,
      ':hover': {
        backgroundColor: 'transparent', // no hover background
      }
    }}
  >
    <img src="/Dribbble.png" alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
  </Button>
  
  {/* LinkedIn Icon */}
  <Button 
    variant="text" // changed to "text" to remove borders
    sx={{
      minWidth: '40px',
      height: '40px',
      padding: 0,

      ':hover': {
        backgroundColor: 'transparent', // no hover background
      }
    }}
  >
    <img src="/LinkedIn.png" alt="LinkedIn" style={{ width: '30px', height: '30px',padding:0 }} />
  </Button>
</Box>
</Box>
</Box>

    {/* Close Button */}
    <Button onClick={handleClose} variant="contained" sx={{
      mt: 3,
      backgroundColor: '#ffcc00',
      color: '#000',
      fontWeight: 'bold',
      borderRadius: '10px',
      padding: '8px 24px',
      ':hover': {
        backgroundColor: '#e6b800',
      }
    }}>
      Close
    </Button>
  </Box>
</Modal>
</>  





  );
}