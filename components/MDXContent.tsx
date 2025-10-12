import React from 'react';

interface MDXContentProps {
  content: string;
}

export default function MDXContent({ content }: MDXContentProps) {
  return (
    <div 
      className="mx-auto max-w-4xl font-work-sans text-gray-800 dark:text-gray-100 prose prose-neutral dark:prose-invert lg:prose-lg 
      [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:leading-tight 
      [&_h2]:mt-7 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:leading-tight 
      [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl 
      [&_h4]:mt-5 [&_h4]:mb-2 [&_h4]:text-lg 
      [&_p]:mb-5 [&_p]:leading-relaxed 
      [&_ul]:mb-5 [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-gray-600 dark:[&_ul]:marker:text-gray-400 
      [&_ol]:mb-5 [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:text-gray-600 dark:[&_ol]:marker:text-gray-400 
      [&_li]:mb-2 [&_li]:leading-relaxed 
      [&_blockquote]:my-6 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:border-l-2 [&_blockquote]:border-gray-200 dark:[&_blockquote]:border-gray-700 
      [&_img]:mx-auto [&_img]:rounded-lg [&_img]:shadow-sm [&_img]:max-w-full 
      [&_pre]:rounded-lg [&_pre]:bg-gray-50 dark:[&_pre]:bg-gray-800 [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
