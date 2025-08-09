import Link from 'next/link';

async function getCategories() {
  const res = await fetch('https://api.eyewebmaster.com/api/categories/', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  return data.results || [];
}

async function getPosts() {
  const res = await fetch('https://api.eyewebmaster.com/api/posts/', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return data.results || [];
}

export default async function BlogPage() {
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);

  const postsByCategory = categories.map(category => {
    const categoryPosts = posts.filter(
      post => post.category === category.name || post.category?.name === category.name
    ).slice(0, 5);
    return { ...category, posts: categoryPosts };
  });

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {postsByCategory.map(cat => (
          <div key={cat.id}>
            <h2 className="text-xl font-semibold text-blue-600 mb-4">
              <Link href={`/blog?category=${cat.slug}`}>{cat.name}</Link>
            </h2>
            <ul className="space-y-2">
              {cat.posts.length > 0 ? (
                cat.posts.map(post => (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">No posts</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}