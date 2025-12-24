const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
    const emailService = process.env.EMAIL_SERVICE || 'gmail';
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
        console.warn('⚠️  Email credentials not configured. Contact form will log to console only.');
        return null;
    }

    return nodemailer.createTransport({
        service: emailService,
        auth: {
            user: emailUser,
            pass: emailPassword
        }
    });
};

// Send email notification
const sendContactEmail = async (contactData) => {
    const transporter = createTransporter();
    
    if (!transporter) {
        console.log('📧 Contact form submission (email service disabled):', contactData);
        return { success: true, message: 'Submission received (email service disabled)' };
    }

    try {
        const { name, email, subject, message } = contactData;
        const emailTo = process.env.EMAIL_TO;
        const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

        // Email to you (business owner)
        const businessEmailContent = {
            from: emailFrom,
            to: emailTo,
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #224560;">New Contact Form Submission</h2>
                    <hr style="border: none; border-top: 2px solid #764DF6;">
                    
                    <p><strong>From:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    
                    <h3 style="color: #224560; margin-top: 20px;">Message:</h3>
                    <p style="background-color: #f0f5f7; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
                        ${message}
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;">
                    <p style="font-size: 0.9em; color: #7B7E7F;">
                        Submitted on ${new Date().toLocaleString()}
                    </p>
                </div>
            `
        };

        // Confirmation email to user
        const userEmailContent = {
            from: emailFrom,
            to: email,
            subject: 'We received your message - Dean by D\'Zyne',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #224560;">Thank You for Contacting Us!</h2>
                    <hr style="border: none; border-top: 2px solid #764DF6;">
                    
                    <p>Hi ${name},</p>
                    
                    <p>We've received your message and appreciate you reaching out to <strong>Dean by D'Zyne</strong>.</p>
                    
                    <p><strong>Your Message Details:</strong></p>
                    <p>
                        <strong>Subject:</strong> ${subject}<br>
                        <strong>Received:</strong> ${new Date().toLocaleString()}
                    </p>
                    
                    <p>Our team will review your inquiry and get back to you within 24 hours.</p>
                    
                    <p style="margin-top: 30px;">
                        Best regards,<br>
                        <strong>Dean by D'Zyne Team</strong><br>
                        <a href="https://deanby-dzyne.com">deanby-dzyne.com</a>
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #ccc; margin-top: 30px;">
                    <p style="font-size: 0.85em; color: #7B7E7F;">
                        This is an automated message. Please do not reply to this email.
                    </p>
                </div>
            `
        };

        // Send both emails
        await transporter.sendMail(businessEmailContent);
        await transporter.sendMail(userEmailContent);

        console.log(`✅ Emails sent successfully for submission from ${name}`);
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, message: 'Failed to send email' };
    }
};

module.exports = { sendContactEmail };
