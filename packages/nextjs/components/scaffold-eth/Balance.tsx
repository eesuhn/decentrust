"use client"

import { useDisplayUsdMode } from "@/hooks/scaffold-eth/useDisplayUsdMode"
import { useTargetNetwork } from "@/hooks/scaffold-eth/useTargetNetwork"
import { useWatchBalance } from "@/hooks/scaffold-eth/useWatchBalance"
import { useGlobalState } from "@/services/store/store"
import { formatEther } from "viem"

type BalanceProps = {
  address?: any
  className?: string
  usdMode?: boolean
}

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export const Balance = ({ address, className = "", usdMode }: BalanceProps) => {
  const { targetNetwork } = useTargetNetwork()
  const nativeCurrencyPrice = useGlobalState((state) => state.nativeCurrency.price)
  const isNativeCurrencyPriceFetching = useGlobalState((state) => state.nativeCurrency.isFetching)

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
  })

  const { displayUsdMode, toggleDisplayUsdMode } = useDisplayUsdMode({ defaultUsdMode: usdMode })

  if (!address || isLoading || balance === null || (isNativeCurrencyPriceFetching && nativeCurrencyPrice === 0)) {
    return (
      <div className="flex animate-pulse space-x-4">
        <div className="h-6 w-6 rounded-md bg-slate-300"></div>
        <div className="flex items-center space-y-6">
          <div className="h-2 w-28 rounded bg-slate-300"></div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={`flex max-w-fit cursor-pointer flex-col items-center rounded-md border-2 border-gray-400 px-2`}>
        <div className="text-warning">Error</div>
      </div>
    )
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0

  return (
    <button className={`btn btn-ghost btn-sm flex flex-col items-center font-normal hover:bg-transparent ${className}`} onClick={toggleDisplayUsdMode}>
      <div className="flex w-full items-center justify-center">
        {displayUsdMode ? (
          <>
            <span className="mr-1 text-[0.8em] font-bold">$</span>
            <span>{(formattedBalance * nativeCurrencyPrice).toFixed(2)}</span>
          </>
        ) : (
          <>
            <span>{formattedBalance.toFixed(4)}</span>
            <span className="ml-1 text-[0.8em] font-bold">{targetNetwork.nativeCurrency.symbol}</span>
          </>
        )}
      </div>
    </button>
  )
}
