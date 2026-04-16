'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function ContactSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    interest: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const newErrors: Partial<typeof form> = {};
    if (!form.name.trim()) newErrors.name = t.contact.errors.nameRequired;
    if (!form.email.trim()) newErrors.email = t.contact.errors.emailRequired;
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = t.contact.errors.emailInvalid;
    if (!form.message.trim()) newErrors.message = t.contact.errors.messageRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1px solid ${hasError ? 'var(--color-accent-amber)' : 'var(--color-border)'}`,
    background: 'var(--color-bg-elevated)',
    color: 'var(--color-text-primary)',
    fontSize: 15,
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  });

  const contactDetails = [
    { label: t.contact.emailLabel, value: t.contact.emailValue },
    { label: t.contact.phoneLabel, value: t.contact.phoneValue },
    { label: t.contact.locationLabel, value: t.contact.locationValue },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: '120px 24px',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 80,
          alignItems: 'center',
        }}
      >
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--color-accent-cyan)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            {t.contact.label}
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              marginBottom: 24,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            {t.contact.headline}
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            {t.contact.subheadline}
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {contactDetails.map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--color-text-muted)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    width: 70,
                    flexShrink: 0,
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    color: 'var(--color-text-primary)',
                    fontFamily: item.label === t.contact.emailLabel ? 'var(--font-mono)' : 'var(--font-body)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div
            style={{
              padding: '40px',
              borderRadius: 20,
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
          >
            {status === 'success' ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <CheckCircle size={48} color="var(--color-accent-green)" />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {t.contact.messageSent}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 15 }}>
                  {t.contact.messageSentDesc}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name + Company */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: 'var(--color-text-muted)',
                        marginBottom: 6,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      NAME *
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.namePlaceholder}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.name ? 'var(--color-accent-amber)' : 'var(--color-border)')
                      }
                      style={inputStyle(!!errors.name)}
                    />
                    {errors.name && (
                      <span role="alert" aria-live="polite" style={{ fontSize: 11, color: 'var(--color-accent-amber)', marginTop: 4, display: 'block' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: 'var(--color-text-muted)',
                        marginBottom: 6,
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.05em',
                      }}
                    >
                      COMPANY
                    </label>
                    <input
                      type="text"
                      placeholder={t.contact.companyPlaceholder}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
                      onBlur={(e) => (e.target.style.borderColor = 'var(--color-border)')}
                      style={inputStyle(false)}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      marginBottom: 6,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    EMAIL *
                  </label>
                  <input
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.email ? 'var(--color-accent-amber)' : 'var(--color-border)')
                    }
                    style={inputStyle(!!errors.email)}
                  />
                  {errors.email && (
                    <span role="alert" aria-live="polite" style={{ fontSize: 11, color: 'var(--color-accent-amber)', marginTop: 4, display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Product Interest */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      marginBottom: 6,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    PRODUCT INTEREST
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    style={{
                      ...inputStyle(false),
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234A5568' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                    }}
                  >
                    <option value="" style={{ background: 'var(--color-bg-surface)' }}>
                      {t.contact.selectInterest}
                    </option>
                    {t.contact.interests.map((interest) => (
                      <option key={interest} value={interest} style={{ background: 'var(--color-bg-surface)' }}>
                        {interest}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      color: 'var(--color-text-muted)',
                      marginBottom: 6,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    MESSAGE *
                  </label>
                  <textarea
                    placeholder={t.contact.messagePlaceholder}
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--color-accent-cyan)')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message ? 'var(--color-accent-amber)' : 'var(--color-border)')
                    }
                    style={{ ...inputStyle(!!errors.message), resize: 'vertical', minHeight: 100 }}
                  />
                  {errors.message && (
                    <span role="alert" aria-live="polite" style={{ fontSize: 11, color: 'var(--color-accent-amber)', marginTop: 4, display: 'block' }}>
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '14px 28px',
                    borderRadius: 10,
                    border: 'none',
                    background:
                      status === 'loading' ? 'rgba(0,212,255,0.5)' : 'var(--color-accent-cyan)',
                    color: 'var(--color-bg-deep)',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'loading') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,212,255,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true" />
                      <span aria-label="提交中，请稍候">{t.contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      {t.contact.sendMessage}
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      color: 'var(--color-accent-amber)',
                      fontSize: 13,
                    }}
                  >
                    <AlertCircle size={14} />
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
