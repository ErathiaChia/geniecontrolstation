import { useQuery } from '@tanstack/react-query';

const API_BASE_URL = 'https://dev-genie.001.gs/smart-api';

const fetchNewsFactCheck = async ({ title, description }) => {
  const requestBody = { title, description };

  console.log('Fetching news fact check:', {
    url: `${API_BASE_URL}/news_fact_check`,
    body: requestBody
  });

  const response = await fetch(`${API_BASE_URL}/news_fact_check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('API request failed:', {
      status: response.status,
      statusText: response.statusText,
      error: errorText
    });
    throw new Error(`API request failed with status ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  console.log('News fact check response:', data);
  return data;
};

export const useNewsFactCheck = (title, description) => {
  const isEnabled = !!title && !!description;

  console.log('useNewsFactCheck hook called:', {
    title,
    description,
    isEnabled,
    hasTitle: !!title,
    hasDescription: !!description
  });

  return useQuery({
    queryKey: ['news-fact-check', title, description],
    queryFn: () => fetchNewsFactCheck({ title, description }),
    enabled: isEnabled,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
};

