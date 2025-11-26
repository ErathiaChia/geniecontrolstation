# Community Manager - TanStack Query Integration Example

This document shows how to integrate TanStack Query into the Community Manager component.

## Current State (Local State)

Currently, the component uses local state:

```jsx
const [stationData, setStationData] = useState({
  1: [],
  2: [...],
  3: [...]
});
```

## Migrated State (TanStack Query)

Here's how to migrate to TanStack Query:

### 1. Import the hooks

```jsx
import { useSegments, useCreateSegment, useUpdateSegment, useDeleteSegment } from 'hooks/queries/useCommunityManager';
```

### 2. Replace local state with query hooks

```jsx
export default function CommunityManager() {
  const activeStation = stations.find((s) => s.active);
  
  // fetch segments for active station
  const { 
    data: segments = [], 
    isLoading, 
    error 
  } = useSegments(activeStation?.id);
  
  // mutations
  const createSegment = useCreateSegment();
  const updateSegment = useUpdateSegment();
  const deleteSegment = useDeleteSegment();
  
  // ... rest of component
}
```

### 3. Handle loading and error states

```jsx
// in the table section
{isLoading && (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
    <CircularProgress />
  </Box>
)}

{error && (
  <Alert severity="error" sx={{ m: 2 }}>
    Failed to load segments: {error.message}
  </Alert>
)}

{!isLoading && !error && (
  <TableContainer component={Paper} variant="outlined">
    {/* existing table */}
  </TableContainer>
)}
```

### 4. Update the edit handler

```jsx
const handleEditSave = () => {
  if (!editingRow || !activeStation) return;

  updateSegment.mutate(
    {
      stationId: activeStation.id,
      segmentId: editingRow.id,
      segment: editFormData
    },
    {
      onSuccess: () => {
        handleEditClose();
      },
      onError: (error) => {
        alert('Failed to update segment: ' + error.message);
      }
    }
  );
};
```

### 5. Update the delete handler

```jsx
const handleDelete = (row) => {
  if (!activeStation) return;
  
  if (confirm('Are you sure you want to delete this segment?')) {
    deleteSegment.mutate(
      {
        stationId: activeStation.id,
        segmentId: row.id
      },
      {
        onSuccess: () => {
          // segment list will auto-refresh due to query invalidation
        },
        onError: (error) => {
          alert('Failed to delete segment: ' + error.message);
        }
      }
    );
  }
};
```

### 6. Save recordings as segments

```jsx
const handleRecord = () => {
  if (!activeStation) return;
  
  const state = getStationState(activeStation.id);
  
  if (state.isRecording) {
    // stop recording
    const recorder = recorderRefsMap.current[activeStation.id];
    if (recorder) {
      recorder.stop();
      updateStationState(activeStation.id, { 
        isRecording: false, 
        status: 'Stopping...' 
      });
    }
  } else {
    // start recording logic...
    
    recorder.onstop = async () => {
      const stationId = activeStation.id;
      updateStationState(stationId, { 
        status: 'Converting to MP3...', 
        isProcessing: true 
      });

      try {
        const webmBlob = new Blob(chunksRefsMap.current[stationId], { type: 'audio/webm' });
        const arrayBuffer = await webmBlob.arrayBuffer();
        
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioCtx();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const mp3Blob = audioBufferToMp3Blob(audioBuffer);
        const url = URL.createObjectURL(mp3Blob);
        
        // save the recording as a segment
        const now = new Date();
        const segment = {
          from: now.toISOString(),
          to: new Date(now.getTime() + 60000).toISOString(), // 1 minute later
          srt: '', // to be filled by transcription service
          segmentCategory: 'Recording',
          agentResponse: '',
          clipUrl: url
        };
        
        createSegment.mutate(
          { stationId, segment },
          {
            onSuccess: () => {
              updateStationState(stationId, { 
                downloadUrl: url, 
                status: 'Recording saved',
                isProcessing: false
              });
            },
            onError: (error) => {
              console.error('Failed to save recording:', error);
              updateStationState(stationId, { 
                status: 'Failed to save recording',
                isProcessing: false
              });
            }
          }
        );
      } catch (error) {
        console.error('Conversion failed:', error);
        updateStationState(stationId, { 
          status: 'Conversion Failed',
          isProcessing: false
        });
      }
    };
  }
};
```

## Benefits

1. **Automatic caching** - segments are cached and reused across component mounts
2. **Background refetching** - data stays fresh automatically
3. **Optimistic updates** - UI can update before server confirms
4. **Error handling** - centralized error handling with retry logic
5. **Loading states** - built-in loading states for better UX
6. **Automatic invalidation** - after mutations, related queries auto-refresh

## Migration Steps

1. Keep existing local state initially
2. Add query hooks alongside local state
3. Test query hooks work correctly
4. Gradually replace local state usage with query data
5. Remove local state once fully migrated
6. Connect to real API endpoints

