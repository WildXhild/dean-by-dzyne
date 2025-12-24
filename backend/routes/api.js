const express = require('express');
const router = express.Router();
const { validateContactForm, handleValidationErrors } = require('../middleware/validation');
const { sendContactEmail } = require('../utils/emailService');
const { saveSubmission, getAllSubmissions, getSubmission, markAsRead, deleteSubmission } = require('../utils/submissionStorage');

// Submit contact form
router.post('/contact', validateContactForm, handleValidationErrors, async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save submission to storage
        const submission = saveSubmission({ name, email, subject, message });

        // Send emails
        const emailResult = await sendContactEmail({ name, email, subject, message });

        console.log(`✅ Contact form submission received from ${name}`);

        res.json({
            success: true,
            message: 'Thank you! Your message has been received. We\'ll get back to you soon.',
            submissionId: submission.id,
            emailSent: emailResult.success
        });
    } catch (error) {
        console.error('Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request. Please try again later.'
        });
    }
});

// Get all submissions (protected - add authentication in production)
router.get('/submissions', (req, res) => {
    try {
        const submissions = getAllSubmissions();
        res.json({
            success: true,
            count: submissions.length,
            submissions: submissions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        });
    } catch (error) {
        console.error('Error fetching submissions:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching submissions'
        });
    }
});

// Get single submission (protected - add authentication in production)
router.get('/submissions/:id', (req, res) => {
    try {
        const submission = getSubmission(req.params.id);
        
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.json({
            success: true,
            submission
        });
    } catch (error) {
        console.error('Error fetching submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching submission'
        });
    }
});

// Mark submission as read (protected - add authentication in production)
router.patch('/submissions/:id/read', (req, res) => {
    try {
        const success = markAsRead(req.params.id);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Submission marked as read'
        });
    } catch (error) {
        console.error('Error marking submission as read:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating submission'
        });
    }
});

// Delete submission (protected - add authentication in production)
router.delete('/submissions/:id', (req, res) => {
    try {
        const success = deleteSubmission(req.params.id);
        
        if (!success) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        res.json({
            success: true,
            message: 'Submission deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting submission'
        });
    }
});

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'Backend service is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
