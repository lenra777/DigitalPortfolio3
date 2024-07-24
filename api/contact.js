// api/contact.js

export default async (req, res) => {
    if (req.method === 'POST') {
        const { name, email, subject, message } = req.body;

        // Implement your email sending logic here
        // For example, using Nodemailer to send an email

        const nodemailer = require('nodemailer');

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER, // your email address
                pass: process.env.EMAIL_PASS  // your email password
            }
        });

        const mailOptions = {
            from: email,
            to: 'arnel.hondonero@gmail.com', // your email address
            subject: `Contact form submission: ${subject}`,
            html: `<p>You have a new contact form submission</p>
                   <p><strong>Name: </strong> ${name}</p>
                   <p><strong>Email: </strong> ${email}</p>
                   <p><strong>Message: </strong> ${message}</p>`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, error: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ success: false, error: 'Method not allowed' });
    }
};