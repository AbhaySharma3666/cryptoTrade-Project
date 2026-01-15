import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarImage, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { getUserAssets } from '@/State/Asset/Action';
import { useEffect } from 'react';

function Portfolio() {
    const dispatch = useDispatch();
    const asset = useSelector(store => store.asset)

    const token = localStorage.getItem("jwt");

    useEffect(() => {
        
        if (token) {
            dispatch(getUserAssets(token));
        }
    }, [dispatch, token])

    // prefer userAssets but fall back to assetDetails if userAssets is empty
    const assetsToShow = (asset?.userAssets && asset.userAssets.length > 0)
        ? asset.userAssets
        : (asset?.assetDetails ?? []);

    console.log("assetsToShow:", assetsToShow, "full asset state:", asset);
    return (
        <div className='p-5 lg:p-10'>
            <h1 className='font-bold text-3xl pb-5'>Portfolio</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">
                            Asset
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Unit</TableHead>
                        <TableHead>Change</TableHead>
                        <TableHead>Change%</TableHead>
                        <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {assetsToShow.length > 0 ? (
                        assetsToShow.map((item, index) => {
                            const coin = item.coin ?? item; // assetDetails may already be the coin object
                            const quantity = item.quantity ?? item.units ?? 0;

                            return (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Avatar className='h-10 w-10'>
                                                <AvatarImage src={coin?.image} />
                                            </Avatar>
                                            <span>{coin?.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{(coin?.symbol ?? '').toString().toUpperCase()}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{coin?.price_change_24h ?? '-'}</TableCell>
                                    <TableCell>{coin?.price_change_percentage_24h ?? '-'}</TableCell>
                                    <TableCell className="text-right">${coin?.total_volume ?? '-'}</TableCell>
                                </TableRow>
                            )
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No assets to show
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Portfolio