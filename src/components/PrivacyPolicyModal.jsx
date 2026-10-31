export default function PrivacyPolicyModal({ isOpen, onClose, privacyData }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] bg-[#0c173b]/75 flex items-center justify-center p-3 md:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-[min(620px,calc(100vw-24px))] max-h-[85dvh] overflow-y-auto bg-white rounded-xl p-5 md:p-7 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacyModalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close privacy policy"
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F1F3F7] text-[#111D46] text-lg flex items-center justify-center cursor-pointer border-0"
        >
          ×
        </button>
        <h2 id="privacyModalTitle" className="text-lg md:text-xl font-bold text-[#111D46] pr-8">
          {privacyData?.title || 'Privacy Policy & Terms'}
        </h2>
        {privacyData?.last_updated && (
          <p className="text-xs text-[#67748A] mt-1">Last updated: {privacyData.last_updated}</p>
        )}
        {privacyData?.overview && (
          <p className="text-sm text-[#4A5877] leading-relaxed mt-4">{privacyData.overview}</p>
        )}
        <div className="space-y-4 mt-4">
          {(privacyData?.sections || []).map((section, index) => (
            <section key={`${section.heading}-${index}`}>
              <h3 className="text-sm font-bold text-[#111D46]">{section.heading}</h3>
              <p className="text-sm text-[#4A5877] leading-relaxed mt-1">{section.body}</p>
            </section>
          ))}
          {!privacyData?.sections?.length && !privacyData?.overview && (
            <p className="text-sm text-[#4A5877] leading-relaxed">
              Your information is used to respond to your enquiry and provide project-related updates. You may request access to or removal of your information by contacting the project team.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
