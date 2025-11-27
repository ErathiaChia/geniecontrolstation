import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// query keys
export const communityManagerKeys = {
  all: ['community-manager'],
  stations: () => [...communityManagerKeys.all, 'stations'],
  station: (id) => [...communityManagerKeys.all, 'station', id],
  segments: (stationId) => [...communityManagerKeys.all, 'segments', stationId]
};

// example API functions (replace with actual API calls)
const fetchStations = async () => {
  // TODO: replace with actual API call
  // const response = await fetch('/api/stations');
  // return response.json();

  return [
    { id: 1, name: 'Kiss 92', active: true, url: 'https://22283.live.streamtheworld.com/ONE_FM_913AAC.aac' },
    { id: 2, name: '98.3 FM', active: false, url: '' },
    { id: 3, name: '91.3 FM', active: false, url: '' }
  ];
};

const fetchSegments = async (stationId) => {
  // TODO: replace with actual API call
  // const response = await fetch(`/api/stations/${stationId}/segments`);
  // return response.json();

  return [];
};

const createSegment = async ({ stationId, segment }) => {
  // TODO: replace with actual API call
  // const response = await fetch(`/api/stations/${stationId}/segments`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(segment)
  // });
  // return response.json();

  return { ...segment, id: Date.now() };
};

const updateSegment = async ({ stationId, segmentId, segment }) => {
  // TODO: replace with actual API call
  // const response = await fetch(`/api/stations/${stationId}/segments/${segmentId}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(segment)
  // });
  // return response.json();

  return { ...segment, id: segmentId };
};

const deleteSegment = async ({ stationId, segmentId }) => {
  // TODO: replace with actual API call
  // await fetch(`/api/stations/${stationId}/segments/${segmentId}`, {
  //   method: 'DELETE'
  // });

  return { success: true };
};

// hooks
export function useStations() {
  return useQuery({
    queryKey: communityManagerKeys.stations(),
    queryFn: fetchStations
  });
}

export function useSegments(stationId) {
  return useQuery({
    queryKey: communityManagerKeys.segments(stationId),
    queryFn: () => fetchSegments(stationId),
    enabled: !!stationId
  });
}

export function useCreateSegment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSegment,
    onSuccess: (data, variables) => {
      // invalidate and refetch segments for this station
      queryClient.invalidateQueries({
        queryKey: communityManagerKeys.segments(variables.stationId)
      });
    }
  });
}

export function useUpdateSegment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSegment,
    onSuccess: (data, variables) => {
      // invalidate and refetch segments for this station
      queryClient.invalidateQueries({
        queryKey: communityManagerKeys.segments(variables.stationId)
      });
    }
  });
}

export function useDeleteSegment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSegment,
    onSuccess: (data, variables) => {
      // invalidate and refetch segments for this station
      queryClient.invalidateQueries({
        queryKey: communityManagerKeys.segments(variables.stationId)
      });
    }
  });
}
