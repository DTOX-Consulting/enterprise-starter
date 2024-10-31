/* eslint-disable promise/prefer-await-to-then, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-assignment -- SDK */
import { stringify } from 'safe-stable-stringify';

export type QueryParamsType = Record<string | number, unknown>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export type FullRequestParams = {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
} & Omit<RequestInit, 'body'>;

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export type ApiConfig<SecurityDataType = unknown> = {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | undefined> | RequestParams | undefined;
  customFetch?: typeof fetch;
};

export type HttpResponse<D, E = unknown> = {
  data: D;
  error: E;
} & Response;

export type CancelToken = symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl = 'https://{{baseurl}}';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = async (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: string | number | boolean) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : String(value))}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key] as string | number | boolean);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key] as string[] | undefined;
    return value ? value.map((val) => this.encodeQueryParam(key, val)).join('&') : '';
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery ?? {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: QueryParamsType | undefined) => unknown> =
    {
      [ContentType.Json]: (input: unknown) => {
        if (input !== null && (typeof input === 'object' || typeof input === 'string')) {
          return stringify(input);
        }
        return input;
      },
      [ContentType.Text]: (input: unknown) => {
        if (input !== null && typeof input !== 'string') {
          return stringify(input);
        }
        return input as string;
      },
      [ContentType.FormData]: (input: unknown) => {
        if (input === null || typeof input !== 'object') {
          return new FormData();
        }
        const formData = new FormData();
        Object.entries(input as Record<string, unknown>).forEach(([key, property]) => {
          if (property instanceof Blob) {
            formData.append(key, property);
          } else if (typeof property === 'object' && property !== null) {
            formData.append(key, stringify(property));
          } else {
            formData.append(key, String(property));
          }
        });
        return formData;
      },
      [ContentType.UrlEncoded]: (input: QueryParamsType | undefined) => this.toQueryString(input)
    };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...params2,
      headers: {
        ...this.baseApiParams.headers,
        ...params1.headers,
        ...params2?.headers
      }
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  private getSecureParams = async (secure: boolean): Promise<RequestParams> => {
    const secureParams =
      secure && this.securityWorker ? await this.securityWorker(this.securityData) : {};
    return secureParams ?? {};
  };

  private buildRequestUrl = (
    baseUrl: string | undefined,
    path: string,
    query?: QueryParamsType
  ): string => {
    const queryString = query ? this.toQueryString(query) : '';
    const queryPrefix = queryString ? '?' : '';
    return `${baseUrl ?? this.baseUrl}${path}${queryPrefix}${queryString}`;
  };

  private getRequestHeaders = (type?: ContentType, headers: HeadersInit = {}): HeadersInit => ({
    ...headers,
    ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
  });

  private async fetchAndProcessResponse<T, E>(
    url: string,
    options: RequestInit,
    format: string
  ): Promise<HttpResponse<T, E>> {
    const response = await this.customFetch(url, options);
    const res = response.clone() as HttpResponse<T, E>;
    res.data = null as unknown as T;
    res.error = null as unknown as E;

    try {
      const data = await (response[format as keyof Response] as () => Promise<unknown>)();
      if (response.ok) {
        res.data = data as T;
      } else {
        res.error = data as E;
      }
    } catch (err) {
      res.error = err as E;
    }

    return res;
  }

  public request = async <T = unknown, E = Error>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams = await this.getSecureParams(secure as boolean);
    const requestParams = this.mergeRequestParams(params, secureParams);
    const requestUrl = this.buildRequestUrl(baseUrl, path, query);

    const headers = this.getRequestHeaders(type, requestParams.headers);
    const payloadFormatter = this.contentFormatters[type ?? ContentType.Json];
    const requestBody = body ? (payloadFormatter(body as QueryParamsType) as BodyInit) : null;

    const response = await this.fetchAndProcessResponse<T, E>(
      requestUrl,
      {
        ...requestParams,
        headers,
        signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
        body: requestBody
      },
      format ?? requestParams.format ?? 'json'
    );

    if (cancelToken) {
      this.abortControllers.delete(cancelToken);
    }

    if (!response.data && response.error) {
      throw new Error(`Request failed with status ${String(response.error)}`); // Ensure error is a string
    }

    return response.data;
  };
}
/* eslint-enable promise/prefer-await-to-then, @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-assignment -- SDK */
