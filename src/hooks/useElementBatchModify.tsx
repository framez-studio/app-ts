import { useState } from 'react'

export function useElementBatchModify() {
	const [batchType, setBatchType] = useState<'beam' | 'column'>('beam')

	return { batchType, setBatchType }
}
