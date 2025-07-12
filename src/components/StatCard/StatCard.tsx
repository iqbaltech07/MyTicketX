type StatCardProps = {
  title: string;
  value: string | number;
  // Anda bisa menambahkan properti lain seperti icon, perubahan persentase, dll.
};

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-zinc-800 px-4 py-5 shadow sm:p-6">
      <dt className="truncate text-sm font-medium text-zinc-400">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</dd>
    </div>
  );
}