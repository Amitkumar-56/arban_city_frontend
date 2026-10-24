import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Shield, CheckCircle2, AlertCircle, Save, KeyRound, Clock, ShieldCheck } from 'lucide-react';
import { fetchAdminProfile, updateAdminProfile } from './api';

export default function AdminProfileSettings({ currentUser, onProfileUpdated }) {
  const [name, setName] = useState(currentUser?.name || 'Arban Administrator');
  const [email, setEmail] = useState(currentUser?.email || 'admin@arban-city.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchAdminProfile()
      .then((res) => {
        if (res?.user) {
          if (res.user.name) setName(res.user.name);
          if (res.user.email) setEmail(res.user.email);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);
    setErrorMessage(null);

    if (newPassword || confirmPassword) {
      if (!currentPassword) {
        setErrorMessage('Please enter your current password to set a new password');
        setSaving(false);
        return;
      }
      if (newPassword.length < 6) {
        setErrorMessage('New password must be at least 6 characters long');
        setSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setErrorMessage('New password and confirmation do not match');
        setSaving(false);
        return;
      }
    }

    try {
      const res = await updateAdminProfile({
        name,
        email,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });

      setStatusMessage(res.message || 'Admin profile updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      if (res.user) {
        localStorage.setItem('adminUser', JSON.stringify(res.user));
        if (onProfileUpdated) onProfileUpdated(res.user);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to update admin profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {name ? name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{name || 'Administrator'}</h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck size={13} />
                  Super Admin
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            <Clock size={14} className="text-slate-400" />
            <span>Active Session: Authenticated</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2.5">
          <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle size={18} className="shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <User size={20} className="text-blue-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Administrator Information</h3>
              <p className="text-xs text-slate-500">Update your primary display name and administrative email address</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arban Administrator"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@arban-city.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Password Security Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <KeyRound size={20} className="text-blue-600" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Security &amp; Password</h3>
              <p className="text-xs text-slate-500">Leave these blank if you do not want to change your password</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password to authorize changes"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Info Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Security Level</div>
            <div className="text-sm font-bold text-slate-800 mt-1 flex items-center gap-1.5">
              <Shield size={16} className="text-emerald-600" />
              <span>Full Admin Access</span>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Permissions</div>
            <div className="text-sm font-bold text-slate-800 mt-1">Read &bull; Write &bull; Media &bull; Leads</div>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="text-xs font-semibold text-slate-500">Status</div>
            <div className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Active</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Updating Profile...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
