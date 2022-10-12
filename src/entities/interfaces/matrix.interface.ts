export interface IMatrix<MType> {
    readonly content: MType
    readonly inverse: MType
    readonly transpose: MType
    readonly size: any
}
