import React from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';

export default async function BlogPostPage({ params }) {
  const res = await fetch(`https://api.eyewebmaster.com/api/posts/`, {
    cache: 'no-store'
  });
  const data = await res.json();

  const post = data?.results?.find(p => p.slug === params.slug) ?? null;


  if (!post) {
    return (
      <div className="w-full px-[12%] py-10 scroll-mt-20">
        <h1 className="text-2xl font-bold">Post not found</h1>
      </div>
    );
  }

  // Parse HTML and replace <img> tags with Next.js <Image>
  const contentWithNextImages = parse(post.content, {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'img') {
        const { src, alt } = domNode.attribs;
        return (
          <Image
            src={src}
            alt={alt || ''}
            width={800}
            height={600}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        );
      }
    }
  });

  return (
    <main className="w-full px-[12%] py-10 scroll-mt-20">
      {/* Featured Image */}
      {post.featured_image && (
        <Image
          src={post.featured_image}
          alt={post.title}
          width={1200}
          height={600}
          className="w-3xl rounded-xl mb-6 items-center mt-10"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

      {/* Categories */}
      {post.categories && post.categories.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {post.categories.map((cat, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-3 py-1 text-sm rounded-full"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-gray-500 text-sm mb-6">{post.date || ''}</p>

      {/* Content */}
      <div className="prose prose-lg max-w-none">{contentWithNextImages}</div>
    </main>
  );
}
