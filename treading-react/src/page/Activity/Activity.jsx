import { Avatar, AvatarImage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { getAllOrdersForUser } from '@/State/Order/Action'
import { calculateProfite } from '@/utils/calculateProfite'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Activity() {
  const dispatch = useDispatch()
  const order = useSelector(store=>store.order)


  useEffect(() => {
    dispatch(getAllOrdersForUser({jwt:localStorage.getItem('jwt')}))
  }, [dispatch])
  
  const orders = order?.orders || []
  
  return (
    <div className='p-5 lg:p-10'>
      <h1 className='font-bold text-3xl pb-5'>Activity</h1>
      {order?.loading ? (
        <div className='text-center py-10'>Loading...</div>
      ) : order?.error ? (
        <div className='text-center py-10 text-red-500'>Error: {order.error}</div>
      ) : orders.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>No activity found</div>
      ) : (
        <Table className='border'>
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">Date & Time</TableHead>
              <TableHead>Treading pair</TableHead>
              <TableHead>Buy Price</TableHead>
              <TableHead>Sell Price</TableHead>
              <TableHead>Order Type</TableHead>
              <TableHead className="">Profit/Loss</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item, index) => 
              <TableRow key={index}>
                <TableCell>
                  <p>2024/05/31</p>
                  <p className='text-gray-400'>12:39:32</p>
                </TableCell>
                
                <TableCell className="font-medium flex items-center gap-2">
                    <Avatar className='-z-50'>
                      <AvatarImage src={item.orderItem?.coin?.image} />
                    </Avatar>
                    <span>{item.orderItem?.coin?.name}</span>
                </TableCell>
                <TableCell className="">${item.orderItem?.buyPrice}</TableCell>
                <TableCell>{item.orderItem?.sellPrice}</TableCell>
                <TableCell>{item.orderType}</TableCell>
                <TableCell className="">{calculateProfite(item)}</TableCell>
                <TableCell className="text-right">{item.price}</TableCell>
              </TableRow>
            )}

        </TableBody>
      </Table>
      )}
    </div>
  )
}

export default Activity