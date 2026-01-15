import { Avatar, AvatarImage, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui'
import { addItemToWatchlist, getUserWatchlist, clearWatchlistError } from '@/State/Watchlist/Action'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Watchlist() {

  const dispatch = useDispatch()
  const watchlist = useSelector(store => store.watchlist)


  const handleRemoveToWatchlist = (coinId, coin) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.error("JWT token is missing");
      return;
    }
    if (!coinId) {
      console.error("Coin ID is missing");
      return;
    }
    dispatch(addItemToWatchlist({ coinId, jwt, coin }));
  }

  const token = localStorage.getItem('jwt');
  useEffect(() => {
    if (token) dispatch(getUserWatchlist(token));
  }, [dispatch, token]);

  console.log('watch store:--', watchlist);

  const items = watchlist?.items || [];

  return (
    <div className='p-5 lg:p-5'>
      <h1 className='font-bold text-3xl pb-5'>Watchlist</h1>
      {watchlist?.loading && items.length === 0 ? (
        <div className='text-center py-10'>Loading...</div>
      ) : watchlist?.error ? (
        <div className='text-center py-10'>
          <div className='text-red-500 mb-2'>Error: {watchlist.error}</div>
          <button 
            onClick={() => dispatch(clearWatchlistError())}
            className='text-sm text-blue-500 hover:underline'>
            Dismiss
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className='text-center py-10 text-gray-500'>No items in watchlist</div>
      ) : (
        <Table className='border'>
          <TableHeader>
            <TableRow>
              <TableHead className="py-5">
                COIN
              </TableHead>
              <TableHead>SYMBOL</TableHead>
              <TableHead>VOLUME</TableHead>
              <TableHead>MARKET CAP</TableHead>
              <TableHead>24h</TableHead>
              <TableHead className="">PRICE</TableHead>
              <TableHead className="text-right text-red-600">REMOVE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src={item?.image} />
                    </Avatar>
                    <span>{item?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{item?.symbol}</TableCell>
                <TableCell>{item?.total_volume}</TableCell>
                <TableCell>{item?.market_cap}</TableCell>
                <TableCell>{item?.price_change_percentage_24h}</TableCell>
                <TableCell className="">${item?.current_price}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleRemoveToWatchlist(item?.id, item)}
                    disabled={watchlist?.loading}
                    size="icon" 
                    className='h-10 w-10'
                    title="Remove from watchlist">
                    {watchlist?.loading ? (
                      <span className='text-xs'>...</span>
                    ) : (
                      <BookmarkFilledIcon className='w-6 h-6' />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default Watchlist