import React from 'react'

import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from 'react-router';
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react';

const Footer = () => {
  const aboutLinks = [
    { label: "Về chúng tôi", href: "#" },
    { label: "Tin tuyển dụng", href: "#" },
    { label: "Quy chế hoạt động", href: "#" },
    { label: "Chính sách bảo mật", href: "#" },
  ];

  const candidateLinks = [
    { label: "Tìm việc làm", href: "#" },
    { label: "Việc làm IT", href: "#" },
    { label: "Cẩm nang nghề nghiệp", href: "#" },
  ];

  return (
    <footer className="mt-8 bg-[#0f1b3d] text-slate-300 border border-slate-700/40">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Cột giới thiệu */}
          <div>
            <h3 className="text-white text-3xl font-semibold mb-4">
              <Link to={`/`}>ViecLam24h</Link>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 mb-5">
              Nền tảng kết nối ứng viên và nhà tuyển dụng hàng đầu Việt Nam.
              Tận tâm vì sự nghiệp của bạn.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target='blank'
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors"
              >
                <IconBrandFacebook className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target='blank'
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors"
              >
                <IconBrandInstagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://x.com"
                target='blank'
                aria-label="X"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-700/50 hover:bg-slate-600 transition-colors"
              >
                <IconBrandX className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Cột Về ViecLam24h */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              Về ViecLam24h
            </h4>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột Dành cho ứng viên */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              Dành cho ứng viên
            </h4>
            <ul className="space-y-3">
              {candidateLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột Liên hệ */}
          <div>
            <h4 className="text-white font-semibold text-base mb-4">
              Liên hệ
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-slate-500" />
                <a href="tel:0246680588" className="hover:text-white transition-colors">
                  (024) 6680 5588
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-slate-500" />
                <a
                  href="mailto:contact@vieclam24h.vn"
                  className="hover:text-white transition-colors"
                >
                  contact@vieclam24h.vn
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />
                <span>
                  126 Nguyễn Thiện Thành, Khóm 4, Phường Hòa Thuận, Tỉnh Vĩnh Long
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dòng chia + copyright */}
        <div className="mt-10 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 ViecLam24h. Nền tảng tuyển dụng hàng đầu Việt Nam.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">
              Điều khoản
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Bảo mật
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
