import { unstable_noStore } from 'next/cache';

type Time = {
  datetime: string;
};

async function getTime(id: string): Promise<Time> {
  const res = await fetch(
    'http://worldtimeapi.org/api/timezone/America/Chicago' + `#${id}`,
    {
      // cache: 'default',
      next: {
        revalidate: 60,
      },
    }
  );
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const time = await getTime(params.id);
  return {
    title: `Blog ${params.id} at ${time.datetime}`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const time = await getTime(params.id);
  return (
    <h1>
      ID: {params.id} at {time.datetime}
    </h1>
  );
}
