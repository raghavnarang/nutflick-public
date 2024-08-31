'use client'

import { type FC } from 'react'
import Plus from '../Icons/plus'
import Minus from '../Icons/minus'
import Button from '../button'
import cx from 'clsx'

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
}) => (
  <div
    className={cx(
      'flex flex-col md:flex-row items-start',
      {
        'md:items-center justify-between': !bigButton,
        'md:flex-col': bigButton,
      },
      className,
    )}
  >
    <div
      className={cx('flex mr-5 md:mb-0 items-center', {
        'mb-5': bigButton,
      })}
    >
      <button className="disabled:opacity-50" onClick={onMinusClick}>
        <Minus className="text-red-500" />
      </button>
      <span className="px-3">{qty}</span>
      <button className="disabled:opacity-50" onClick={onPlusClick}>
        <Plus className="text-red-500" />
      </button>
    </div>
    <Button
      isSecondary
      small={!bigButton}
      large={bigButton}
      className={cx('md:mb-0', { 'xl:w-1/2 mt-10 mb-5': bigButton })}
      onClick={onRemoveClick}
    >
      Remove from Cart
    </Button>
  </div>
)

export default EditCartItemUI