import { Link } from "react-router-dom";
import React, { useState } from "react";

import FolderIcon from '@mui/icons-material/Folder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, TextField, Typography, FormControl, Modal, Button } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';


export default function CreateCardForm() {
    const [open, setOpen] = React.useState(false);
     const handleOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const itemData = [
    {
      img: '/Dark.png',
      title: 'Fantasy',
      author: 'Medieval worlds, dragons, and magic',
    },
    {
      img: '/image2.jpg',
      title: 'Cyberpunk',
      author: 'Neon-lit future and high-tech dystopia',
    },
    {
      img: '/Frame 47628.png',
      title: 'Other',
      author: 'Try Other Theme',
    }
  ];

  return (
    <>
    <Box sx={{ 
      width: { xs: '100%' },
      maxWidth: '900px',
      gap: 7,

    }}>
     

      {/* Main Form Box - Keep all your existing form code here */}
      <Box
        sx={{
          width: '100%',
          border: "2px solid #78766f",
          borderRadius: '19px',
          p: 4,
          background: 'linear-gradient(-45deg, #300909, #212c12, #382e0b, #281e4b, #29193c)',
          mb: '30px',
          height:'auto',
        }}
      >
       {/* First Prompt Field */}
       <FormControl fullWidth sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                Aiprompt
              </Typography>
              <TextField
                fullWidth
                label="Mathematics learning game for school children"
                variant="outlined"
                InputLabelProps={{ style: { color: "#ccc" } }}
                InputProps={{ style: { color: "#fff" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#666" },
                    "&:hover fieldset": { borderColor: "#999" },
                  },
                }}
              />
            </FormControl>

            {/* Dual TextFields Side-by-Side */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                mb: 3,
                flexWrap: 'wrap',
              }}
            >
              {/* Left Field */}
              <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Game
                </Typography>
                <TextField
                  fullWidth
                  label="Educational"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#ccc" } }}
                  InputProps={{
                    style: { color: "#fff" },
                    endAdornment: <ArrowDropDownIcon />
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#666" },
                      "&:hover fieldset": { borderColor: "#999" },
                    },
                  }}
                />
              </Box>

              {/* Right Field */}
              <Box sx={{ flex: '1 1 45%', minWidth: 200 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Card Size
                </Typography>
                <TextField
                  fullWidth
                  label="63|88mm"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#ccc" } }}
                  InputProps={{
                    style: { color: "#fff" },
                    endAdornment: <ArrowDropDownIcon />
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#666" },
                      "&:hover fieldset": { borderColor: "#999" },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Card Color Theme Section */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Color Theme Selector */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Card Color Theme
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {/* + Add Color Box */}
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        border: '2px dashed #aaa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#aaa',
                        fontWeight: 'bold',
                        '&:hover': {
                          borderColor: '#fff',
                          color: '#fff',
                        },
                      }}
                    >
                      +
                    </Box>

                    {/* Color Circles */}
                    {['#426c9e', '#e64d3c', '#e6b33c', '#edbed9', '#eddaa4', '#d1ccbe'].map((color, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: color,
                          cursor: 'pointer',
                          '&:hover': {
                            border: '2px solid #ccc',
                          },
                        }}
                      />
                    ))}
                    {/* + Add Color Box */}
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        border: '2px dashed #aaa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#aaa',
                        fontWeight: 'bold',
                        '&:hover': {
                          borderColor: '#fff',
                          color: '#fff',
                        },
                      }}
                    >
                      +
                    </Box>
                  </Box>
                </Box>

                {/* Cards per Deck Field */}
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    How many Cards per Deck
                  </Typography>
                  <TextField
                    fullWidth
                    label="30"
                    variant="outlined"
                    InputLabelProps={{ style: { color: "#ccc" } }}
                    InputProps={{
                      style: { color: "#fff" },
                      endAdornment: <ArrowDropDownIcon />
                    }}
                    sx={{
                      // maxWidth: '300px',
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#666" },
                        "&:hover fieldset": { borderColor: "#999" },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Create Tuck Box Button and Additional Option Field */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
              {/* Create Tuck Box Button */}
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    borderRadius: '17px',
                    backgroundColor: '#615e57',
                    color: '#fff',
                    fontWeight: '500',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#727069',
                    }
                  }}
                >
                  <CheckCircleOutlineRoundedIcon sx={{ mr: 1, color: '#9c9cff' }} />
                  <Typography variant="h6" sx={{ m: 0, fontSize: '16px' }}>
                    Create Tuck Box
                  </Typography>
                </Box>
              </Box>

              {/* Additional Cards per Deck Field */}
              <Box>
                <Typography variant="h6" sx={{ mb: 1}}>
                  Card Block
                </Typography>
                <TextField
                  fullWidth
                  label="common block"
                  variant="outlined"
                  InputLabelProps={{ style: { color: "#ccc" } }}
                  InputProps={{
                    style: { color: "#fff" },
                    endAdornment: <ArrowDropDownIcon />
                  }}
                  sx={{
                    maxWidth: '300px',
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#666" },
                      "&:hover fieldset": { borderColor: "#999" },
                    },
                  }}
                />
              </Box>
            </Box>

            {/* Image Gallery */}
            <Box sx={{ width: '100%', overflowX: 'auto', py: 2, mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1}}>
                Theme
              </Typography>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {itemData.slice(0, 5).map((item) => (
                  <Box
                    key={item.img}
                    sx={{
                      width: 150,
                      flexShrink: 0,
                      borderRadius: '10px',
                      overflow: 'hidden',
                      backgroundColor: 'transparent',
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '90%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '10px',
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#fff',
                        textAlign: 'left',
                        p: 1,
                        borderRadius: '4px'
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: '#94928d',
                        textAlign: 'left',
                        mb: 1,
                        p: 1,
                        borderRadius: '4px'
                      }}
                    >
                      {item.author}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Upload Files Section */}
            <Box sx={{ width: '100%', mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upload Files
              </Typography>
              <Box
                component="label"
                htmlFor="file-upload"
                sx={{
                  width: '100%',
                  height: 300,
                  border: '2px solid #888',
                  borderRadius: '20px',
                  backgroundColor: '#1C223769',
                  color: '#ccc',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  mb: 2,
                  '&:hover': {
                    borderColor: '#aaa',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }
                }}
              >
                <FolderIcon sx={{ fontSize: 50, mb: 1, color: '#aaa' }} />
                Drag and drop files here or click to upload <br />
                Support all images Format
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files!.length > 0) {
                      console.log('Uploaded files:', files);
                    }
                  }}
                />
              </Box>

              {/* Upload Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                {/* <Link to="/create-card-game" style={{ textDecoration: 'none', width: '100%' }}> */}
                  <Box
                    sx={{
                      width: '100%',
                      background: '#8a0303',
                      border: '2px solid #00bfff',
                      color: '#fff',
                      padding: '15px',
                      borderRadius: '20px',
                      textAlign: 'center',
                      fontWeight: 600,
                      fontSize: '2vh',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#005fcc',
                        borderColor: '#fff',
                      },
                    }}
                  >
                    Create Card Game
                  </Box>
                {/* </Link> */}
              </Box>
            </Box>
          </Box>

    </Box>

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
                width: '90%', // Increased width
                maxWidth: 1000, // Maximum width
                bgcolor: '#2f2439',
                border: '2px solid #6c6e69',
                boxShadow: 24,
                p: 4,
                borderRadius: '20px',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' }, // Responsive layout
                  gap: '20px',
                  alignItems: 'center',
                }}
              >
                {/* Left Side - Image */}
                <Box
                  sx={{
                    flex: 1,
                    borderRadius: '30px',
                    overflow: 'hidden',
                    maxHeight: '600px',
                    width: '130%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 1,
                    mr: 2,
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
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                  }}
                >
                  {/* Your Icon - Centered below heading */}
                  <Box
                    sx={{
                      width: '70px',
                      height: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mt: 4,
                    }}
                  >
                    <img
                      src="/Frame 47651.png"
                      alt="Success Icon"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
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
                      mt: 3,
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
                      mb: 2,
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
                      fontSize: '10px',
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
                          backgroundColor: '#8a0303',
                          width: 400,
                          color: 'white',
                          fontWeight: 600,
                          borderRadius: '6px',
                          padding: '14px',
                          ml: 2,
                          fontSize: '2vh',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px', // space between icon and text
                          ':hover': {
                            backgroundColor: '#e6b800',
                          },
                        }}
                      >
                        {/* Small Icon before text */}
                        <img
                          src="/Group.png" // put your icon image path here
                          alt="icon"
                          style={{
                            width: '20px',
                            height: '20px',
                            marginBottom: 3,
                            marginRight: 3,
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
                            backgroundColor: '#8a0303',
                            color: 'white',
                            fontWeight: 600,
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
                              marginBottom: 3,
                            }}
                          />
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
    
                  {/* Bottom 4 Icons */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '15px',
                      mt: 2,
                    }}
                  >
                    {/* Instagram Icon */}
                    <Button
                      variant="text" // changed to "text" to remove borders
                      sx={{
                        minWidth: '40px',
                        height: '40px',
                        padding: 0,
                        ':hover': {
                          backgroundColor: 'transparent', // no hover background
                        },
                      }}
                    >
                      <img
                        src="/Instagram.png"
                        alt="Instagram"
                        style={{ width: '30px', height: '30px' }}
                      />
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
                        },
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
                        },
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
                        },
                      }}
                    >
                      <img
                        src="/Dribbble.png"
                        alt="LinkedIn"
                        style={{ width: '30px', height: '30px' }}
                      />
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
                        },
                      }}
                    >
                      <img
                        src="/LinkedIn.png"
                        alt="LinkedIn"
                        style={{ width: '30px', height: '30px', padding: 0 }}
                      />
                    </Button>
                  </Box>
                </Box>
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
                  padding: '8px 24px',
                  ':hover': {
                    backgroundColor: '#e6b800',
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
          </>
  );
}