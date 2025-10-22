export * from './GupshupPartnerTokenApiClientConfig';

/**
 * Parameters for generating authentication links
 */
export interface GetAuthLinkParams {
  /** Whether to regenerate the link */
  regenerate: boolean;
  /** User identifier */
  user: string;
  /** Language code */
  lang: string;
}

/**
 * Response interface for app access token
 */
export interface AppAccessTokenResponse {
  /** The access token for the app */
  token: string;
  /** Additional response data */
  [key: string]: unknown;
}

/**
 * Response interface for partner apps
 */
export interface PartnerAppsResponse {
  /** Array of partner apps */
  apps: unknown[];
  /** Additional response data */
  [key: string]: unknown;
}

/**
 * Response interface for app creation
 */
export interface AppCreationResponse {
  /** The created app ID */
  appId: string;
  /** Additional response data */
  [key: string]: unknown;
}

/**
 * Response interface for auth link
 */
export interface AuthLinkResponse {
  /** The authentication link */
  link: string;
  /** Additional response data */
  [key: string]: unknown;
}
