import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, Save, Camera, Globe, Smartphone, Shield, Eye, EyeOff } from 'lucide-react';

export default function StudentProfileSettings() {
  const [name, setName] = useState('Dr. Mohamed');
  const [email, setEmail] = useState('dr.mohamed@lumora.edu');
  const [phone, setPhone] = useState('01001234567');
  const [address, setAddress] = useState('Cairo, Egypt');
  const [bio, setBio] = useState('Lead Physics Instructor with 12+ years of experience. Passionate about making complex concepts simple and engaging.');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-6 md:p-12 font-sans antialiased text-[#1D1D1F]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1D1D1F]">Profile Settings</h1>
          <p className="text-sm text-[#86868B] mt-1">Manage your personal information and security settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[20px] border border-[#E8E8ED] shadow-sm p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-[#0071E3] flex items-center justify-center text-white font-bold text-2xl shadow-md">DM</div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-[#D2D2D7] flex items-center justify-center hover:bg-[#F5F5F7] transition-colors shadow-sm">
                <Camera size={13} className="text-[#86868B]" />
              </button>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1D1D1F]">{name}</h2>
              <p className="text-sm text-[#86868B]">Lead Instructor</p>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 mt-1 rounded-full bg-[#34C759]/10 text-[#34C759] text-[10px] font-bold">Active</span>
            </div>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Full Name</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <User size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
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
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Location</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#0071E3]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <MapPin size={16} className="text-[#86868B] shrink-0" />
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="bg-transparent text-sm text-[#1D1D1F] outline-none w-full" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Bio</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3}
                className="w-full bg-[#F5F5F7] rounded-xl px-4 py-3 text-sm text-[#1D1D1F] outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:bg-white transition-all resize-none border border-transparent focus:border-[#D2D2D7]"
              />
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-[#E8E8ED] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#86868B]" />
              <span className="text-xs text-[#86868B]">Last updated: Today at 2:34 PM</span>
            </div>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#0071E3] text-white rounded-full text-sm font-semibold hover:bg-[#0056B3] transition-all shadow-sm"
            >
              <Save size={16} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-[20px] border border-[#E8E8ED] shadow-sm p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#FF3B30]/10 flex items-center justify-center">
              <Shield size={18} className="text-[#FF3B30]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#1D1D1F]">Security</h2>
              <p className="text-xs text-[#86868B]">Update your password to keep your account secure</p>
            </div>
          </div>

          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Current Password</label>
              <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#FF3B30]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                <Lock size={16} className="text-[#86868B] shrink-0" />
                <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} placeholder="Enter current password" className="bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none w-full" />
                <button onClick={() => setShowCurrent(!showCurrent)} className="p-0.5 hover:bg-[#D2D2D7] rounded">
                  {showCurrent ? <EyeOff size={14} className="text-[#86868B]" /> : <Eye size={14} className="text-[#86868B]" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">New Password</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#FF3B30]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <Lock size={16} className="text-[#86868B] shrink-0" />
                  <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" className="bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none w-full" />
                  <button onClick={() => setShowNew(!showNew)} className="p-0.5 hover:bg-[#D2D2D7] rounded">
                    {showNew ? <EyeOff size={14} className="text-[#86868B]" /> : <Eye size={14} className="text-[#86868B]" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#86868B] mb-1.5 uppercase tracking-wider">Confirm Password</label>
                <div className="flex items-center gap-2 bg-[#F5F5F7] rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-[#FF3B30]/30 focus-within:bg-white transition-all border border-transparent focus-within:border-[#D2D2D7]">
                  <Smartphone size={16} className="text-[#86868B] shrink-0" />
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" className="bg-transparent text-sm text-[#1D1D1F] placeholder:text-[#86868B] outline-none w-full" />
                </div>
              </div>
            </div>
            <button
              className="px-6 py-2.5 bg-[#FF3B30] text-white rounded-full text-sm font-semibold hover:bg-[#D93025] transition-all shadow-sm"
            >Update Password</button>
          </div>
        </div>
      </div>
    </div>
  );
}
