import { useContract } from '@thirdweb-dev/react'
import React from 'react'

function CountdownTimer() {
    const{ contract } = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    );
  return (
    <div>
        
    </div>
  )
}

export default CountdownTimer