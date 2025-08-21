import { Mail, Phone, MapPin } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  return (
    <section id="contato" className="contact section">
      <div className="container">
        <div className="section-header text-center">
          <h2>Entre em <span className="gradient-text">Contato</span></h2>
          <p>Estamos prontos para ajudar sua empresa</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <h4>Email</h4>
                <p>contato@dirhect.com.br</p>
              </div>
            </div>
            
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <h4>Telefone</h4>
                <p>(11) 96898-9211</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact 