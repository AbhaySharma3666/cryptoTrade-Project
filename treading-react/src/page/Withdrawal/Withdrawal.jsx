import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { getWithdrawalHistory } from '@/State/Withdrawal/Action'

function Withdrawal() {
  const dispatch = useDispatch()
  const withdrawal = useSelector(store=>store.withdrawal)

  useEffect(()=>{
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")))
  },[dispatch])

  return (

    <div className='p-5 lg:p-10'>
      <h1 className='font-bold text-3xl pb-5'>Withdrawal</h1>
      <Table className='border'>
        <TableHeader>
          <TableRow>
            <TableHead className="py-5">Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className='text-right'>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {withdrawal.history.map((item, index) =>
            <TableRow key={index}>
              <TableCell>
                <p>{item.date.toString()}</p>
              </TableCell>
              <TableCell className="">Bank Account</TableCell>
              <TableCell className="">${item.amount}</TableCell>
              <TableCell className="text-right">
                <span className={`text-white font-semibold px-3 py-1 rounded-md ${
                  item.status == 'PENDING' ? 'bg-yellow-500' :
                  item.status == 'SUCCESS' ? 'bg-green-500' : 
                  item.status == 'FAIL' ? 'bg-red-500' : ''
                }`}>
                  {item.status}
                </span> 
              </TableCell>
            </TableRow>)}

        </TableBody>
      </Table>
    </div>
  )
}

export default Withdrawal