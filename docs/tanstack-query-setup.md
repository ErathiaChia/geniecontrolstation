# TanStack Query Setup

## Installation

TanStack Query (React Query) has been installed and configured in the project.

```bash
npm install @tanstack/react-query @tanstack/react-query-devtools --legacy-peer-deps
```

## Configuration

### 1. QueryProvider Setup

The `QueryProvider` is configured in `src/providers/QueryProvider.jsx` and wraps the entire app in `src/App.jsx`.

**Default Configuration:**
- **staleTime**: 5 minutes - data is considered fresh for 5 minutes
- **gcTime**: 10 minutes - unused data is garbage collected after 10 minutes  
- **retry**: 1 - failed queries retry once
- **refetchOnWindowFocus**: false - queries don't refetch when window regains focus

### 2. File Structure

```
src/
├── providers/
│   └── QueryProvider.jsx          # QueryClient configuration
├── hooks/
│   └── queries/
│       ├── README.md              # Query hooks documentation
│       └── useCommunityManager.js # Example query hooks
└── App.jsx                        # QueryProvider wrapper
```

## Usage Examples

### Fetching Data with useQuery

```jsx
import { useSegments } from 'hooks/queries/useCommunityManager';

function CommunityManager() {
  const { data: segments, isLoading, error } = useSegments(stationId);
  
  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  
  return (
    <div>
      {segments.map(segment => (
        <div key={segment.id}>{segment.srt}</div>
      ))}
    </div>
  );
}
```

### Creating Data with useMutation

```jsx
import { useCreateSegment } from 'hooks/queries/useCommunityManager';

function RecordingControls() {
  const createSegment = useCreateSegment();
  
  const handleSaveRecording = async (recordingData) => {
    createSegment.mutate(
      { 
        stationId: activeStation.id, 
        segment: recordingData 
      },
      {
        onSuccess: () => {
          alert('Recording saved successfully!');
        },
        onError: (error) => {
          alert('Failed to save recording: ' + error.message);
        }
      }
    );
  };
  
  return (
    <Button 
      onClick={handleSaveRecording}
      disabled={createSegment.isPending}
    >
      {createSegment.isPending ? 'Saving...' : 'Save Recording'}
    </Button>
  );
}
```

### Updating Data

```jsx
import { useUpdateSegment } from 'hooks/queries/useCommunityManager';

function EditSegmentModal({ segment, stationId }) {
  const updateSegment = useUpdateSegment();
  
  const handleSave = (updatedData) => {
    updateSegment.mutate(
      {
        stationId,
        segmentId: segment.id,
        segment: updatedData
      },
      {
        onSuccess: () => {
          handleClose();
        }
      }
    );
  };
  
  return (
    <Dialog open={open}>
      {/* form fields */}
      <Button onClick={handleSave}>
        {updateSegment.isPending ? 'Saving...' : 'Save'}
      </Button>
    </Dialog>
  );
}
```

### Deleting Data

```jsx
import { useDeleteSegment } from 'hooks/queries/useCommunityManager';

function SegmentRow({ segment, stationId }) {
  const deleteSegment = useDeleteSegment();
  
  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteSegment.mutate({ stationId, segmentId: segment.id });
    }
  };
  
  return (
    <TableRow>
      <TableCell>{segment.srt}</TableCell>
      <TableCell>
        <IconButton 
          onClick={handleDelete}
          disabled={deleteSegment.isPending}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
```

## DevTools

React Query DevTools are enabled in development mode. Look for the floating icon in the bottom-right corner of the screen to open the DevTools panel.

The DevTools allow you to:
- Inspect all queries and their states
- View cached data
- Manually refetch queries
- Clear cache
- Monitor query performance

## Next Steps

1. **Replace mock API functions** in `src/hooks/queries/useCommunityManager.js` with actual API calls
2. **Create additional query hooks** for other features (e.g., news verification, settings)
3. **Integrate queries** into existing components to replace local state management
4. **Configure error handling** globally or per-query
5. **Add optimistic updates** for better UX during mutations

## Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [Query Keys Guide](https://tanstack.com/query/latest/docs/react/guides/query-keys)
- [Mutations Guide](https://tanstack.com/query/latest/docs/react/guides/mutations)

