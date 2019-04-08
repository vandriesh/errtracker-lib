export interface ETError {
  message: string;
  source: string;
  line: number;
  col: number;
  error: object;
}
