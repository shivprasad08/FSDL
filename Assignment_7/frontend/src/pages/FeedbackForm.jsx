import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../api/axios';
import StarRating from '../components/StarRating';
import toast from 'react-hot-toast';


const schema = z.object({
  year: z.string().min(1, 'Year is required'),
  department: z.string().min(1, 'Department is required'),
  division: z.string().min(1, 'Division is required'),
  subject: z.string().min(1, 'Subject is required'),
  subjectFacultyName: z.string().min(1, 'Faculty name is required'),
  ratings: z.object({
    teaching: z.number().min(1).max(5),
    content: z.number().min(1).max(5),
    difficulty: z.number().min(1).max(5),
    overall: z.number().min(1).max(5),
  }),
  comment: z.string().min(5, 'Comment required'),
  isAnonymous: z.boolean().optional(),
});

function FeedbackForm() {
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      year: '',
      department: '',
      division: '',
      subject: '',
      subjectFacultyName: '',
      ratings: { teaching: 3, content: 3, difficulty: 3, overall: 3 },
      isAnonymous: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/feedback', data);
      if (res.status === 201) {
        toast.success('Feedback submitted successfully!');
        reset();
      } else {
        toast.error('Could not save feedback. Try again.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error('Error: ' + err.response.data.message);
      } else {
        toast.error('Submission failed. Please try again.');
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white p-4 sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(79,70,229,0.05),transparent_26%),radial-gradient(circle_at_15%_85%,rgba(45,212,191,0.08),transparent_24%),radial-gradient(circle_at_85%_82%,rgba(167,139,250,0.08),transparent_23%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(135deg,rgba(15,23,42,0.45)_1px,transparent_1px),linear-gradient(45deg,rgba(15,23,42,0.35)_1px,transparent_1px)] bg-[size:26px_26px]" />

      <div className="relative flex min-h-screen items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl rounded-[24px] border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-10">
        <h2 className="text-3xl font-display mb-8 text-slate-950 text-center font-bold">Submit Feedback</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Year</label>
            <input {...register('year')} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
            {errors.year && <span className="text-rose text-xs">{errors.year.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Department</label>
            <input {...register('department')} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
            {errors.department && <span className="text-rose text-xs">{errors.department.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Division</label>
            <input {...register('division')} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
            {errors.division && <span className="text-rose text-xs">{errors.division.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Subject</label>
            <input {...register('subject')} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
            {errors.subject && <span className="text-rose text-xs">{errors.subject.message}</span>}
          </div>
          <div className="sm:col-span-2">
            <label className="block mb-1 font-semibold text-slate-700">Subject Faculty Name</label>
            <input {...register('subjectFacultyName')} className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
            {errors.subjectFacultyName && <span className="text-rose text-xs">{errors.subjectFacultyName.message}</span>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Teaching</label>
            <StarRating value={watch('ratings.teaching')} onChange={v => setValue('ratings.teaching', v)} />
            {errors.ratings?.teaching && <span className="text-rose text-xs">{errors.ratings.teaching.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Content</label>
            <StarRating value={watch('ratings.content')} onChange={v => setValue('ratings.content', v)} />
            {errors.ratings?.content && <span className="text-rose text-xs">{errors.ratings.content.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Difficulty</label>
            <StarRating value={watch('ratings.difficulty')} onChange={v => setValue('ratings.difficulty', v)} />
            {errors.ratings?.difficulty && <span className="text-rose text-xs">{errors.ratings.difficulty.message}</span>}
          </div>
          <div>
            <label className="block mb-1 font-semibold text-slate-700">Overall</label>
            <StarRating value={watch('ratings.overall')} onChange={v => setValue('ratings.overall', v)} />
            {errors.ratings?.overall && <span className="text-rose text-xs">{errors.ratings.overall.message}</span>}
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-slate-700">Comment</label>
          <textarea {...register('comment')} className="min-h-[110px] w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10" />
          {errors.comment && <span className="text-rose text-xs">{errors.comment.message}</span>}
        </div>
        <div className="mb-6 flex items-center gap-2">
          <input type="checkbox" {...register('isAnonymous')} id="anon" />
          <label htmlFor="anon" className="text-slate-700">Submit as anonymous</label>
        </div>
        <button type="submit" className="w-full rounded-full bg-[#4F46E5] py-3.5 text-lg font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.28)] transition hover:bg-[#4338ca] hover:-translate-y-0.5" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackForm;
