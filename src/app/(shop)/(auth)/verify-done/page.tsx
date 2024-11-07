import BigMessage from '@/components/big-message'
import { Tick } from '@/components/Icons'

const VerifyDone = () => {
  return (
    <BigMessage icon={Tick} button={{ text: 'Login to Proceed', link: { href: '/login' } }}>
      Email verified successfully! Please login to continue
    </BigMessage>
  )
}

export default VerifyDone