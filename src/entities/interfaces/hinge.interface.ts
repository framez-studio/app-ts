export interface IHinge {
    maxMoment: number;
    maxCurv: number;
    minMoment: number;
    minCurve: number;
    type: "Moment-P" | "Moment" | 'Custom';
    isCollapsed: boolean;
    positiveCollapsed: boolean;
    negativeCollapsed: boolean;
    moment: number;
    setMoment(moment: number): void;
    resetHinge():void
    setPositiveCollapse(value: boolean): void
    setNegativeCollapse(value: boolean): void
    setCollapse(value: boolean): void
    copy(): IHinge
}