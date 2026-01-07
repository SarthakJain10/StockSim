"use client"

type Stock = {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
};

type StockWithWatchlistStatus = Stock & {
    isInWatchlist: boolean;
};

type SearchCommandProps = {
    renderAs?: 'button' | 'text';
    label?: string;
    initialStocks: StockWithWatchlistStatus[];
};

export default function SearchCommand({ renderAs = 'button', label = 'Add stock', initialStocks }: SearchCommandProps) {
    return (
        <>
        
        </>
    )
}