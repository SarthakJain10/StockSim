'use client';

import { useTheme } from 'next-themes';
import TradingViewWidget from "@/components/TradingViewWidget";
import TradeStats from "./_components/TradeStats";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/data/trading";

export default function TradeClient() {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-";

  return (
    <div className="space-y-6">
      <TradeStats />

      <section className="relative isolate grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="relative h-[600px] overflow-hidden xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${scriptUrl}market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG(theme)} 
          />
        </div>

        <div className="relative h-[600px] overflow-hidden xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${scriptUrl}stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG(theme)} 
          />
        </div>
      </section>

      <section className="relative isolate mt-10 grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="relative h-[600px] overflow-hidden xl:col-span-1">
          <TradingViewWidget
            title="Top Stories"
            scriptUrl={`${scriptUrl}timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG(theme)} 
          />
        </div>

        <div className="relative h-[600px] overflow-hidden xl:col-span-2">
          <TradingViewWidget
            title="Market Quotes"
            scriptUrl={`${scriptUrl}market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG(theme)} 
          />
        </div>
      </section>
    </div>
  );
}
