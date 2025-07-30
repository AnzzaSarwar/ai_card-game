// Converts a backend element to Excalidraw element format



import React, { useRef, useState, useEffect } from 'react';

import MouseIcon from '@mui/icons-material/Mouse';
import BrushIcon from '@mui/icons-material/Brush';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Box, Typography, TextField, Button, IconButton, Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';

import dummyData from '../_mock/create_with_deck_response.json';


const TOOL_SELECT = 'select';
const TOOL_DRAW = 'draw';
const TOOL_RECT = 'rect';
const TOOL_CIRCLE = 'circle';
const TOOL_TEXT = 'text';
const TOOL_IMAGE = 'image';

const CustomCanvas = ({ cardId }) => {
  const boxCards = dummyData.data.box.cards;
  const cardData = boxCards.find(card => card._id === cardId) || boxCards[0];
  const [width, setWidth] = useState(cardData?.width || 300);
  const [height, setHeight] = useState(cardData?.height || 400);
  const [drawing, setDrawing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tool, setTool] = useState(TOOL_DRAW);
  const [lines, setLines] = useState([]); // Array of lines, each line is array of points
  const [shapes, setShapes] = useState([]); // {type, start, end, color}
  const [currentShape, setCurrentShape] = useState(null);
  const [texts, setTexts] = useState([]); // {x, y, text}
  const [addingText, setAddingText] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPos, setTextPos] = useState({x:0, y:0});
  const [images, setImages] = useState([]); // {x, y, img, width, height}
  const [imageFile, setImageFile] = useState(null);
  const [placingImage, setPlacingImage] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(null); // {type, index}
  const [dragOffset, setDragOffset] = useState({x:0, y:0});
  const canvasRef = useRef(null);

  // Draw everything
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Draw background image
    const bgImg = new window.Image();
    bgImg.src = cardData.cardFrontElements[0]?.imageUrl || '/Math.jpg';
    bgImg.onload = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(bgImg, 0, 0, width, height);
      // Draw all lines
      ctx.strokeStyle = '#ff0000';
      ctx.lineWidth = 2;
      for (const line of lines) {
        ctx.beginPath();
        for (let i = 0; i < line.length; i++) {
          const pt = line[i];
          if (i === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();
      }
      // Draw shapes
      shapes.forEach((shape, i) => {
        ctx.save();
        ctx.strokeStyle = shape.color || '#00bcd4';
        ctx.lineWidth = 2;
        if (selected && selected.type === 'shape' && selected.index === i) {
          ctx.shadowColor = '#ff0'; ctx.shadowBlur = 8;
        }
        if (shape.type === TOOL_RECT) {
          const x = shape.start.x;
          const y = shape.start.y;
          const w = shape.end.x - shape.start.x;
          const h = shape.end.y - shape.start.y;
          ctx.strokeRect(x, y, w, h);
        } else if (shape.type === TOOL_CIRCLE) {
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
      images.forEach((imgObj, i) => {
        if (imgObj.img.complete) {
          if (selected && selected.type === 'image' && selected.index === i) {
            ctx.save();
            ctx.shadowColor = '#ff0'; ctx.shadowBlur = 8;
            ctx.drawImage(imgObj.img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
            ctx.restore();
          } else {
            ctx.drawImage(imgObj.img, imgObj.x, imgObj.y, imgObj.width, imgObj.height);
          }
        }
      });
      // Draw texts
      ctx.save();
      ctx.font = '20px Arial';
      texts.forEach((t, i) => {
        ctx.fillStyle = (selected && selected.type === 'text' && selected.index === i) ? '#ff0' : '#222';
        ctx.fillText(t.text, t.x, t.y);
      });
      ctx.restore();
    };
    if (bgImg.complete) bgImg.onload();
  }, [width, height, cardData, lines, shapes, texts, images, selected]);


  // Mouse/touch handlers
  const getXY = e => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  const handlePointerDown = e => {
    const { x, y } = getXY(e);
    if (tool === TOOL_DRAW) {
      setDrawing(true);
      setLines(lnArr => [...lnArr, [{ x, y }]]);
    } else if (tool === TOOL_RECT || tool === TOOL_CIRCLE) {
      setCurrentShape({ type: tool, start: { x, y }, end: { x, y }, color: tool === TOOL_RECT ? '#00bcd4' : '#ff9800' });
    } else if (tool === TOOL_TEXT) {
      setTextPos({ x, y });
      setAddingText(true);
    } else if (tool === TOOL_IMAGE && imageFile) {
      // Place image at click
      const img = new window.Image();
      img.src = URL.createObjectURL(imageFile);
      img.onload = () => {
        setImages(imgArr => [...imgArr, { x, y, img, width: 80, height: 80 }]);
        setImageFile(null);
        setPlacingImage(false);
      };
    } else if (tool === TOOL_SELECT) {
      // Try to select an element (images, shapes, texts)
      // Images (top to bottom)
      for (let i = images.length - 1; i >= 0; i--) {
        const img = images[i];
        if (x >= img.x && x <= img.x + img.width && y >= img.y && y <= img.y + img.height) {
          setSelected({ type: 'image', index: i });
          setDragOffset({ x: x - img.x, y: y - img.y });
          setDragging(true);
          return;
        }
      }
      // Shapes (rect/circle)
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (shape.type === TOOL_RECT) {
          const sx = Math.min(shape.start.x, shape.end.x);
          const sy = Math.min(shape.start.y, shape.end.y);
          const ex = Math.max(shape.start.x, shape.end.x);
          const ey = Math.max(shape.start.y, shape.end.y);
          if (x >= sx && x <= ex && y >= sy && y <= ey) {
            setSelected({ type: 'shape', index: i });
            setDragOffset({ x: x - sx, y: y - sy });
            setDragging(true);
            return;
          }
        } else if (shape.type === TOOL_CIRCLE) {
          const cx = (shape.start.x + shape.end.x) / 2;
          const cy = (shape.start.y + shape.end.y) / 2;
          const rx = Math.abs(shape.end.x - shape.start.x) / 2;
          const ry = Math.abs(shape.end.y - shape.start.y) / 2;
          if (Math.pow((x - cx) / rx, 2) + Math.pow((y - cy) / ry, 2) <= 1) {
            setSelected({ type: 'shape', index: i });
            setDragOffset({ x: x - cx, y: y - cy });
            setDragging(true);
            return;
          }
        }
      }
      // Texts
      for (let i = texts.length - 1; i >= 0; i--) {
        const t = texts[i];
        // Simple bounding box for text
        const textWidth = 100; // Approximate
        const textHeight = 24;
        if (x >= t.x && x <= t.x + textWidth && y <= t.y && y >= t.y - textHeight) {
          setSelected({ type: 'text', index: i });
          setDragOffset({ x: x - t.x, y: y - t.y });
          setDragging(true);
          return;
        }
      }
      setSelected(null);
    }
  };

  const handlePointerMove = e => {
    const { x, y } = getXY(e);
    if (tool === TOOL_DRAW && drawing) {
      setLines(lnArr => {
        const newLines = [...lnArr];
        newLines[newLines.length - 1] = [...newLines[newLines.length - 1], { x, y }];
        return newLines;
      });
    } else if ((tool === TOOL_RECT || tool === TOOL_CIRCLE) && currentShape) {
      setCurrentShape(shape => shape ? { ...shape, end: { x, y } } : null);
    } else if (tool === TOOL_SELECT && dragging && selected) {
      if (selected.type === 'image') {
        setImages(imgArr => {
          const newImgs = [...imgArr];
          newImgs[selected.index] = {
            ...newImgs[selected.index],
            x: x - dragOffset.x,
            y: y - dragOffset.y
          };
          return newImgs;
        });
      } else if (selected.type === 'shape') {
        setShapes(shpArr => {
          const newShapes = [...shpArr];
          const shape = newShapes[selected.index];
          const dx = x - dragOffset.x - Math.min(shape.start.x, shape.end.x);
          const dy = y - dragOffset.y - Math.min(shape.start.y, shape.end.y);
          newShapes[selected.index] = {
            ...shape,
            start: { x: shape.start.x + dx, y: shape.start.y + dy },
            end: { x: shape.end.x + dx, y: shape.end.y + dy }
          };
          return newShapes;
        });
      } else if (selected.type === 'text') {
        setTexts(txtArr => {
          const newTexts = [...txtArr];
          newTexts[selected.index] = {
            ...newTexts[selected.index],
            x: x - dragOffset.x,
            y: y - dragOffset.y
          };
          return newTexts;
        });
      }
    }
  };

  const handlePointerUp = e => {
    setDrawing(false);
    if ((tool === TOOL_RECT || tool === TOOL_CIRCLE) && currentShape) {
      setShapes(shpArr => [...shpArr, currentShape]);
      setCurrentShape(null);
    }
    if (tool === TOOL_SELECT && dragging) {
      setDragging(false);
    }
  };


  // Helper to serialize images (convert to dataURL)
  const serializeImages = async (imgArr) => {
    const serialized = await Promise.all(imgArr.map(async imgObj => {
      let dataUrl = imgObj.dataUrl;
      if (!dataUrl && imgObj.img) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imgObj.width;
        tempCanvas.height = imgObj.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(imgObj.img, 0, 0, imgObj.width, imgObj.height);
        dataUrl = tempCanvas.toDataURL();
      }
      return {
        x: imgObj.x,
        y: imgObj.y,
        width: imgObj.width,
        height: imgObj.height,
        dataUrl,
      };
    }));
    return serialized;
  };

  // Helper to deserialize images (dataURL to Image)
  const deserializeImages = (arr) => arr.map(obj => {
    const img = new window.Image();
    img.src = obj.dataUrl;
    return { ...obj, img };
  });

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('customCanvas_' + cardId);
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setWidth(data.width || 300);
        setHeight(data.height || 400);
        setLines(data.lines || []);
        setShapes(data.shapes || []);
        setTexts(data.texts || []);
        setImages(deserializeImages(data.images || []));
      } catch (err) {
        // Optionally log error
      }
    }
    // eslint-disable-next-line
  }, [cardId]);

  const handleSave = async () => {
    const imagesToSave = await serializeImages(images);
    const data = {
      width,
      height,
      lines,
      shapes,
      texts,
      images: imagesToSave,
    };
    localStorage.setItem('customCanvas_' + cardId, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  // Handle text input
  const handleTextInput = e => setTextInput(e.target.value);
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      setTexts(txtArr => [...txtArr, { x: textPos.x, y: textPos.y, text: textInput }]);
    }
    setTextInput('');
    setAddingText(false);
  };

  // Handle image upload
  const handleImageChange = e => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPlacingImage(true);
      setTool(TOOL_IMAGE);
    }
  };


  if (!cardData) {
    return <Typography color="error">Card not found in dummy data.</Typography>;
  }


  return (
    <Box sx={{ maxWidth: 520, mx: 'auto', mt: 6, p: 3, background: '#222', borderRadius: 3, boxShadow: 2 }}>
      <Typography variant="h5" color="white" mb={2}>Custom Card Canvas</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, mb: 2 }}>
        <ToggleButtonGroup
          value={tool}
          exclusive
          onChange={(e, val) => val && setTool(val)}
          size="small"
          sx={{ background: '#333', borderRadius: 2 }}
        >
          <ToggleButton value={TOOL_SELECT} aria-label="Select/Move" sx={{ color: '#fff' }}><MouseIcon /></ToggleButton>
          <ToggleButton value={TOOL_DRAW} aria-label="Draw" sx={{ color: '#fff' }}><BrushIcon /></ToggleButton>
          <ToggleButton value={TOOL_RECT} aria-label="Rectangle" sx={{ color: '#fff' }}><CropSquareIcon /></ToggleButton>
          <ToggleButton value={TOOL_CIRCLE} aria-label="Circle" sx={{ color: '#fff' }}><RadioButtonUncheckedIcon /></ToggleButton>
          <ToggleButton value={TOOL_TEXT} aria-label="Text" sx={{ color: '#fff' }}><TextFieldsIcon /></ToggleButton>
        </ToggleButtonGroup>
        <Tooltip title="Insert Image">
          <IconButton component="label" sx={{ color: '#fff', ml: 1 }}>
            <PhotoCamera />
            <input type="file" accept="image/*" hidden onChange={handleImageChange} />
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          style={{ border: '2px solid #888', borderRadius: 8, background: '#fff', touchAction: 'none' }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        />
        {currentShape && (tool === TOOL_RECT || tool === TOOL_CIRCLE) && (
          <Typography color="info.main" fontSize={14}>Release mouse to place shape</Typography>
        )}
        {placingImage && imageFile && (
          <Typography color="info.main" fontSize={14}>Click on canvas to place image</Typography>
        )}
        {addingText && (
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center', mt: 1 }}>
            <TextField
              label="Enter text"
              value={textInput}
              onChange={handleTextInput}
              size="small"
              sx={{ input: { color: 'white' }, label: { color: '#ccc' }, minWidth: 120 }}
              InputLabelProps={{ style: { color: '#ccc' } }}
              autoFocus
            />
            <Button variant="contained" color="primary" onClick={handleTextSubmit}>Add</Button>
            <Button variant="outlined" color="secondary" onClick={() => { setAddingText(false); setTextInput(''); }}>Cancel</Button>
          </Box>
        )}
        <TextField
          label="Width (px)"
          type="number"
          value={width}
          onChange={e => setWidth(Number(e.target.value))}
          sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
          InputLabelProps={{ style: { color: '#ccc' } }}
          fullWidth
        />
        <TextField
          label="Height (px)"
          type="number"
          value={height}
          onChange={e => setHeight(Number(e.target.value))}
          sx={{ input: { color: 'white' }, label: { color: '#ccc' } }}
          InputLabelProps={{ style: { color: '#ccc' } }}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
          Save
        </Button>
        {saved && <Typography color="success.main">Saved!</Typography>}
      </Box>
    </Box>
  );
};

export default CustomCanvas;