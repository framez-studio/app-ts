import { spectrumDesign } from '@/entities/classes'
import { describe, expect, it } from 'vitest'

describe('Spectrum design Class',()=>{
    let BgaSpectrum = new spectrumDesign(0.25,0.25,0.25,0.25,1)
    it(`Method 1`, () => {
		expect(1).toBeCloseTo(1)
	})
})