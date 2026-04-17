
import { Link } from 'react-router-dom';

const people = [
  {
    name: 'Albert Flores',
    comment: 'The lectures felt clear and practical. I could follow along easily.',
    bg: '#F5C518',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80',
    position: 'left-8 top-24 md:left-12 md:top-28',
    size: 'h-48 w-48 md:h-56 md:w-56',
    cardClass: '-bottom-6 left-10 -rotate-3 md:-left-2',
    delay: '0ms',
  },
  {
    name: 'Jacob Jones',
    comment: 'The feedback form was simple to use and felt very smooth.',
    bg: '#475569',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    position: 'right-6 top-4 md:right-12 md:top-8',
    size: 'h-56 w-56 md:h-72 md:w-72',
    cardClass: '-bottom-2 left-4 rotate-2 md:left-6',
    delay: '140ms',
  },
  {
    name: 'Ralph Edwards',
    comment: 'It helped me understand what needed improvement in the course.',
    bg: '#BAE6FD',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    position: 'bottom-12 left-24 md:left-[24%] md:bottom-[0.5rem]',
    size: 'h-52 w-52 md:h-64 md:w-64',
    cardClass: '-bottom-4 left-2 -rotate-2',
    delay: '280ms',
  },
  {
    name: 'Jane Cooper',
    comment: 'I liked how easy it was to rate each section honestly.',
    bg: '#A78BFA',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=80',
    position: 'right-20 bottom-24 md:right-[22%] md:bottom-[7rem]',
    size: 'h-44 w-44 md:h-56 md:w-56',
    cardClass: '-bottom-6 left-2 rotate-1',
    delay: '420ms',
  },
  {
    name: 'Mia Thompson',
    comment: 'The interface makes sharing feedback feel quick and natural.',
    bg: '#34D399',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80',
    position: 'left-[-1rem] bottom-10 md:left-[-0.5rem] md:bottom-[1rem]',
    size: 'h-48 w-48 md:h-56 md:w-56',
    cardClass: '-bottom-6 left-8 -rotate-4',
    delay: '560ms',
  },
  {
    name: 'Noah Patel',
    comment: 'A clean layout like this makes me want to submit feedback more often.',
    bg: '#60A5FA',
    image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=700&q=80',
    position: 'right-[-0.5rem] bottom-10 md:right-0 md:bottom-[1rem]',
    size: 'h-42 w-42 md:h-52 md:w-52',
    cardClass: '-bottom-6 left-3 rotate-3',
    delay: '700ms',
  },
];

function PersonCard({ name, comment, bg, image, position, size, cardClass, delay }) {
  return (
    <div className={`pointer-events-none absolute hidden md:block ${position} ${size} hero-rise`} style={{ animationDelay: delay }}>
      <div className="relative h-full w-full overflow-hidden rounded-full shadow-[0_18px_50px_rgba(15,23,42,0.12)]" style={{ backgroundColor: bg }}>
        <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover mix-blend-multiply" />
        <div className={`absolute ${cardClass} w-[240px] rounded-[16px] bg-white px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-sm`}>
          <div className="flex items-center gap-2 text-slate-900">
            <span className="font-semibold text-[17px]">{name}</span>
            <span className="h-2 w-2 rounded-full bg-emerald" />
          </div>
          <div className="mt-2 text-[14px] leading-6 text-slate-500">“{comment}”</div>
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,70,229,0.05),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(45,212,191,0.08),transparent_24%),radial-gradient(circle_at_85%_82%,rgba(167,139,250,0.08),transparent_23%)]" />
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(135deg,rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(45deg,rgba(15,23,42,0.35)_1px,transparent_1px)] bg-[size:26px_26px]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-14 sm:px-10 lg:px-16">
        <PersonCard {...people[0]} />
        <PersonCard {...people[1]} />
        <PersonCard {...people[2]} />
        <PersonCard {...people[3]} />
        <PersonCard {...people[4]} />
        <PersonCard {...people[5]} />

        <div className="relative z-10 max-w-3xl text-center hero-rise" style={{ animationDelay: '120ms' }}>
          <h1 className="mx-auto max-w-4xl text-balance text-[48px] font-extrabold leading-[0.95] tracking-[-0.055em] text-slate-950 sm:text-[64px] md:text-[78px] lg:text-[88px]">
            Communicate Better
          </h1>
          <p className="mx-auto mt-7 max-w-[520px] text-[17px] leading-8 text-slate-500 sm:text-[18px]">
            Share honest student feedback on courses, teaching, and campus experience so improvements are easier to make.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6">
            <Link
              to="/feedback"
              className="inline-flex items-center justify-center rounded-full bg-[#4F46E5] px-8 py-3.5 text-[16px] font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] transition duration-300 hover:bg-[#4338ca] hover:-translate-y-0.5"
            >
                Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
