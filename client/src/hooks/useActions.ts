import { bindActionCreators } from '@reduxjs/toolkit'

import { useMemo } from 'react'

import { rootActions } from '@/store/root-actions'
import { useAppDispatch } from '@/store/store'

// связывает все экшены (rootActions) с dispatch,
// чтобы их можно было вызвать без передачи dispatch вручную
export const useActions = () => {
	const dispatch = useAppDispatch()

	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
