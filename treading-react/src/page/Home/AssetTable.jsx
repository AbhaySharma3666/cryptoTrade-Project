import { Avatar, AvatarImage, ScrollArea, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AssetTable({coin, category}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <ScrollArea className={`${category=="all"?"h-[77.3vh]":"h-[82vh]"}`}>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Coin</TableHead>
                        <TableHead>SYMBOL</TableHead>
                        <TableHead>VOLUME</TableHead>
                        <TableHead>MARKET CAP</TableHead>
                        <TableHead>24h</TableHead>
                        <TableHead className="text-right">PRICE</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coin.map((item)=><TableRow key={item.id}>
                        <TableCell onClick={()=>navigate(`/market/${item.id}`)} className="font-medium">
                            <div className="flex items-center gap-2">
                                <Avatar className='h-10 w-10'>
                                    <AvatarImage src={item.image} />
                                </Avatar>
                                <span>{item.name}</span>
                            </div>
                        </TableCell>
                        <TableCell>{item.symbol}</TableCell>
                        <TableCell>{item.total_volume }</TableCell>
                        <TableCell>{item.market_cap}</TableCell>
                        <TableCell>{item.price_change_percentage_24h}</TableCell>
                        <TableCell className="text-right">${item.current_price}</TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}

export default AssetTable