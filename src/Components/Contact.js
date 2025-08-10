import React, { useState } from "react";

const Contact = ({ data }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState("");

  if (data) {
    var contactName = data.name;
    var street = data.address.street;
    var city = data.address.city;
    var state = data.address.state;
    var zip = data.address.zip;
    var phone = data.phone;
    var contactEmail = data.email;
    var contactMessage = data.contactmessage;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage("");

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(result.message || 'Thank you for your message! We will get back to you soon.');
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus('error');
        if (result.errors && result.errors.length > 0) {
          setSubmitMessage(result.errors.map(err => err.msg).join(', '));
        } else {
          setSubmitMessage(result.message || 'Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return formData.name.trim() && 
           formData.email.trim() && 
           formData.message.trim() &&
           formData.name.trim().length >= 2 &&
           formData.message.trim().length >= 10;
  };

  return (
    <section id="contact">
      <div className="row section-head">
        <div className="two columns header-col">
          <h1>
            <span>Get In Touch.</span>
          </h1>
        </div>

        <div className="ten columns">
          <p className="lead">{contactMessage}</p>
        </div>
      </div>

      <div className="row">
        <div className="eight columns">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div>
                <label htmlFor="name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  size="35"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  required
                  minLength="2"
                  maxLength="100"
                />
              </div>

              <div>
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  size="35"
                  id="email"
                  name="email"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  size="35"
                  id="subject"
                  name="subject"
                  onChange={handleInputChange}
                  maxLength="200"
                />
              </div>

              <div>
                <label htmlFor="message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  cols="50"
                  rows="15"
                  value={formData.message}
                  onChange={handleInputChange}
                  id="message"
                  name="message"
                  required
                  minLength="10"
                  maxLength="2000"
                ></textarea>
              </div>

              <div>
                <button 
                  type="submit" 
                  className="submit"
                  disabled={isSubmitting || !isFormValid()}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </fieldset>
          </form>

          {/* Status Messages */}
          {submitStatus === 'error' && (
            <div id="message-warning" style={{ color: '#ff6b6b', marginTop: '20px' }}>
              <i className="fa fa-exclamation-triangle"></i> {submitMessage}
            </div>
          )}
          
          {submitStatus === 'success' && (
            <div id="message-success" style={{ color: '#51cf66', marginTop: '20px' }}>
              <i className="fa fa-check"></i> {submitMessage}
            </div>
          )}
        </div>

        <aside className="four columns footer-widgets">
          <div className="widget widget_contact">
            <h4>Address and Phone</h4>
            <p className="address">
              {contactName}
              <br />
              {contactEmail}
              <br />
              <br />
              {street} <br />
              {city}, {state} {zip}
              <br />
              <span>{phone}</span>
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Contact;
