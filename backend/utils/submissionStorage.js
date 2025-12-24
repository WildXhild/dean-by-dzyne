const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, '../data/submissions.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
    const dataDir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
};

// Get all submissions
const getAllSubmissions = () => {
    try {
        ensureDataDirectory();
        if (!fs.existsSync(SUBMISSIONS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
};

// Save a new submission
const saveSubmission = (contactData) => {
    try {
        ensureDataDirectory();
        const submissions = getAllSubmissions();
        
        const newSubmission = {
            id: Date.now().toString(),
            ...contactData,
            timestamp: new Date().toISOString(),
            read: false
        };

        submissions.push(newSubmission);
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        
        console.log(`✅ Submission saved: ${contactData.name}`);
        return newSubmission;
    } catch (error) {
        console.error('❌ Error saving submission:', error);
        throw error;
    }
};

// Get submission by ID
const getSubmission = (id) => {
    const submissions = getAllSubmissions();
    return submissions.find(sub => sub.id === id);
};

// Mark submission as read
const markAsRead = (id) => {
    try {
        const submissions = getAllSubmissions();
        const index = submissions.findIndex(sub => sub.id === id);
        
        if (index !== -1) {
            submissions[index].read = true;
            fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error marking submission as read:', error);
        return false;
    }
};

// Delete submission
const deleteSubmission = (id) => {
    try {
        let submissions = getAllSubmissions();
        submissions = submissions.filter(sub => sub.id !== id);
        fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
        return true;
    } catch (error) {
        console.error('Error deleting submission:', error);
        return false;
    }
};

module.exports = {
    getAllSubmissions,
    saveSubmission,
    getSubmission,
    markAsRead,
    deleteSubmission
};
