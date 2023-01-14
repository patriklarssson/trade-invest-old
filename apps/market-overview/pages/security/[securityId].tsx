import Link from 'next/link';
import { Security as Sec } from '../../features/security/models/Security';
import {
  Stack,
  Container,
  Paper,
  Typography,
} from '@trade-invest/components-ui';

export default function Security({ data }: { data: Sec }) {
  const Test = ({ title1, title2 }) => {
    return (
      <Stack>
        <Typography
          style={{ color: '#707070' }}
          variant="subtitle2"
          component="span"
        >
          {title1}
        </Typography>
        <Typography style={{ fontWeight: 700 }} variant="h6" component="span">
          {title2}
        </Typography>
      </Stack>
    );
  };

  return (
    <div>
      <Paper>
        <Container maxWidth={'xl'}>
          <Stack>
            <Stack
              direction={'row'}
              alignItems="flex-end"
              justifyContent={'flex-start'}
            >
              <img
                alt="flag"
                style={{ borderRadius: '50%', marginRight: 5, height: 40 }}
                src="https://www.trintech.com/wp-content/uploads/2019/07/flag_sweden.png"
              />
              <Typography variant="h4">{data.name}</Typography>
              <Typography variant="subtitle1">{data.tickerSymbol}</Typography>
            </Stack>
            <Stack direction={'row'} spacing={4}>
              <Test title1={'köp'} title2={data.lastPrice} />
              <Test title1={'Sälj'} title2={data.lastPrice} />
              <Test title1={'Högsta'} title2={data.highestPrice} />
              <Test title1={'Lägsta'} title2={data.lowestPrice} />
              <Test title1={'Omsatt (Antal)'} title2={data.totalVolumeTraded} />
            </Stack>
          </Stack>
        </Container>
      </Paper>

      <Container maxWidth={'xl'}>
        <h1>YOOO</h1>
      </Container>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps({ params }) {
  // Fetch data from external API
  const res = await fetch(
    `http://localhost:3333/security/${params.securityId}`
  );
  const data = (await res.json()) as Promise<Sec>;

  // Pass data to the page via props
  return { props: { data } };
}
