import { useState, useRef } from 'react';
import * as lamejs from 'lamejs';

// assets
import kiss92Logo from '../../assets/images/users/kiss92.webp';
import fm983Logo from '../../assets/images/users/963.webp';
import fm913Logo from '../../assets/images/users/913.webp';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from '@mui/material/MenuItem';

// icons
import {
  PlayArrow,
  Stop,
  FiberManualRecord,
  Edit,
  Add,
  FilterList,
  Sort,
  MoreHoriz,
  Delete,
  Share,
  Replay,
  ChatBubbleOutline,
  Pause,
  CloudUpload,
  WhatsApp,
  Telegram,
  Facebook,
  Instagram,
  AutoFixHigh,
  Save
} from '@mui/icons-material';


// helper function for MP3 encoding
function audioBufferToMp3Blob(audioBuffer) {
  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const left = audioBuffer.getChannelData(0);
  const right = numChannels > 1 ? audioBuffer.getChannelData(1) : null;

  const mp3encoder = new lamejs.Mp3Encoder(numChannels, sampleRate, 128);
  const blockSize = 1152;
  const mp3Data = [];

  let leftBuffer = new Int16Array(blockSize);
  let rightBuffer = right ? new Int16Array(blockSize) : null;

  for (let i = 0; i < left.length; i += blockSize) {
    const leftChunk = left.subarray(i, i + blockSize);
    const rightChunk = right ? right.subarray(i, i + blockSize) : null;

    for (let j = 0; j < leftChunk.length; j++) {
      leftBuffer[j] = leftChunk[j] * 32767;
      if (rightBuffer && rightChunk) {
        rightBuffer[j] = rightChunk[j] * 32767;
      }
    }

    let mp3buf = rightBuffer
      ? mp3encoder.encodeBuffer(leftBuffer, rightBuffer)
      : mp3encoder.encodeBuffer(leftBuffer);

    if (mp3buf.length > 0) mp3Data.push(mp3buf);
  }

  const end = mp3encoder.flush();
  if (end.length > 0) mp3Data.push(end);

  return new Blob(mp3Data, { type: 'audio/mpeg' });
}

// ==============================|| COMMUNITY MANAGER PAGE ||============================== //

// Station logo mapping
const stationLogos = {
  1: kiss92Logo,      // Kiss 92
  2: fm983Logo,       // 98.3 FM
  3: fm913Logo        // 91.3 FM
};

export default function CommunityManager() {
  const [stations, setStations] = useState([
    { id: 1, name: 'Kiss 92', active: true, url: 'https://22283.live.streamtheworld.com/ONE_FM_913AAC.aac' },
    { id: 2, name: '98.3 FM', active: false, url: '' },
    { id: 3, name: '91.3 FM', active: false, url: '' },
  ]);

  const [stationData, setStationData] = useState({
    1: [
      {
        id: 1,
        from: '2024-11-25 10:00:00',
        to: '2024-11-25 10:15:00',
        srt: "Welcome back to the morning show. Today we're discussing community guidelines...",
        segmentCategory: 'Community',
        agentResponse: 'Drafted a social media post highlighting the key points of the community guidelines discussion.',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' // Sample audio clip
      },
      {
        id: 2,
        from: '2024-11-25 10:15:00',
        to: '2024-11-25 10:30:00',
        srt: "In other news, local traffic updates suggest heavy congestion on the main highway...",
        segmentCategory: 'Traffic',
        agentResponse: 'Alert: Heavy congestion reported on the main highway. Plan your route accordingly! #TrafficUpdate',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' // Sample audio clip
      },
      {
        id: 3,
        from: '2024-11-25 10:30:00',
        to: '2024-11-25 10:45:00',
        srt: "Coming up next, an interview with the mayor about the new park initiatives...",
        segmentCategory: 'Interview',
        agentResponse: 'Upcoming: Exclusive interview with the Mayor regarding new park initiatives. Stay tuned!',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' // Sample audio clip
      }
    ],
    2: [
      {
        id: 1,
        from: '2024-11-25 11:00:00',
        to: '2024-11-25 11:15:00',
        srt: "Smooth jazz all morning long. Up next, some classic hits...",
        segmentCategory: 'Music',
        agentResponse: 'Now playing: Smooth Jazz. Relax and enjoy the tunes. #SmoothJazz',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' // Sample audio clip
      }
    ],
    3: [
      {
        id: 1,
        from: '2024-11-25 12:00:00',
        to: '2024-11-25 12:15:00',
        srt: "Rock on! We have a special guest in the studio today...",
        segmentCategory: 'Interview',
        agentResponse: 'Special guest in the studio today! You don\'t want to miss this rock legend.',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' // Sample audio clip
      }
    ]
  });

  // Media Player States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState('Ready');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Pagination States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Edit Modal States
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [editFormData, setEditFormData] = useState({
    from: '',
    to: '',
    srt: '',
    segmentCategory: '',
    agentResponse: ''
  });

  // Share Modal States
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareFormData, setShareFormData] = useState({
    headerImage: null,
    headerImagePreview: null,
    category: '',
    agentResponse: ''
  });

  // Regenerate Modal States
  const [regenerateModalOpen, setRegenerateModalOpen] = useState(false);
  const [regeneratingRow, setRegeneratingRow] = useState(null);
  const [regenerateFormData, setRegenerateFormData] = useState({
    srt: '',
    segmentCategory: '',
    agentResponse: '',
    prompt: ''
  });

  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Refs
  const audioRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const clipAudioRef = useRef(null);

  // Clip Player States
  const [playingClipId, setPlayingClipId] = useState(null);

  const activeStation = stations.find(s => s.active);
  const allData = activeStation ? (stationData[activeStation.id] || []) : [];
  
  // Pagination calculations
  const currentData = allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setStatus('Paused');
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setStatus('Playing');
        })
        .catch(err => {
          console.error("Playback failed:", err);
          setStatus('Playback Error');
        });
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      // Stop Recording
      if (recorderRef.current) {
        recorderRef.current.stop();
        setIsRecording(false);
        setStatus('Stopping...');
      }
    } else {
      // Start Recording
      try {
        if (!audioRef.current) return;

        // Need to capture stream. Note: captureStream() support varies. 
        // For cross-origin audio, this might be restricted unless CORS is handled correctly.
        // The reference used crossorigin="anonymous"
        const stream = audioRef.current.captureStream ? audioRef.current.captureStream() : audioRef.current.mozCaptureStream();
        
        if (!stream) {
            alert("Stream capture not supported in this browser.");
            return;
        }

        const recorder = new MediaRecorder(stream);
        recorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunksRef.current.push(e.data);
          }
        };

        recorder.onstop = async () => {
          setStatus('Converting to MP3...');
          setIsProcessing(true);

          try {
            const webmBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
            const arrayBuffer = await webmBlob.arrayBuffer();
            
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const audioCtx = new AudioCtx();
            const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

            const mp3Blob = audioBufferToMp3Blob(audioBuffer);
            const url = URL.createObjectURL(mp3Blob);
            
            setDownloadUrl(url);
            setStatus('Recording complete');
          } catch (error) {
            console.error("Conversion failed:", error);
            setStatus('Conversion Failed');
          } finally {
            setIsProcessing(false);
          }
        };

        recorder.start();
        setIsRecording(true);
        setStatus('Recording...');
      } catch (e) {
        console.error("Recording failed:", e);
        setStatus('Recording Error');
      }
    }
  };

  const handleStationChange = (id) => {
    setStations(stations.map(s => ({
      ...s,
      active: s.id === id
    })));
    // Reset player state on station change
    setIsPlaying(false);
    setIsRecording(false);
    setDownloadUrl(null);
    setStatus('Ready');
    // Reset pagination on station change
    setPage(0);
    if (audioRef.current) {
        audioRef.current.load(); // Reload with new source
    }
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditFormData({
      from: row.from,
      to: row.to,
      srt: row.srt,
      segmentCategory: row.segmentCategory,
      agentResponse: row.agentResponse
    });
    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingRow(null);
    setEditFormData({
      from: '',
      to: '',
      srt: '',
      segmentCategory: '',
      agentResponse: ''
    });
  };

  const handleEditSave = () => {
    if (!editingRow || !activeStation) return;

    // Update the data in stationData
    setStationData(prev => ({
      ...prev,
      [activeStation.id]: prev[activeStation.id].map(item => 
        item.id === editingRow.id 
          ? { ...item, ...editFormData }
          : item
      )
    }));

    handleEditClose();
  };

  const handleFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Share Modal Handlers
  const handleShareClick = (row) => {
    setShareFormData({
      headerImage: null,
      headerImagePreview: null,
      category: row.segmentCategory || '',
      agentResponse: row.agentResponse || ''
    });
    setShareModalOpen(true);
  };

  const handleShareClose = () => {
    setShareModalOpen(false);
    setShareFormData({
      headerImage: null,
      headerImagePreview: null,
      category: '',
      agentResponse: ''
    });
  };

  const handleShareFormChange = (field, value) => {
    setShareFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleImageFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShareFormData(prev => ({
          ...prev,
          headerImage: file,
          headerImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformShare = (platform) => {
    // Placeholder for platform-specific sharing logic
    console.log(`Sharing to ${platform}`, shareFormData);
    alert(`Sharing to ${platform}! (Integration pending)`);
  };

  // Regenerate Modal Handlers
  const handleRegenerateClick = (row) => {
    setRegeneratingRow(row);
    setRegenerateFormData({
      srt: row.srt || '',
      segmentCategory: row.segmentCategory || '',
      agentResponse: row.agentResponse || '',
      prompt: ''
    });
    setRegenerateModalOpen(true);
  };

  const handleRegenerateClose = () => {
    setRegenerateModalOpen(false);
    setRegeneratingRow(null);
    setRegenerateFormData({
      srt: '',
      segmentCategory: '',
      agentResponse: '',
      prompt: ''
    });
  };

  const handleRegenerateFormChange = (field, value) => {
    setRegenerateFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegenerateSave = () => {
    if (!regeneratingRow || !activeStation) return;

    // Update the data in stationData
    setStationData(prev => ({
      ...prev,
      [activeStation.id]: prev[activeStation.id].map(item => 
        item.id === regeneratingRow.id 
          ? { 
              ...item, 
              srt: regenerateFormData.srt,
              segmentCategory: regenerateFormData.segmentCategory,
              agentResponse: regenerateFormData.agentResponse
            }
          : item
      )
    }));

    handleRegenerateClose();
  };

  const handleRegenerate = () => {
    // Placeholder for AI regeneration logic
    console.log('Regenerating with prompt:', regenerateFormData.prompt);
    alert('AI Regeneration triggered! (Integration pending)');
    // In a real implementation, this would call an API to regenerate the content
  };

  // Clip Player Handlers
  const handlePlayClip = (row) => {
    if (!clipAudioRef.current || !row.clipUrl) return;

    if (playingClipId === row.id) {
      // Stop playing if clicking the same clip
      clipAudioRef.current.pause();
      clipAudioRef.current.currentTime = 0;
      setPlayingClipId(null);
    } else {
      // Play the new clip
      clipAudioRef.current.src = row.clipUrl;
      clipAudioRef.current.play()
        .then(() => {
          setPlayingClipId(row.id);
        })
        .catch(err => {
          console.error("Clip playback failed:", err);
          alert('Failed to play clip. Please check the audio URL.');
        });
    }
  };

  const handleClipEnded = () => {
    setPlayingClipId(null);
  };

  // Available segment categories
  const segmentCategories = ['Community', 'Traffic', 'Interview', 'Music', 'News', 'Entertainment', 'Sports', 'Weather'];

  return (
    <Stack spacing={0}>
      {/* Hidden Audio Element for Live Stream */}
      <audio 
        ref={audioRef} 
        src={activeStation?.url} 
        crossOrigin="anonymous"
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Hidden Audio Element for Clips */}
      <audio 
        ref={clipAudioRef}
        onEnded={handleClipEnded}
      />

      {/* 1. FM Radio Station Section */}
      <Box>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {stations.map((station) => (
            <Card
              key={station.id}
              onClick={() => handleStationChange(station.id)}
              sx={{
                minWidth: 160,
                p: 2,
                cursor: 'pointer',
                border: station.active ? '2px solid' : '1px solid',
                borderColor: station.active ? 'primary.main' : 'divider',
                bgcolor: station.active ? 'primary.lighter' : 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: station.active ? 'primary.lighter' : 'action.hover',
                  borderColor: station.active ? 'primary.main' : 'primary.main',
                  boxShadow: (theme) => theme.vars?.customShadows?.z1 || theme.customShadows?.z1 || theme.shadows[2]
                }
              }}
            >
              <Typography variant="h6" color={station.active ? 'primary.main' : 'text.primary'}>
                {station.name || 'Empty Slot'}
              </Typography>
            </Card>
          ))}
          
          {/* Add Button */}
          <Card
            elevation={0}
            sx={{
              minWidth: 100,
              p: 2,
              cursor: 'pointer',
              border: '1px dashed',
              borderColor: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'transparent',
              boxShadow: 'none',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.hover',
                borderColor: 'primary.main',
                boxShadow: (theme) => theme.vars?.customShadows?.z1 || theme.customShadows?.z1 || theme.shadows[2]
              }
            }}
          >
            <Add color="action" />
          </Card>
        </Stack>
      </Box>

      {/* 2. Contents Section */}
      <Box>
        <Stack spacing={4}>
          
          {/* 2.1 Media Player */}
            <Box 
              sx={(theme) => ({ 
                bgcolor: 'background.paper',
                border: '1px solid', 
                borderColor: 'divider', 
                borderRadius: 1,
                p: 3,
                boxShadow: theme.vars?.customShadows?.z1 || theme.customShadows?.z1 || theme.shadows[1]
              })}
            >
              <Grid container spacing={3} alignItems="center">
                {/* Icon Area */}
                <Grid item xs={12} md={3} lg={2}>
                  <Box
                    sx={{
                      width: '100%',
                      aspectRatio: '1/1', // Keep it square
                      // bgcolor: 'grey.100',
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // border: '1px solid',
                      // borderColor: 'divider'
                    }}
                  >
                    <img 
                      src={stationLogos[activeStation?.id] || kiss92Logo} 
                      alt={activeStation?.name || "Radio Station"} 
                      style={{ width: '192px', height: '96px', objectFit: 'cover' }}
                    />
                  </Box>
                </Grid>

                {/* Controls Area */}
                <Grid item xs={12} md={9} lg={10}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
                            <Button
                            variant="contained"
                            size="large"
                            startIcon={isPlaying ? <Pause /> : <PlayArrow />}
                            onClick={handlePlay}
                            sx={{ minWidth: 120, py: 1.5 }}
                            >
                            {isPlaying ? 'Pause' : 'Play'}
                            </Button>
                            <Button
                            variant="contained"
                            size="large"
                            color={isRecording ? "error" : "success"}
                            startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <FiberManualRecord />}
                            endIcon={!isProcessing && <Stop />}
                            onClick={handleRecord}
                            disabled={isProcessing}
                            sx={{ minWidth: 160, py: 1.5 }}
                            >
                            {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </Button>
                        </Stack>
                        <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Edit />}
                        sx={{ minWidth: 120, py: 1.5 }}
                        >
                        Edit
                        </Button>
                    </Stack>
                    
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                            Status: <strong>{status}</strong>
                        </Typography>
                        {downloadUrl && (
                            <Button 
                                component="a" 
                                href={downloadUrl} 
                                download={`recording_${new Date().toISOString()}.mp3`}
                                size="small"
                                variant="text"
                            >
                                Download MP3
                            </Button>
                        )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* 2.2 Data Grid Section */}
            <Box>
              {/* Filters */}
              <Stack 
                direction="row" 
                justifyContent="space-between"
                alignItems="center" 
                spacing={1} 
                sx={{ mb: 2 }}
              >
                <Typography variant="h4">{activeStation?.name} - Recorded Segments</Typography>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" startIcon={<MoreHoriz />}>Action</Button>
                  <Button variant="outlined" startIcon={<Sort />}>Sort</Button>
                  <Button variant="outlined" startIcon={<FilterList />}>Filter</Button>
                </Stack>
              </Stack>

              {/* Table */}
              <TableContainer component={Paper} variant="outlined">
                <Table sx={{ minWidth: 650 }} aria-label="community manager table">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell>DateTime (From)</TableCell>
                      <TableCell>DateTime (To)</TableCell>
                      <TableCell align="center">Clip</TableCell>
                      <TableCell>SRT Content</TableCell>
                      <TableCell>Segment Category</TableCell>
                      <TableCell>Agent Response</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox />
                        </TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.from}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.to}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            color={playingClipId === row.id ? "error" : "primary"}
                            onClick={() => handlePlayClip(row)}
                            disabled={!row.clipUrl}
                            sx={{
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'scale(1.1)'
                              }
                            }}
                          >
                            {playingClipId === row.id ? <Stop /> : <PlayArrow />}
                          </IconButton>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 300 }}>
                          <Typography variant="body2" noWrap>
                            {row.srt}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={row.segmentCategory} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell sx={{ maxWidth: 300 }}>
                          <Typography variant="body2" noWrap>
                            {row.agentResponse}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Button 
                              size="small" 
                              variant="contained" 
                              color="warning"
                              startIcon={<Edit />}
                              onClick={() => handleEditClick(row)}
                              sx={{ minWidth: 'auto', px: 1, whiteSpace: 'nowrap' }}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="small" 
                              variant="contained" 
                              startIcon={<AutoFixHigh />}
                              onClick={() => handleRegenerateClick(row)}
                              sx={{ 
                                minWidth: 'auto', 
                                px: 1,
                                background: 'linear-gradient(45deg, #673ab7, #2196f3)',
                                color: 'white',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #5e35b1, #1e88e5)'
                                }
                              }}
                            >
                              Regenerate
                            </Button>
                            <Button 
                              size="small" 
                              variant="contained" 
                              color="error"
                              startIcon={<Delete />}
                              sx={{ minWidth: 'auto', px: 1 }}
                            >
                              Delete
                            </Button>
                            <Button 
                              size="small" 
                              variant="contained" 
                              color="primary"
                              startIcon={<Share />}
                              onClick={() => handleShareClick(row)}
                              sx={{ minWidth: 'auto', px: 1 }}
                            >
                              Share
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  component="div"
                  count={allData.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                />
              </TableContainer>
            </Box>
          </Stack>
      </Box>

      {/* Edit Modal */}
      <Dialog 
        open={editModalOpen} 
        onClose={handleEditClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">Edit Segment Information</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* DateTime From */}
            <TextField
              label="DateTime (From)"
              type="datetime-local"
              value={editFormData.from}
              onChange={(e) => handleFormChange('from', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* DateTime To */}
            <TextField
              label="DateTime (To)"
              type="datetime-local"
              value={editFormData.to}
              onChange={(e) => handleFormChange('to', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Segment Category */}
            <TextField
              select
              label="Segment Category"
              value={editFormData.segmentCategory}
              onChange={(e) => handleFormChange('segmentCategory', e.target.value)}
              fullWidth
            >
              {segmentCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>

            {/* SRT Content */}
            <TextField
              label="SRT Content"
              value={editFormData.srt}
              onChange={(e) => handleFormChange('srt', e.target.value)}
              multiline
              rows={4}
              fullWidth
              placeholder="Enter the transcript or SRT content..."
            />

            {/* Agent Response */}
            <TextField
              label="Agent Response"
              value={editFormData.agentResponse}
              onChange={(e) => handleFormChange('agentResponse', e.target.value)}
              multiline
              rows={4}
              fullWidth
              placeholder="Enter the agent's response or social media post..."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleEditClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Share Modal */}
      <Dialog 
        open={shareModalOpen} 
        onClose={handleShareClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">Share Content</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Section 1: Header Image Upload */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Header Image
              </Typography>
              <Box
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  border: '2px dashed',
                  borderColor: dragActive ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: dragActive ? 'action.hover' : 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {shareFormData.headerImagePreview ? (
                  <Box>
                    <img 
                      src={shareFormData.headerImagePreview} 
                      alt="Header preview" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '300px', 
                        borderRadius: '8px',
                        objectFit: 'contain'
                      }} 
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Click or drag to replace image
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2} alignItems="center">
                    <CloudUpload sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.primary">
                      Drag and drop an image here, or click to select
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports: JPG, PNG, GIF, WebP
                    </Typography>
                  </Stack>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </Box>
            </Box>

            {/* Section 2: Category Dropdown */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Category
              </Typography>
              <TextField
                select
                value={shareFormData.category}
                onChange={(e) => handleShareFormChange('category', e.target.value)}
                fullWidth
                placeholder="Select a category"
              >
                {segmentCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Section 3: AI Agent Response */}
            <Box>
              <Typography variant="h6" gutterBottom>
                AI Agent Response
              </Typography>
              <TextField
                value={shareFormData.agentResponse}
                onChange={(e) => handleShareFormChange('agentResponse', e.target.value)}
                multiline
                rows={6}
                fullWidth
                placeholder="Enter the AI-generated response or edit as needed..."
              />
            </Box>

            {/* Section 4: Platform Buttons */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Share to Platforms
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<WhatsApp />}
                  onClick={() => handlePlatformShare('WhatsApp')}
                  sx={{
                    bgcolor: '#25D366',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#20BA5A'
                    }
                  }}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Telegram />}
                  onClick={() => handlePlatformShare('Telegram')}
                  sx={{
                    bgcolor: '#0088cc',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#006699'
                    }
                  }}
                >
                  Telegram
                </Button>
                <Button
                  variant="contained"
                  startIcon={
                    <Box component="span" sx={{ fontSize: '1.5rem' }}>
                      💬
                    </Box>
                  }
                  onClick={() => handlePlatformShare('WeChat')}
                  sx={{
                    bgcolor: '#09B83E',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#078C31'
                    }
                  }}
                >
                  WeChat
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Facebook />}
                  onClick={() => handlePlatformShare('Facebook')}
                  sx={{
                    bgcolor: '#1877F2',
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#145DBF'
                    }
                  }}
                >
                  Facebook
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Instagram />}
                  onClick={() => handlePlatformShare('Instagram')}
                  sx={{
                    background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #E07020, #C91F6C, #6F2B9A, #4449BE)'
                    }
                  }}
                >
                  Instagram
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleShareClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Regenerate Modal */}
      <Dialog
        open={regenerateModalOpen}
        onClose={handleRegenerateClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5">Regenerate Content</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Section 1: SRT Content */}
            <Box>
              <Typography variant="h6" gutterBottom>
                SRT Content
              </Typography>
              <TextField
                value={regenerateFormData.srt}
                onChange={(e) => handleRegenerateFormChange('srt', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder="Enter the transcript or SRT content..."
              />
            </Box>

            {/* Section 2: Segment Category */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Segment Category
              </Typography>
              <TextField
                select
                value={regenerateFormData.segmentCategory}
                onChange={(e) => handleRegenerateFormChange('segmentCategory', e.target.value)}
                fullWidth
              >
                {segmentCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            {/* Section 3: Agent Response */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Agent Response
              </Typography>
              <TextField
                value={regenerateFormData.agentResponse}
                onChange={(e) => handleRegenerateFormChange('agentResponse', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder="Enter the agent's response or social media post..."
              />
            </Box>

            {/* Divider */}
            <Divider />

            {/* Section 4: Prompt Section */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Enhance with AI
              </Typography>
              <Stack spacing={2}>
                <TextField
                  label="Prompt / Instructions"
                  value={regenerateFormData.prompt}
                  onChange={(e) => handleRegenerateFormChange('prompt', e.target.value)}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="E.g., Make the tone more professional, summarize in bullet points..."
                />
                <Button 
                  onClick={handleRegenerate}
                  variant="contained" 
                  startIcon={<AutoFixHigh />}
                  sx={{
                    background: 'linear-gradient(45deg, #673ab7, #2196f3)',
                    color: 'white',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5e35b1, #1e88e5)'
                    }
                  }}
                >
                  Regenerate
                </Button>
              </Stack>
            </Box>
          </Stack>
        </DialogContent>
        
        {/* Section 5: Bottom Actions */}
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleRegenerateClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleRegenerateSave} 
            variant="contained" 
            color="success"
            startIcon={<Save />}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
