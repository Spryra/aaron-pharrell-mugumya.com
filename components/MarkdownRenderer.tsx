import DOMPurify from 'isomorphic-dompurify';
import markdownIt from 'markdown-it';

interface MarkdownRendererProps {
  content: string;
}

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const rawHtml = md.render(content);
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'a', 'strong', 'em', 'code', 'pre',
      'ul', 'ol', 'li', 'blockquote', 'hr',
      'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'br'
    ],
    ALLOWED_ATTR: ['href', 'title', 'alt', 'src', 'class'],
    ALLOW_DATA_ATTR: false,
    RETURN_DOM: false,
  });

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-h1:text-4xl prose-h1:mb-6 prose-h1:text-light-text dark:prose-h1:text-dark-text
        prose-h2:text-3xl prose-h2:mb-4 prose-h2:text-light-text dark:prose-h2:text-dark-text
        prose-h3:text-2xl prose-h3:mb-3 prose-h3:text-light-text dark:prose-h3:text-dark-text
        prose-p:text-light-text-secondary dark:prose-p:text-dark-text-secondary prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-light-accent dark:prose-a:text-dark-accent prose-a:underline hover:prose-a:opacity-80 prose-a:transition
        prose-strong:text-light-text dark:prose-strong:text-dark-text prose-strong:font-semibold
        prose-em:text-light-text-secondary dark:prose-em:text-dark-text-secondary
        prose-code:text-light-accent dark:prose-code:text-dark-accent prose-code:bg-light-surface dark:prose-code:bg-dark-surface prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-light-surface dark:prose-pre:bg-dark-surface prose-pre:border prose-pre:border-light-border dark:prose-pre:border-dark-border prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:p-4
        prose-blockquote:border-l-4 prose-blockquote:border-light-accent dark:prose-blockquote:border-dark-accent prose-blockquote:pl-4 prose-blockquote:text-light-text-secondary dark:prose-blockquote:text-dark-text-secondary
        prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
        prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2
        prose-li:text-light-text-secondary dark:prose-li:text-dark-text-secondary
        prose-hr:border-light-border dark:prose-hr:border-dark-border
        prose-img:rounded-lg prose-img:shadow-md
        prose-table:border-collapse prose-table:w-full
        prose-td:border prose-td:border-light-border dark:prose-td:border-dark-border prose-td:px-3 prose-td:py-2
        prose-th:border prose-th:border-light-border dark:prose-th:border-dark-border prose-th:px-3 prose-th:py-2 prose-th:bg-light-surface dark:prose-th:bg-dark-surface
      "
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
