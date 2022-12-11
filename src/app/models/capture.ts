import { Camera } from "./camera";

export interface Capture {
  url: string;
  file: string;
  date: string;
  time: string;
  localTime: Date;
  camera: Camera;
  size: number;
}
