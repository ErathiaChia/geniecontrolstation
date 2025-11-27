import { useCallback, useEffect, useRef, useState } from 'react';

const API_BASE_URL = 'https://dev-genie.001.gs/smart-api';
const REQUEST_TIMEOUT_MS = 120000;
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 4000;

const fetchNewsFactCheck = async ({ title, description, controller }) => {
  const requestBody = { title, description };
  let didTimeout = false;

  console.log('Fetching news fact check:', {
    url: `${API_BASE_URL}/news_fact_check`,
    body: requestBody,
    timeoutMs: REQUEST_TIMEOUT_MS
  });

  const timeoutId = setTimeout(() => {
    didTimeout = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/news_fact_check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      const httpError = new Error(`API request failed with status ${response.status}: ${errorText}`);
      httpError.code = 'HTTP_ERROR';
      throw httpError;
    }

    const data = await response.json();

    if (data && typeof data === 'object' && Number(data.code) === 400) {
      console.warn('News fact check response indicates code 400, triggering retry:', data);
      const payloadError = new Error(data.message ?? 'API responded with code 400');
      payloadError.code = 'API_CODE_400';
      payloadError.payload = data;
      throw payloadError;
    }

    console.log('News fact check response:', data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      if (didTimeout) {
        const timeoutError = new Error(`Request timed out after ${REQUEST_TIMEOUT_MS / 1000} seconds`);
        timeoutError.code = 'TIMEOUT';
        throw timeoutError;
      }
      const abortError = new Error('Request aborted');
      abortError.code = 'ABORT';
      throw abortError;
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const useNewsFactCheck = (title, description) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const controllerRef = useRef(null);
  const retryTimeoutRef = useRef(null);
  const hasSuccessfulFetchRef = useRef(false);

  const clearActiveRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
      retryTimeoutRef.current = null;
    }
  }, []);

  const cancelInFlightRequest = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
  }, []);

  const resetState = useCallback(() => {
    setData(null);
    setIsLoading(false);
    setIsFetching(false);
    setIsError(false);
    setError(null);
    hasSuccessfulFetchRef.current = false;
  }, []);

  const executeFetch = useCallback(
    async ({ forceLoading = false } = {}) => {
      if (!title || !description) {
        resetState();
        return null;
      }

      clearActiveRetry();
      cancelInFlightRequest();

      const controller = new AbortController();
      controllerRef.current = controller;

      if (!hasSuccessfulFetchRef.current || forceLoading) {
        setIsLoading(true);
      } else {
        setIsFetching(true);
      }

      setIsError(false);
      setError(null);

      try {
        const result = await fetchNewsFactCheck({ title, description, controller });
        hasSuccessfulFetchRef.current = true;
        setData(result);
        return result;
      } catch (fetchError) {
        if (fetchError?.code === 'ABORT') {
          return null;
        }

        const normalizedError = fetchError instanceof Error ? fetchError : new Error('Failed to fetch fact check data');
        setIsError(true);
        setError(normalizedError);
        throw normalizedError;
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    },
    [title, description, cancelInFlightRequest, clearActiveRetry, resetState]
  );

  useEffect(() => {
    if (!title || !description) {
      resetState();
      return () => {
        clearActiveRetry();
        cancelInFlightRequest();
      };
    }

    setData(null);
    hasSuccessfulFetchRef.current = false;
    let isCancelled = false;

    const load = async (attempt = 0) => {
      try {
        await executeFetch();
      } catch (fetchError) {
        if (isCancelled || fetchError?.code === 'ABORT') {
          return;
        }

        const nextAttempt = attempt + 1;
        if (nextAttempt > MAX_RETRY_ATTEMPTS) {
          console.warn('Max retry attempts reached for news fact check');
          return;
        }

        retryTimeoutRef.current = setTimeout(() => {
          load(nextAttempt);
        }, RETRY_DELAY_MS);
      }
    };

    load();

    return () => {
      isCancelled = true;
      clearActiveRetry();
      cancelInFlightRequest();
    };
  }, [title, description, executeFetch, resetState, clearActiveRetry, cancelInFlightRequest]);

  const refetch = useCallback(async () => {
    if (!title || !description) {
      return null;
    }
    clearActiveRetry();
    return executeFetch({ forceLoading: true });
  }, [executeFetch, title, description]);

  console.log('useNewsFactCheck hook state:', {
    title,
    description,
    hasData: !!data,
    isLoading,
    isFetching,
    isError,
    errorMessage: error?.message
  });

  return { data, isLoading, isError, error, refetch, isFetching };
};

