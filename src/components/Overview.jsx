import React from 'react';
import { resolveAssetUrl } from '../admin/api';
import {
  Building2,
  Layers,
  Home,
  Maximize2,
  IndianRupee,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TreePine,
  Compass,
} from 'lucide-react';

export const ICON_MAP = {
  building: Building2,
  layers: Layers,
  home: Home,
  area: Maximize2,
  price: IndianRupee,
  location: MapPin,
  calendar: Calendar,
  shield: ShieldCheck,
  verified: CheckCircle2,
  sparkles: Sparkles,
  land: TreePine,
  compass: Compass,
};

export default function Overview({ data, projectTitle = 'Arban City Sector 0' }) {
  const defaultItems = [
    {
      label: 'Land Parcel',
      val: '5.5 Acres',
      iconKey: 'land',
    },
    {
      label: 'Towers',
      val: '3 High Rise',
      iconKey: 'building',
    },
    {
      label: 'Floors',
      val: '35+ Storeys',
      iconKey: 'layers',
    },
    {
      label: 'Typology',
      val: '1, 2 & 3 BHK',
      iconKey: 'home',
    },
    {
      label: 'Carpet Area',
      val: '413 - 930 sq.ft',
      iconKey: 'area',
    },
    {
      label: 'Starting Price',
      val: '₹89 Lacs*',
      iconKey: 'price',
    },
    {
      label: 'Location',
      val: 'Airoli, Navi Mumbai',
      iconKey: 'location',
    },
    {
      label: 'Possession',
      val: 'Dec 2029',
      iconKey: 'calendar',
    },
    {
      label: 'RERA Status',
      val: 'Registered',
      iconKey: 'shield',
    },
  ];

  const items = Array.isArray(data) && data.length > 0
    ? data.map((d) => ({
        label: d.label ?? '',
        val: d.value ?? d.val ?? '',
        iconKey: d.icon || 'building',
        image: d.image || d.image_url || '',
      }))
    : defaultItems;

  return (
    <section className="section-card" id="overview">
      <h2 className="section-h2">{projectTitle} Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 mt-5">
        {items.map((item, idx) => {
          const IconComponent = ICON_MAP[item.iconKey] || Building2;
          return (
            <div
              key={idx}
              className="min-h-[132px] text-center py-4 px-2.5 rounded-xl bg-[#FAFBFD] border border-[#EEF1F6] flex flex-col items-center justify-center transition-all hover:border-[#F26635]/30 hover:shadow-sm"
            >
              {item.image ? (
                <img
                  src={resolveAssetUrl(item.image)}
                  alt={`${item.label} Icon`}
                  title={item.label}
                  loading="lazy"
                  decoding="async"
                  className="w-8 h-8 object-contain mb-1"
                />
              ) : ICON_MAP[item.iconKey] ? (
                <IconComponent className="w-7 h-7 text-[#273954] stroke-[1.5]" />
              ) : (
                <span className="material-symbols-outlined text-[28px] text-[#273954]">
                  {item.iconKey || 'apartment'}
                </span>
              )}
              <small className="block text-[14px] text-[#67748A] leading-tight mt-2">
                {item.label}
              </small>
              <b className="block text-[14px] font-extrabold text-[#111D46] leading-snug mt-1 break-words">
                {item.val}
              </b>
            </div>
          );
        })}
      </div>
    </section>
  );
}
