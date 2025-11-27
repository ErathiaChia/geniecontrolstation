import { useState, useRef, useEffect } from 'react';
import * as lamejs from 'lamejs';

// assets
import kiss92Logo from '../../assets/images/users/kiss92.webp';
import fm983Logo from '../../assets/images/users/963.webp';
import fm913Logo from '../../assets/images/users/913.webp';
import moneyFM893Logo from '../../assets/images/users/893.webp';

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
import Popover from '@mui/material/Popover';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';

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

    let mp3buf = rightBuffer ? mp3encoder.encodeBuffer(leftBuffer, rightBuffer) : mp3encoder.encodeBuffer(leftBuffer);

    if (mp3buf.length > 0) mp3Data.push(mp3buf);
  }

  const end = mp3encoder.flush();
  if (end.length > 0) mp3Data.push(end);

  return new Blob(mp3Data, { type: 'audio/mpeg' });
}

// ==============================|| COMMUNITY MANAGER PAGE ||============================== //

// Station logo mapping
const stationLogos = {
  1: kiss92Logo, // Kiss 92
  2: fm983Logo, // 98.3 FM
  3: fm913Logo, // 91.3 FM
  4: moneyFM893Logo // Money FM 89.3
};

export default function CommunityManager() {
  const [stations, setStations] = useState([
    { id: 1, name: 'Kiss 92', active: true, url: 'https://22283.live.streamtheworld.com/ONE_FM_913AAC.aac', segmentDuration: 60 },
    { id: 2, name: '98.3 FM', active: false, url: '', segmentDuration: 60 },
    { id: 3, name: '91.3 FM', active: false, url: '', segmentDuration: 60 },
    {
      id: 4,
      name: 'Money FM 89.3',
      active: false,
      url: 'https://28123.mc.tritondigital.com/OMNY_STNEWSPRESENTEDBYMONEYFM_NEWSFROMTHESTRAITSTIMES_P/media-session/2786998d-7493-4ca3-bd02-e63cf11b2f0d/d/clips/d9486183-3dd4-4ad6-aebe-a4c1008455d5/4e188010-01ce-44a9-bf38-adcf004a366a/f42be6fd-55b0-4998-bebe-b3a2000e0dfa/audio/direct/t1764204709/MONEYFM_-_8_31am_NEWS_HEADLINES.mp3?t=1764204709&in_playlist=a86dfcac-e7b5-4438-b84b-adcf004aff3b&utm_source=Podcast',
      segmentDuration: 60
    }
  ]);

  const [stationData, setStationData] = useState({
    1: [],
    2: [
      {
        id: 1,
        from: '2024-11-25 11:00:00',
        to: '2024-11-25 11:15:00',
        srt: 'Smooth jazz all morning long. Up next, some classic hits...',
        segmentCategory: 'Music',
        agentResponse: 'Now playing: Smooth Jazz. Relax and enjoy the tunes. #SmoothJazz',
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', // Sample audio clip
        shared: false,
        sharedPlatforms: []
      }
    ],
    3: [
      {
        id: 1,
        from: '2024-11-25 12:00:00',
        to: '2024-11-25 12:15:00',
        srt: 'Rock on! We have a special guest in the studio today...',
        segmentCategory: 'Interview',
        agentResponse: "Special guest in the studio today! You don't want to miss this rock legend.",
        clipUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', // Sample audio clip
        shared: false,
        sharedPlatforms: []
      }
    ],
    4: []
  });

  // Media Player States - now per station
  const [stationStates, setStationStates] = useState({});

  // Pagination States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Selection States
  const [selectedRows, setSelectedRows] = useState([]);

  // Quick Share States
  const [quickShareAnchor, setQuickShareAnchor] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    whatsapp: true,
    telegram: true,
    wechat: true,
    facebook: true,
    instagram: true
  });
  const [shareToastOpen, setShareToastOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const sharedPlatformMeta = {
    whatsapp: { label: 'WhatsApp', Icon: WhatsApp },
    telegram: { label: 'Telegram', Icon: Telegram },
    wechat: { label: 'WeChat', Icon: null },
    facebook: { label: 'Facebook', Icon: Facebook },
    instagram: { label: 'Instagram', Icon: Instagram }
  };

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

  // Add FM Station Modal States
  const [addStationModalOpen, setAddStationModalOpen] = useState(false);
  const [addStationFormData, setAddStationFormData] = useState({
    logo: null,
    logoPreview: null,
    stationName: '',
    apiConfig: '',
    schedules: [],
    segmentDuration: 60
  });
  const [dragActiveLogo, setDragActiveLogo] = useState(false);
  const logoInputRef = useRef(null);

  // Edit FM Station Modal States
  const [editStationModalOpen, setEditStationModalOpen] = useState(false);
  const [editStationFormData, setEditStationFormData] = useState({
    logo: null,
    logoPreview: null,
    stationName: '',
    apiConfig: '',
    schedules: [],
    segmentDuration: 60
  });
  const [dragActiveEditLogo, setDragActiveEditLogo] = useState(false);
  const editLogoInputRef = useRef(null);

  // Refs - now stored per station
  const audioRefsMap = useRef({}); // for playback
  const recordingAudioRefsMap = useRef({}); // separate audio elements for recording
  const recorderRefsMap = useRef({});
  const chunksRefsMap = useRef({});
  const clipAudioRef = useRef(null);
  const recordingIntervalRef = useRef({});
  const processingQueueRef = useRef({}); // queue for processing chunks
  const currentRecordingRowRef = useRef({}); // track current recording row per station
  const isRecordingRef = useRef({}); // track recording state per station (for callbacks)
  const segmentDurationRef = useRef({}); // track segment duration per station (in seconds)

  // helper function to get or initialize station state
  const getStationState = (stationId) => {
    if (!stationStates[stationId]) {
      return {
        isPlaying: false,
        isRecording: false,
        status: 'Ready',
        downloadUrl: null,
        isProcessing: false
      };
    }
    return stationStates[stationId];
  };

  // helper function to update station state
  const updateStationState = (stationId, updates) => {
    setStationStates((prev) => ({
      ...prev,
      [stationId]: {
        ...getStationState(stationId),
        ...updates
      }
    }));
  };

  // Sync segmentDuration ref with stations state
  useEffect(() => {
    stations.forEach((station) => {
      segmentDurationRef.current[station.id] = station.segmentDuration ?? 60;
    });
  }, [stations]);

  // Clip Player States
  const [playingClipId, setPlayingClipId] = useState(null);

  const activeStation = stations.find((s) => s.active);
  const allData = activeStation ? stationData[activeStation.id] || [] : [];

  // get current station's state
  const currentState = activeStation
    ? getStationState(activeStation.id)
    : {
        isPlaying: false,
        isRecording: false,
        status: 'Ready',
        downloadUrl: null,
        isProcessing: false
      };

  // Pagination calculations
  const currentData = allData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (rowId) => {
    const targetRow = currentData.find((row) => row.id === rowId);
    if (!targetRow) {
      return;
    }

    if (targetRow.isRecording || targetRow.isLoading || targetRow.shared) {
      return;
    }

    setSelectedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const selectableRowIds = currentData.filter((row) => !row.isRecording && !row.isLoading && !row.shared).map((row) => row.id);
      setSelectedRows(selectableRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const selectableRows = currentData.filter((row) => !row.isRecording && !row.isLoading && !row.shared);
  const isAllSelected = selectableRows.length > 0 && selectedRows.length === selectableRows.length;
  const isSomeSelected = selectedRows.length > 0 && selectedRows.length < selectableRows.length;

  const handleQuickShareClick = (event) => {
    setQuickShareAnchor(event.currentTarget);
  };

  const handleQuickShareClose = () => {
    setQuickShareAnchor(null);
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) => ({
      ...prev,
      [platform]: !prev[platform]
    }));
  };

  const handleQuickShare = async () => {
    if (selectedRows.length === 0) return;

    const selectedPlatformsList = Object.entries(selectedPlatforms)
      .filter(([_, selected]) => selected)
      .map(([platform, _]) => platform);

    if (selectedPlatformsList.length === 0) {
      alert('Please select at least one platform');
      return;
    }

    setIsSharing(true);

    // Get posts from selected rows
    const selectedData = allData.filter((row) => selectedRows.includes(row.id));
    const agentResponses = selectedData.map((row) => row.agentResponse).filter(Boolean);

    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const activeStationId = activeStation?.id;

    if (activeStationId) {
      setStationData((prev) => {
        const stationSegments = prev[activeStationId] ?? [];

        const updatedSegments = stationSegments.map((segment) => {
          if (!selectedRows.includes(segment.id)) {
            return segment;
          }

          const existingPlatforms = Array.isArray(segment.sharedPlatforms) ? segment.sharedPlatforms : [];
          const mergedPlatforms = Array.from(new Set([...existingPlatforms, ...selectedPlatformsList]));

          return {
            ...segment,
            shared: true,
            sharedPlatforms: mergedPlatforms
          };
        });

        const unsharedSegments = updatedSegments.filter((segment) => !segment.shared);
        const sharedSegments = updatedSegments.filter((segment) => segment.shared);

        return {
          ...prev,
          [activeStationId]: [...unsharedSegments, ...sharedSegments]
        };
      });
    }

    setSelectedRows([]);
    setIsSharing(false);
    setQuickShareAnchor(null);
    setShareToastOpen(true);

    // Reset platform selections to all checked
    setSelectedPlatforms({
      whatsapp: true,
      telegram: true,
      wechat: true,
      facebook: true,
      instagram: true
    });
  };

  const handleToastClose = () => {
    setShareToastOpen(false);
  };

  const handlePlay = () => {
    if (!activeStation) return;

    // get or create audio element for this station
    if (!audioRefsMap.current[activeStation.id]) {
      const audio = new Audio(activeStation.url);
      audio.crossOrigin = 'anonymous';
      audio.onended = () => {
        updateStationState(activeStation.id, { isPlaying: false });
      };
      audioRefsMap.current[activeStation.id] = audio;
    }

    const audioElement = audioRefsMap.current[activeStation.id];
    const state = getStationState(activeStation.id);

    if (state.isPlaying) {
      audioElement.pause();
      updateStationState(activeStation.id, {
        isPlaying: false,
        status: 'Paused'
      });
    } else {
      audioElement
        .play()
        .then(() => {
          updateStationState(activeStation.id, {
            isPlaying: true,
            status: 'Playing'
          });
        })
        .catch((err) => {
          console.error('Playback failed:', err);
          updateStationState(activeStation.id, {
            status: 'Playback Error'
          });
        });
    }
  };

  // helper function to crop audio to 10 seconds (for testing)
  const cropAudioTo10Seconds = async (audioBuffer) => {
    const sampleRate = audioBuffer.sampleRate;
    const tenSecondsInSamples = sampleRate * 10; // 10 seconds for testing
    const numChannels = audioBuffer.numberOfChannels;

    // create a new audio buffer with 10 seconds duration
    // @ts-ignore - webkitAudioContext is for older browsers
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    const croppedBuffer = audioCtx.createBuffer(numChannels, Math.min(tenSecondsInSamples, audioBuffer.length), sampleRate);

    // copy the first 10 seconds of audio data
    for (let channel = 0; channel < numChannels; channel++) {
      const sourceData = audioBuffer.getChannelData(channel);
      const targetData = croppedBuffer.getChannelData(channel);
      const length = Math.min(tenSecondsInSamples, sourceData.length);
      for (let i = 0; i < length; i++) {
        targetData[i] = sourceData[i];
      }
    }

    return croppedBuffer;
  };

  // helper function to call the text_podcast API
  const callTextPodcastAPI = async (audioBlob) => {
    const formData = new FormData();

    // determine file extension based on blob type
    let filename = 'recording.webm';
    if (audioBlob.type.includes('mp3')) {
      filename = 'recording.mp3';
    } else if (audioBlob.type.includes('wav')) {
      filename = 'recording.wav';
    } else if (audioBlob.type.includes('ogg')) {
      filename = 'recording.ogg';
    }

    formData.append('audio', audioBlob, filename);

    try {
      const response = await fetch('https://dev-genie.001.gs/smart-api/text_podcast', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  // helper function to check if stream has active tracks
  const hasActiveTracks = (stream) => {
    if (!stream) return false;
    const tracks = stream.getTracks();
    return tracks.some((track) => track.readyState === 'live');
  };

  // helper function to stop recording gracefully when stream ends
  const stopRecordingGracefully = (stationId) => {
    console.log('Stopping recording gracefully due to stream end for station:', stationId);

    // set recording flag to false
    isRecordingRef.current[stationId] = false;

    // stop current recorder if it exists
    const recorder = recorderRefsMap.current[stationId];
    if (recorder?.state === 'recording') {
      try {
        recorder.stop();
      } catch (e) {
        console.error('Error stopping recorder:', e);
      }
    }

    // process any remaining chunks
    const chunks = chunksRefsMap.current[stationId] ?? [];
    const rowId = currentRecordingRowRef.current[stationId];

    if (chunks.length > 0 && rowId) {
      console.log('Processing remaining chunks for rowId:', rowId);

      let mimeType = 'audio/webm';
      if (chunks[0]?.type) {
        mimeType = chunks[0].type;
      }

      const recordedBlob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(recordedBlob);

      // update row: recording finished, clip available
      setStationData((prev) => ({
        ...prev,
        [stationId]: prev[stationId].map((item) =>
          item.id === rowId
            ? {
                ...item,
                clipUrl: url,
                isRecording: false
              }
            : item
        )
      }));

      // call API in background
      setTimeout(() => {
        callTextPodcastAPI(recordedBlob)
          .then((apiResponse) => {
            console.log('API response received for rowId:', rowId, apiResponse);
            setStationData((prev) => ({
              ...prev,
              [stationId]: prev[stationId].map((item) =>
                item.id === rowId
                  ? {
                      ...item,
                      srt: apiResponse.text || '',
                      segmentCategory: apiResponse.category || '',
                      agentResponse: apiResponse.content || '',
                      isLoading: false
                    }
                  : item
              )
            }));
          })
          .catch((apiError) => {
            console.error('API call failed for rowId:', rowId, apiError);
            setStationData((prev) => ({
              ...prev,
              [stationId]: prev[stationId].map((item) =>
                item.id === rowId
                  ? {
                      ...item,
                      srt: 'Error loading content',
                      segmentCategory: 'Error',
                      agentResponse: 'Failed to process audio',
                      isLoading: false
                    }
                  : item
              )
            }));
          });
      }, 0);
    } else if (rowId) {
      // no chunks but row exists, mark as error
      setStationData((prev) => ({
        ...prev,
        [stationId]: prev[stationId].map((item) =>
          item.id === rowId
            ? {
                ...item,
                isRecording: false,
                srt: 'Stream ended - no audio captured',
                segmentCategory: 'Error',
                agentResponse: 'Recording stopped due to stream end',
                isLoading: false
              }
            : item
        )
      }));
    }

    // cleanup
    const recordingAudio = recordingAudioRefsMap.current[stationId];
    if (recordingAudio) {
      recordingAudio.pause();
      recordingAudio.src = '';
      delete recordingAudioRefsMap.current[stationId];
    }

    updateStationState(stationId, {
      isRecording: false,
      status: 'Stream Ended',
      isProcessing: false
    });
  };

  // helper function to start a new recording chunk
  const startRecordingChunk = (stationId, stream) => {
    // check if stream has active tracks before starting
    if (!hasActiveTracks(stream)) {
      console.warn('Stream has no active tracks, stopping recording for station:', stationId);
      stopRecordingGracefully(stationId);
      return;
    }

    // Get segment duration from ref (always up-to-date) or default to 60 seconds
    const segmentDurationSeconds = segmentDurationRef.current[stationId] ?? 60;
    const segmentDuration = segmentDurationSeconds * 1000; // Convert to milliseconds

    let recorder;
    try {
      recorder = new MediaRecorder(stream);
    } catch (e) {
      console.error('Failed to create MediaRecorder:', e);
      stopRecordingGracefully(stationId);
      return;
    }

    recorderRefsMap.current[stationId] = recorder;
    chunksRefsMap.current[stationId] = [];

    // create a new row immediately with recording state
    const newRowId = Date.now();
    const now = new Date();
    const fromTime = now.toISOString().slice(0, 19).replace('T', ' ');
    const toTime = new Date(now.getTime() + segmentDuration).toISOString().slice(0, 19).replace('T', ' ');

    setStationData((prev) => ({
      ...prev,
      [stationId]: [
        {
          id: newRowId,
          from: fromTime,
          to: toTime,
          srt: 'loading',
          segmentCategory: 'loading',
          agentResponse: 'loading',
          clipUrl: null,
          isRecording: true,
          isLoading: true
        },
        ...(prev[stationId] || [])
      ]
    }));

    // store the row ID for this recording
    currentRecordingRowRef.current[stationId] = newRowId;

    // monitor stream tracks for end events
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      track.onended = () => {
        console.log('Track ended for station:', stationId);
        if (isRecordingRef.current[stationId]) {
          stopRecordingGracefully(stationId);
        }
      };
    });

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRefsMap.current[stationId].push(e.data);
      }
    };

    recorder.onerror = (e) => {
      console.error('MediaRecorder error:', e);
      if (isRecordingRef.current[stationId]) {
        stopRecordingGracefully(stationId);
      }
    };

    recorder.onstop = () => {
      const chunks = [...chunksRefsMap.current[stationId]];
      const rowId = currentRecordingRowRef.current[stationId];
      const stillRecording = isRecordingRef.current[stationId];

      console.log('Recording stopped, chunk size:', chunks.length, 'rowId:', rowId, 'stillRecording:', stillRecording);

      // check if we have any chunks to process
      if (chunks.length === 0) {
        console.warn('No chunks recorded for rowId:', rowId);
        setStationData((prev) => ({
          ...prev,
          [stationId]: prev[stationId].map((item) =>
            item.id === rowId
              ? {
                  ...item,
                  isRecording: false,
                  srt: 'No audio captured',
                  segmentCategory: 'Error',
                  agentResponse: 'Recording produced no audio data',
                  isLoading: false
                }
              : item
          )
        }));

        // if still recording, try to start next chunk
        if (stillRecording && hasActiveTracks(stream)) {
          console.log('Starting next recording chunk after empty chunk...');
          startRecordingChunk(stationId, stream);
        } else if (stillRecording) {
          console.warn('Stream has no active tracks, stopping recording');
          stopRecordingGracefully(stationId);
        }
        return;
      }

      // determine the mime type from the chunks
      let mimeType = 'audio/webm';
      if (chunks[0]?.type) {
        mimeType = chunks[0].type;
      }

      const recordedBlob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(recordedBlob);

      // update row: recording finished, clip available
      setStationData((prev) => ({
        ...prev,
        [stationId]: prev[stationId].map((item) =>
          item.id === rowId
            ? {
                ...item,
                clipUrl: url,
                isRecording: false
              }
            : item
        )
      }));

      console.log('Starting API call in background for rowId:', rowId);

      // call API in background (truly non-blocking)
      setTimeout(() => {
        callTextPodcastAPI(recordedBlob)
          .then((apiResponse) => {
            console.log('API response received for rowId:', rowId, apiResponse);
            // update the row with actual data
            setStationData((prev) => ({
              ...prev,
              [stationId]: prev[stationId].map((item) =>
                item.id === rowId
                  ? {
                      ...item,
                      srt: apiResponse.text || '',
                      segmentCategory: apiResponse.category || '',
                      agentResponse: apiResponse.content || '',
                      isLoading: false
                    }
                  : item
              )
            }));
          })
          .catch((apiError) => {
            console.error('API call failed for rowId:', rowId, apiError);
            // update the row with error state
            setStationData((prev) => ({
              ...prev,
              [stationId]: prev[stationId].map((item) =>
                item.id === rowId
                  ? {
                      ...item,
                      srt: 'Error loading content',
                      segmentCategory: 'Error',
                      agentResponse: 'Failed to process audio',
                      isLoading: false
                    }
                  : item
              )
            }));
          });
      }, 0);

      // if still recording, check stream before starting next chunk
      if (stillRecording) {
        if (hasActiveTracks(stream)) {
          console.log('Starting next recording chunk...');
          startRecordingChunk(stationId, stream);
        } else {
          console.warn('Stream has no active tracks, stopping recording');
          stopRecordingGracefully(stationId);
        }
      } else {
        console.log('Recording stopped, not starting next chunk');
      }
    };

    // record for configured segment duration then stop
    try {
      recorder.start();
    } catch (e) {
      console.error('Failed to start MediaRecorder:', e);
      // if start fails, stop recording gracefully
      stopRecordingGracefully(stationId);
      return;
    }

    setTimeout(() => {
      if (recorder.state === 'recording') {
        try {
          recorder.stop();
        } catch (e) {
          console.error('Error stopping recorder:', e);
        }
      }
    }, segmentDuration);
  };

  const handleRecord = async () => {
    if (!activeStation) return;

    const state = getStationState(activeStation.id);

    if (state.isRecording) {
      // stop recording - set ref first so onstop handler knows not to start new chunk
      isRecordingRef.current[activeStation.id] = false;

      const recorder = recorderRefsMap.current[activeStation.id];
      if (recorder && recorder.state === 'recording') {
        recorder.stop();
      }

      // clear any pending intervals
      if (recordingIntervalRef.current[activeStation.id]) {
        clearInterval(recordingIntervalRef.current[activeStation.id]);
        delete recordingIntervalRef.current[activeStation.id];
      }

      // stop and cleanup the recording audio element
      const recordingAudio = recordingAudioRefsMap.current[activeStation.id];
      if (recordingAudio) {
        recordingAudio.pause();
        recordingAudio.src = '';
        delete recordingAudioRefsMap.current[activeStation.id];
      }

      updateStationState(activeStation.id, {
        isRecording: false,
        status: 'Stopped',
        isProcessing: false
      });
    } else {
      // start recording
      try {
        // create a separate audio element for recording (not for playback)
        const recordingAudio = new Audio(activeStation.url);
        recordingAudio.crossOrigin = 'anonymous';
        recordingAudio.volume = 0; // mute it so user doesn't hear it
        recordingAudioRefsMap.current[activeStation.id] = recordingAudio;

        // handle audio errors
        recordingAudio.onerror = (e) => {
          console.error('Audio element error:', e);
          if (isRecordingRef.current[activeStation.id]) {
            stopRecordingGracefully(activeStation.id);
          }
        };

        // audio must be playing to capture stream
        await recordingAudio.play();

        // need to capture stream
        const stream = recordingAudio.captureStream ? recordingAudio.captureStream() : recordingAudio.mozCaptureStream();

        if (!stream) {
          alert('Stream capture not supported in this browser.');
          return;
        }

        // check if stream has tracks
        const tracks = stream.getTracks();
        if (tracks.length === 0) {
          alert('No audio tracks available. Please make sure the audio is playing.');
          return;
        }

        // monitor stream for end events
        const handleTrackEnd = () => {
          console.log('Stream track ended during recording');
          if (isRecordingRef.current[activeStation.id]) {
            stopRecordingGracefully(activeStation.id);
          }
        };

        tracks.forEach((track) => {
          track.onended = handleTrackEnd;
        });

        // also monitor audio element for ended event
        recordingAudio.onended = () => {
          console.log('Audio element ended during recording');
          if (isRecordingRef.current[activeStation.id]) {
            stopRecordingGracefully(activeStation.id);
          }
        };

        // set ref to true so onstop handler knows to continue recording
        isRecordingRef.current[activeStation.id] = true;

        updateStationState(activeStation.id, {
          isRecording: true,
          status: 'Recording...'
        });

        // start the first recording chunk
        startRecordingChunk(activeStation.id, stream);
      } catch (e) {
        console.error('Recording failed:', e);
        updateStationState(activeStation.id, {
          status: 'Recording Error'
        });
      }
    }
  };

  const handleStationChange = (id) => {
    setStations(
      stations.map((s) => ({
        ...s,
        active: s.id === id
      }))
    );
    // just reset pagination on station change
    // don't reset recording/playing states - they continue in background
    setPage(0);
    setSelectedRows([]);
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
    setStationData((prev) => ({
      ...prev,
      [activeStation.id]: prev[activeStation.id].map((item) => (item.id === editingRow.id ? { ...item, ...editFormData } : item))
    }));

    handleEditClose();
  };

  const handleFormChange = (field, value) => {
    setEditFormData((prev) => ({
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
    setShareFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
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
        setShareFormData((prev) => ({
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
    setRegenerateFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegenerateSave = () => {
    if (!regeneratingRow || !activeStation) return;

    // Update the data in stationData
    setStationData((prev) => ({
      ...prev,
      [activeStation.id]: prev[activeStation.id].map((item) =>
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
      clipAudioRef.current
        .play()
        .then(() => {
          setPlayingClipId(row.id);
        })
        .catch((err) => {
          console.error('Clip playback failed:', err);
          alert('Failed to play clip. Please check the audio URL.');
        });
    }
  };

  const handleClipEnded = () => {
    setPlayingClipId(null);
  };

  // Available segment categories
  const segmentCategories = ['Community', 'Traffic', 'Interview', 'Music', 'News', 'Entertainment', 'Sports', 'Weather'];

  // Add FM Station Modal Handlers
  const handleAddStationClick = () => {
    setAddStationModalOpen(true);
  };

  const handleAddStationClose = () => {
    setAddStationModalOpen(false);
    setAddStationFormData({
      logo: null,
      logoPreview: null,
      stationName: '',
      apiConfig: '',
      schedules: [],
      segmentDuration: 60
    });
  };

  const handleAddStationFormChange = (field, value) => {
    setAddStationFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLogoDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveLogo(true);
    } else if (e.type === 'dragleave') {
      setDragActiveLogo(false);
    }
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveLogo(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleLogoFile(e.target.files[0]);
    }
  };

  const handleLogoFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddStationFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddScheduleRow = () => {
    const newSchedule = {
      id: Date.now(),
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      programName: ''
    };
    setAddStationFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule]
    }));
  };

  const handleScheduleChange = (id, field, value) => {
    setAddStationFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule) => (schedule.id === id ? { ...schedule, [field]: value } : schedule))
    }));
  };

  const handleDeleteSchedule = (id) => {
    setAddStationFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((schedule) => schedule.id !== id)
    }));
  };

  const handleAddStationConfirm = () => {
    // Validate form data
    if (!addStationFormData.stationName) {
      alert('Please enter a station name');
      return;
    }
    if (!addStationFormData.apiConfig) {
      alert('Please enter API configuration');
      return;
    }
    if (addStationFormData.schedules.length === 0) {
      alert('Please add at least one program schedule');
      return;
    }

    // Create new station
    const newStation = {
      id: stations.length + 1,
      name: addStationFormData.stationName,
      active: false,
      url: addStationFormData.apiConfig,
      logo: addStationFormData.logoPreview,
      schedules: addStationFormData.schedules,
      segmentDuration: addStationFormData.segmentDuration ?? 60
    };

    setStations([...stations, newStation]);
    setStationData((prev) => ({
      ...prev,
      [newStation.id]: []
    }));

    console.log('New station added:', newStation);
    alert('FM Station added successfully!');
    handleAddStationClose();
  };

  // Edit FM Station Modal Handlers
  const handleEditStationClick = () => {
    if (!activeStation) {
      alert('Please select a station to edit');
      return;
    }

    // Populate form with current station data
    setEditStationFormData({
      logo: null,
      logoPreview: activeStation.logo || stationLogos[activeStation.id] || null,
      stationName: activeStation.name || '',
      apiConfig: activeStation.url || '',
      schedules: activeStation.schedules || [],
      segmentDuration: activeStation.segmentDuration ?? 60
    });
    setEditStationModalOpen(true);
  };

  const handleEditStationClose = () => {
    setEditStationModalOpen(false);
    setEditStationFormData({
      logo: null,
      logoPreview: null,
      stationName: '',
      apiConfig: '',
      schedules: [],
      segmentDuration: 60
    });
  };

  const handleEditStationFormChange = (field, value) => {
    setEditStationFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditLogoDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActiveEditLogo(true);
    } else if (e.type === 'dragleave') {
      setDragActiveEditLogo(false);
    }
  };

  const handleEditLogoDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActiveEditLogo(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleEditLogoFile(e.dataTransfer.files[0]);
    }
  };

  const handleEditLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleEditLogoFile(e.target.files[0]);
    }
  };

  const handleEditLogoFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditStationFormData((prev) => ({
          ...prev,
          logo: file,
          logoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEditScheduleRow = () => {
    const newSchedule = {
      id: Date.now(),
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      programName: ''
    };
    setEditStationFormData((prev) => ({
      ...prev,
      schedules: [...prev.schedules, newSchedule]
    }));
  };

  const handleEditScheduleChange = (id, field, value) => {
    setEditStationFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.map((schedule) => (schedule.id === id ? { ...schedule, [field]: value } : schedule))
    }));
  };

  const handleDeleteEditSchedule = (id) => {
    setEditStationFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((schedule) => schedule.id !== id)
    }));
  };

  const handleEditStationConfirm = () => {
    if (!activeStation) return;

    // Validate form data
    if (!editStationFormData.stationName) {
      alert('Please enter a station name');
      return;
    }
    if (!editStationFormData.apiConfig) {
      alert('Please enter API configuration');
      return;
    }

    // Update the station
    setStations(
      stations.map((station) =>
        station.id === activeStation.id
          ? {
              ...station,
              name: editStationFormData.stationName,
              url: editStationFormData.apiConfig,
              logo: editStationFormData.logoPreview,
              schedules: editStationFormData.schedules,
              segmentDuration: editStationFormData.segmentDuration ?? 60
            }
          : station
      )
    );

    console.log('Station updated:', editStationFormData);
    handleEditStationClose();
  };

  // Time input formatter
  const formatTimeInput = (value) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');

    // Format as HH:MM
    if (digits.length <= 2) {
      return digits;
    } else if (digits.length <= 4) {
      return `${digits.slice(0, 2)}:${digits.slice(2)}`;
    }
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
  };

  const validateTime = (value) => {
    if (!value) return true;
    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return false;
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
  };

  // DataGrid columns for Edit Station schedules
  const editScheduleColumns = [
    {
      field: 'dayOfWeek',
      headerName: 'Day of Week',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          select
          value={params.value || ''}
          onChange={(e) => {
            handleEditScheduleChange(params.row.id, 'dayOfWeek', e.target.value);
          }}
          fullWidth
          size="small"
          variant="standard"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>
      )
    },
    {
      field: 'startTime',
      headerName: 'Start Time (HH:MM)',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            const formatted = formatTimeInput(e.target.value);
            handleEditScheduleChange(params.row.id, 'startTime', formatted);
          }}
          placeholder="00:00"
          fullWidth
          size="small"
          variant="standard"
          inputProps={{
            maxLength: 5,
            pattern: '[0-9:]*'
          }}
          error={params.value && !validateTime(params.value)}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'endTime',
      headerName: 'End Time (HH:MM)',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            const formatted = formatTimeInput(e.target.value);
            handleEditScheduleChange(params.row.id, 'endTime', formatted);
          }}
          placeholder="23:59"
          fullWidth
          size="small"
          variant="standard"
          inputProps={{
            maxLength: 5,
            pattern: '[0-9:]*'
          }}
          error={params.value && !validateTime(params.value)}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'programName',
      headerName: 'Program Name',
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            handleEditScheduleChange(params.row.id, 'programName', e.target.value);
          }}
          placeholder="Enter program name"
          fullWidth
          size="small"
          variant="standard"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="error" size="small" onClick={() => handleDeleteEditSchedule(params.row.id)}>
          <Delete />
        </IconButton>
      )
    }
  ];

  // DataGrid columns for schedules
  const scheduleColumns = [
    {
      field: 'dayOfWeek',
      headerName: 'Day of Week',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          select
          value={params.value || ''}
          onChange={(e) => {
            handleScheduleChange(params.row.id, 'dayOfWeek', e.target.value);
          }}
          fullWidth
          size="small"
          variant="standard"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>
      )
    },
    {
      field: 'startTime',
      headerName: 'Start Time (HH:MM)',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            const formatted = formatTimeInput(e.target.value);
            handleScheduleChange(params.row.id, 'startTime', formatted);
          }}
          placeholder="00:00"
          fullWidth
          size="small"
          variant="standard"
          inputProps={{
            maxLength: 5,
            pattern: '[0-9:]*'
          }}
          error={params.value && !validateTime(params.value)}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'endTime',
      headerName: 'End Time (HH:MM)',
      width: 180,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            const formatted = formatTimeInput(e.target.value);
            handleScheduleChange(params.row.id, 'endTime', formatted);
          }}
          placeholder="23:59"
          fullWidth
          size="small"
          variant="standard"
          inputProps={{
            maxLength: 5,
            pattern: '[0-9:]*'
          }}
          error={params.value && !validateTime(params.value)}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'programName',
      headerName: 'Program Name',
      width: 220,
      sortable: false,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => {
            handleScheduleChange(params.row.id, 'programName', e.target.value);
          }}
          placeholder="Enter program name"
          fullWidth
          size="small"
          variant="standard"
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.875rem'
            }
          }}
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton color="error" size="small" onClick={() => handleDeleteSchedule(params.row.id)}>
          <Delete />
        </IconButton>
      )
    }
  ];

  return (
    <Stack spacing={0}>
      {/* Hidden Audio Element for Clips */}
      <audio ref={clipAudioRef} onEnded={handleClipEnded} />

      {/* 1. FM Radio Station Section */}
      <Box>
        <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1 }}>
          {stations.map((station) => {
            const stationLogo = station.logo || stationLogos[station.id] || kiss92Logo;

            return (
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
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
                  <Box
                    component="img"
                    src={stationLogo}
                    alt={station.name || 'Radio Station'}
                    sx={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                      flexShrink: 0
                    }}
                  />
                  <Typography variant="h6" color={station.active ? 'primary.main' : 'text.primary'}>
                    {station.name || 'Empty Slot'}
                  </Typography>
                </Stack>
              </Card>
            );
          })}

          {/* Add Button */}
          <Card
            elevation={0}
            onClick={handleAddStationClick}
            component="button"
            role="button"
            aria-label="Add FM Station"
            tabIndex={0}
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
                    justifyContent: 'center'
                    // border: '1px solid',
                    // borderColor: 'divider'
                  }}
                >
                  <img
                    src={stationLogos[activeStation?.id] || kiss92Logo}
                    alt={activeStation?.name || 'Radio Station'}
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
                        startIcon={currentState.isPlaying ? <Pause /> : <PlayArrow />}
                        onClick={handlePlay}
                        sx={{ minWidth: 120, py: 1.5 }}
                      >
                        {currentState.isPlaying ? 'Pause' : 'Play'}
                      </Button>
                      <Button
                        variant="contained"
                        size="large"
                        color={currentState.isRecording ? 'error' : 'success'}
                        startIcon={
                          currentState.isProcessing ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : currentState.isRecording ? (
                            <Stop />
                          ) : (
                            <FiberManualRecord />
                          )
                        }
                        onClick={handleRecord}
                        disabled={currentState.isProcessing}
                        sx={{ minWidth: 160, py: 1.5 }}
                      >
                        {currentState.isRecording ? 'Stop Recording' : 'Start Recording'}
                      </Button>
                    </Stack>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Edit />}
                      onClick={handleEditStationClick}
                      sx={{ minWidth: 120, py: 1.5 }}
                    >
                      Edit
                    </Button>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2" color="text.secondary">
                      Status: <strong>{currentState.status}</strong>
                    </Typography>
                    {currentState.downloadUrl && (
                      <Button
                        component="a"
                        href={currentState.downloadUrl}
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
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1} sx={{ mb: 2 }}>
              <Typography variant="h4">{activeStation?.name} - Recorded Segments</Typography>
              <Stack direction="row" spacing={1}>
                {selectedRows.length > 0 && (
                  <Button variant="contained" color="primary" startIcon={<Share />} onClick={handleQuickShareClick}>
                    Quick Share
                  </Button>
                )}
                <Button variant="outlined" startIcon={<MoreHoriz />}>
                  Action
                </Button>
                <Button variant="outlined" startIcon={<Sort />}>
                  Sort
                </Button>
                <Button variant="outlined" startIcon={<FilterList />}>
                  Filter
                </Button>
              </Stack>
            </Stack>

            {/* Table */}
            <TableContainer component={Paper} variant="outlined">
              <Table sx={{ minWidth: 650 }} aria-label="community manager table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox indeterminate={isSomeSelected} checked={isAllSelected} onChange={handleSelectAll} />
                    </TableCell>
                    <TableCell>DateTime (From)</TableCell>
                    <TableCell>DateTime (To)</TableCell>
                    <TableCell align="center">Clip</TableCell>
                    <TableCell>Transcription</TableCell>
                    <TableCell>Segment Category</TableCell>
                    <TableCell>Post</TableCell>
                    <TableCell>Shared</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.from}</TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.to}</TableCell>
                      <TableCell align="center">
                        {row.isRecording ? (
                          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                            <FiberManualRecord
                              sx={{
                                color: 'error.main',
                                fontSize: 16,
                                animation: 'pulse 1.5s ease-in-out infinite',
                                '@keyframes pulse': {
                                  '0%': { opacity: 1 },
                                  '50%': { opacity: 0.4 },
                                  '100%': { opacity: 1 }
                                }
                              }}
                            />
                            <Typography variant="caption" color="error">
                              Recording...
                            </Typography>
                          </Stack>
                        ) : (
                          <IconButton
                            color={playingClipId === row.id ? 'error' : 'primary'}
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
                        )}
                      </TableCell>
                      <TableCell sx={{ minWidth: 200, maxWidth: 400 }}>
                        {row.isLoading ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={16} />
                            <Typography variant="body2" color="text.secondary">
                              Transcribing...
                            </Typography>
                          </Stack>
                        ) : (
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {row.srt}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.isLoading ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={16} />
                            <Typography variant="body2" color="text.secondary">
                              Categorizing...
                            </Typography>
                          </Stack>
                        ) : (
                          <Chip label={row.segmentCategory} size="small" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell sx={{ minWidth: 200, maxWidth: 400 }}>
                        {row.isLoading ? (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CircularProgress size={16} />
                            <Typography variant="body2" color="text.secondary">
                              Generating response...
                            </Typography>
                          </Stack>
                        ) : (
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {row.agentResponse}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.shared ? (
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            sx={{
                              rowGap: 0.5,
                              columnGap: 0.5,
                              alignItems: 'flex-start'
                            }}
                          >
                            {(row.sharedPlatforms ?? []).map((platform) => {
                              const meta = sharedPlatformMeta[platform] ?? {
                                label: platform,
                                Icon: null
                              };
                              const IconComponent = meta.Icon;

                              return (
                                <Chip
                                  key={platform}
                                  label={meta.label}
                                  size="small"
                                  color="success"
                                  variant="outlined"
                                  icon={IconComponent ? <IconComponent sx={{ fontSize: 16 }} /> : undefined}
                                  sx={{
                                    height: 24
                                  }}
                                />
                              );
                            })}
                          </Stack>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Not shared
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={1} justifyContent="center">
                          <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<Share />}
                            onClick={() => handleShareClick(row)}
                            disabled={row.isLoading}
                            sx={{ minWidth: 'auto', px: 1 }}
                          >
                            Share
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="warning"
                            startIcon={<Edit />}
                            onClick={() => handleEditClick(row)}
                            disabled={row.isLoading}
                            sx={{ minWidth: 'auto', px: 1, whiteSpace: 'nowrap' }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<AutoFixHigh />}
                            onClick={() => handleRegenerateClick(row)}
                            disabled={row.isLoading}
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
                            disabled={row.isLoading}
                            sx={{ minWidth: 'auto', px: 1 }}
                          >
                            Delete
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
      <Dialog open={editModalOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
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
                shrink: true
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
                shrink: true
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

            {/* Transcription */}
            <TextField
              label="Transcription"
              value={editFormData.srt}
              onChange={(e) => handleFormChange('srt', e.target.value)}
              multiline
              rows={4}
              fullWidth
              placeholder="Enter the transcript or transcription content..."
            />

            {/* Post */}
            <TextField
              label="Post"
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
      <Dialog open={shareModalOpen} onClose={handleShareClose} maxWidth="md" fullWidth>
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
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
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

            {/* Section 3: Post */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Post
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
      <Dialog open={regenerateModalOpen} onClose={handleRegenerateClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Regenerate Content</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={3} sx={{ mt: 1 }}>
            {/* Section 1: Transcription */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Transcription
              </Typography>
              <TextField
                value={regenerateFormData.srt}
                onChange={(e) => handleRegenerateFormChange('srt', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder="Enter the transcript or transcription content..."
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

            {/* Section 3: Post */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Post
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
          <Button onClick={handleRegenerateSave} variant="contained" color="success" startIcon={<Save />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add FM Station Modal */}
      <Dialog open={addStationModalOpen} onClose={handleAddStationClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Add FM Station</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={4} sx={{ mt: 1 }}>
            {/* Section 1: Logo Upload */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Station Logo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload a web-optimized logo (recommended: WebP, PNG, or JPG format)
              </Typography>
              <Box
                onDragEnter={handleLogoDrag}
                onDragLeave={handleLogoDrag}
                onDragOver={handleLogoDrag}
                onDrop={handleLogoDrop}
                onClick={() => logoInputRef.current?.click()}
                sx={{
                  border: '2px dashed',
                  borderColor: dragActiveLogo ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: dragActiveLogo ? 'action.hover' : 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {addStationFormData.logoPreview ? (
                  <Box>
                    <img
                      src={addStationFormData.logoPreview}
                      alt="Station logo preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        objectFit: 'contain'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Click or drag to replace logo
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2} alignItems="center">
                    <CloudUpload sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.primary">
                      Drag and drop a logo here, or click to select
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports: WebP, JPG, PNG, GIF (Web-optimized formats recommended)
                    </Typography>
                  </Stack>
                )}
                <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoChange} style={{ display: 'none' }} />
              </Box>
            </Box>

            {/* Station Name */}
            <Box>
              <TextField
                label="Station Name"
                value={addStationFormData.stationName}
                onChange={(e) => handleAddStationFormChange('stationName', e.target.value)}
                fullWidth
                placeholder="e.g., Kiss 92, 98.3 FM"
                required
              />
            </Box>

            {/* Section 2: Hosting Server Network API */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Hosting Server Network API
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the API endpoint or streaming URL for this station
              </Typography>
              <TextField
                value={addStationFormData.apiConfig}
                onChange={(e) => handleAddStationFormChange('apiConfig', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder='e.g., https://stream.example.com/station.aac&#10;or&#10;{&#10;  "url": "https://api.example.com/stream",&#10;  "apiKey": "your-api-key"&#10;}'
                required
              />
            </Box>

            {/* Section 2.5: Segment Duration */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Segment Recording Duration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set how long each recording segment should be (in seconds)
              </Typography>
              <TextField
                key={`add-duration-${addStationModalOpen}`}
                type="number"
                label="Duration (seconds)"
                defaultValue={addStationFormData.segmentDuration ?? 60}
                onChange={(e) => {
                  const val = e.target.value;
                  handleAddStationFormChange('segmentDuration', val === '' ? '' : Number.parseInt(val, 10));
                }}
                fullWidth
                inputProps={{
                  min: 1,
                  step: 1
                }}
                helperText="Default: 60 seconds (1 minute)"
              />
            </Box>

            {/* Section 3: Programme Time Slot */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6">Programme Time Slot</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add schedules for automatic recording sessions
                  </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddScheduleRow} size="small">
                  Add Schedule
                </Button>
              </Stack>

              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={addStationFormData.schedules}
                  columns={scheduleColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  disableColumnMenu
                  sx={{
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      py: 1
                    },
                    '& .MuiDataGrid-row': {
                      minHeight: '60px !important',
                      maxHeight: '60px !important'
                    }
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        {/* Section 4: Confirmation */}
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleAddStationClose} variant="outlined" color="secondary" size="large">
            Cancel
          </Button>
          <Button onClick={handleAddStationConfirm} variant="contained" color="primary" size="large" startIcon={<Add />}>
            Confirm & Add Station
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit FM Station Modal */}
      <Dialog open={editStationModalOpen} onClose={handleEditStationClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h5">Edit FM Station</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={4} sx={{ mt: 1 }}>
            {/* Section 1: Logo Upload */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Station Logo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Upload a web-optimized logo (recommended: WebP, PNG, or JPG format)
              </Typography>
              <Box
                onDragEnter={handleEditLogoDrag}
                onDragLeave={handleEditLogoDrag}
                onDragOver={handleEditLogoDrag}
                onDrop={handleEditLogoDrop}
                onClick={() => editLogoInputRef.current?.click()}
                sx={{
                  border: '2px dashed',
                  borderColor: dragActiveEditLogo ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: dragActiveEditLogo ? 'action.hover' : 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {editStationFormData.logoPreview ? (
                  <Box>
                    <img
                      src={editStationFormData.logoPreview}
                      alt="Station logo preview"
                      style={{
                        maxWidth: '100%',
                        maxHeight: '200px',
                        borderRadius: '8px',
                        objectFit: 'contain'
                      }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Click or drag to replace logo
                    </Typography>
                  </Box>
                ) : (
                  <Stack spacing={2} alignItems="center">
                    <CloudUpload sx={{ fontSize: 48, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.primary">
                      Drag and drop a logo here, or click to select
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Supports: WebP, JPG, PNG, GIF (Web-optimized formats recommended)
                    </Typography>
                  </Stack>
                )}
                <input ref={editLogoInputRef} type="file" accept="image/*" onChange={handleEditLogoChange} style={{ display: 'none' }} />
              </Box>
            </Box>

            {/* Station Name */}
            <Box>
              <TextField
                label="Station Name"
                value={editStationFormData.stationName}
                onChange={(e) => handleEditStationFormChange('stationName', e.target.value)}
                fullWidth
                placeholder="e.g., Kiss 92, 98.3 FM"
                required
              />
            </Box>

            {/* Section 2: Hosting Server Network API */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Hosting Server Network API
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Enter the API endpoint or streaming URL for this station
              </Typography>
              <TextField
                value={editStationFormData.apiConfig}
                onChange={(e) => handleEditStationFormChange('apiConfig', e.target.value)}
                multiline
                rows={4}
                fullWidth
                placeholder='e.g., https://stream.example.com/station.aac&#10;or&#10;{&#10;  "url": "https://api.example.com/stream",&#10;  "apiKey": "your-api-key"&#10;}'
                required
              />
            </Box>

            {/* Section 2.5: Segment Duration */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Segment Recording Duration
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Set how long each recording segment should be (in seconds)
              </Typography>
              <TextField
                key={`edit-duration-${editStationModalOpen}-${activeStation?.id}`}
                type="number"
                label="Duration (seconds)"
                defaultValue={editStationFormData.segmentDuration ?? 60}
                onChange={(e) => {
                  const val = e.target.value;
                  handleEditStationFormChange('segmentDuration', val === '' ? '' : Number.parseInt(val, 10));
                }}
                fullWidth
                inputProps={{
                  min: 1,
                  step: 1
                }}
                helperText="Default: 60 seconds (1 minute)"
              />
            </Box>

            {/* Section 3: Programme Time Slot */}
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Box>
                  <Typography variant="h6">Programme Time Slot</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Add schedules for automatic recording sessions
                  </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddEditScheduleRow} size="small">
                  Add Schedule
                </Button>
              </Stack>

              <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={editStationFormData.schedules}
                  columns={editScheduleColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { pageSize: 5 }
                    }
                  }}
                  pageSizeOptions={[5, 10, 20]}
                  disableRowSelectionOnClick
                  disableColumnMenu
                  sx={{
                    '& .MuiDataGrid-cell': {
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      py: 1
                    },
                    '& .MuiDataGrid-row': {
                      minHeight: '60px !important',
                      maxHeight: '60px !important'
                    }
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </DialogContent>

        {/* Section 4: Confirmation */}
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleEditStationClose} variant="outlined" color="secondary" size="large">
            Cancel
          </Button>
          <Button onClick={handleEditStationConfirm} variant="contained" color="primary" size="large" startIcon={<Save />}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Share Popover */}
      <Popover
        open={Boolean(quickShareAnchor)}
        anchorEl={quickShareAnchor}
        onClose={handleQuickShareClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <Box sx={{ p: 3, minWidth: 320 }}>
          <Typography variant="h6" gutterBottom>
            Share to Platforms
          </Typography>
          <Stack spacing={2} sx={{ mt: 2 }}>
            {/* WhatsApp */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox checked={selectedPlatforms.whatsapp} onChange={() => handlePlatformToggle('whatsapp')} size="small" />
              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                disabled
                sx={{
                  bgcolor: '#25D366',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    bgcolor: '#20BA5A'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#25D366',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
              >
                WhatsApp
              </Button>
            </Stack>

            {/* Telegram */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox checked={selectedPlatforms.telegram} onChange={() => handlePlatformToggle('telegram')} size="small" />
              <Button
                variant="contained"
                startIcon={<Telegram />}
                disabled
                sx={{
                  bgcolor: '#0088cc',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    bgcolor: '#006699'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#0088cc',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
              >
                Telegram
              </Button>
            </Stack>

            {/* WeChat */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox checked={selectedPlatforms.wechat} onChange={() => handlePlatformToggle('wechat')} size="small" />
              <Button
                variant="contained"
                startIcon={
                  <Box component="span" sx={{ fontSize: '1.5rem' }}>
                    💬
                  </Box>
                }
                disabled
                sx={{
                  bgcolor: '#09B83E',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    bgcolor: '#078C31'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#09B83E',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
              >
                WeChat
              </Button>
            </Stack>

            {/* Facebook */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox checked={selectedPlatforms.facebook} onChange={() => handlePlatformToggle('facebook')} size="small" />
              <Button
                variant="contained"
                startIcon={<Facebook />}
                disabled
                sx={{
                  bgcolor: '#1877F2',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    bgcolor: '#145DBF'
                  },
                  '&.Mui-disabled': {
                    bgcolor: '#1877F2',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
              >
                Facebook
              </Button>
            </Stack>

            {/* Instagram */}
            <Stack direction="row" alignItems="center" spacing={2}>
              <Checkbox checked={selectedPlatforms.instagram} onChange={() => handlePlatformToggle('instagram')} size="small" />
              <Button
                variant="contained"
                startIcon={<Instagram />}
                disabled
                sx={{
                  background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
                  color: 'white',
                  flex: 1,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #E07020, #C91F6C, #6F2B9A, #4449BE)'
                  },
                  '&.Mui-disabled': {
                    background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)',
                    color: 'white',
                    opacity: 0.7
                  }
                }}
              >
                Instagram
              </Button>
            </Stack>

            <Divider sx={{ my: 1 }} />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={isSharing ? <CircularProgress size={16} color="inherit" /> : <Share />}
              onClick={handleQuickShare}
              disabled={isSharing}
            >
              {isSharing ? 'Sharing...' : 'Share'}
            </Button>
          </Stack>
        </Box>
      </Popover>

      {/* Success Toast */}
      <Snackbar
        open={shareToastOpen}
        autoHideDuration={3000}
        onClose={handleToastClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
          Successfully shared to selected platforms!
        </Alert>
      </Snackbar>
    </Stack>
  );
}
