export interface Security {
  orderbookId:             string;
  name:                    string;
  isin:                    string;
  instrumentId:            string;
  sectors:                 Sector[];
  tradable:                string;
  listing:                 Listing;
  historicalClosingPrices: HistoricalClosingPrices;
  keyIndicators:           KeyIndicators;
  quote:                   Quote;
  type:                    string;
  news:                    News[];
  forum:                   Forum[];
}

export interface Forum {
  author:    string;
  title:     string;
  content:   string;
  likes:     number;
  replies:   number;
  timestamp: number;
  url:       string;
}

export interface HistoricalClosingPrices {
  oneDay:      number;
  oneWeek:     number;
  oneMonth:    number;
  threeMonths: number;
  startOfYear: number;
  oneYear:     number;
  threeYears:  number;
  fiveYears:   number;
  start:       number;
  startDate:   Date;
}

export interface KeyIndicators {
  numberOfOwners:        number;
  reportDate:            Date;
  directYield:           number;
  volatility:            number;
  beta:                  number;
  priceEarningsRatio:    number;
  priceSalesRatio:       number;
  returnOnEquity:        number;
  returnOnTotalAssets:   number;
  equityRatio:           number;
  capitalTurnover:       number;
  operatingProfitMargin: number;
  netMargin:             number;
  marketCapital:         EarningsPerShare;
  equityPerShare:        EarningsPerShare;
  turnoverPerShare:      EarningsPerShare;
  earningsPerShare:      EarningsPerShare;
  dividend:              Dividend;
  dividendsPerYear:      number;
  nextReport:            Report;
  previousReport:        Report;
}

export interface Dividend {
  exDate:       Date;
  paymentDate:  Date;
  amount:       number;
  currencyCode: string;
  exDateStatus: string;
}

export interface EarningsPerShare {
  value:    number;
  currency: string;
}

export interface Report {
  date:       Date;
  reportType: string;
}

export interface Listing {
  shortName:             string;
  tickerSymbol:          string;
  countryCode:           string;
  currency:              string;
  marketPlaceCode:       string;
  marketPlaceName:       string;
  marketListName:        string;
  tickSizeListId:        string;
  marketTradesAvailable: boolean;
}

export interface News {
  timePublishedMillis: number;
  timePublished:       Date;
  headline:            string;
  vignette:            string;
  articleType:         ArticleType;
  newsSource:          string;
  fullArticleLink:     string;
  intro:               string;
  externalLink:        boolean;
}

export enum ArticleType {
  Analys = "Analys",
  Kommentar = "Kommentar",
  Nyhet = "Nyhet",
  Pressrelease = "Pressrelease",
  Telegram = "Telegram",
  Övrigt = "Övrigt",
}

export interface Quote {
  last:                       number;
  highest:                    number;
  lowest:                     number;
  change:                     number;
  changePercent:              number;
  timeOfLast:                 number;
  totalValueTraded:           number;
  totalVolumeTraded:          number;
  updated:                    number;
  volumeWeightedAveragePrice: number;
}

export interface Sector {
  sectorId:   string;
  sectorName: string;
}
