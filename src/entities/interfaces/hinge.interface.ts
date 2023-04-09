export interface IHinge {
    maxMoment: number;
    maxCurv: number;
    minMoment: number;
    minCurve: number;
    type: "Moment-P" | "Moment" | 'Custom';
    isCollapsed: boolean;
    typeCollapsed: string | undefined;
    moment: number;
    setMoment(moment: number): void;
    resetHinge():void
}