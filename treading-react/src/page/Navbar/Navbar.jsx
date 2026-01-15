import React from 'react'
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, Button, Avatar, AvatarFallback, AvatarImage } from '@/components/ui'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

function Navbar() {
    const auth = useSelector(store => store.auth)
    return (
        <div className='px-2 py-3 border-b z-50 bg-background bg-opacity-0 sticky top-0 left-0 right-0 flex justify-between items-center'>

            <div className='flex items-center gap-3'>
                <Sheet>
                    <SheetTrigger className='inline-flex items-center justify-center rounded-full h-11 w-11 hover:bg-accent hover:text-accent-foreground'>
                        <DragHandleHorizontalIcon className='h-7 w-7' />
                    </SheetTrigger>
                    <SheetContent 
                    className='w-72 border-r-0 flex flex-col justify-center' 
                    side='left'>
                        <SheetHeader>
                            <SheetTitle>
                                <div className='text-3xl flex justify-center items-center gap-1'>
                                    <Avatar>
                                        <AvatarImage src='https://cdn.pixabay.com/photo/2021/06/13/23/39/neo-6334556_1280.png' />
                                    </Avatar>
                                    <div>
                                        <span className='font-bold text-green-600'>Neuro</span>
                                        <span>Tread</span>
                                    </div>
                                </div>
                            </SheetTitle>
                            
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <p className='text-sm lg:text-base cursor-pointer'>
                    Neuro Treading
                </p>
                <div variant="outline" className='p-0 ml-9'>
                    <Button>
                        <MagnifyingGlassIcon />
                        <span>Search</span>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar>
                    <AvatarFallback>
                        {auth.user?.fullName[0].toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

export default Navbar  