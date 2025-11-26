# TanStack Query Hooks

This directory contains custom hooks for data fetching and mutations using TanStack Query (React Query).

## Setup

TanStack Query is configured in `src/providers/QueryProvider.jsx` with the following default options:

- **staleTime**: 5 minutes - data is considered fresh for 5 minutes
- **gcTime**: 10 minutes - unused data is garbage collected after 10 minutes
- **retry**: 1 - failed queries retry once
- **refetchOnWindowFocus**: false - queries don't refetch when window regains focus

## Usage

### Query Hooks

Query hooks are used to fetch data:

```jsx
import { useSegments } from 'hooks/queries/useCommunityManager';

function MyComponent() {
  const { data, isLoading, error } = useSegments(stationId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{data.map(segment => ...)}</div>;
}
```

### Mutation Hooks

Mutation hooks are used to create, update, or delete data:

```jsx
import { useCreateSegment } from 'hooks/queries/useCommunityManager';

function MyComponent() {
  const createSegment = useCreateSegment();
  
  const handleCreate = () => {
    createSegment.mutate(
      { stationId: 1, segment: { ... } },
      {
        onSuccess: () => {
          console.log('Segment created!');
        },
        onError: (error) => {
          console.error('Failed to create segment:', error);
        }
      }
    );
  };
  
  return (
    <button onClick={handleCreate} disabled={createSegment.isPending}>
      {createSegment.isPending ? 'Creating...' : 'Create Segment'}
    </button>
  );
}
```

## Query Keys

Query keys are organized using a hierarchical structure:

```javascript
communityManagerKeys = {
  all: ['community-manager'],
  stations: () => ['community-manager', 'stations'],
  station: (id) => ['community-manager', 'station', id],
  segments: (stationId) => ['community-manager', 'segments', stationId]
}
```

This allows for efficient cache invalidation and refetching.

## DevTools

React Query DevTools are available in development mode. Click the floating icon in the bottom-right corner to open the DevTools panel.

## Creating New Query Hooks

1. Create a new file in this directory (e.g., `useMyFeature.js`)
2. Define query keys
3. Define API functions
4. Export custom hooks using `useQuery` and `useMutation`

Example:

```javascript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const myFeatureKeys = {
  all: ['my-feature'],
  list: () => [...myFeatureKeys.all, 'list'],
  detail: (id) => [...myFeatureKeys.all, 'detail', id]
};

const fetchItems = async () => {
  const response = await fetch('/api/items');
  return response.json();
};

export function useItems() {
  return useQuery({
    queryKey: myFeatureKeys.list(),
    queryFn: fetchItems
  });
}
```

## Best Practices

1. **Organize query keys** - use a hierarchical structure for easy cache management
2. **Handle loading and error states** - always check `isLoading` and `error`
3. **Invalidate queries** - after mutations, invalidate related queries to refetch fresh data
4. **Use enabled option** - conditionally enable queries based on dependencies
5. **Optimize refetching** - configure `staleTime` and `gcTime` based on data freshness requirements

