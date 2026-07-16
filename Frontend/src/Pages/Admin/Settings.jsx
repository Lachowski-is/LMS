import React, { useState } from 'react';
import { Save, Camera, Info, AlertTriangle, Building2, Mail, Phone, MapPin, Package, Calendar, KeyRound, HardDrive, RefreshCw } from 'lucide-react';

export default function AdminSettings() {
  const [academyName, setAcademyName] = useState('Lumora Academy');
  const [email, setEmail] = useState('info@lumora.edu');
  const [phone, setPhone] = useState('01001234567');
  const [address, setAddress] = useState('Cairo, Egypt');
  const [logoPreview, setLogoPreview] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans antialiased text-[#1D1D1F]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1D1D1F]">Academy Settings</h1>
          <p className="text-sm text-[#86868B] mt-1">Manage your academy profile, view system information, and perform administrative actions</p>
        </div>

        {/* ── Academy Profile ── */}
        <div className="bg-white rounded-[20px] border border-[#E8E8ED] shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
              <Building2 size={18} className="text-[#0071E3]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F]">Academy Profile</h2>
              <p className="text-xs text-[#86868B]">Update your academy&rsquo;s public information and branding</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Logo Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Academy Logo</label>
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-[#F5F5F7] border border-[#D2D2D7] flex items-center justify-center overflow-hidden">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 size={28} className="text-[#86868B]" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D2D2D7] text-[#1D1D1F] rounded-full text-sm font-semibold hover:bg-[#F5F5F7] transition-all shadow-sm">
                    <Camera size={15} />
                    Upload Logo
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                  <p className="text-[10px] text-[#86868B] mt-1.5">PNG, JPG or SVG. Max 2MB.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Academy Name</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <Building2 size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" value={academyName} onChange={e => setAcademyName(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <Mail size={16} className="text-[#86868B] shrink-0" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Phone Number</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <Phone size={16} className="text-[#86868B] shrink-0" />
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Address</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <MapPin size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8E8ED] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-[#86868B]" />
              <span className="text-xs text-[#86868B]">Last saved: Today at 2:34 PM</span>
            </div>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all shadow-sm"
            >
              <Save size={16} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* ── System Information ── */}
        <div className="bg-white rounded-[20px] border border-[#E8E8ED] shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 flex items-center justify-center">
              <Info size={18} className="text-[#0071E3]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F]">System Information</h2>
              <p className="text-xs text-[#86868B]">Software version and build details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-xl px-5 py-4">
                <Package size={18} className="text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Software Version</p>
                  <p className="text-sm font-medium text-[#1D1D1F]">v2.4.1</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-xl px-5 py-4">
                <HardDrive size={18} className="text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Build Number</p>
                  <p className="text-sm font-medium text-[#1D1D1F]">2026.07.16-1342</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-xl px-5 py-4">
                <Calendar size={18} className="text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">Last Updated</p>
                  <p className="text-sm font-medium text-[#1D1D1F]">16 July 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-xl px-5 py-4">
                <KeyRound size={18} className="text-[#86868B] shrink-0" />
                <div>
                  <p className="text-[10px] font-semibold text-[#86868B] uppercase tracking-wider">License Type</p>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#34C759]/10 text-[#34C759] text-[10px] font-bold">Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Danger Zone ── */}
        <div className="rounded-[20px] border-2 border-[#FF3B30] shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center">
              <AlertTriangle size={18} className="text-[#FF3B30]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#FF3B30]">Danger Zone</h2>
              <p className="text-xs text-[#86868B]">Irreversible actions. Proceed with caution.</p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#FFF5F5] rounded-xl px-6 py-4">
            <div>
              <p className="text-sm font-semibold text-[#1D1D1F]">Reset Academy Data</p>
              <p className="text-xs text-[#86868B] mt-0.5">Permanently erase all academy data including students, courses, and financial records.</p>
            </div>
            <button
              className="flex items-center gap-2 px-6 py-2.5 bg-[#FF3B30] text-white rounded-full text-sm font-semibold hover:bg-[#D93025] transition-all shadow-sm shrink-0 ml-4"
            >
              <AlertTriangle size={16} />
              Reset Data
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
