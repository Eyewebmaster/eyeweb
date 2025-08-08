import { notFound } from "next/navigation";

async function getPost(slug) {
  if (!slug) {
    notFound(); // If slug is missing, show 404 page
  }

  const res = await fetch(`https://api.eyewebmaster.com/posts/${slug}/`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound(); // API returned 404
  }

  return res.json();
}

export default async function BlogPostPage({ params }) {
  // ✅ Make sure params is awaited in App Router
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = await getPost(slug);

  return (
    <main className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
