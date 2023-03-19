import { IFrameSystem } from "./frame-system.interface";

 
export interface IFHE {

    _fundPeriod(
      method: 1 | 2 | 3,
      n?: number,
      h?: number
    ): number;
    _Cu(av: number, fv: number): number;
    fundamentalPeriod(
      method: 1 | 2 | 3,
      av: number,
      fv: number,
      n: number,
      h: number
    ): number;
    _CvxKoeficent(fundamentalPeriod: number): number;
    _Cvxi(
      mi: number,
      hi: number,
      k: number,
      mihik: number
    ): number;
    _CvxMihik(
      k: number,
      masses: number[],
      h: number[]
    ): number;
    vs(sa: number, g: number, t: number): number;
    force(cvx: number, vs: number): number;
  
    setFHEinNodes(
      frame: IFrameSystem,
      directionX: 1 | -1,
      methodPeriod?: 1 | 2 | 3,
      av?: number,
      fv?: number
    ): void;
  }
  