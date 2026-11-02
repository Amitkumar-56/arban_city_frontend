import { resolveAssetUrl } from '../admin/api';
import reraQrImg from '../assets/rera_qr.webp';

export default function Footer({ developerData, privacyData, headerData }) {
  const agentRera = developerData?.digipace_rera || developerData?.agent_rera || 'A51700026634';
  const qrImage = developerData?.qr_image || reraQrImg;

  const defaultDisclaimers = [
    'The project details, specifications, images, and dimensions shown on this website are indicative and artistic impressions for representational purposes only.',
    'All units and inventory are subject to availability at the time of booking. Pricing, taxes, government charges, and floor premiums are subject to change without prior notice.',
    'Customers are advised to independently verify all details, documents, and approvals with the developer and sales team prior to making any booking or purchase decision.',
    'This website is an authorized channel partner portal operated by Digipace Consulting (OPC) Private Limited (MahaRERA No: A51700026634) for facilitating customer enquiries.',
  ];
  let disclaimers = defaultDisclaimers;
  if (headerData?.footer_bullets_json) {
    try {
      const parsed = typeof headerData.footer_bullets_json === 'string'
        ? JSON.parse(headerData.footer_bullets_json)
        : headerData.footer_bullets_json;
      if (Array.isArray(parsed)) disclaimers = parsed.filter(Boolean);
    } catch (error) {
      console.error('Unable to parse footer disclaimer bullets:', error);
    }
  }
  const disclaimer = (headerData?.footer_disclaimer || 'The information provided on this website is intended exclusively for informational purposes and should not be construed as an offer of services. This site is managed by a RERA authorized real estate partner namely Digipace Consulting (OPC) Private Limited (Registered Agent bearing MahaRERA No: {{AGENT_RERA}}).')
    .replace(/\{\{AGENT_RERA\}\}|A51700026634/g, agentRera);

  return (
    <footer className="bg-[#25262B] text-[#ECEDF0] py-7 px-4 md:px-7 pb-24 md:pb-6" id="footer">
      <div className="max-w-[1200px] mx-auto">
        {/* Row 1: QR Box + Disclaimer Paragraph */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-6.5 items-center pb-5 border-b border-white/12 text-center md:text-left">
          <a
            className="shrink-0 w-[176px] h-[116px] border border-white/30 rounded-md flex flex-col items-center justify-center gap-1 text-[7.5px] font-bold tracking-wider uppercase text-[#C9CCD3] no-underline hover:border-white transition-colors"
            href="https://maharera.maharashtra.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={resolveAssetUrl(qrImage)} alt="MahaRERA Verify QR" className="w-[72px] h-[72px] bg-white p-1 rounded object-contain" />
            
          </a>
          <p className="m-0 max-w-[930px] text-xs md:text-[13px] leading-relaxed text-[#C9CCD3]">
            {disclaimer}
          </p>
        </div>

        {/* Regulatory Information & Disclaimers */}
        <h4 className="font-['Manrope',sans-serif] font-extrabold text-base md:text-[17px] text-white mt-5 mb-2">
          Regulatory Information &amp; Disclaimers
        </h4>
        <ul className="list-none m-0 p-0 divide-y divide-white/10">
          {disclaimers.map((pt, idx) => (
            <li key={idx} className="flex gap-2.5 items-start py-2.5 text-xs md:text-[13px] leading-relaxed text-[#D1D5DB]">
              <span className="text-[10px] text-[#EAB66D] font-black shrink-0">✓</span>
              <span className="flex-1 text-[10px]">{pt}</span>
            </li>
          ))}
        </ul>

        {/* Privacy Policy link & Copyright */}
        <div className="text-center text-[11px] text-[#9A9EA8] border-t border-white/10 mt-5 pt-3.5">
          <p className="mb-1">
            <a
              href="#privacy-policy"
              className="text-[#B8BCC6] hover:text-[#EAB66D] underline text-xs cursor-pointer inline-block"
            >
              Privacy Policy &amp; Terms
            </a>
          </p>
          © 2026 Digipace Consulting (OPC) Private Limited · All rights reserved
        </div>
      </div>
    </footer>
  );
}
