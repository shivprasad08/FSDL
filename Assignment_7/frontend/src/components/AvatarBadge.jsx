import React from 'react';

export default function AvatarBadge({ name = '', role = 'student' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  const roleColor = {
    student: 'bg-indigo',
    teacher: 'bg-emerald',
    admin: 'bg-rose',
  }[role] || 'bg-gray-400';
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg ${roleColor}`}>
      {initials}
    </span>
  );
}
