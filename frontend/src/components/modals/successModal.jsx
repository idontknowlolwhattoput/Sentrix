export default function SuccessModal({ title, message, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="relative w-[360px] rounded-2xl bg-white p-6 shadow-[8px_8px_0_#000] border border-slate-200">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-slate-500 hover:text-black"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{message}</p>
        </div>

        {/* Button */}
        <div className="mt-5 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition shadow-[3px_3px_0_#000]"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
