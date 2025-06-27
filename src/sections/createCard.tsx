import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import { SelectChangeEvent } from '@mui/material';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FolderIcon from '@mui/icons-material/Folder';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Select, MenuItem, TextField, InputLabel } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import { DashboardContent } from 'src/layouts/dashboard';

import CreateCard1 from './CreateCard1';


const cardSizeMap: any = {
'53x88mm': { width: 315, height: 520 },
'63x88mm': { width: 345, height: 520 },
'70x120mm': { width: 385, height: 680 },
};

export function CreateCard() {
const [formData, setFormData] = useState({
  boxName: 'My Math Deck',
  boxDescription: 'Fun Math Cards',
  userPrompt: '',
  mainContentPrompt: '',
  genre: 'Educational',
  themePromptForAI: '',
  accentColorHex: '#426c9e',
  cardSize: '63x88mm',
  numCardsInDeck: '30',
  imageUsagePreference: 'ai_then_selected_theme',
  cardBackImageDataUri: '',
  cardBackMode: 'common',
  fallbackFrontImageDataUri: '',
});
// const [result, setResult] = useState<any | null>(null);
const [result, setResult] = useState<any | null>(false);

// Generic input handler
const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name!]: value, // name is assumed to be present
  }));
};
const handleSelect = (e: SelectChangeEvent) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// File Upload Handler
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        cardBackImageDataUri: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  }
};

// Submit Handler
const handleSubmit = async () => {
  const { cardSize, ...rest } = formData;
  const { width, height } = cardSizeMap[cardSize] || {};

  const payload = {
    ...rest,
    defaultCardWidthPx: width,
    defaultCardHeightPx: height,
  };

  console.log('Submitting payload:', payload);

    try {
      // const token = localStorage.getItem('token');
      // const res = await axios.post('http://52.203.31.162:5001/api/boxes/create-with-deck', payload, {
      //   headers: {
      //     Authorization: token ? `Bearer ${token}` : '',
      //   },
      // });

      // console.log('Deck created!', res.data);
      // setResult(res.data.data.box.cards);
      setResult(true);

      // navigate or show success
    } catch (err) {
      console.error('Error creating deck', err);
    }
  };

  return (
    result ? (<CreateCard1 />) : (
         <DashboardContent maxWidth="xl" sx={{ color: '#fff', px: { xs: 2, sm: 3, md: 5 } }}>
      <Box>
        <h1 style={{margin: '0'}}>
          Create Your Card Design
        </h1>
      </Box>

      {/* Main Form Box */}
      <Box
        sx={{
          border: '2px solid #78766f',
          borderRadius: '19px',
          p: { xs: 2, sm: 3, md: 4 },
          background: 'linear-gradient(-45deg, #300909, #212c12, #382e0b, #281e4b, #29193c)',
          mb: '20px',
        }}
      >
        {/* First Prompt Field */}
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
           Enter your AI Prompt
          </Typography>
          <TextField
            required
            name='userPrompt'
            value={formData.userPrompt}
            fullWidth
            label="Mathematics learning game for school children"
            variant="outlined"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
            onChange={handleInput}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#666' },
                '&:hover fieldset': { borderColor: '#999' },
              },
            }}
          />
        </FormControl>

        {/* Dual TextFields Side-by-Side */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 2, sm: 3 },
            mb: 3,
            flexDirection: { xs: 'column'},
            justifyContent: 'space-between',
          }}
        >
          {/* Left Field */}
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 280 } }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Game Type
            </Typography>
            <TextField
              name='genre'
              value={formData.genre}
              onChange={handleInput}
              fullWidth
              label="Educational"
              variant="outlined"
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{
                style: { color: '#fff' },
                endAdornment: (
                  <>
                    <Box sx={{ width: 24 }} />
                    <ArrowDropDownIcon />
                  </>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#666' },
                  '&:hover fieldset': { borderColor: '#999' },
                },
              }}
            />
          </Box>

          {/* Right Field */}
         <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 280 } }}>
  <Typography variant="h6" sx={{ mb: 1 }}>
    Card Size
  </Typography>
  <FormControl fullWidth variant="outlined">
    <InputLabel sx={{ color: '#ccc' }}>Card Size</InputLabel>
    <Select
      name='cardSize'
      value={formData.cardSize}
      onChange={handleSelect}
      defaultValue=""
      label="Card Size"
      sx={{
        color: '#fff',
        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
      }}
      IconComponent={ArrowDropDownIcon}
    >
      <MenuItem value="53x88mm">53x88mm (Bridge)</MenuItem>
      <MenuItem value="63x88mm">63x88mm (Poker)</MenuItem>
      <MenuItem value="70x120mm">70x120mm (Tarot)</MenuItem>
    </Select>
  </FormControl>
</Box>

        </Box>

        {/* Card Color Theme Section */}
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column' },
              alignItems: { md: 'flex-start' },
              gap: 5,
            }}
          >
            {/* Color Theme Selector */}
            <Box sx={{ width: { xs: '100%'} }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Card Color Theme
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                {/* Add Color Box */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    mt: '15px',
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
                {['#426c9e', '#e64d3c', '#e6b33c', '#edbed9', '#eddaa4', '#d1ccbe'].map(
                  (color, index) => (
                    <Box
                      key={index}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          accentColorHex: color,
                        }))
                      }
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: color,
                        mt: '15px',
                        cursor: 'pointer',
                        border: formData.accentColorHex === color ? '2px solid #fff' : undefined,
                        '&:hover': {
                          border: '2px solid #ccc',
                        },
                      }}
                    />
                  )
                )}

                {/* Add Color Box Again */}
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    backgroundColor: 'transparent',
                    mt: '15px',
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
<Box sx={{ width: { xs: '100%' }, mb: 5 }}>
  <Typography variant="h6" sx={{ mb: 1 }}>
    How many Cards per Deck
  </Typography>
  <FormControl fullWidth variant="outlined">
    <InputLabel sx={{ color: '#ccc' }}>30</InputLabel>
    {/* <Select
      name="numCardsInDeck"
      value={formData.numCardsInDeck}
      onChange={handleSelect}
      defaultValue=""
      label="30-120"
      IconComponent={ArrowDropDownIcon}
      inputProps={{
        style: { color: '#fff' },
      }}
      sx={{
        color: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#666',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#999',
        },
      }}
    >
      <MenuItem value="30">30-120</MenuItem>
      
    </Select> */}
     <TextField
            name='numCardsInDeck'
            value={formData.numCardsInDeck}
            fullWidth
            label="Number of Cards"
            type="number"
            inputProps={{ min: 1, max: 200 }}
            variant="outlined"
            InputLabelProps={{ style: { color: '#ccc' } }}
            InputProps={{ style: { color: '#fff' } }}
            onChange={handleInput}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#666' },
                '&:hover fieldset': { borderColor: '#999' },
              },
            }}
          />
  </FormControl>
</Box>
          </Box>
        </Box>

        {/* Create Tuck Box Button and Additional Option Field */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column'},
            alignItems: { md: 'flex-start' },
            gap: 2,
          }}
        >
          {/* Create Tuck Box Button */}
          <Box sx={{ width: { xs: '100%' }, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: { xs: '16px', md: '20px 19px' },
                borderRadius: '17px',
                backgroundColor: '#615e57',
                color: '#fff',
                fontWeight: '500',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#727069',
                },
              }}
            >
              <CheckCircleOutlineRoundedIcon sx={{ mr: 1, color: '#9c9cff' }} />
              <Typography variant="h6" sx={{ m: 0, fontSize: '16px' }}>
                Create Tuck Box
              </Typography>
            </Box>
          </Box>

        
<Box
  sx={{
    width: { xs: '100%' },
    mx: 'auto', // center it horizontally
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }}
>
  <Typography
    variant="h6"
    sx={{
      mb: 1,
      fontSize: { xs: '1rem', md: '1.25rem' },
    }}
  >
    Card Back
  </Typography>

  <FormControl fullWidth variant="outlined">
    <InputLabel sx={{ color: '#ccc' }}>common block</InputLabel>
    <Select
      name="cardBackMode"
      value={formData.cardBackMode}
      onChange={handleSelect}
      defaultValue=""
      label="common block"
      IconComponent={ArrowDropDownIcon}
      inputProps={{
        style: { color: '#fff' },
      }}
      sx={{
        color: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#666',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#999',
        },
      }}
    >
      <MenuItem value="common">common back</MenuItem>
      <MenuItem value="different">different backs</MenuItem>
    </Select>
  </FormControl>
</Box>
        </Box>

        {/* Image Gallery */}
        <Box
          sx={{
            width: '100%',
            overflowX: 'auto',
            py: 2,
            mt: 5,
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h6" sx={{ mb: 1 }}>
            Theme{' '}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 5,
            }}
          >
            {itemData.slice(0, 5).map((item) => (
              <Box
                key={item.img}
                sx={{
                  width: 240,
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
                    width: '100%',
                    height: '180px',
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
                    borderRadius: '4px',
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: '#94928d',
                    textAlign: 'left',
                    mb: 2,
                    p: 1,
                    borderRadius: '4px',
                  }}
                >
                  {item.author}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Upload Files Section */}
        <Box
          sx={{
            width: '100%',
            mt: 5,
            boxSizing: 'border-box',
          }}
        >
          {/* Heading */}
          <Typography variant="h6" sx={{ mb: 1 }}>
            Upload Files
          </Typography>

          {/* Drag & Drop Area */}
          <Box
            component="label"
            htmlFor="file-upload"
            sx={{
              width: '100%',
              height: 400,
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
              padding: '20px',
              mb: 3,
              '&:hover': {
                borderColor: '#aaa',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <FolderIcon sx={{ fontSize: 60, mb: 1, color: '#aaa' }} />
            Drag and drop files here or click to upload <br />
            Support all images Format
            <input
              id="file-upload"
              type="file"
              multiple
              hidden
              // onChange={(e) => {
              //   const files = e.target.files;
              //   if (files && files.length > 0) {
              //     console.log('Uploaded files:', files);
              //   }
              // }}
              onChange={handleFileUpload}
            />
            {formData.cardBackImageDataUri && (
  <Box mt={2} textAlign="center">
    <Typography variant="subtitle2" color="#ccc">Preview:</Typography>
    <img
      src={formData.cardBackImageDataUri}
      alt="Card Back"
      style={{ maxWidth: '200px', borderRadius: '10px', marginTop: '10px' }}
    />
  </Box>
)}
          </Box>

          {/* Upload Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'center' },
            }}
          >
            {/* <Link
              to="/CreateCard1"
              style={{
                textDecoration: 'none',
                width: '100%',
                maxWidth: '600px',
              }}
            > */}
              <Box
                sx={{
                  width: '100%',
                  background: '#8a0303',
                  border: '2px solid #00bfff',
                  color: '#fff',
                  padding: '20px 20px',
                  borderRadius: '20px',
                  textAlign: 'center',
                  fontWeight: 600,
                  fontSize: '2vh',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: '#005fcc',
                    borderColor: '#fff',
                  },
                }}
                onClick={handleSubmit}
              >
                Create Card Game
                
              </Box>
            {/* </Link> */}
          </Box>
        </Box>
      </Box>
      
      </DashboardContent>
      )
    
//           <DashboardContent maxWidth="xl" sx={{ color: '#fff', px: { xs: 2, sm: 3, md: 5 } }}>
//       <Box>
//         <h1 style={{margin: '0'}}>
//           Create Your Card Design
//         </h1>
//       </Box>

//       {/* Main Form Box */}
//       <Box
//         sx={{
//           border: '2px solid #78766f',
//           borderRadius: '19px',
//           p: { xs: 2, sm: 3, md: 4 },
//           background: 'linear-gradient(-45deg, #300909, #212c12, #382e0b, #281e4b, #29193c)',
//           mb: '20px',
//         }}
//       >
//         {/* First Prompt Field */}
//         <FormControl fullWidth sx={{ mb: 3 }}>
//           <Typography variant="h6" sx={{ mt: 2, mb: 1, fontSize: { xs: '1rem', md: '1.25rem' } }}>
//            Enter your AI Prompt
//           </Typography>
//           <TextField
//             name='userPrompt'
//             value={formData.userPrompt}
//             fullWidth
//             label="Mathematics learning game for school children"
//             variant="outlined"
//             InputLabelProps={{ style: { color: '#ccc' } }}
//             InputProps={{ style: { color: '#fff' } }}
//             onChange={handleInput}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': { borderColor: '#666' },
//                 '&:hover fieldset': { borderColor: '#999' },
//               },
//             }}
//           />
//         </FormControl>

//         {/* Dual TextFields Side-by-Side */}
//         <Box
//           sx={{
//             display: 'flex',
//             gap: { xs: 2, sm: 3 },
//             mb: 3,
//             flexDirection: { xs: 'column'},
//             justifyContent: 'space-between',
//           }}
//         >
//           {/* Left Field */}
//           <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 280 } }}>
//             <Typography variant="h6" sx={{ mb: 1 }}>
//               Game Type
//             </Typography>
//             <TextField
//               name='genre'
//               value={formData.genre}
//               onChange={handleInput}
//               fullWidth
//               label="Educational"
//               variant="outlined"
//               InputLabelProps={{ style: { color: '#ccc' } }}
//               InputProps={{
//                 style: { color: '#fff' },
//                 endAdornment: (
//                   <>
//                     <Box sx={{ width: 24 }} />
//                     <ArrowDropDownIcon />
//                   </>
//                 ),
//               }}
//               sx={{
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': { borderColor: '#666' },
//                   '&:hover fieldset': { borderColor: '#999' },
//                 },
//               }}
//             />
//           </Box>

//           {/* Right Field */}
//          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 280 } }}>
//   <Typography variant="h6" sx={{ mb: 1 }}>
//     Card Size
//   </Typography>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel sx={{ color: '#ccc' }}>Card Size</InputLabel>
//     <Select
//       name='cardSize'
//       value={formData.cardSize}
//       onChange={handleSelect}
//       defaultValue=""
//       label="Card Size"
//       sx={{
//         color: '#fff',
//         '& .MuiOutlinedInput-notchedOutline': { borderColor: '#666' },
//         '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
//       }}
//       IconComponent={ArrowDropDownIcon}
//     >
//       <MenuItem value="53x88mm">53x88mm (Bridge)</MenuItem>
//       <MenuItem value="63x88mm">63x88mm (Poker)</MenuItem>
//       <MenuItem value="70x120mm">70x120mm (Tarot)</MenuItem>
//     </Select>
//   </FormControl>
// </Box>

//         </Box>

//         {/* Card Color Theme Section */}
//         <Box sx={{ mt: 2 }}>
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: { xs: 'column' },
//               alignItems: { md: 'flex-start' },
//               gap: 5,
//             }}
//           >
//             {/* Color Theme Selector */}
//             <Box sx={{ width: { xs: '100%'} }}>
//               <Typography variant="h6" sx={{ mb: 1 }}>
//                 Card Color Theme
//               </Typography>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                 {/* Add Color Box */}
//                 <Box
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: '8px',
//                     backgroundColor: 'transparent',
//                     mt: '15px',
//                     border: '2px dashed #aaa',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer',
//                     color: '#aaa',
//                     fontWeight: 'bold',
//                     '&:hover': {
//                       borderColor: '#fff',
//                       color: '#fff',
//                     },
//                   }}
//                 >
//                   +
//                 </Box>

//                 {/* Color Circles */}
//                 {['#426c9e', '#e64d3c', '#e6b33c', '#edbed9', '#eddaa4', '#d1ccbe'].map(
//                   (color, index) => (
//                     <Box
//                       key={index}
//                       onClick={() =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           accentColorHex: color,
//                         }))
//                       }
//                       sx={{
//                         width: 32,
//                         height: 32,
//                         borderRadius: '50%',
//                         backgroundColor: color,
//                         mt: '15px',
//                         cursor: 'pointer',
//                         border: formData.accentColorHex === color ? '2px solid #fff' : undefined,
//                         '&:hover': {
//                           border: '2px solid #ccc',
//                         },
//                       }}
//                     />
//                   )
//                 )}

//                 {/* Add Color Box Again */}
//                 <Box
//                   sx={{
//                     width: 32,
//                     height: 32,
//                     borderRadius: '8px',
//                     backgroundColor: 'transparent',
//                     mt: '15px',
//                     border: '2px dashed #aaa',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     cursor: 'pointer',
//                     color: '#aaa',
//                     fontWeight: 'bold',
//                     '&:hover': {
//                       borderColor: '#fff',
//                       color: '#fff',
//                     },
//                   }}
//                 >
//                   +
//                 </Box>
//               </Box>
//             </Box>

//           {/* Cards per Deck Field */}
// <Box sx={{ width: { xs: '100%' }, mb: 5 }}>
//   <Typography variant="h6" sx={{ mb: 1 }}>
//     How many Cards per Deck
//   </Typography>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel sx={{ color: '#ccc' }}>30</InputLabel>
//     {/* <Select
//       name="numCardsInDeck"
//       value={formData.numCardsInDeck}
//       onChange={handleSelect}
//       defaultValue=""
//       label="30-120"
//       IconComponent={ArrowDropDownIcon}
//       inputProps={{
//         style: { color: '#fff' },
//       }}
//       sx={{
//         color: '#fff',
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#666',
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#999',
//         },
//       }}
//     >
//       <MenuItem value="30">30-120</MenuItem>
      
//     </Select> */}
//      <TextField
//             name='numCardsInDeck'
//             value={formData.numCardsInDeck}
//             fullWidth
//             label="Number of Cards"
//             type="number"
//             inputProps={{ min: 1, max: 200 }}
//             variant="outlined"
//             InputLabelProps={{ style: { color: '#ccc' } }}
//             InputProps={{ style: { color: '#fff' } }}
//             onChange={handleInput}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 '& fieldset': { borderColor: '#666' },
//                 '&:hover fieldset': { borderColor: '#999' },
//               },
//             }}
//           />
//   </FormControl>
// </Box>
//           </Box>
//         </Box>

//         {/* Create Tuck Box Button and Additional Option Field */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: { xs: 'column'},
//             alignItems: { md: 'flex-start' },
//             gap: 2,
//           }}
//         >
//           {/* Create Tuck Box Button */}
//           <Box sx={{ width: { xs: '100%' }, mb: 2 }}>
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: { xs: '16px', md: '20px 19px' },
//                 borderRadius: '17px',
//                 backgroundColor: '#615e57',
//                 color: '#fff',
//                 fontWeight: '500',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   backgroundColor: '#727069',
//                 },
//               }}
//             >
//               <CheckCircleOutlineRoundedIcon sx={{ mr: 1, color: '#9c9cff' }} />
//               <Typography variant="h6" sx={{ m: 0, fontSize: '16px' }}>
//                 Create Tuck Box
//               </Typography>
//             </Box>
//           </Box>

        
// <Box
//   sx={{
//     width: { xs: '100%' },
//     mx: 'auto', // center it horizontally
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   }}
// >
//   <Typography
//     variant="h6"
//     sx={{
//       mb: 1,
//       fontSize: { xs: '1rem', md: '1.25rem' },
//     }}
//   >
//     Card Back
//   </Typography>

//   <FormControl fullWidth variant="outlined">
//     <InputLabel sx={{ color: '#ccc' }}>common block</InputLabel>
//     <Select
//       name="cardBackMode"
//       value={formData.cardBackMode}
//       onChange={handleSelect}
//       defaultValue=""
//       label="common block"
//       IconComponent={ArrowDropDownIcon}
//       inputProps={{
//         style: { color: '#fff' },
//       }}
//       sx={{
//         color: '#fff',
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#666',
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: '#999',
//         },
//       }}
//     >
//       <MenuItem value="common">common back</MenuItem>
//       <MenuItem value="different">different backs</MenuItem>
//     </Select>
//   </FormControl>
// </Box>
//         </Box>

//         {/* Image Gallery */}
//         <Box
//           sx={{
//             width: '100%',
//             overflowX: 'auto',
//             py: 2,
//             mt: 5,
//             boxSizing: 'border-box',
//           }}
//         >
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Theme{' '}
//           </Typography>
//           <Box
//             sx={{
//               display: 'flex',
//               gap: 5,
//             }}
//           >
//             {itemData.slice(0, 5).map((item) => (
//               <Box
//                 key={item.img}
//                 sx={{
//                   width: 240,
//                   flexShrink: 0,
//                   borderRadius: '10px',
//                   overflow: 'hidden',
//                   backgroundColor: 'transparent',
//                 }}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.title}
//                   loading="lazy"
//                   style={{
//                     width: '100%',
//                     height: '180px',
//                     objectFit: 'cover',
//                     borderRadius: '10px',
//                   }}
//                 />
//                 <Typography
//                   variant="subtitle1"
//                   sx={{
//                     color: '#fff',
//                     textAlign: 'left',
//                     p: 1,
//                     borderRadius: '4px',
//                   }}
//                 >
//                   {item.title}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: '#94928d',
//                     textAlign: 'left',
//                     mb: 2,
//                     p: 1,
//                     borderRadius: '4px',
//                   }}
//                 >
//                   {item.author}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* Upload Files Section */}
//         <Box
//           sx={{
//             width: '100%',
//             mt: 5,
//             boxSizing: 'border-box',
//           }}
//         >
//           {/* Heading */}
//           <Typography variant="h6" sx={{ mb: 1 }}>
//             Upload Files
//           </Typography>

//           {/* Drag & Drop Area */}
//           <Box
//             component="label"
//             htmlFor="file-upload"
//             sx={{
//               width: '100%',
//               height: 400,
//               border: '2px solid #888',
//               borderRadius: '20px',
//               backgroundColor: '#1C223769',
//               color: '#ccc',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '18px',
//               textAlign: 'center',
//               cursor: 'pointer',
//               padding: '20px',
//               mb: 3,
//               '&:hover': {
//                 borderColor: '#aaa',
//                 backgroundColor: 'rgba(255, 255, 255, 0.08)',
//               },
//             }}
//           >
//             <FolderIcon sx={{ fontSize: 60, mb: 1, color: '#aaa' }} />
//             Drag and drop files here or click to upload <br />
//             Support all images Format
//             <input
//               id="file-upload"
//               type="file"
//               multiple
//               hidden
//               // onChange={(e) => {
//               //   const files = e.target.files;
//               //   if (files && files.length > 0) {
//               //     console.log('Uploaded files:', files);
//               //   }
//               // }}
//               onChange={handleFileUpload}
//             />
//             {formData.cardBackImageDataUri && (
//   <Box mt={2} textAlign="center">
//     <Typography variant="subtitle2" color="#ccc">Preview:</Typography>
//     <img
//       src={formData.cardBackImageDataUri}
//       alt="Card Back"
//       style={{ maxWidth: '200px', borderRadius: '10px', marginTop: '10px' }}
//     />
//   </Box>
// )}
//           </Box>

//           {/* Upload Button */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: { xs: 'center', sm: 'center' },
//             }}
//           >
//             {/* <Link
//               to="/CreateCard1"
//               style={{
//                 textDecoration: 'none',
//                 width: '100%',
//                 maxWidth: '600px',
//               }}
//             > */}
//               <Box
//                 sx={{
//                   width: '100%',
//                   background: '#8a0303',
//                   border: '2px solid #00bfff',
//                   color: '#fff',
//                   padding: '20px 20px',
//                   borderRadius: '20px',
//                   textAlign: 'center',
//                   fontWeight: 600,
//                   fontSize: '2vh',
//                   letterSpacing: '0.5px',
//                   cursor: 'pointer',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     background: '#005fcc',
//                     borderColor: '#fff',
//                   },
//                 }}
//                 onClick={handleSubmit}
//               >
//                 Create Card Game
                
//               </Box>
//             {/* </Link> */}
//           </Box>
//         </Box>
//       </Box>
      
//       </DashboardContent>
  );
}

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
    img: '/image.jpg',
    title: 'Horror',
    author: 'Dark and mysterious supernatural world',
  },
  {
    img: '/image1.jpg',
    title: 'Steampunk',
    author: 'Victorian-era mechanical wonders',
  },
  {
    img: '/Frame 47628.png',
    title: 'Other',
    author: 'Try Other Theme',
  },
];
