"use client";

import { useState } from "react";
import { useToast } from "../hooks/use-toast";
import { Stock } from "./types";
import TradeStats from "./_components/TradeStats";
import StockTabs from "./_components/StockTabs";
import TradePanel from "./_components/TradePanel";

export default function TradeClient() {
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const handleTrade = () => {
    if (!selectedStock) return;

    toast({
      title: "Order Executed 🎉",
      description: `You ${orderType} ${quantity} shares of ${selectedStock.symbol}`,
    });

    setQuantity(1);
    setSelectedStock(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold">
          Virtual <span className="gradient-text">Trading</span>
        </h1>
        <p className="text-muted-foreground">
          Practice trading with virtual money
        </p>
      </div>

      <TradeStats />

      <div className="grid lg:grid-cols-3 gap-6">
        <StockTabs
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStock={selectedStock}
          setSelectedStock={setSelectedStock}
        />

        <TradePanel
          selectedStock={selectedStock}
          quantity={quantity}
          setQuantity={setQuantity}
          orderType={orderType}
          setOrderType={setOrderType}
          onTrade={handleTrade}
        />
      </div>
    </div>
  );
}
