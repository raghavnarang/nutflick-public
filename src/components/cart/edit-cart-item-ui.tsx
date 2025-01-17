'use client'

import { type FC } from 'react'
import Plus from '../Icons/plus'
import Minus from '../Icons/minus'
import Button from '../button'
import cx from 'clsx'
import { useFormStatus } from 'react-dom'
import Trash from '../Icons/trash'

interface EditCartItemUIProps {
  className?: string
  bigButton?: boolean
  onMinusClick?: () => void
  onPlusClick?: () => void
  onRemoveClick?: () => void
  qty: number
}

const EditCartItemUI: FC<EditCartItemUIProps> = ({
  className,
  bigButton,
  onMinusClick,
  onPlusClick,
  onRemoveClick,
  qty,
}) => {
  const { pending } = useFormStatus()
  return (
    <div
      className={cx(
        'flex items-start',
        {
          'md:items-center justify-between': !bigButton,
          'flex-col': bigButton,
        },
        className,
      )}
    >
      <div
        className={cx('flex md:mr-5 md:mb-0 items-center', {
          'mb-5': bigButton,
        })}
      >
        <button
          className="disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault()
            onMinusClick?.()
          }}
          disabled={pending}
          aria-label='Deacrese Quantity'
        >
          <Minus className="text-red-700" />
        </button>
        <span className="px-3">{qty}</span>
        <button
          className="disabled:opacity-50"
          onClick={(e) => {
            e.preventDefault()
            onPlusClick?.()
          }}
          disabled={pending}
          aria-label='Increase Quantity'
        >
          <Plus className="text-red-700" />
        </button>
      </div>
      {onRemoveClick && (
        <Button
          isSecondary
          small={!bigButton}
          large={bigButton}
          className={cx('md:mb-0', { 'xl:w-1/2 md:mt-10 mb-5': bigButton })}
          onClick={onRemoveClick}
          disabled={pending}
        >
          Remove
        </Button>
      )}
    </div>
  )
}

export default EditCartItemUI
