import React, { useState } from 'react';
import {
  UserCheck, Plus, Trash2, Edit3, Mail,
  Phone, ToggleRight, ToggleLeft,
  Search, Check, X, Send
} from 'lucide-react';
import { emergencyContacts } from '../../data/mockData';
import { EmergencyContact } from '../../types';

const relations = ['Family', 'Friend', 'Doctor', 'Colleague', 'Neighbour', 'Other'];

const ContactsPanel: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(emergencyContacts);
  const [search, setSearch] = useState('');
  // editing state reserved for future inline edit feature
  const [showAdd, setShowAdd] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', relation: 'Family' });
  const [testEmailId, setTestEmailId] = useState<string | null>(null);
  const [testSent, setTestSent] = useState<string | null>(null);

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleNotify = (id: string) => {
    setContacts(contacts.map((c) => c.id === id ? { ...c, notifyEmail: !c.notifyEmail } : c));
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const sendTestEmail = (id: string) => {
    setTestEmailId(id);
    setTimeout(() => {
      setTestEmailId(null);
      setTestSent(id);
      setTimeout(() => setTestSent(null), 3000);
    }, 2000);
  };

  const addContact = () => {
    if (newContact.name && newContact.email) {
      setContacts([...contacts, {
        id: `ec_${Date.now()}`,
        ...newContact,
        notifyEmail: true,
        priority: contacts.length + 1,
      }]);
      setNewContact({ name: '', email: '', phone: '', relation: 'Family' });
      setShowAdd(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white" style={{ fontFamily: 'Space Grotesk' }}>Emergency Contacts</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage contacts who receive Gmail alerts via PHP Mail</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-danger flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
        >
          <Plus size={16} />
          Add Contact
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="glass-card rounded-2xl p-5 mb-5 border border-white/10 animate-slide-up">
          <h3 className="font-bold text-white mb-4 text-sm" style={{ fontFamily: 'Space Grotesk' }}>New Emergency Contact</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {[
              { key: 'name', label: 'Full Name', placeholder: 'Contact full name', icon: UserCheck },
              { key: 'email', label: 'Gmail Address', placeholder: 'contact@gmail.com', icon: Mail },
              { key: 'phone', label: 'Phone Number', placeholder: '+94 77 XXX XXXX', icon: Phone },
            ].map(({ key, label, placeholder, icon: Icon }) => (
              <div key={key}>
                <label className="text-xs text-slate-500 mb-1 block">{label}</label>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                  <Icon size={14} className="text-slate-500" />
                  <input
                    type="text"
                    placeholder={placeholder}
                    className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
                    value={(newContact as any)[key]}
                    onChange={(e) => setNewContact({ ...newContact, [key]: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Relation</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                value={newContact.relation}
                onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
              >
                {relations.map((r) => <option key={r} value={r} className="bg-[#0d1527]">{r}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={addContact} className="btn-primary px-5 py-2 rounded-xl text-sm font-semibold text-white flex items-center gap-2">
              <Check size={14} /> Save Contact
            </button>
            <button onClick={() => setShowAdd(false)} className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-sm hover:bg-white/8 transition-colors flex items-center gap-2">
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center gap-2 glass-card rounded-xl px-4 py-2.5 mb-5 border border-white/8">
        <Search size={15} className="text-slate-500" />
        <input
          type="text"
          placeholder="Search contacts..."
          className="bg-transparent text-sm text-white placeholder-slate-600 outline-none flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* PHP Mail info */}
      <div className="glass-card rounded-2xl p-4 mb-5 border border-blue-500/15 bg-blue-500/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Mail size={16} className="text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">PHP Mail → Gmail SMTP Configuration</p>
            <p className="text-xs text-slate-400 mt-0.5">
              All contacts with email alerts enabled will receive Gmail notifications via PHP Mail when an SOS is triggered.
              <span className="text-blue-400 ml-1">TLS · Port 587 · noreply@safeguard.lk</span>
            </p>
          </div>
        </div>
      </div>

      {/* Contact list */}
      <div className="space-y-3">
        {filtered.map((contact) => (
          <div key={contact.id} className="glass-card rounded-2xl p-4 border border-white/5 card-hover">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {contact.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-white text-sm">{contact.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
                    Priority {contact.priority}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-700/50 text-slate-400">
                    {contact.relation}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 truncate"><Mail size={10} />{contact.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={10} />{contact.phone}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Test email */}
                {testSent === contact.id ? (
                  <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                    <Check size={11} /> Sent
                  </div>
                ) : (
                  <button
                    onClick={() => sendTestEmail(contact.id)}
                    disabled={testEmailId === contact.id}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs hover:bg-blue-500/15 transition-colors disabled:opacity-50"
                  >
                    {testEmailId === contact.id ? (
                      <span className="flex items-center gap-1"><Send size={11} className="animate-pulse" /> Sending...</span>
                    ) : (
                      <span className="flex items-center gap-1"><Send size={11} /> Test</span>
                    )}
                  </button>
                )}

                {/* Toggle notify */}
                <button onClick={() => toggleNotify(contact.id)} className="flex items-center gap-1 text-xs">
                  {contact.notifyEmail ? (
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ToggleRight size={22} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-slate-600">
                      <ToggleLeft size={22} />
                    </span>
                  )}
                </button>

                {/* Edit */}
                <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/8 transition-colors">
                  <Edit3 size={13} className="text-slate-400" />
                </button>

                {/* Delete */}
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center hover:bg-red-500/15 transition-colors"
                >
                  <Trash2 size={13} className="text-red-400" />
                </button>
              </div>
            </div>

            {/* Email status bar */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className={`flex items-center gap-1.5 ${contact.notifyEmail ? 'text-emerald-400' : 'text-slate-600'}`}>
                <Mail size={10} />
                {contact.notifyEmail ? 'Email alerts enabled' : 'Email alerts disabled'}
              </span>
              <span className="text-slate-600">PHP Mail · Gmail SMTP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPanel;
