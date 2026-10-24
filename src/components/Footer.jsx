import React, { useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';

export default function Footer({ data, developerData, onOpenModal, onOpenPrivacy }) {
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  const siteTitle = data?.site_title || 'Arban City Sector 0';
  const agentQr = developerData?.digipace_qr || developerData?.qr_image || '';
  const agentRera = developerData?.digipace_rera || 'A51700026634';
  const projectRera = developerData?.project_rera || 'PR1331012500415';
  const mahareraUrl = developerData?.maharera_website || 'https://maharera.maharashtra.gov.in/';

  let bullets = [
    `Project Registered under Government of India RERA Act 2016 | maharera.maharashtra.gov.in`,
    `Government RERA Authorised Advertiser's: Digipace Consulting (OPC) Pvt Ltd | ${agentRera}`,
    `Site Address : Arban City Sector 0, Off Thane-Belapur Road, Airoli, Navi Mumbai - 400708, Maharashtra`,
    `Project's MahaRERA Registration No.: ${projectRera}`,
  ];

  if (data?.footer_bullets_json) {
    try {
      const parsed = typeof data.footer_bullets_json === 'string'
        ? JSON.parse(data.footer_bullets_json)
        : data.footer_bullets_json;
      if (Array.isArray(parsed) && parsed.length > 0) {
        bullets = parsed;
      }
    } catch (e) {}
  }

  const defaultDisclaimer =
    data?.footer_disclaimer ||
    `Disclaimer: This is the marketing partner website. We're an authorized marketing channel partner (Digipace Consulting (OPC) Pvt Ltd) for Delta & Tricity Group. The provided content, images & video are sourced from respective owners and are provided only for information purposes, it does not constitute an offer to buy any service. The price plans are subject to change without prior notice, and the properties mentioned are subject to availability. You can receive a call, SMS, or emails on contact details registered with us.`;

  return (
    <footer className="bg-slate-100/90 text-gray-700 text-xs sm:text-sm py-10 border-t border-gray-300">
      <div className="w-full px-3 sm:px-5 lg:px-6 space-y-6">
        {/* Top Dual Scanner QR & Compliance Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-5 sm:p-6 rounded-md border border-gray-200/80 shadow-2xs">
          {/* Scanner QR from Sector Zero */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-24 h-24 bg-white p-1.5 border border-gray-300 rounded shadow-2xs flex items-center justify-center">
              {agentQr ? (
                <img
                  src={agentQr}
                  alt={`MahaRERA QR ${agentRera}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-[10px] text-gray-700 font-bold text-center">
                  <span>MahaRERA QR</span>
                  <span className="text-[9px] text-[#8f7635] font-black">{agentRera}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-wider">
              Scan MahaRERA
            </span>
          </div>

          {/* Compliance Bullet Points with Checkmarks matching Kohinoor */}
          <div className="flex-1 space-y-2">
            <ul className="space-y-2 text-xs sm:text-[13px] text-gray-800 font-medium">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#15803d] font-black mt-0.5 shrink-0">✓</span>
                  <span className="leading-snug">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Paragraph matching Kohinoor */}
        <div className="text-xs text-gray-600 leading-relaxed font-normal space-y-2">
          <p>
            <strong className="text-gray-900 font-bold">Disclaimer:</strong> {defaultDisclaimer}
          </p>
          {showFullDisclaimer && (
            <p className="pt-2 text-gray-500 border-t border-gray-200">
              The project details, floor plans, pricing sheets, images, and videos are artistic representations. Visitors are advised to independently cross-verify all details, layouts, and statutory approvals directly on the official MahaRERA website at <a href={mahareraUrl} target="_blank" rel="noopener noreferrer" className="text-[#8f7635] underline font-bold">maharera.maharashtra.gov.in</a> before entering into any transaction.
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
            className="text-[#8f7635] hover:underline font-bold text-xs inline-block"
          >
            {showFullDisclaimer ? 'Show Less' : 'Read More Disclaimers'}
          </button>
        </div>

        {/* Bottom Copyright & Legal Links matching Kohinoor */}
        <div className="pt-4 border-t border-gray-300 text-center text-xs text-gray-600 font-medium">
          <p>
            Copyright &copy; {new Date().getFullYear()} {siteTitle} |{' '}
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Terms & Conditions')}
              className="text-gray-700 hover:text-gray-900 underline font-semibold cursor-pointer"
            >
              Terms &amp; Conditions
            </button>{' '}
            |{' '}
            <button
              type="button"
              onClick={() => {
                if (onOpenPrivacy) {
                  onOpenPrivacy();
                } else {
                  window.location.hash = '#privacy-policy';
                }
              }}
              className="text-gray-700 hover:text-gray-900 underline font-semibold cursor-pointer"
            >
              Privacy Policy
            </button>{' '}
            |{' '}
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal('Cookies Policy')}
              className="text-gray-700 hover:text-gray-900 underline font-semibold cursor-pointer"
            >
              Cookies Policy
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
