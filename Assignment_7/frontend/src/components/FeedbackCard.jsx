import React from 'react';
import AvatarBadge from './AvatarBadge';

export default function FeedbackCard({ feedback }) {
  return (
    <div className="bg-white dark:bg-navy rounded-xl shadow p-4 mb-4 flex gap-4 items-start">
      <AvatarBadge name={feedback.student?.name || 'Anonymous'} role={feedback.student?.role || 'student'} />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{feedback.student?.name || 'Anonymous'}</span>
          <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold bg-${feedback.sentiment === 'positive' ? 'emerald' : feedback.sentiment === 'negative' ? 'rose' : 'amber'}-100 text-${feedback.sentiment === 'positive' ? 'emerald' : feedback.sentiment === 'negative' ? 'rose' : 'amber'}-700`}>
            {feedback.sentiment}
          </span>
        </div>
        <div className="mt-1 text-sm text-gray-700 dark:text-gray-200">{feedback.comment}</div>
        <div className="mt-2 flex gap-2 text-xs text-gray-500">
          <span>Teaching: {feedback.ratings?.teaching}</span>
          <span>Content: {feedback.ratings?.content}</span>
          <span>Difficulty: {feedback.ratings?.difficulty}</span>
          <span>Overall: {feedback.ratings?.overall}</span>
        </div>
      </div>
    </div>
  );
}
