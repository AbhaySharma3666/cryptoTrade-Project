import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui'
import React, { useEffect } from 'react'
import AssetTable from './AssetTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui'
import { Cross1Icon, DotIcon } from '@radix-ui/react-icons'
import { MessageCircle } from 'lucide-react'
import { Input } from '@/components/ui'
import { getCoinList, getTop50CoinList } from '@/State/Coin/Action'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui'
import api, { FRONTEND_URL } from '@/config/api'


function Home() {
    const [category, setCategory] = React.useState("all")
    const [inputValue, setInputValue] = React.useState("");
    const [isBotRealease, setIsBotRealease] = React.useState(false)
    const coin = useSelector(store => store.coin)
    const dispatch = useDispatch()
    const chatRef = React.useRef(null);
    const [messages, setMessages] = React.useState([
        {
            role: "bot",
            text: "Hi, I'm your CryptoBot 🤖\nAsk me anything about crypto prices, market cap, volume, etc."
        }
    ]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, loading]);

    useEffect(() => {
        dispatch(getCoinList(1))
    }, [])

    useEffect(() => {
        dispatch(getTop50CoinList())
    }, [category])

    const handleBotRealease = () => setIsBotRealease(!isBotRealease)

    const handleCategory = (value) => {
        setCategory(value)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            const text = inputValue.trim();
            if (!text) return;

            setMessages(prev => [...prev, { role: "user", text }]);
            sendChatRequest(text);
            setInputValue("");
        }
    };

    const sendChatRequest = async (prompt) => {
        setLoading(true);

        try {
            const { data } = await api.post('/ai/chat', { prompt })
            setMessages(prev => [...prev, { role: 'bot', text: data.message }])
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', text: '❌ Error connecting to server.' }])
        }

        setLoading(false);
    };



    return (
        <div className='relative'>
            <div className='lg:flex'>
                <div className='lg:w-[50%] lg:border-r'>
                    <div className='p-3 flex items-center gap-4'>
                        <Button
                            onClick={() => handleCategory("all")}
                            variant={category == "all" ? "default" : "outline"} className='rounded-full'
                        >
                            All
                        </Button>
                        <Button
                            onClick={() => handleCategory("top50")}
                            variant={category == "top50" ? "default" : "outline"} className='rounded-full'
                        >
                            Top 50
                        </Button>
                        <Button
                            onClick={() => handleCategory("topGainers")}
                            variant={category == "topGainers" ? "default" : "outline"} className='rounded-full'
                        >
                            Top Gainers
                        </Button>
                        <Button
                            onClick={() => handleCategory("topLosers")}
                            variant={category == "topLosers" ? "default" : "outline"} className='rounded-full'
                        >
                            Top Losers
                        </Button>
                    </div>
                    {coin ? (
                        <AssetTable
                            coin={category == "all" ? coin.coinList : coin.top50}
                            category={category}
                        />
                    ) : (
                        <AssetTableSkeleton />
                    )}
                    <div>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious href="#" />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink href="#">1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationNext href="#" />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
                <div className='hidden lg:block lg:w-[50%] p-5'>
                    <StockChart coinId={"bitcoin"} />

                    <div className='flex gap-5 items-center'>
                        <Avatar>
                            <AvatarImage src='https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628' />
                        </Avatar>
                        <div>
                            <div className='flex items-center gap-2'>
                                <p>ETH</p>
                                <DotIcon className='text-gray-400' />
                                <p className='text-gray-500'>Ethereum</p>
                            </div>
                            <div className='flex items-end gap-3'>
                                <p className='text-xl font-bold'>5684</p>
                                <p className='text-red-600 flex gap-2'>
                                    <span>-4787464835847584.54</span>
                                    <span>(-0.325%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* chatbot  */}
            <section className='absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2'>

                {isBotRealease && (
                    <div className='rounded-xl shadow-xl w-[20rem] md:w-[25rem] h-[70vh] bg-[#0f172a] border border-gray-700 overflow-hidden flex flex-col'>

                        {/* Header */}
                        <div className='flex justify-between items-center border-b border-gray-700 px-6 h-[12%] bg-[#1e293b]'>

                            {/* Title */}
                            <p className='text-lg font-semibold text-white flex items-center gap-2'>
                                <MessageCircle size={22} /> Crypto ChatBot
                            </p>

                            {/* Right Side Buttons */}
                            <div className='flex items-center gap-2'>

                                {/* Redirect Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-white border-gray-500 hover:bg-gray-700"
                                    onClick={() => window.open(FRONTEND_URL, '_blank')}
                                >
                                    AI Chat
                                </Button>

                                {/* Close Icon */}
                                <Button onClick={handleBotRealease} variant="ghost" size="icon">
                                    <Cross1Icon className='text-gray-300' />
                                </Button>
                            </div>

                        </div>


                        {/* Chat Body */}
                        <div
                            ref={chatRef}
                            className='h-[76%] flex flex-col overflow-y-auto gap-5 px-5 py-4 custom-scrollbar'
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line 
                        ${msg.role === "user"
                                            ? "bg-blue-600 text-white rounded-br-none"
                                            : "bg-gray-800 text-gray-200 rounded-bl-none"
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {/* Typing Animation */}
                            {loading && (
                                <div className='flex justify-start'>
                                    <div className='bg-gray-800 text-gray-300 px-4 py-2 rounded-2xl rounded-bl-none'>
                                        <div className="flex gap-2">
                                            <span className="animate-pulse">●</span>
                                            <span className="animate-pulse delay-150">●</span>
                                            <span className="animate-pulse delay-300">●</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className='h-[12%] border-t border-gray-700 bg-[#1e293b] flex items-center px-3'>
                            <Input
                                value={inputValue}
                                onChange={handleChange}
                                onKeyPress={handleKeyPress}
                                className='w-full h-[70%] bg-[#0f172a] text-white border-none rounded-full px-4'
                                placeholder='Ask me anything about crypto...'
                            />
                        </div>
                    </div>
                )}


                <div className='relative w-[10rem] cursor-pointer group'>

                    <Button
                        onClick={handleBotRealease}
                        className='w-full h-[3rem] gap-2 items-center'>
                        <MessageCircle
                            size={30}
                            className='fill-[#1e2936] -rotate-90 stroke-none group-hover:fill-[#1a1a1a]' />
                        <span className='text-2xl'>Chat Bot</span>
                    </Button>

                </div>

            </section>
        </div>
    )
}

export default Home