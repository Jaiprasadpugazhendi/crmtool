const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.model');
const Lead = require('../models/lead.model');
const Customer = require('../models/customer.model');
const Deal = require('../models/deal.model');
const Task = require('../models/task.model');
const ActivityLog = require('../models/activityLog.model');

// Load env vars
dotenv.config({ path: './.env' }); // Adjusted path relative to execution root

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany();
        await Lead.deleteMany();
        await Customer.deleteMany();
        await Deal.deleteMany();
        await Task.deleteMany();
        await ActivityLog.deleteMany();

        console.log('Data Destroyed...');

        // Create Users
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@salesai.com',
            password: 'password123',
            role: 'admin'
        });

        const manager = await User.create({
            name: 'Manager User',
            email: 'manager@salesai.com',
            password: 'password123',
            role: 'manager'
        });

        const agent = await User.create({
            name: 'Agent User',
            email: 'agent@salesai.com',
            password: 'password123',
            role: 'agent'
        });

        console.log('Users Created...');

        // Create Leads
        const leads = await Lead.create([
            {
                name: 'John Doe',
                email: 'john@example.com',
                company: 'Tech Corp',
                status: 'new',
                source: 'website',
                assignedTo: agent._id
            },
            {
                name: 'Jane Smith',
                email: 'jane@example.com',
                company: 'Design Studio',
                status: 'contacted',
                source: 'linkedin',
                assignedTo: agent._id
            }
        ]);

        console.log('Leads Created...');

        // Create Customer
        const customer = await Customer.create({
            name: 'Acme Inc',
            email: 'contact@acme.com',
            company: 'Acme Inc',
            assignedTo: manager._id,
            notes: 'High value client'
        });

        console.log('Customers Created...');

        // Create Deal
        await Deal.create({
            title: 'Acme Annual Contract',
            value: 50000,
            stage: 'proposal',
            customerId: customer._id,
            assignedTo: manager._id
        });

        console.log('Deals Created...');

        // Create Task
        await Task.create({
            title: 'Follow up with John',
            dueDate: new Date(),
            priority: 'high',
            assignedTo: agent._id,
            createdBy: manager._id,
            relatedTo: {
                kind: 'Lead',
                item: leads[0]._id
            }
        });

        console.log('Tasks Created...');

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    // deleteData();
} else {
    importData();
}
