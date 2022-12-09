import { Camera } from "./camera";

export interface Capture {
  url: string;
  file: string;
  date: number;
  time: Date;
  localTime: Date;
  camera: Camera;
  size: number;
}
