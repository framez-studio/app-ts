import { IStructure } from "./structure.interface";

export interface IFrameSystem extends IStructure{
    levels: number[]
    numberLevels: number
    spans: number[]
    numberSpans: number
    levelNodeMass(level: number): number
    

}