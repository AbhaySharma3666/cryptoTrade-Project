import { Button, SheetClose } from '@/components/ui'
import { logout } from '@/State/Auth/Action'
import { ActivityLogIcon, BookmarkIcon, DashboardIcon, ExitIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { CreditCardIcon, LandmarkIcon, WalletIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const menu = [
    { name: "Home", path: "/", icons: <HomeIcon className='h-6 w-6' /> },
    {
        name: "Portfolio",
        path: "/portfolio",
        icons: <DashboardIcon className='h-6 w-6' />
    },
    {
        name: "Watchlist",
        path: "/watchlist",
        icons: <BookmarkIcon className='h-6 w-6' />
    },
    {
        name: "Activity",
        path: "/activity",
        icons: <ActivityLogIcon className='h-6 w-6' />
    },
    {
        name: "Wallet",
        path: "/wallet",
        icons: <WalletIcon />
    },
    {
        name: "Payment Details",
        path: "/payment-details",
        icons: <LandmarkIcon className='h-6 w-6' />
    },
    {
        name: "Withdrawal",
        path: "/withdrawal",
        icons: <CreditCardIcon className='h-6 w-6' />
    },
    {
        name: "Profile",
        path: "/profile",
        icons: <PersonIcon className='h-6 w-6' />
    },
    {
        name: "Logout",
        path: "/",
        icons: <ExitIcon className='h-6 w-6' />
    },
]

function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };


    return (
        <div className='mt-10 space-y-5'>
            {menu.map((item) => (
                <div key={item.name}>
                    <SheetClose asChild>
                        <Button
                            variant='outline'
                            className='flex items-center gap-5 py-6 w-full'
                            onClick={()=> {
                                navigate(item.path)
                                if(item.name === "Logout"){
                                    handleLogout()
                                }
                            }}
                        >
                            <span className='w-8'>
                                {item.icons}
                            </span>
                            <p>{item.name}</p>
                        </Button>
                    </SheetClose>
                </div>
            ))}


        </div>
    )
}

export default Sidebar