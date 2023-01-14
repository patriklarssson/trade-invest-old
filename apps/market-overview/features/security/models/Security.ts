export interface Security {
  priceThreeMonthsAgo: number;
  priceOneWeekAgo: number;
  priceOneMonthAgo: number;
  priceSixMonthsAgo: number;
  priceAtStartOfYear: number;
  priceOneYearAgo: number;
  priceThreeYearsAgo: number;
  priceFiveYearsAgo: number;
  marketPlace: string;
  marketList: string;
  quoteUpdated: string;
  hasInvestmentFees: boolean;
  morningStarFactSheetUrl: string;
  currency: Currency;
  isin: string;
  changePercent: number;
  change: number;
  highestPrice: number;
  lowestPrice: number;
  lastPrice: number;
  lastPriceUpdated: LastPriceUpdated;
  totalVolumeTraded: number;
  totalValueTraded: number;
  tradable: boolean;
  shortSellable: boolean;
  tickerSymbol: string;
  loanFactor: number;
  flagCode: string;
  name: string;
  id: string;
  country: string;
  keyRatios: KeyRatios;
  numberOfOwners: number;
  superLoan: boolean;
  numberOfPriceAlerts: number;
  pushPermitted: boolean;
  dividends: Dividend[];
  relatedStocks: RelatedStock[];
  company: Company;
  orderDepthLevels: any[];
  marketMakerExpected: boolean;
  orderDepthReceivedTime: string;
  latestTrades: LatestTrade[];
  marketTrades: boolean;
  positions: Position[];
  positionsTotalValue: number;
  annualMeetings: AnnualMeeting[];
  companyReports: CompanyReport[];
  brokerTradeSummary: BrokerTradeSummary;
  companyOwners: CompanyOwners;
}

interface AnnualMeeting {
  eventDate: Date;
  extra: boolean;
}

interface BrokerTradeSummary {
  orderbookId: string;
  items: Item[];
}

interface Item {
  netBuyVolume: number;
  sellVolume: number;
  buyVolume: number;
  brokerCode: string;
}

interface Company {
  sector: string;
  stocks: Stock[];
  description: string;
  totalNumberOfShares: number;
  chairman: string;
  marketCapital: number;
  marketCapitalCurrency: Currency;
  name: string;
  id: string;
  CEO: string;
}

enum Currency {
  Sek = 'SEK',
}

interface Stock {
  totalNumberOfShares: number;
  name: string;
}

interface CompanyOwners {
  list: List[];
  updated: Date;
}

interface List {
  name: string;
  capital: number;
  votes: number;
}

interface CompanyReport {
  eventDate: Date;
  reportType: string;
}

interface Dividend {
  exDate: Date;
  paymentDate: Date;
  amountPerShare: number;
  currency: Currency;
}

interface KeyRatios {
  volatility: number;
  priceEarningsRatio: number;
  directYield: number;
}

enum LastPriceUpdated {
  The20221202T1724550000100 = '2022-12-02T17:24:55.000+0100',
  The20221202T1729330000100 = '2022-12-02T17:29:33.000+0100',
}

interface LatestTrade {
  buyer?: string;
  seller?: string;
  matchedOnMarket: boolean;
  cancelled: boolean;
  volume: number;
  price: number;
  dealTime: LastPriceUpdated;
}

interface Position {
  accountName: string;
  accountType: string;
  accountId: string;
  volume: number;
  averageAcquiredPrice: number;
  profitPercent: number;
  acquiredValue: number;
  profit: number;
  value: number;
}

interface RelatedStock {
  lastPrice: number;
  flagCode: string;
  priceOneYearAgo: number;
  name: string;
  id: string;
}
