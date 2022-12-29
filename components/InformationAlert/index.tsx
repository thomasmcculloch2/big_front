import React from 'react'

import { IInformationAlertProps } from '../../interfaces'

function InformationAlert ({ children }: IInformationAlertProps): JSX.Element {
  return (
    <div className='border-l-4 border-yellow-400 bg-yellow-50 p-4'>
      <div className='flex'>
        <div className='ml-3'>
          <p className='text-sm text-yellow-700'>{children}</p>
        </div>
      </div>
    </div>
  )
}

export default InformationAlert
