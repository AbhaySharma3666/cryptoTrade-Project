import { useSelector } from 'react-redux'
import { Avatar, AvatarImage, Button, Input } from '@/components/ui'
import { DotIcon } from '@radix-ui/react-icons'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUserWallet } from '@/State/Wallet/Action'
import { getAssetDetails } from '@/State/Asset/Action'
import { payOrder } from '@/State/Order/Action'

function TreadingForm({ onClose }) {

  const [orderType, setOrderType] = useState('BUY')
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)

  const coin = useSelector(store => store.coin)
  const wallet = useSelector(store => store.wallet)
  const asset = useSelector(store => store.asset)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const amount = e.target.value;
    setAmount(amount)

    if (coin.coinDetails?.market_data?.current_price?.usd) {
      const volume = calculateBuyCost(amount, coin.coinDetails.market_data.current_price.usd)
      setQuantity(volume)
    }
  }

  const calculateBuyCost = (amount, price) => {
    let volume = amount / price
    let decimalPlaces = Math.max(2, price.toString().split(".")[0].length)
    return volume.toFixed(decimalPlaces)
  }

  const handleOrder = async () => {
    const res = await dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType, // BUY or SELL
        }
      })
    );

    if (res?.success) {
      alert(`${orderType} order placed successfully!`);
      if (onClose) onClose();  // close the trading form
    } else {
      alert(res?.message || "Order failed. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")))
    dispatch(getAssetDetails({ coinId: coin.coinDetails?.id, jwt: localStorage.getItem("jwt") }))
  }, [])

  return (
    <div className='space-y-10 p-5'>
      <div>
        <div className='flex gap-4 items-center justify-between'>
          <Input
            className='py-7 focus:outline-none'
            placeholder='Enter amount'
            onChange={handleChange}
            type='number'
            name='amount'
          />

          <div>
            <p className='border text-2xl flex justify-center items-center w-36 h-14 rounded-md'>{quantity}</p>
          </div>
        </div>
      </div>

      <div className='flex gap-5 items-center'>
        <Avatar>
          <AvatarImage src={coin.coinDetails?.image?.large} />
        </Avatar>

        <div>
          <div className='flex items-center gap-2'>
            <p>{(coin.coinDetails?.symbol ?? '').toUpperCase()}</p>
            <DotIcon className='text-gray-400' />
            <p className='text-gray-400'>{coin.name}</p>
          </div>

          <div className='flex items-end gap-2'>
            <p className='text-xl font-bold'>
              ${coin.coinDetails?.market_data?.current_price?.usd}
            </p>

            <p className='text-red-600'>
              <span>{coin.coinDetails?.market_data.market_cap_change_24h}</span>
              <span>({coin.coinDetails?.market_data.market_cap_change_percentage_24h}%)</span>
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <p>Order Type</p>
        <p>Market Order</p>
      </div>

      <div className='flex items-center justify-between'>
        <p>{orderType === 'BUY' ? "Available Cash" : "Available Quantity"}</p>

        <p>
          {orderType === 'BUY'
            ? "$" + wallet?.userWallet?.balance
            : (asset?.assetDetails?.quantity || 0)
          }
        </p>
      </div>

      <div>
        <Button
          onClick={handleOrder}
          className={`w-full py-6 ${orderType === 'SELL' ? 'bg-red-600 text-white' : ""}`}>
          {orderType}
        </Button>

        <Button
          variant={"link"}
          className='w-full mt-5 text-xl'
          onClick={() => setOrderType(orderType === 'BUY' ? 'SELL' : 'BUY')}>
          {orderType === 'BUY' ? "Or SELL" : "Or BUY"}
        </Button>
      </div>
    </div>
  )
}

export default TreadingForm
