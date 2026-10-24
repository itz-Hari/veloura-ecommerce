import { useState } from 'react'
import { Clock, Mail, MapPin } from 'lucide-react'
import { useUI } from '../context/UIContext'
import { validateEmail, validateRequired } from '../utils/validation'
import './ContactPage.css'

const SUBJECTS = ['General question', 'Order help', 'Shipping', 'Returns', 'Size guide', 'Press & partnerships']

export default function ContactPage() {
  const { route } = useUI()
  // Footer support links can pre-select a subject.
  const initialSubject = SUBJECTS.includes(route.params.subject) ? route.params.subject : SUBJECTS[0]
  const [form, setForm] = useState({ name: '', email: '', subject: initialSubject, message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSent(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = {
      name: validateRequired(form.name, 'name'),
      email: validateEmail(form.email),
      message: form.message.trim().length < 10 ? 'Please write a message of at least 10 characters.' : '',
    }
    const filtered = Object.fromEntries(Object.entries(found).filter(([, message]) => message))
    setErrors(filtered)
    if (Object.keys(filtered).length > 0) return

    // No email service is connected: we only confirm the form is valid.
    setSent(true)
    setForm((current) => ({ ...current, name: '', email: '', message: '' }))
  }

  return (
    <main id="main" className="page container contact">
      <header className="page-header">
        <span className="eyebrow">Contact</span>
        <h1 className="section-title">We&apos;d love to hear from you</h1>
        <p>Questions about an order, sizing or a collaboration? Send a note below.</p>
      </header>

      <div className="contact__layout">
        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__row">
            <div className="field">
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" className="input" type="text" autoComplete="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
              {errors.name && <p className="field-error" id="contact-name-error">{errors.name}</p>}
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input id="contact-email" name="email" className="input" type="email" autoComplete="email" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'contact-email-error' : undefined} />
              {errors.email && <p className="field-error" id="contact-email-error">{errors.email}</p>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="contact-subject">Subject</label>
            <select id="contact-subject" name="subject" className="input" value={form.subject} onChange={handleChange}>
              {SUBJECTS.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" className="input" value={form.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} />
            {errors.message && <p className="field-error" id="contact-message-error">{errors.message}</p>}
          </div>

          <button type="submit" className="btn btn-glass">Send message</button>

          <div role="status">
            {sent && (
              <p className="form-note">
                Thanks! Your message looks complete. This is a demo, so it was not delivered or stored anywhere.
              </p>
            )}
          </div>
        </form>

        <aside className="contact__info" aria-label="Store details (sample)">
          <h2>Visit &amp; reach us</h2>
          <p className="contact__sample">Sample details for the demo store</p>
          <ul>
            <li><Mail size={20} aria-hidden="true" /> hello@veloura.example</li>
            <li><MapPin size={20} aria-hidden="true" /> 12 Studio Lane, Chennai (sample address)</li>
            <li><Clock size={20} aria-hidden="true" /> Mon-Sat, 10:00-18:00 (sample hours)</li>
          </ul>
        </aside>
      </div>
    </main>
  )
}
