import { useLocation, useNavigate } from 'react-router-dom'
import { CopyIcon, ReloadIcon, UpdateIcon } from "@radix-ui/react-icons"
import { DollarSign, DollarSignIcon, ShuffleIcon, UploadIcon, WalletIcon } from "lucide-react"
import TopupForm from "./TopupForm.jsx"
import WithdrawalForm from "./WithdrawalForm.jsx"
import TransferForm from "./TransferForm.jsx"
import { Card, CardContent, CardHeader, CardTitle, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Avatar, AvatarFallback } from "@/components/ui"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useCallback } from "react"
import { depositMoney, getUserWallet, getWalletTransactions } from "@/State/Wallet/Action.js"

function useQuery(){ 
  return new URLSearchParams(useLocation().search)
}

function Wallet() {

  const dispatch=useDispatch()
  const wallet = useSelector(store=>store.wallet)
  const query = useQuery()
  const orderId = query.get("order_id")
  const paymentId = query.get("payment_id")
  const razorpayPaymentId = query.get("razorpay_payment_id")
  const navigate = useNavigate()

  const handlerFetchUserWallet = useCallback(()=>{
    dispatch(getUserWallet(localStorage.getItem("jwt")))
  }, [dispatch])

  const handleFetchWalletTransaction = useCallback(() =>{
    dispatch(getWalletTransactions(localStorage.getItem("jwt")))
  }, [dispatch])

  useEffect(() => {
    handlerFetchUserWallet();
    handleFetchWalletTransaction()
  },[handlerFetchUserWallet, handleFetchWalletTransaction])

  useEffect(() => {
    if(orderId){
      dispatch(depositMoney({jwt:localStorage.getItem("jwt"),
        orderId,
        paymentId:paymentId || razorpayPaymentId,
        navigate
      }))
    }
  },[orderId,paymentId,razorpayPaymentId])


  return (
    <div className="flex flex-col items-center text-white">

      <div className="pt-10 w-full lg:w-[60%]">

        {/* Wallet Summary Card */}
        <Card className="bg-[#0f111a] border border-gray-800 shadow-lg rounded-xl">
          <CardHeader className="pb-9">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-5">
                <WalletIcon size={30} className="text-gray-300" />
                <div>
                  <CardTitle className="text-2xl text-white">My Wallet</CardTitle>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 text-sm">#{wallet?.userWallet?.id }</p>
                    <CopyIcon size={15} className="cursor-pointer hover:text-slate-300" />
                  </div>
                </div>
              </div>
              <ReloadIcon onClick={handlerFetchUserWallet} className="w-6 h-6 cursor-pointer hover:text-gray-400" />
            </div>
          </CardHeader>
    
          <CardContent>
            <div className="flex items-center">
              <span className="text-2xl font-semibold  text-gray-100">Wallet Balance : </span>
              <DollarSign className="text-green-400 mr-1" />
              <span className="text-2xl font-semibold text-gray-100">{wallet?.userWallet?.balance || 0}</span>
            </div>

            <div className="flex gap-7 mt-5 justify-center">
              {[
                { icon: <DollarSignIcon />, label: "Add Money", form: <TopupForm />, title: "Top Up Your Wallet" },
                { icon: <UploadIcon />, label: "Withdrawal", form: <WithdrawalForm />, title: "Request Withdrawal" },
                { icon: <ShuffleIcon />, label: "Transfer", form: <TransferForm />, title: "Transfer To Other Wallet" },
              ].map((item, i) => (
                <Dialog key={i}>
                  <DialogTrigger>
                    <div className="h-24 w-24 bg-[#1a1d2a] hover:bg-[#232637] cursor-pointer flex flex-col items-center justify-center rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
                      {item.icon}
                      <span className="text-sm mt-2">{item.label}</span>
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-center text-xl">{item.title}</DialogTitle>
                    </DialogHeader>
                    {item.form}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* History Section */}
        <div className="py-5 pt-8">
          <div className="flex gap-2 items-center pb-5">
            <h1 className="text-2xl font-semibold text-white">History</h1>
            <UpdateIcon className="h-6 w-6 cursor-pointer hover:text-gray-400" />
          </div>

          <div className="space-y-4">
            {console.log("wallet Transactions:", wallet?.transactions)}
            {wallet.transactions && wallet.transactions.length > 0 ? (wallet.transactions.map((item, i) => (
              <Card
                key={i}
                className="bg-[#0f111a] border border-gray-800 hover:border-gray-700 transition-all rounded-xl"
              >
                <CardContent className="flex justify-between items-center px-5 py-0">
                  {/* Left Section */}
                  <div className="flex items-center gap-4">
                    <Avatar onClick={handleFetchWalletTransaction} className="bg-[#1c1f2b]">
                      <AvatarFallback>
                        <ShuffleIcon className="text-gray-300 h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>

                    <div className='space-y-1'>
                      <h1 className="text-gray-100">{item.type || item.purpose}</h1>
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </div>

                  {/* Right Section */}
                  <p className="text-green-400 font-semibold text-lg">{item.amount} USD</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-gray-400">No transactions found</div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
