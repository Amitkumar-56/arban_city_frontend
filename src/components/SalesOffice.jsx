export default function SalesOffice({ data, projectTitle = 'Aveon City Sector Zero', phone = '+91 81000 00000' }) {
  const address = data?.office_address || data?.officeAddress || data?.address || 'Balaji Tricity Delta Aveon City, Thane - Belapur Road, Airoli, Navi Mumbai – 400708';
  const officeTitle = data?.office_title || data?.officeTitle || `${projectTitle} Sales Gallery`;
  const officeSubtitle = data?.office_subtitle || data?.officeSubtitle || 'Sales Gallery / Office Address';
  const cleanPhone = phone.replace(/\s+/g, '');
  const mapQuery = encodeURIComponent(address);

  return (
    <section className="section-card" id="sales-office">
      <h2 className="section-h2">{projectTitle} Sales Office &amp; Experience Centre</h2>
      <p className="section-intro">
        Visit the on-site sales gallery to see the sample flat, check floor plans and get current pricing from the sales team.
      </p>

      {/* Address Card */}
      <div className="flex gap-3 items-start mt-4.5 p-3.5 rounded-xl bg-[#fff6f1] border border-[#fbd9c8]">
        <span className="shrink-0 w-9 h-9 rounded-full grid place-items-center bg-white text-[#F26635] border border-[#f6d2c1]">
          <svg fill="none" height="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="20">
            <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </span>
        <div>
          <small className="block font-bold text-[11px] leading-4 text-[#5b6678] uppercase tracking-wider">
            {officeSubtitle}
          </small>
          <b className="block font-bold text-[15px] leading-snug text-[#111D46] mt-0.5">
            {officeTitle}
          </b>
          <span className="block font-medium text-[13px] leading-snug text-[#4A5877] mt-0.5">
            {address}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4 max-w-[480px]">
        <a
          className="flex items-center justify-center h-12 rounded-xl font-['Manrope',sans-serif] font-semibold text-[15px] no-underline text-white bg-[#111D46] hover:bg-[#1d2a4a] text-center px-2 shadow-xs transition-colors"
          href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Get Directions
        </a>
        <a
          className="flex items-center justify-center h-12 rounded-xl font-['Manrope',sans-serif] font-semibold text-[15px] no-underline border-[1.5px] border-[#111D46] text-[#111D46] bg-white hover:bg-[#F6F8FC] text-center px-2 transition-colors"
          href={`tel:${cleanPhone}`}
        >
          Call Sales Office
        </a>
      </div>
    </section>
  );
}
