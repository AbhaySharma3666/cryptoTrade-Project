export const existInWatchlist = (items, coin)=>{
    if (!items || !Array.isArray(items) || !coin || !coin.id) {
        return false;
    }
    for (let item of items){
        if (item?.id === coin?.id) return true;
    }
    return false;
} 