import { ControlType } from './control-type.enum';

export interface Controllable {
  applyControl(control: ControlType);
  releaseControl(control: ControlType);
}
