export interface ManagementState {
  loadingStatusGetAll: string;
  loadingStatusGetOne: string;
  loadingStatusUpdate: string;
  loadingStatusCreate: string;
  loadingStatusDelete: string;
  errorInfo: {
    message: string | undefined | null | [];
    error: string | undefined | null | [];
  };
}
