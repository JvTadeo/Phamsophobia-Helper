export interface HealthStatus {
  status: 'OK' | 'ERROR';
  timestamp: string;
  version: string;
  uptime: number;
}
