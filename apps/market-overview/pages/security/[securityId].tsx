import Link from 'next/link';
import { Security, News } from '../../features/security/models/Security';
import {
  Grid,
  Stack,
  Typography,
  Paper,
  Container,
  Divider,
  withDisplay,
} from '@trade-invest/components-ui';
import styled from '@emotion/styled';

interface ISecurityDetailsProps {
  security: Security;
}

const Item = styled.div(({ theme }) => ({
  backgroundColor: 'red',
  height: 500,
}));

const TempFlag = () => {
  return (
    <svg
      style={{ height: 25, borderRadius: '50%', paddingRight: 5 }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M-9-5h38v30H-9z" fill="#157cbb"></path>
      <path d="M-4 12h8v8h4v-8h16V8H8V0H4v8h-8v4z" fill="#ffd34d"></path>
    </svg>
  );
};

const SecurityHeader = (security: Security) => {
  const stockType = security.type === 'STOCK' ? 'Aktie' : 'något annat';
  return (
    <>
      <Typography display="flex" alignItems="center" variant="h6">
        <TempFlag />
        {security.listing.marketPlaceName} {stockType}
      </Typography>
      <Typography variant="h3">
        {security.name} ({security.listing.shortName})
      </Typography>
      <Grid container spacing={2}>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Senaste</Typography>
          <Typography variant="h6">{security.quote.last}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Idag %</Typography>
          <Typography variant="h6">{security.quote.changePercent}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Idag +/-</Typography>
          <Typography variant="h6">{security.quote.change}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Köp</Typography>
          <Typography variant="h6">{security.quote.last}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Sälj</Typography>
          <Typography variant="h6">{security.quote.last}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Högst</Typography>
          <Typography variant="h6">{security.quote.highest}</Typography>
        </Grid>
        <Grid container columns={{ xs: 3 }} display="flex" direction="column">
          <Typography variant="subtitle1">Lägst</Typography>
          <Typography variant="h6">{security.quote.lowest}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

const News = ({ news }: { news: News[] }) => {
  return (
    <Paper elevation={2}>
      <Stack divider={<Divider />} spacing={2}>
        {news.map((post, i) => (
          <h5 key={i}>{post.headline}</h5>
        ))}
      </Stack>
    </Paper>
  );
};

export default function SecurityDetailPage({
  security,
}: ISecurityDetailsProps) {
  console.log(security);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={{ md: 2 }} rowSpacing={2}>
        <Grid>
          <SecurityHeader {...security} />
        </Grid>
        <Grid columns={{ xs: 12, md: 6, lg: 8 }}>
          <Item>Graph</Item>
        </Grid>
        <Grid columns={{ xs: 12, md: 6, lg: 4 }}>
          <Item>Other</Item>
        </Grid>
        <Grid columns={{ xs: 12, md: 6, lg: 8 }}>
          <News news={security.news} />
        </Grid>
        <Grid columns={{ xs: 12, md: 6, lg: 4 }}>
          <Item>Content 2</Item>
        </Grid>
      </Grid>
    </Container>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  // const res = await fetch(
  //   `http://localhost:3333/security/${params.securityId}`
  // );
  // const security = (await res.json()) as Promise<Security>;

  const security = {
    "orderbookId": "517316",
    "name": "Samhällsbyggnadsbo. i Norden B",
    "isin": "SE0009554454",
    "instrumentId": "514521",
    "sectors": [
        {
            "sectorId": "74",
            "sectorName": "Samhällsfastigheter"
        },
        {
            "sectorId": "40",
            "sectorName": "Fastigheter & Utveckling"
        },
        {
            "sectorId": "65",
            "sectorName": "Fastigheter"
        }
    ],
    "tradable": "BUYABLE_AND_SELLABLE",
    "listing": {
        "shortName": "SBB B",
        "tickerSymbol": "SBB B",
        "countryCode": "SE",
        "currency": "SEK",
        "marketPlaceCode": "XSTO",
        "marketPlaceName": "Stockholmsbörsen",
        "marketListName": "Large Cap Stockholm",
        "tickSizeListId": "36",
        "marketTradesAvailable": true
    },
    "historicalClosingPrices": {
        "oneDay": 16.64,
        "oneWeek": 16.64,
        "oneMonth": 22.51,
        "threeMonths": 18.7,
        "startOfYear": 17.38,
        "oneYear": 43.47,
        "threeYears": 27.1,
        "fiveYears": 6.96,
        "start": 13.9,
        "startDate": "2014-11-12"
    },
    "keyIndicators": {
        "numberOfOwners": 215505,
        "reportDate": "2023-02-23",
        "directYield": 0.0859,
        "volatility": 0.7121,
        "beta": 1.3852,
        "priceEarningsRatio": -2.8,
        "priceSalesRatio": 3.68,
        "returnOnEquity": 0.0702,
        "returnOnTotalAssets": -0.0626,
        "equityRatio": 0.3762,
        "capitalTurnover": 0.0442,
        "operatingProfitMargin": 0.5973,
        "netMargin": -1.4164,
        "marketCapital": {
            "value": 27868741423.42,
            "currency": "SEK"
        },
        "equityPerShare": {
            "value": 38.43,
            "currency": "SEK"
        },
        "turnoverPerShare": {
            "value": 4.52,
            "currency": "SEK"
        },
        "earningsPerShare": {
            "value": -5.95,
            "currency": "SEK"
        },
        "dividend": {
            "exDate": "2023-03-30",
            "paymentDate": "2023-04-05",
            "amount": 0.11,
            "currencyCode": "SEK",
            "exDateStatus": "FUTURE"
        },
        "dividendsPerYear": 12,
        "nextReport": {
            "date": "2023-04-28",
            "reportType": "INTERIM"
        },
        "previousReport": {
            "date": "2023-02-23",
            "reportType": "ANNUAL"
        }
    },
    "quote": {
        "last": 16.84,
        "highest": 17.045,
        "lowest": 16.41,
        "change": 0.2,
        "changePercent": 1.2,
        "timeOfLast": 1677860971000,
        "totalValueTraded": 302491365.04,
        "totalVolumeTraded": 17979978,
        "updated": 1677860971476,
        "volumeWeightedAveragePrice": 16.824
    },
    "type": "STOCK",
    "news": [
        {
            "timePublishedMillis": 1569999960000,
            "timePublished": "2019-10-02T09:06:00",
            "headline": "Fastighetsfavoriten har blivit dyr",
            "vignette": "Aktieanalys",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2019/10/02/fastighetsfavorit-med-lag-potential.html",
            "intro": "Det mesta går för högtryck när det gäller Samhällsbyggnadsbolaget. Kursrusningen har tryckt upp värderingen rejält och det är svårt att i närtid motivera en fortsatt uppgång.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1591356180000,
            "timePublished": "2020-06-05T13:23:00",
            "headline": "SBB: Låg värdering och stark historik",
            "vignette": "Aktieanalys",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2020/06/05/sbb-lag-vardering-och-stark-historik.html",
            "intro": "Det händer som vanligt en hel del kring SBB, inte allt positivt. Värderingen är dock låg och vi tycker aktien är köpvärd.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1605187980000,
            "timePublished": "2020-11-12T14:33:00",
            "headline": "Tiden talar för urstarka SBB",
            "vignette": "Aktiekommentar",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2020/11/12/urstarkt-av-sbb.html",
            "intro": "BV-favoriten SBB:s aktie har varit synnerligen volatil under året, särskilt när man beaktar den låga operativa risken med långa hyreskontrakt och säkra kassaflöden från samhällsfastigheter.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1614760560000,
            "timePublished": "2021-03-03T09:36:00",
            "headline": "Ett starkare SBB kliver in i 2021",
            "vignette": "Aktieanalys",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2021/03/03/ett-starkare-sbb-kliver-in-i-2021.html",
            "intro": "SBB:s bokslut var väldigt robust precis som de föregående rapporterna under fjolåret. 2020 kan nu summeras som ett mycket starkt år trots pandemi och tillhörande osäkerhet. Det ser även bra ut framåt.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1636532700000,
            "timePublished": "2021-11-10T09:25:00",
            "headline": "Börsveckan: Mer uppsida i SBB",
            "vignette": "Aktieanalys",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2021/11/10/borsveckan-mer-uppsida-i-sbb.html",
            "intro": "Ilija Batljans fastighetsbolag går som tåget på börsen såväl som operativt. Q3-rapporten stärker vår positiva syn på aktien och vi ser klart mer uppsida.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1646208120000,
            "timePublished": "2022-03-02T09:02:00",
            "headline": "Börsveckan: SBB i hetluften",
            "vignette": "Aktieanalys",
            "articleType": "Analys",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/03/02/borsveckan-sbb-i-hetluften.html",
            "intro": "SBB har varit i hetluften med en blankarrapport ute och ett bokslut som överlag var stabilt. Kursen har pressats vilket skapar köpläge.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1664259680572,
            "timePublished": "2022-09-27T08:21:20.572",
            "headline": "BV: En titt på Utdelningsportföljen ",
            "vignette": "Aktiekrönika",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/09/27/bv-en-titt-pa-utdelningsportfoljen.html",
            "intro": "Nu är det åter dags att titta på hur vår Utdelningsportfölj har stått sig i börsturbulensen. Facit är hittills okej, men helt nöjda är vi inte.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1665063480000,
            "timePublished": "2022-10-06T15:38:00",
            "headline": "Aktierna med högst andel nya ägare",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/06/aktierna-med-hogst-andel-nya-agare.html",
            "intro": "Energi, stål och vapen toppar listan över storbolagen som fått störst andel nya ägare hos Avanza hittills under året.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1665141720000,
            "timePublished": "2022-10-07T13:22:00",
            "headline": "Så ser Rutger Arnhults depå ut nu",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/07/rutger-arnhults-depa-efter-forsaljningen.html",
            "intro": "Under torsdagen tvingades Rutger Arnhult sälja aktier i skötebarnet Castellum. Han äger fortfarande aktier i 40 bolag noterade på Stockholmsbörsen. Här är depån nu.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1665649683967,
            "timePublished": "2022-10-13T10:28:03.967",
            "headline": "Fem faktorer som styr rapporthumöret",
            "vignette": "Rapportperioden",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/13/fem-faktorer-som-styr-rapporthumoret.html",
            "intro": "Nästa vecka brakar rapportperioden loss på allvar. Placera dyker ned i fem teman som vi tror kommer att sätta tonen för börsutvecklingen.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666167180000,
            "timePublished": "2022-10-19T10:13:00",
            "headline": "Storbolagen med störst kurspotential",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/19/storbolagen-med-storst-kurspotential.html",
            "intro": "Årets börsnedgång har inte fått analytikerna att ge upp hoppet. Andelen köpråd bland storbolagen är fortsatt hög och avståndet till riktkurserna är i flera fall stort, visar vår genomgång.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666350960000,
            "timePublished": "2022-10-21T13:16:00",
            "headline": "Kortklämman slår igen i Sinch",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/21/kortklamman-slar-igen-i-sinch.html",
            "intro": "Den omvända vinstvarningen från Sinch har utlöst en kortklämma. Sinchaktien stiger knappt 40 procent under fredagen.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666607100000,
            "timePublished": "2022-10-24T12:25:00",
            "headline": "Bra men spretiga rapportsignaler",
            "vignette": "Rapportfloden",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/10/24/bra-men-spretiga-rapportsignaler.html",
            "intro": "Bättre resultat än väntat, men försiktigt mottagande på börsen. Det är facit av storbolagsrapporterna så här långt och vi ser ett par trender som sticker ut i bruset.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666852006000,
            "timePublished": "2022-10-27T08:26:46",
            "headline": "SBB:s rapport under Pinpointkonsensus",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Pinpoint Estimates",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/10/27/samhallsbyggnadsbolaget-i-norden-sbbs-rapport-under-pinpointkonsensus.html",
            "intro": "Pinpoints sammanställda förväntningar för fastighetsbolaget Samhällsbyggnadsbolaget rapport för det tredje kvartalet var 731 MSEK för förvaltningsresultat och 185 SEK för vinst per aktie.(Förvaltnings",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666855740000,
            "timePublished": "2022-10-27T09:29:00",
            "headline": "Första Intrycket, SBB i Norden kv3 2022: Större värdeminskningar än väntat",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/10/27/samhallsbyggnadsbolaget-i-norden-forsta-intrycket-sbb-i-norden-kv3-2022-storre-vardeminskningar-an-vantat.html",
            "intro": "Carlsquare Equity Research ger sina första intryck på SBB:s kv3 2022-rapport. Läs hela kommentaren här   Om Carlsquare Carlsquare är ett väletablerat analyshus och en topprankad finansiell rådgivare m",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1666945800000,
            "timePublished": "2022-10-28T10:30:00",
            "headline": "Analysuppdatering SBB i Norden, kv3 2022: På god väg att rida ut stormen",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/10/28/samhallsbyggnadsbolaget-i-norden-analysuppdatering-sbb-i-norden-kv3-2022-pa-god-vag-att-rida-ut-stormen.html",
            "intro": "Carlsquare Equity Research har gjort en analysuppdatering efter SBB i Nordens kv3 2022-rapport. Läs hela analysuppdateringen här   Om Carlsquare Carlsquare är ett väletablerat analyshus och en toppran",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1667210400000,
            "timePublished": "2022-10-31T11:00:00",
            "headline": "Presenterar planer att renodla bolaget - SBB",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Penser Access",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/10/31/samhallsbyggnadsbolaget-i-norden-presenterar-planer-att-renodla-bolaget-sbb.html",
            "intro": "Fortsätter att leverera ifrån kärnverksamhetenHyresintäkterna i kvartalet uppgick till 1 888 mkr, vilket var i linje med marknadens estimat. Siffran motsvarar en tillväxt om 32% y/y och en tillväxt i ",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1668155400000,
            "timePublished": "2022-11-11T09:30:00",
            "headline": "Godkända rapporter, men inte lysande ",
            "vignette": "Rapportperioden",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/11/11/godkand-men-inte-lysande.html",
            "intro": "Rapportperioden för storbolagen i Stockholm är nu överstökad och en majoritet har slagit vinst- och försäljningsprognoserna. En lättnad i recessionsoron, men utfallet är inte mer än godkänt.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1669883989000,
            "timePublished": "2022-12-01T09:39:49",
            "headline": "Månadens vinnare på Large Cap",
            "vignette": "Aktier",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/01/manadens-vinnare-och-forlorare.html",
            "intro": "Börsens breda index levererade ännu en positiv månad med en uppgång om drygt sju procent i november. Placera har listat senaste månadens vinnare och förlorare på Stockholmsbörsens Large Cap-lista.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1669973400000,
            "timePublished": "2022-12-02T10:30:00",
            "headline": "ANALYS Samhällsbyggnadsbolaget: Säljer andel i infrastruktur utbildning till Brookfield",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Analysguiden",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/12/02/samhallsbyggnadsbolaget-i-norden-analys-samhallsbyggnadsbolaget-saljer-andel-i-infrastruktur-utbildning-till-brookfield.html",
            "intro": "Fastighetsbolaget rapporterar ett rekordhögt driftnetto och framgent ligger fokus på att förstärka balansräkningen. Analysguiden justerar riktkursen.   Rapporterar det högsta driftnettot hittills unde",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670231280000,
            "timePublished": "2022-12-05T10:08:00",
            "headline": "Analysuppdatering SBB i Norden: Jätteaffär med Brookfield stärker finanserna",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2022/12/05/samhallsbyggnadsbolaget-i-norden-analysuppdatering-sbb-i-norden-jatteaffar-med-brookfield-starker-finanserna.html",
            "intro": "Carlsquare Equity Research har gjort en uppdatering med anledning av de finansiella effekterna för SBB av avyttring av 49% av aktierna i Educo till Brookfield, försäljningar av JV-andelar till Kåpan m",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670337900000,
            "timePublished": "2022-12-06T15:45:00",
            "headline": "Aktierna i Erik Selins börsportfölj",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/06/erik-selins-aktiedepa.html",
            "intro": "Erik Selins portfölj innehåller 43 aktier. Tillsammans är de värda drygt 25,8 miljarder kronor. Här är hans portfölj och de senaste inköpen och försäljningarna.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670349250000,
            "timePublished": "2022-12-06T18:54:10",
            "headline": "S&P bekräftar Samhällsbyggnadsbolaget i Norden AB:s investment grade rating BBB- med negativa utsikter - Brookfieldaffären borde ha positiv effekt",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/06/samhallsbyggnadsbolaget-i-norden-ab-sp-bekraftar-samhallsbyggnadsbolaget-i-norden-abs-investment-grade-rating-bbb-med-negativa-utsikter-brookfieldaffaren-borde-ha-positiv-effekt.html",
            "intro": "S&P Global Ratings (”S&P”) har idag bekräftat Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”):s investment grade rating BBB- med negativa utsikter. Några kommentarer från S&P:s betyg: – Vi tror att",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670443821000,
            "timePublished": "2022-12-07T21:10:21",
            "headline": "Samhällsbyggnadsbolaget i Norden AB publicerar informationsbroschyr avseende den föreslagna utdelningen av aktierna i Amasten Fastighets AB (publ)",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/07/samhallsbyggnadsbolaget-i-norden-ab-samhallsbyggnadsbolaget-i-norden-ab-publicerar-informationsbroschyr-avseende-den-foreslagna-utdelningen-av-aktierna-i-amasten-fastighets-ab-publ.html",
            "intro": "Styrelsen för Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) kallade den 28 november 2022 sina aktieägare till extra bolagsstämma den 21 december 2022 för att besluta om förslaget att dela ut samt",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670503200000,
            "timePublished": "2022-12-08T13:40:00",
            "headline": "Ett stålbad väntar fastighetsbolagen",
            "vignette": "Fastigheter",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/08/ett-stalbad-vantar-for-fastighetsbolagen.html",
            "intro": "Ett tufft år väntar för fastighetsbolagen med bantade balansräkningar för att få kontroll på kassaflödet och minska skuldsättningen. Det var den gemensamma nämnaren när vd:ar för SBB, Hemsö, Castellum",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670596916000,
            "timePublished": "2022-12-09T15:41:56",
            "headline": "Scope bekräftar BBB rating för Samhällsbyggnadsbolaget i Norden AB; ändrar Outlook till Stabil",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/09/samhallsbyggnadsbolaget-i-norden-ab-scope-bekraftar-bbb-rating-for-samhallsbyggnadsbolaget-i-norden-ab-andrar-outlook-till-stabil.html",
            "intro": "Outlook-ändringen till Stabil från Negativ återspeglar en förväntad förbättring av kreditnyckeltalen efter att Brookfield investerat i SBB:s utbildningsportfölj. Scope Ratings har idag bekräftat BBB r",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1670846580000,
            "timePublished": "2022-12-12T13:03:00",
            "headline": "Kärnavfallsfondens aktiedepå",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/12/karnavfallsfondens-aktiedepa.html",
            "intro": "Kärnavfallsfonden ska bekosta lagringen av kärnavfall från kärnkraftverken. Här är fondens aktieportfölj och de senaste inköpen och försäljningarna.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671003900000,
            "timePublished": "2022-12-14T08:45:00",
            "headline": "Börsveckan: Många lärdomar från 2022",
            "vignette": "Aktiekrönika",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/14/borsveckan-manga-lardomar-fran-2022.html",
            "intro": "Nu stänger vi böckerna för det turbulenta året 2022 och med det så gör vi en uppföljning över våra råd under året. Historiskt har oddsen för att tjäna pengar på Börsveckans råd varit väldigt goda. Hur",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671199610000,
            "timePublished": "2022-12-16T15:06:50",
            "headline": "Diakonissehuset Lovisenberg overtar Gardermoen sykehus – \"vi skal drive sykehuset i hvert fall frem til 2048\"",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/16/samhallsbyggnadsbolaget-i-norden-ab-diakonissehuset-lovisenberg-overtar-gardermoen-sykehus-vi-skal-drive-sykehuset-i-hvert-fall-frem-til-2048.html",
            "intro": "Stiftelsen Diakonissehuset Lovisenberg blir ny leietaker på SBB Samfunnsbyggs sykehus på Gardermoen fra 01.01.2023. Fra samme dato vil sykehuset få nytt navn, Cathinka Guldbergs sykehus, oppkalt etter",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671199610000,
            "timePublished": "2022-12-16T15:06:50",
            "headline": "Diakonissehuset Lovisenberg blir ny hyresgäst till Samhällsbyggnadsbolaget i Norden AB:s sjukhus i Oslo – \"vi ska driva sjukhuset åtminstone till 2048\"",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/16/samhallsbyggnadsbolaget-i-norden-ab-diakonissehuset-lovisenberg-blir-ny-hyresgast-till-samhallsbyggnadsbolaget-i-norden-abs-sjukhus-i-oslo-vi-ska-driva-sjukhuset-atminstone-till-2048.html",
            "intro": "Stiftelsen Diakonissehuset Lovisenberg blir ny hyresgäst på Samhällsbyggnadsbolaget i Norden AB:s (\"SBB\") sjukhus vid Gardermoen, Oslo. Avtalet löper från den 1 januari, 2023 och från samma datum får ",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671542940000,
            "timePublished": "2022-12-20T14:29:00",
            "headline": "Stockholmsbörsens vildaste aktier",
            "vignette": "Börs",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2022/12/20/stockholmsborsens-vildaste-aktier.html",
            "intro": "Det har varit ett svängigt börsår och när index rör på sig kan man vara säker på att många enskilda aktier rör sig ännu mer. Men vilka aktier är vildast på Stockholmsbörsen? Placera dyker ner i volati",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671616800000,
            "timePublished": "2022-12-21T11:00:00",
            "headline": "Extra bolagsstämma i Samhällsbyggnadsbolaget i Norden AB (publ)",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/21/samhallsbyggnadsbolaget-i-norden-ab-extra-bolagsstamma-i-samhallsbyggnadsbolaget-i-norden-ab-publ.html",
            "intro": "Idag den 21 december 2022 beslutades vid Samhällsbyggnadsbolaget i Norden AB:s (publ) (”SBB”) extra bolagsstämma att samtliga SBB:s aktier i dotterbolaget Amasten Fastighets AB (publ) (under namnändri",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671616946000,
            "timePublished": "2022-12-21T11:02:26",
            "headline": "Avstämningsdag för utdelningen fastställd och Amasten Fastighets AB (publ) byter namn till Neobo Fastigheter AB (publ)",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/21/samhallsbyggnadsbolaget-i-norden-ab-avstamningsdag-for-utdelningen-faststalld-och-amasten-fastighets-ab-publ-byter-namn-till-neobo-fastigheter-ab-publ.html",
            "intro": "Styrelsen i Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) har beslutat att fastställa avstämningsdagen för utdelningen till den 28 december 2022. Extra bolagsstämma i Amasten Fastighets AB (publ)",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1671708600000,
            "timePublished": "2022-12-22T12:30:00",
            "headline": "SBB tar in Industricentralen som 49 procent delägare i ett dotterbolag som kommer att äga ca 38,6 miljoner Heba B-aktier - Industricentralen betalar 680 mkr för aktierna",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2022/12/22/samhallsbyggnadsbolaget-i-norden-ab-sbb-tar-in-industricentralen-som-49-procent-delagare-i-ett-dotterbolag-som-kommer-att-aga-ca-386-miljoner-heba-b-aktier-industricentralen-betalar-680-mkr-for-aktierna.html",
            "intro": "Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) säljer in 38 548 723 aktier i Heba till ett nybildat bolag med Industricentralen som delägare till 49 procent. Priset på aktierna sätts till 36 kr/ak",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1673874294000,
            "timePublished": "2023-01-16T14:04:54",
            "headline": "Aktierna med flest investerarestimat inför rapportperioden Q4",
            "vignette": "Plejd",
            "articleType": "Övrigt",
            "newsSource": "Pinpoint Estimates",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/01/16/plejd-aktierna-med-flest-investerarestimat-infor-rapportperioden-q4.html",
            "intro": "En sammanställning av de 20 populäraste svenska aktierna på Pinpoint Estimates inför rapportperioden Q4 visar att Evolution fortsätter att vara den aktie som investerare är mest intresserade av. Nedan",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1674045865000,
            "timePublished": "2023-01-18T13:44:25",
            "headline": "SBB slutför första tillträdet avseende portfölj inom social infrastruktur för utbildning med Brookfield och erhåller 6,6 mdkr i kontant betalning",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/01/18/samhallsbyggnadsbolaget-i-norden-ab-sbb-slutfor-forsta-tilltradet-avseende-portfolj-inom-social-infrastruktur-for-utbildning-med-brookfield-och-erhaller-66-mdkr-i-kontant-betalning.html",
            "intro": "30 november 2022 kommunicerade Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) en ovillkorad försäljning avseende en andel om 49 procent av sin portfölj inom social infrastruktur för utbildning til",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1674541800000,
            "timePublished": "2023-01-24T07:30:00",
            "headline": "Samhällsbyggnadsbolaget i Norden AB vinner Nordnets Stora Spararpriset 2023 i kategorin ”Årets investerarkommunikation”",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/01/24/samhallsbyggnadsbolaget-i-norden-ab-samhallsbyggnadsbolaget-i-norden-ab-vinner-nordnets-stora-spararpriset-2023-i-kategorin-arets-investerarkommunikation.html",
            "intro": "Nordnets Stora Spararpriset 2023 är en utmärkelse i syfte att uppmärksamma och uppmuntra börsbolag som lyckats bra. Det delas ut till börsbolag som har framåtanda och gör skillnad inom sin nisch. Sven",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1674630000000,
            "timePublished": "2023-01-25T08:00:00",
            "headline": "Samhällsbyggnadsbolaget i Norden AB tecknar nytt och förlänger hyresavtal i södra Sverige",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/01/25/samhallsbyggnadsbolaget-i-norden-ab-samhallsbyggnadsbolaget-i-norden-ab-tecknar-nytt-och-forlanger-hyresavtal-i-sodra-sverige.html",
            "intro": "Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) har förlängt och tecknat två nya hyresavtal med samhällshyresgäster i Lund och Simrishamn. I fastigheten Solrosen 9 tecknar SBB ett nytt tio-årigt hy",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1675168200000,
            "timePublished": "2023-01-31T13:30:00",
            "headline": "Samhällsbyggnadsbolaget i Norden AB erhåller en topp ESG rating från Sustainalytics",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/01/31/samhallsbyggnadsbolaget-i-norden-ab-samhallsbyggnadsbolaget-i-norden-ab-erhaller-en-topp-esg-rating-fran-sustainalytics.html",
            "intro": "Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) har identifierats som ett topp ESG-presterande bolag av Sustainalytics (ESG Regional Top Rated 2023). Sustainalytics täcker över 15 000 företag globa",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1676013300000,
            "timePublished": "2023-02-10T08:15:00",
            "headline": "Preview SBB i Norden, kv4 2022: Bättre värderat än tidigare efter transaktioner",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/10/samhallsbyggnadsbolaget-i-norden-preview-sbb-i-norden-kv4-2022-battre-varderat-an-tidigare-efter-transaktioner.html",
            "intro": "Carlsquare Equity Research presenterar sina förväntningar inför SBB i Nordens kv4 2022-rapport den 23 februari.Läs hela kommentaren här Om CarlsquareCarlsquare är ett väletablerat analyshus och en top",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1676020440000,
            "timePublished": "2023-02-10T10:14:00",
            "headline": "Börsveckan: Neobo in i hetluften",
            "vignette": "",
            "articleType": "Kommentar",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/10/borsveckan-neobo-in-i-hetluften.html",
            "intro": "SBB knoppade av bostadsbolaget Neobo den 30 december 2022. På fredag började aktien handlas på First North. Vi har tagit en närmare titt på aktien.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1676538000000,
            "timePublished": "2023-02-16T10:00:00",
            "headline": "Inbjudan till presentation av Samhällsbyggnadsbolaget i Norden AB:s bokslutskommuniké 2022",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/02/16/samhallsbyggnadsbolaget-i-norden-ab-inbjudan-till-presentation-av-samhallsbyggnadsbolaget-i-norden-abs-bokslutskommunik-2022.html",
            "intro": "Samhällsbyggnadsbolaget i Norden AB (publ) (“SBB”) kommer att offentliggöra sin bokslutskommuniké för 2022 den 23 februari 2023 kl. 08:00 (CEST). SBB:s vd Ilija Batljan presenterar resultatet samma da",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1676552182000,
            "timePublished": "2023-02-16T13:56:22",
            "headline": "SBB: Estimatintervall Q422 (69 estimat)",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Pinpoint Estimates",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/16/samhallsbyggnadsbolaget-i-norden-sbb-estimatintervall-q422-69-estimat.html",
            "intro": "Den 23 februari rapporterar Samhällsbyggnadsbolaget i Norden för det fjärde kvartalet.Estimatintervall inför rapport (Mkr)Förvaltningsresultat 381 - 971Vinst per aktie (sek) -2,15 - 3,44Pinpoint Estim",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677066107000,
            "timePublished": "2023-02-22T12:41:47",
            "headline": "Svag börs, Truecaller och Bico faller",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/22/svag-bors-truecaller-och-bico-faller.html",
            "intro": "Stockholmsbörsen handlades på minus vid lunchtid på onsdagen när fokus i marknaden låg på protokollet från Feds senaste räntemöte som publiceras under kvällen.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677132000000,
            "timePublished": "2023-02-23T07:00:00",
            "headline": "SBB fortsätter att öka fokus på samhällsfastigheter – utvärderar förutsättningarna att notera dotterbolaget Sveafastigheter",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/02/23/samhallsbyggnadsbolaget-i-norden-ab-sbb-fortsatter-att-oka-fokus-pa-samhallsfastigheter-utvarderar-forutsattningarna-att-notera-dotterbolaget-sveafastigheter.html",
            "intro": "Styrelsen i Samhällsbyggnadsbolaget i Norden AB (publ) (”SBB”) har beslutat att utvärdera förutsättningarna att notera dotterbolaget Sveafastigheter. Sveafastigheter kommer inför noteringen att äga bo",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677135600000,
            "timePublished": "2023-02-23T08:00:00",
            "headline": "Samhällsbyggnadsbolaget i Norden AB, Bokslutskommuniké 2022: Kärnverksamheten fortsätter att leverera",
            "vignette": "Samhällsbyggnadsbolaget i Norden AB",
            "articleType": "Pressrelease",
            "newsSource": "Cision",
            "fullArticleLink": "https://www.placera.se/placera/pressmeddelanden/2023/02/23/samhallsbyggnadsbolaget-i-norden-ab-samhallsbyggnadsbolaget-i-norden-ab-bokslutskommunik-2022-karnverksamheten-fortsatter-att-leverera.html",
            "intro": "SAMHÄLLSBYGGNADSBOLAGET I NORDEN AB (PUBL): ÅRET I KORTHET  Hyresintäkterna ökade med 26 procent till 7 447 mkr (5 930). Driftsöverskottet ökade med 21 procent till 4 881 mkr (4 047). Kassaflöde från ",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677135987000,
            "timePublished": "2023-02-23T08:06:27",
            "headline": "SBB Nordens förvaltningsresultat över förväntningarna baserat på 111 estimat",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Pinpoint Estimates",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/23/samhallsbyggnadsbolaget-i-norden-sbb-nordens-forvaltningsresultat-over-forvantningarna-baserat-pa-111-estimat.html",
            "intro": "Pinpointkonsensus inför SBB Norden Q4-rapport baseras på 111 estimat. Sammanställningen anges i miljoner kronor och kronor för vinst per aktie.Förvaltningsresultat Pinpointkonsensus: 611Utfall: 656Dif",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677138960000,
            "timePublished": "2023-02-23T08:56:00",
            "headline": "Första Intrycket SBB i Norden, kv4 2022: Bättre intjäningsförmåga än väntat",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/23/samhallsbyggnadsbolaget-i-norden-forsta-intrycket-sbb-i-norden-kv4-2022-battre-intjaningsformaga-an-vantat.html",
            "intro": "Carlsquare Equity Research presenterar sina första intryck efter SBB i Nordens kv4 2022-rapport.Läs hela analysuppdateringen här Om CarlsquareCarlsquare är ett väletablerat analyshus och en topprankad",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677139020000,
            "timePublished": "2023-02-23T08:57:00",
            "headline": "Rapportfloden: Blandade resultat",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/23/rapportfloden-blandade-resultat.html",
            "intro": "Lundbergs, Bure, Sensys, SBB, Björn Borg, Lundin Mining och Zaplox finns bland bolagen som publicerat sina kvartalssiffror.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677143624000,
            "timePublished": "2023-02-23T10:13:44",
            "headline": "Börsen på plus, Electrolux backar",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/23/borsen-pa-plus-electrolux-backar.html",
            "intro": "Stockholmsbörsen inledde torsdagen på plus. Electrolux påstås ha brutit mot konkurrensregler i Frankrike och sjönk i börsstarten.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677222180000,
            "timePublished": "2023-02-24T08:03:00",
            "headline": "Analysuppdatering SBB i Norden, kv4 2022: Bättre intjäning väger upp lägre substans",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Carlsquare",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/24/samhallsbyggnadsbolaget-i-norden-analysuppdatering-sbb-i-norden-kv4-2022-battre-intjaning-vager-upp-lagre-substans.html",
            "intro": "Carlsquare Equity Research har gjort en analysuppdatering på SBB i Norden efter bolagets kv4 2022-rapport. Läs hela analysuppdateringen här   Om Carlsquare Carlsquare är ett väletablerat analyshus och",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677224880000,
            "timePublished": "2023-02-24T08:48:00",
            "headline": "Fredagens alla nya aktierekar",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/24/fredagens-alla-nya-aktierekar.html",
            "intro": "Alimak och Garo finns bland aktierna som fått nya riktkurser eller rekommendationer.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677241140000,
            "timePublished": "2023-02-24T13:19:00",
            "headline": "Börsen runt nollan, SBB förlorare ",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/24/borsen-uppat-elekta-vinnare.html",
            "intro": "Stockholmsbörsen handlades med små indexrörelser på fredagen i likhet med de övriga börserna i Norden. Bland vinnarna i storbolagsindex fanns ett antal verkstadsbolag medan Getinge och SBB var förlora",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677485711000,
            "timePublished": "2023-02-27T09:15:11",
            "headline": "Börsveckans senaste aktieråd",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/27/borsveckans-senaste-aktierad.html",
            "intro": "Här är aktierekommendationerna från senastes utgåvan av tidningen Börsveckan.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677487717000,
            "timePublished": "2023-02-27T09:48:37",
            "headline": "Börsen stiger, H&M lyfter på rek",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/27/borsen-stiger-hm-lyfter-pa-rek.html",
            "intro": "Stockholmsbörsen inledde måndagen med högre kurser i en bred uppgång när handeln under Stockholmsområdets sportlovsvecka tog vid.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677492000000,
            "timePublished": "2023-02-27T11:00:00",
            "headline": "Renodling fortsatt prioritet för bolaget - SBB",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Penser Access",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/02/27/samhallsbyggnadsbolaget-i-norden-renodling-fortsatt-prioritet-for-bolaget-sbb.html",
            "intro": "Nedskrivningar av fastighetsvärden dominerar rapportenHyresintäkterna i kvartalet var 1 850 mkr. Driftsnettot var 1 105 mkr, vilket motsvarar en överskottsgrad om 60%. Resultatet före värdeförändringa",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677499306000,
            "timePublished": "2023-02-27T13:01:46",
            "headline": "Börsen på plus, SBB bland vinnarna",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/27/borsen-pa-plus-sbb-bland-vinnarna.html",
            "intro": "Stockholmsbörsen handlades uppåt i något tunnare handel på måndagen i och med att Stockholmsområdets sportlovsvecka tagit vid.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677570060000,
            "timePublished": "2023-02-28T08:41:00",
            "headline": "Tisdagens alla nya aktierekar",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/28/tisdagens-alla-nya-aktierekar.html",
            "intro": "SBB och Boliden finns bland aktierna som fått nya riktkurser eller rekommendationer.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677573065000,
            "timePublished": "2023-02-28T09:31:05",
            "headline": "Börsen backar, budplaner tynger Nibe",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/28/borsen-backar-budplaner-tynger-nibe.html",
            "intro": "Stockholmsbörsen handlades nedåt i tisdagens öppning, efter att morgonen präglats av delårsrapporter från mindre bolag och svensk BNP-data. Nibe sjönk på bekräftade samtal om ett japanskt förvärv meda",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677584822000,
            "timePublished": "2023-02-28T12:47:02",
            "headline": "Börsen kvar på minus, Nibe backar",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/02/28/borsen-kvar-pa-minus-nibe-backar.html",
            "intro": "Stockholmsbörsen handlades vid lunchtid försiktigt nedåt. Därmed hade den inledande nedgången dämpats. H&M och Volvo låg i topp bland de mest omsatta storbolagen medan Nibe föll efter bekräftade förvä",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677602473000,
            "timePublished": "2023-02-28T17:41:13",
            "headline": " FÖRVÄRVSUPPGIFTER FICK NIBE PÅ FALL, OMXS30 -0,4%",
            "vignette": "BÖRSEN",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/02/28/borsen-forvarvsuppgifter-fick-nibe-pa-fall-omxs30-04.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Stockholmsbörsen lyckades efter en trög start komma tillbaka och stängde i en vikande kurstendens på tisdagen. Nibe utvecklades svagt efter att bolaget bekräftade förvär",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677651902000,
            "timePublished": "2023-03-01T07:25:02",
            "headline": "Ilija Batljan Invest minskar nettoresultatet",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/01/samhallsbyggnadsbolaget-i-norden-ilija-batljan-invest-minskar-nettoresultatet.html",
            "intro": "Ilija Batljan Invest, som är SBB-chefen Ilija Batljans egna investmentbolag, redovisar minskande nettoresultat under fjärde kvartalet jämfört med samma period året innan.Hyresintäkterna uppgick till 5",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677660304000,
            "timePublished": "2023-03-01T09:45:04",
            "headline": " FASTIGHETSSEKTORN MOT STRÖMMEN, OMXS30 +0,4%",
            "vignette": "BÖRSEN",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/01/borsen-fastighetssektorn-mot-strommen-omxs30-04.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Stockholmsbörsen handlades uppåt i onsdagens inledning, efter att Asiens börser stigit under onsdagsmorgonen, och där börsen i Hongkong stärktes cirka 4 procent med stöd",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677662356000,
            "timePublished": "2023-03-01T10:19:16",
            "headline": "Börsen stiger, Boliden går starkt",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/03/01/borsen-stiger-boliden-gar-starkt.html",
            "intro": "Stockholmsbörsen handlades uppåt i onsdagens inledning, efter att Asiens börser stigit under onsdagsmorgonen, och där börsen i Hongkong stärktes cirka 4 procent med stöd av statistik från Kina. Affärs",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677672685000,
            "timePublished": "2023-03-01T13:11:25",
            "headline": " INDUSTRIBOLAG UPP EFTER STARK KINA-SIFFRA, OMXS30 +0,7%",
            "vignette": "BÖRSEN",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/01/borsen-industribolag-upp-efter-stark-kina-siffra-omxs30-07.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Stockholmsbörsen var upp vid lunchtid på onsdagen, efter att Asienbörserna stigit efter ett starkt kinesiskt inköpschefsindex. Särskilt verkstads- och industribolag gick",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677673369000,
            "timePublished": "2023-03-01T13:22:49",
            "headline": "Börsen på plus, Kina lyfter industri",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/03/01/borsen-pa-plus-kina-lyfter-industri.html",
            "intro": "Stockholmsbörsen var upp vid lunchtid på onsdagen, efter att Asienbörserna stigit efter ett starkt kinesiskt inköpschefsindex. Särskilt verkstads- och industribolag gick starkt. Den svenska fastighets",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677689429000,
            "timePublished": "2023-03-01T17:50:29",
            "headline": " INFLATIONSORO TRUMFADE STARK KINA-SIFFRA, OMXS30 -0,5%",
            "vignette": "BÖRSEN",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/01/borsen-inflationsoro-trumfade-stark-kina-siffra-omxs30-05.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Stockholmsbörsen slutade lägre på onsdagen sedan inflationsoro kring Tyskland vägt tyngre än det oväntat starka kinesiska inköpschefsindex som i början av handelsdagen g",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677737559000,
            "timePublished": "2023-03-02T07:12:39",
            "headline": "PM NYHETER I KORTHET TORSDAG 2 MARS",
            "vignette": "",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/02/pm-nyheter-i-korthet-torsdag-2-mars.html",
            "intro": "JA TILL EURON. Den svaga svenska kronan har varit hett omdebatterad och nu vill en majoritet av näringslivstopparna införa den gemensamma europeiska valutan. (DI)DÅLIGA LÅN. Statliga startlån till för",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677739206000,
            "timePublished": "2023-03-02T07:40:06",
            "headline": "Kepler Cheuvreux sänker riktkursen för SBB till 23 kronor (24), upprepar köp",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/02/samhallsbyggnadsbolaget-i-norden-kepler-cheuvreux-sanker-riktkursen-for-sbb-till-23-kronor-24-upprepar-kop.html",
            "intro": "Kepler Cheuvreux sänker riktkursen för SBB till 23 kronor (24), upprepar köpnewsroom@finwire.seNyhetsbyrån Finwire",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677759516000,
            "timePublished": "2023-03-02T13:18:36",
            "headline": "Uppstädningsperioden i SBB över - Kepler",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/02/samhallsbyggnadsbolaget-i-norden-uppstadningsperioden-i-sbb-over-kepler.html",
            "intro": "Kepler Cheuvreux behåller sin köprekommendation på fastighetsbolaget SBB även om den underliggande vinsten i fjärde kvartalet bommade förväntningarna. Utfallet var sju procent under Keplers prognos.Sa",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677766979000,
            "timePublished": "2023-03-02T15:22:59",
            "headline": "Podd: Aktierna med rätt energi",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/03/02/borsen-velar-infor-varen.html",
            "intro": "Krympande kreditbetyg, fallande folkaktier, tyska komponentpärlor, maxade ränteavdrag och våra aktiefavoriter inför mars. Ett nytt fullmatat avsnitt av Redaktionspodden med Daniel McPhee, Martin Blomg",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677822175000,
            "timePublished": "2023-03-03T06:42:55",
            "headline": "Goldman Sachs sänker riktkursen för SBB till 15 kronor (17), upprepar sälj - BN",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/samhallsbyggnadsbolaget-i-norden-goldman-sachs-sanker-riktkursen-for-sbb-till-15-kronor-17-upprepar-salj-bn.html",
            "intro": "Goldman Sachs sänker riktkursen för SBB till 15 kronor (17), upprepar sälj - BNnewsroom@finwire.seNyhetsbyrån Finwire",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677825231000,
            "timePublished": "2023-03-03T07:33:51",
            "headline": "PM NYHETER I KORTHET FREDAG 3 MARS",
            "vignette": "",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/pm-nyheter-i-korthet-fredag-3-mars.html",
            "intro": "HANDELN. Pessimismen bland handlarna breder ut sig och alla siffror pekar åt fel håll, enligt Sofia Larsen, vd på Svensk Handel. (SvD)SVAGT SAS. Rapporterna från flygbolagen är i många fall tillbaka p",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677827347000,
            "timePublished": "2023-03-03T08:09:07",
            "headline": " GOLDMAN SACHS SÄNKER RIKTKURSEN TILL 15 KR (17)",
            "vignette": "SBB",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/sbb-goldman-sachs-sanker-riktkursen-till-15-kr-17.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Goldman Sachs sänker riktkursen för SBB till 15 kronor från 17 kronor. Det framgår av ett marknadsbrev.Aktien stängde på 16:64 kronor föregående handelsdag. Börsredaktio",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677832800000,
            "timePublished": "2023-03-03T09:40:00",
            "headline": "Fredagens alla nya aktierekar",
            "vignette": "",
            "articleType": "Nyhet",
            "newsSource": "Placera.nu",
            "fullArticleLink": "https://www.placera.se/placera/redaktionellt/2023/03/03/fredagens-alla-nya-aktierekar.html",
            "intro": "Cantargia och SBB finns bland aktierna som fått nya riktkurser eller rekommendationer.",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677839100000,
            "timePublished": "2023-03-03T11:25:00",
            "headline": "Intervju med SBB - Erik Penser Bank - 3 mars 2023",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Penser Access",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/03/03/samhallsbyggnadsbolaget-i-norden-intervju-med-sbb-erik-penser-bank-3-mars-2023.html",
            "intro": "Hör SBBs VD Ilija Batljan berätta om hur SBB möter de ändrade förutsättningarna på fastighetsmarknaden.Se intervjun på Erik Penser Banks YouTube-kanal Penser Play: https://youtu.be/1Ez8B0dX52IDetta är",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677840021000,
            "timePublished": "2023-03-03T11:40:21",
            "headline": " AF-ANALYTIKER VICTOR TANAKA OM ARBETSMARKNADEN",
            "vignette": "TRADING DIREKT",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/trading-direkt-af-analytiker-victor-tanaka-om-arbetsmarknaden.html",
            "intro": "https://www.youtube.com/live/j48VLQN5gvM?feature=shareSTOCKHOLM (Direkt Studios) Tisdagens statistik från Statistiska centralbyrån, SCB, visade att arbetslösheten i snitt för 2022 uppgick till 7,5 pro",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677843795000,
            "timePublished": "2023-03-03T12:43:15",
            "headline": "SBB ser finansieringsmarknaden öppnas upp - vd",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/samhallsbyggnadsbolaget-i-norden-sbb-ser-finansieringsmarknaden-oppnas-upp-vd.html",
            "intro": "Fastighetsbolaget SBB ser att finansieringsmarknaden har börjat att öppnas upp och var som sämst i höstas. Det säger vd Ilija Batljan i en intervju med Erik Penser. Han bedömer att det sker en förbätt",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677846000000,
            "timePublished": "2023-03-03T13:20:00",
            "headline": "ANALYS Samhällsbyggnadsbolaget: Planerar särnotering av Sveafastigheter",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Övrigt",
            "newsSource": "Analysguiden",
            "fullArticleLink": "https://www.placera.se/placera/ovriga-nyheter/2023/03/03/samhallsbyggnadsbolaget-i-norden-analys-samhallsbyggnadsbolaget-planerar-sarnotering-av-sveafastigheter.html",
            "intro": "SBB växte hyresintäkterna med 26 procent i Q4 men resultatet minskade. Särnotering av Sveafastigheter väntas H1-23 och SBB fortsätter stärka balansräkningen. Utvecklingen under Q4 2022SBB:s hyresintäk",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677847313000,
            "timePublished": "2023-03-03T13:41:53",
            "headline": "Analysguiden sänker sin riktkurs för SBB till 28 kronor (32)",
            "vignette": "Samhällsbyggnadsbolaget i Norden",
            "articleType": "Telegram",
            "newsSource": "Finwire",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/samhallsbyggnadsbolaget-i-norden-analysguiden-sanker-sin-riktkurs-for-sbb-till-28-kronor-32.html",
            "intro": "Fastighetsbolaget SBB meddelade i samband med bokslutet för 2022 att bolaget planerar en börsnotering av Sveafastigheter under första halvåret 2023. Sveafastigheter har en portfölj med fastigheter i S",
            "externalLink": true
        },
        {
            "timePublishedMillis": 1677851346000,
            "timePublished": "2023-03-03T14:49:06",
            "headline": " LISTA ÖVER DE 15 MEST BLANKADE AKTIERNA I SVERIGE",
            "vignette": "BÖRS",
            "articleType": "Telegram",
            "newsSource": "Nyhetsbyrån Direkt",
            "fullArticleLink": "https://www.placera.se/placera/telegram/2023/03/03/bors-lista-over-de-15-mest-blankade-aktierna-i-sverige.html",
            "intro": "STOCKHOLM (Nyhetsbyrån Direkt) Nyhetsbyrån Direkt publicerar i slutet av varje vecka en lista över de 15 mest blankade aktierna på den svenska marknaden.Listan baseras på till Finansinspektionen inrap",
            "externalLink": true
        }
    ],
    "forum": [
        {
            "author": "Franco R.",
            "title": "Ideligen dåliga nyheter",
            "content": "Nu skriver DI om om SBB-chefen IB och dennes privata investeringar och miljardförlusterna där.\n\nÄr detta av intresse för SBBs aktieägare? Självklart.\nÄr detta av allmänintresse? Nej.\n\nVarför skriver DI om detta då? Finns en agenda? Hör det ihop med blankningen som bara ökar, enligtnpolarn på FI över 13% (uppdatering pågår på Fi-sidan)",
            "likes": 1,
            "replies": 4,
            "timestamp": 1677658684043,
            "url": "https://forum.placera.se/inlagg/06adc5e6-3f32-4fbc-a7d8-ca90ced9919d"
        },
        {
            "author": "Franco R.",
            "title": "Balder och SBB. Likheter och olikheter.",
            "content": "Hej alla kunniga fastighetsanalytiker.\n\nJag har 5 frågor som är relevanta och vill gärna diskutera med skarpa hjärnor\n\n1-Likheter mellan Balder och SBB\n2-Olikheter mellan Balder och SBB\n3-kan skräpstatus av Balder påverka SBBs aktiekurs på kort sikt.\n4-vilket av dessa företag skulle ni köpa aktier i idag (1/3) om ni hade 100,000:- att investera.\n\nJag är inte proffs på just fastighetsaktier men har gjort en snabb side-by-side…\n\n1-Balder har dubbelt så högt börsvärde jmft med SBB\n2-SBB är blankat 10% mer än Balder\n3-Balder har fler tunga, institutionella ägare och fler fonder har Balder i sin korg.\n4-Balder har ett steg lägre kreditrating än SBB.\n\nOBS! Moodys och S﹠P använder olika ratingtecken. \nBBB- motsvarar Baa3 vilket både SBB och Balder hade.\n\nAnser ni att jag är rätt ute när jag tror på förnyad kreditrating för SBB denna vecka?",
            "likes": 2,
            "replies": 15,
            "timestamp": 1677660841581,
            "url": "https://forum.placera.se/inlagg/9ce5aa5b-100a-4e93-a38a-e40445d7bc16"
        },
        {
            "author": "Mathias Karlsson",
            "title": "NEOBO AKTIER",
            "content": "Hej gott folk,\nBer om ursäkt om frågan redan kommit upp. \n\nJag har haft aktier i SBB på x dagen och läste om att aktieägaran skulle på 1/10 på avknoppade bolaget Neobo(Amasten). \nStämmer det och i så fall när kommer aktierna vara synliga på kontot?\nTack o bock\n// Mathias",
            "likes": 0,
            "replies": 4,
            "timestamp": 1677661505129,
            "url": "https://forum.placera.se/inlagg/84328caf-68dc-461e-b795-e33c7d2acff1"
        },
        {
            "author": "Franco R.",
            "title": "Många blankare vill ha en munsbit av SBB",
            "content": "Arrowstreet ökar sin position i SBB.\n\nBlankningen passerar 13% och i ökande enligt polarn på FI. Fördröjning i rapporteringen.\n\nBlankarna kalkylerar iskallt med att SBB sjunker kraftigt eftersom de kalkylerar med sänkt kreditbetyg.\n\nDe kalkylerar och resonerar på följande sätt: Om Moodys sänker @Balder så måste S﹠P agera och uppdatera sin rating av SBB.\n\nTror ni jag har rätt här?",
            "likes": 2,
            "replies": 11,
            "timestamp": 1677665224966,
            "url": "https://forum.placera.se/inlagg/021ba1d0-dd57-4593-8170-cf570de4a4e1"
        },
        {
            "author": "Nisse pistol",
            "title": "Vaccin mot blankare",
            "content": "Vi får hoppas att läkemedelsbranschen tar fram ett effektivt vaccin så blankarna försvinner för gott.",
            "likes": 3,
            "replies": 2,
            "timestamp": 1677670717396,
            "url": "https://forum.placera.se/inlagg/20d03017-f019-4c4f-a94f-2f7b66bf0924"
        },
        {
            "author": "Franco R.",
            "title": "Sveriges mest blankade aktie är..",
            "content": "… @Mips med 14,1%\n\nBlankningen i Mips har minskat från 14,9% till 14,1% på ca 10 Handelsdagar.\n\nTvåa på listan är SBB med 13,04%\n\nDet skiljer alltså ca 1% innan SBB går om Mips och kan titulera sig som Sveriges mest blankade aktie.\n\nDen andra fastighetsaktien är  @JM  med 7.2%  blankat free float. Det är Plats 13 på listan.\n\nSom fastighetsbolag är SBB unikt med hundratusentals ägare och en briljant chef, men ändå vara så hårdblankad.\n\nKan någon intelligent Plasera-medlem förklara varför det är så? Varför är SBB så blankad jämfört med andra fast.aktier?",
            "likes": 0,
            "replies": 32,
            "timestamp": 1677672615130,
            "url": "https://forum.placera.se/inlagg/f72b2276-c8de-4e28-9bb5-0e524d6dd8bc"
        },
        {
            "author": "Franco R.",
            "title": "SBB planer för Tyskland.",
            "content": "Har SBB ändrat affärsmodell?\n\nVad tror ni? Kan Tyskland vara en bättre marknad för SBB än Norden? För i Norden får det inte så bra.Kanske gynnsammare lånevillkor i Tyskland?1,5 år gammal nyhet men är väl aktuellt med stora och små köp i Tyskland? Det passar SBB:s affärsmodell står det i artikeln. Har affärsmodellen ändrats?https://www.fastighetsvarlden.se/notiser/sbbs-nasta-mal-tyskland/",
            "likes": 1,
            "replies": 26,
            "timestamp": 1677678330739,
            "url": "https://forum.placera.se/inlagg/4a6ebefc-e3d4-48d1-a5f5-89c41faf68b3"
        },
        {
            "author": "Thony",
            "title": "Vem av er var med på 1990 talet när vi hadde räntekrisen?",
            "content": "Idag är räntan fortfarande billig! Om man jämför mot då.\nJag betalad då ca 15% på 3 månaders ränta sen gick den ner till 7% när det väde ner så gick det fort upp på aktiemarknaden, ni som var med då, är det upp nu eller ner? Sbb b har bra ränta idag, samt de andra bostadsbolagen, varför kissar ni i byxan idag? när räntan är så billig mot då? Jag ser uppsida fram över, OBS INGET KÖP RÅD. var inte så negativa, efter regn kommer sol. Mvh Thony PS, var snäll mot oss små sparare och ge bra analyser uta köp råd låt alla ta egna beslut.",
            "likes": 4,
            "replies": 12,
            "timestamp": 1677695549245,
            "url": "https://forum.placera.se/inlagg/39e6a952-1dcb-4ec2-961d-6dd909e21eec"
        },
        {
            "author": "King",
            "title": "Grattis, Kepler värderar till 23kr och köprekar",
            "content": "Om alla bara tar det lugnt som känner oro. Det var någon som la ut en kommentar igår: ”efter regn kommer solsken”. Matte kanske det var 🤔. \n\nHur som haver, glöm ej denna bild:",
            "likes": 10,
            "replies": 5,
            "timestamp": 1677743141956,
            "url": "https://forum.placera.se/inlagg/ce821b42-e285-449a-8acc-53280b1c6fbc"
        },
        {
            "author": "Skägget",
            "title": "Långräntorna fortsätter upp",
            "content": "Tror vi tyvärr får se ytterligare nedgång idag då inflationsoron driver upp räntorna i både US och Tyskland.",
            "likes": 2,
            "replies": 2,
            "timestamp": 1677743435202,
            "url": "https://forum.placera.se/inlagg/562bef43-9d10-4aea-9962-6f0b2499810f"
        },
        {
            "author": "Grover",
            "title": "Räntor vs. inflation och fastighetsmarknad",
            "content": "Många verkar ha lite panik inför räntorna, som av allt att döma fortsätter upp ännu en tid. Betänk då följande:\n\n\nSBB har väldigt hög skuldsättning, det vet alla. Likaså att det är obligationer som förfaller under perioden 2023-2026 som ska lösas och därför kommer att generera en betydligt högre kapitalkostnad än tidigare. Aj aj, panik och sälj?\n\nSkuldsättningen är givetvis en direkt funktion av att SBB köpt fastigheter som sedan hyrs ut, där hyran är högre än kapitalkostnad + övriga omkostnader. Det är alltså SBB:s hela affärsidé att ha en hög skuldsättning men ännu högre 1) intäkter och 2) ta upp krediter på en marknad där inflationen är högre än kapitalkostnaden.\n\nHyreskontrakten är långa och trygga, men det andra sidan av det myntet är att kontrakten inte kan omförhandlas lika snabbt som kostnaderna går upp. Det handlar alltså nu om att klara de ökande kapitalkostnaderna tills omförhandlingar av hyreskontrakten gett intäkter med jämförbar marginal.\n\nFastigheternas värde sjunker något när kapitalkostnaderna går upp, men det är naturliga fluktrationer på marknaden som alla känner till, inte minst kreditgivarna. Inflationen verkar också i andra riktningen här. När tomater blir dyrare blir också fastigheter dyrare, men inte lika mycket, då man sällan behöver ta banklån för att köpa grönsaker. Värdet av SBB:s fastighetsbestånd kommer givetvis att gå upp igen när kapitalkostnaderna sjunker, en uppgång som då kommer att kompensera både för inflationen.\n\nOch till sist det viktigaste: Inflationen gör visserligen att kapitalkostnader och omkostnader ökar, men den gör också att värdet av SBB:s skuldsättning minskar, just nu snabbare än ökningen av kapitalkostnaderna. Om inflationen är 10% och kapitalkostnaden 5% kommer ju den som har hög skuldsättning ändå att tjäna på affären!",
            "likes": 7,
            "replies": 17,
            "timestamp": 1677745108142,
            "url": "https://forum.placera.se/inlagg/8f56e53e-81c0-43b9-81d0-50d36910bc39"
        },
        {
            "author": "esta",
            "title": "Goldman Sachs",
            "content": "Då kan vi utgå från att Goldman Sachs fått ett köpuppdrag.",
            "likes": 5,
            "replies": 9,
            "timestamp": 1677829950600,
            "url": "https://forum.placera.se/inlagg/33abbbe3-3aed-4f15-b63f-74333ab608d4"
        },
        {
            "author": "Pauls",
            "title": "Varför upprepar placera gån på gång att det är sänkt riktkursen.",
            "content": "",
            "likes": 1,
            "replies": 7,
            "timestamp": 1677834006251,
            "url": "https://forum.placera.se/inlagg/e2be5833-62d1-4524-b671-0aab7d78d9ea"
        },
        {
            "author": "JiBE",
            "title": "Poddanalys",
            "content": "https://podcasts.apple.com/se/podcast/bolagsanalyspodden/id1664598077?i=1000602610015",
            "likes": 0,
            "replies": 0,
            "timestamp": 1677840146467,
            "url": "https://forum.placera.se/inlagg/df69d7e1-a673-433b-86f0-e90198d9c2a4"
        },
        {
            "author": "StatisticalFinance",
            "title": "Sannolikheten för uppgång stor?",
            "content": "Har gjort en analys som ni kan läsa på min sida där jag kollar hur aktien brukar utvecklas när den stänger ovanför MA200 (är en signal som snart kan uppvisa sig).\nhttps://statistical-finance.com/2023/03/03/gratis-analys/",
            "likes": 3,
            "replies": 1,
            "timestamp": 1677846350462,
            "url": "https://forum.placera.se/inlagg/93f0bd35-5118-4858-9ec5-e1b69ecb09d4"
        },
        {
            "author": "Franco R.",
            "title": "Kommer vi se SBB över 26:- till midsommar?",
            "content": "Ja? Nej? Tror inte?",
            "likes": 1,
            "replies": 11,
            "timestamp": 1677857511738,
            "url": "https://forum.placera.se/inlagg/390349d4-9aa4-4e2b-84d9-52550b74738e"
        },
        {
            "author": "Nisse pistol",
            "title": "Behåll era aktier",
            "content": "Kärnverksamheten är väl att förvalta sammhällsfastigheter med långa hyresavtal ock då fylls ju kassaflödena på med jämna mellanrum.Ock bolaget arbetar ju också med fasta räntor med långa löptider ock det gynnar ju också bolaget ekonomisk.",
            "likes": 3,
            "replies": 6,
            "timestamp": 1677858748179,
            "url": "https://forum.placera.se/inlagg/7d437345-e934-42d6-97ce-78b3ff674c3d"
        },
        {
            "author": "Arlen91",
            "title": "Alla fastighetsaktier ökar lite idag",
            "content": "Det tråkiga idag är att även om börsen har en riktigt fin dag idag så går det lite segt för fastighetsaktier och detta gäller dem flesta fastighetsaktier.",
            "likes": 0,
            "replies": 0,
            "timestamp": 1677859599220,
            "url": "https://forum.placera.se/inlagg/32f36785-0e0a-4aaa-bd27-fa096ad38c53"
        },
        {
            "author": "Ballack",
            "title": "Analys SBB: Planerar särnotering av Sveafastigheter",
            "content": "Detta är en betald analys på uppdrag av Samhällsbyggnadsbolaget i Norden utförd av Analysguiden\n\nhttps://www.aktiespararna.se/analysguiden/nyheter/analys-samhallsbyggnadsbolaget-planerar-sarnotering-av-sveafastigheter",
            "likes": 6,
            "replies": 8,
            "timestamp": 1677859760609,
            "url": "https://forum.placera.se/inlagg/69dd7b77-acfd-4bb1-9c31-c80030f5a65a"
        }
    ]
}

  // Pass data to the page via props
  return { props: { security } };
}
