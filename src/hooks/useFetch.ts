import { useEffect, useMemo, useState } from "react";

interface UFError {}

interface UseFetchResponse<T> {
  isFetching: boolean;
  errors?: UFError[];
  response?: T;
  doRequest: (request?: any) => void;
}

interface UF {
  <T>(url: string, options?: RequestInit): UseFetchResponse<T>;
}

interface HttpResponse<T> {
  data: T;
  status: number;
}

const useFetch: UF = <T>(
  url: string,
  options?: RequestInit
): UseFetchResponse<T> => {
  const isGET = !options?.method || options?.method === "GET";
  const [isFetching, setIsFetching] = useState<boolean>(isGET);
  const [response, setResponse] = useState<HttpResponse<T>>();
  const [errors, setErrors] = useState<UFError[]>();

  const doRequest = useMemo(
    () =>
      <R>(request?: R): void => {
        setIsFetching(true);
        http<T>(url, {
          ...options,
          body: request ? JSON.stringify(request) : undefined,
        })
          .then((data: HttpResponse<T>) => {
            setIsFetching(false);
            setResponse(data);
          })
          .catch((error: any) => {
            console.log("useFetch catch:", error);
            setIsFetching(false);
            setErrors([error.data]);
          });
      },
    [url, options]
  );

  useEffect(() => {
    if (isGET) {
      doRequest();
    }
  }, [doRequest, options]);

  return {
    isFetching,
    errors,
    doRequest,
    response: response?.data,
  };
};

async function http<T>(
  path: string,
  { headers, body, ...config }: RequestInit
) {
  const response = await fetch(path, {
    ...config,
    headers: {
      Accept: "application/json, text/plain",
      "Content-Type": "application/json;charset=UTF-8",
      ...headers,
    },
    body,
  });

  const data = (await response.json()) as T;
  if (response.ok) {
    return Promise.resolve({ data, status: response.status });
  }

  return Promise.reject({
    data,
    status: response.status,
  });
}

export default useFetch;
