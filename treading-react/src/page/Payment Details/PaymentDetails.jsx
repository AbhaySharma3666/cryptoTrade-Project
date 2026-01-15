import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui'

import { useEffect } from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'
import { getPaymentDetails, deletePaymentDetails } from '@/State/Withdrawal/Action'
import { Trash2, Plus } from 'lucide-react'

function PaymentDetails() {
  const {withdrawal} = useSelector(store=>store)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}))
  },[dispatch])

  const handleDeletePaymentDetails = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && window.confirm("Are you sure you want to remove this payment method?")) {
      dispatch(deletePaymentDetails({ jwt }));
    }
  };

  return (
    <div className='px-20'>
      <h1 className='text-3xl font-bold py-10'>Payment Details</h1>

      {withdrawal?.loading ? (
        <div className='text-center py-10'>Loading...</div>
      ) : withdrawal?.error ? (
        <div className='text-center py-10 text-red-500'>Error: {withdrawal.error}</div>
      ) : withdrawal?.paymentDetails ? (
        <div className='space-y-4'>
          <Card>
            <CardHeader>
              <div className='flex justify-between items-start'>
                <div>
                  <CardTitle>
                    {withdrawal.paymentDetails?.bankName || 'Bank Account'}
                  </CardTitle>
                  <CardDescription className='flex items-center mt-2'>
                    <p className='w-32'>A/C No. : {withdrawal.paymentDetails?.accountNumber}</p>
                  </CardDescription>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDeletePaymentDetails}
                  disabled={withdrawal?.loading}
                  title="Remove payment method">
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex items-center'>
                <p className='w-32'>A/C Holder</p>
                <p className='text-gray-400'> : {withdrawal.paymentDetails?.accountHolderName}</p>
              </div>
              <div className='flex items-center'>
                <p className='w-32'>IFSC</p>
                <p className='text-gray-400'> : {withdrawal.paymentDetails?.ifsc || withdrawal.paymentDetails?.bankName}</p>
              </div>
            </CardContent>
          </Card>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className='py-6' variant="outline">
                <Plus className='h-4 w-4 mr-2' />
                Add Another Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Details</DialogTitle>
              </DialogHeader>
              <PaymentDetailsForm />
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className='py-6'>
              <Plus className='h-4 w-4 mr-2' />
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            <PaymentDetailsForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default PaymentDetails