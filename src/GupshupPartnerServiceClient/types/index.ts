/**
 * Configuration interface for GupshupPartnerServiceClient
 */
export interface GupshupPartnerServiceClientConfig {
  /** Enable debug logging for HTTP requests and responses */
  debug?: boolean;
}

/**
 * Response interface for partner token authentication
 */
export interface PartnerTokenResponse {
  /** The authentication token */
  token: string;
  /** Additional response data */
  [key: string]: any;
}
