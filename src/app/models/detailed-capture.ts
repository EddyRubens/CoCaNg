import { CameraParameters } from "./camera-parameters";
import { Capture } from "./capture";

export interface DetailedCapture extends Capture {
  version: string;
  usedCameraParameters: CameraParameters;
  logLines: string[];
}
