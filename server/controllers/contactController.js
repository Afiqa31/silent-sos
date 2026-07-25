const Contact = require("../models/Contact");

// Add Contact
const addContact = async (req, res) => {
    try {
        const { name, phone, email, relationship } = req.body;

        const contact = await Contact.create({
            user: req.user.id,
            name,
            phone,
            email,
            relationship
        });

        res.status(201).json({
            success: true,
            message: "Contact Added Successfully",
            contact
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get Contacts
const getContacts = async (req, res) => {
    try {

        const contacts = await Contact.find({
            user: req.user.id
        });

        res.json({
            success: true,
            contacts
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Contact
const deleteContact = async (req, res) => {

    try {

        await Contact.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Contact Deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addContact,
    getContacts,
    deleteContact
};