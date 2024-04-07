import { unstable_noStore } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { Suspense } from 'react';

async function BlogPosts() {
  unstable_noStore();
  let res = await fetch('https://api.vercel.app/blog');
  let posts = await res.json();

  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}

export default function Page({ params, searchParams }) {
  console.log(headers());
  console.log(cookies());
  console.log(params);
  console.log(searchParams);
  return (
    <section>
      <h1>My Blog</h1>
      <Suspense fallback={'Loading...'}>
        <BlogPosts />
      </Suspense>
    </section>
  );
}
