'use client';

import { useState } from 'react';

function formatCommentDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '';
  const datePart = date.toLocaleDateString('en-GB'); // DD/MM/YYYY, matches the video
  const timePart = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${datePart} ${timePart} hours`;
}

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function CommentCard({ comment, index }) {
  return (
    <div className="py-5 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center text-xs font-sans font-bold shrink-0">
            {initials(comment.name)}
          </span>
          <div>
            <p className="font-sans font-bold text-ink text-sm">{comment.name}</p>
            <p className="text-xs font-sans text-ink-muted">{formatCommentDate(comment.date)}</p>
          </div>
        </div>
        <span className="font-sans font-bold text-ink text-sm shrink-0">#{index + 1}</span>
      </div>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-light">{comment.text}</p>
    </div>
  );
}

export default function CommentsSection({ comments = [] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="comments" className="mt-10 scroll-mt-24">
      <h2 className="font-sans font-extrabold text-xl text-ink">Comments</h2>

      {comments.length === 0 ? (
        <p className="mt-4 text-sm font-sans text-ink-muted">
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <>
          <div className="mt-4">
            <CommentCard comment={comments[0]} index={0} />
            {expanded &&
              comments.slice(1).map((comment, i) => (
                <CommentCard key={comment.id} comment={comment} index={i + 1} />
              ))}
          </div>

          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="mt-2 w-full py-3.5 rounded-md bg-ink text-white text-sm font-sans font-bold hover:bg-black transition-colors"
            >
              See {comments.length} comment{comments.length === 1 ? '' : 's'}
            </button>
          )}
        </>
      )}
    </section>
  );
}
