import { create, all } from 'mathjs'

const config = {}
/**
 * Algebra object contains all the mathematic functions needed to manipulate Arrays as matrices.
 * TODO: find a way to optimize the config object to require only the Matrix Manipulation functions.
 */
export const algebra = create(all, config)
