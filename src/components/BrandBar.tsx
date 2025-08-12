export default function BrandBar() {
  return (
    <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border-b border-slate-200">
      <div className="container-default py-2 text-xs sm:text-sm text-slate-600 flex items-center justify-between gap-3">
        <span>
          Trusted guidance for FL • MI • NC — expanding nationwide
        </span>
        <a href="/quote" className="hidden sm:inline-block underline underline-offset-4 hover:text-sky-700">
          Get a free quote →
        </a>
      </div>
    </div>
  );
}