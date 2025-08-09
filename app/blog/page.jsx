export default async function BlogPage() {
  const res = await fetch('https://api.eyewebmaster.com/api/posts/', {
    next: { revalidate: 60 } // ISR caching
  });

  if (!res.ok) throw new Error('Failed to fetch posts');

  const data = await res.json(); // returns { count, next, previous, results }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {data.results.map((post) => (
        <article key={post.id} className="mb-6 border-b pb-4">
          <a href={`/blog/${post.slug}`}>
            <h2 className="text-xl font-semibold text-blue-600 hover:underline">
              {post.title}
            </h2>
          </a>
          <p className="text-gray-600">{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
