'use client';

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  ArrowUpRight,
  BarChart2,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStockSearch } from "@/app/hooks/useStockSearch";


interface Stock {
  symbol: string;
  price: number;
  change: number;
}

interface Watchlist {
  id: number;
  name: string;
  stocks: Stock[];
}

const watchlists: Watchlist[] = [
  {
    id: 1,
    name: "WATCHLIST 1",
    stocks: [
      { symbol: "RELIANCE", price: 2489.4, change: 1.12 },
      { symbol: "TCS", price: 3781.2, change: -0.34 },
      { symbol: "INFY", price: 1562.8, change: 0.58 },
    ],
  },
  {
    id: 2,
    name: "WATCHLIST 2",
    stocks: [
      { symbol: "HDFCBANK", price: 1654.9, change: -0.81 },
      { symbol: "ICICIBANK", price: 1021.3, change: 0.94 },
    ],
  },
];


export default function WatchlistSidebar() {
  const [activeId, setActiveId] = useState(1);

  const {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    isSearchMode,
    isSearchOpen,
    setIsSearchOpen,
    searchInputRef,
  } = useStockSearch();

  const activeWatchlist = watchlists.find(w => w.id === activeId)!;

  return (
    <aside className="hidden md:flex flex-col w-75 h-screen border-r bg-background">
      {/* Search */}
      <div className="p-3 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search & add"
            className="pl-8 h-9 text-sm"
          />
        </div>
      </div>

      {/* Watchlist Tabs */}
      <div className="flex items-center gap-2 px-3 py-2 border-b overflow-x-auto">
        {watchlists.map((wl) => (
          <button
            key={wl.id}
            onClick={() => setActiveId(wl.id)}
            className={cn(
              "text-xs px-2 py-1 rounded whitespace-nowrap transition",
              activeId === wl.id
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            {wl.name}
          </button>
        ))}
        <button className="ml-auto p-1 rounded hover:bg-muted">
          <Plus className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        {/* Search / Popular */}
        {isSearchOpen && (
          <SearchResults
            results={results}
            loading={loading}
            onSelect={() => {
              setSearchTerm("");
              setIsSearchOpen(false);
            }}
          />
        )}

        {/* Watchlist */}
        {!isSearchOpen && (
          <WatchlistStocks watchlist={activeWatchlist} />
        )}
      </ScrollArea>


    </aside>
  );
}

function WatchlistStocks({ watchlist }: { watchlist: Watchlist }) {
  if (!watchlist.stocks.length) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        No stocks in this watchlist
      </p>
    );
  }

  return (
    <div className="divide-y">
      {watchlist.stocks.map((stock) => {
        const isPositive = stock.change >= 0;

        return (
          <div
            key={stock.symbol}
            className="group flex items-center px-3 py-2 hover:bg-muted"
          >
            <div className="flex-1">
              <p className="text-sm font-medium">{stock.symbol}</p>
              <p className="text-xs text-muted-foreground">
                NSE · EQ
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium">
                ₹{stock.price.toFixed(2)}
              </p>
              <p
                className={cn(
                  "text-xs",
                  isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {isPositive ? "+" : ""}
                {stock.change.toFixed(2)}%
              </p>
            </div>

            <div className="ml-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              <BarChart2 className="w-4 h-4 text-muted-foreground" />
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        );
      })}
    </div>
  );
}


function SearchResults({
  results,
  loading,
  onSelect,
}: {
  results: any[];
  loading: boolean;
  onSelect: () => void;
}) {
  if (loading) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        Searching…
      </p>
    );
  }

  if (!results.length) {
    return (
      <p className="text-sm text-muted-foreground p-4 text-center">
        No instruments found
      </p>
    );
  }

  return (
    <div className="divide-y">
      {results.map((stock) => (
        <div
          key={stock.symbol}
          onClick={onSelect}
          className="group flex items-center px-3 py-2 hover:bg-muted cursor-pointer"
        >
          <div className="flex-1">
            <p className="text-sm font-medium">{stock.name}</p>
            <p className="text-xs text-muted-foreground">
              {stock.symbol} | {stock.exchange } | {stock.type}
            </p>
          </div>

          <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition" />
        </div>
      ))}
    </div>
  );
}
