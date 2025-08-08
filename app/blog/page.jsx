import Link from "next/link";

async function getBlogPostsList() {
  const res = await fetch("https://api.eyewebmaster.com/posts/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog posts");
  }

  return res.json();
}

export default async function BlogListPage() {
  const posts = await getBlogPostsList();

  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
