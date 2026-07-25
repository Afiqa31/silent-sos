const Contact = require("../models/Contact");
const User = require("../models/User");
const sendSOSMail = require("../utils/sendEmail");
const Alert = require("../models/Alert");


// Create SOS Alert

const createAlert = async (req, res) => {
    console.log("🔥 SOS CONTROLLER REACHED");

    try {


        const {
            latitude,
            longitude
        } = req.body;



        // Save alert

        const alert = await Alert.create({

            user: req.user.id,

            latitude,

            longitude

        });



        // Get user details

        const user = await User.findById(
            req.user.id
        );



        // Get emergency contacts

        const contacts = await Contact.find({

            user: req.user.id

        });



        console.log(
            "Emergency Contacts:",
            contacts
        );



        if(contacts.length === 0){

            return res.status(400).json({

                success:false,

                message:
                "No emergency contacts added"

            });

        }



        // Send email to every contact

        for(const contact of contacts){


            if(contact.email){


                await sendSOSMail(

                    contact.email,

                    user.name,

                    latitude,

                    longitude

                );


                console.log(
                    "Mail sent to:",
                    contact.email
                );


            }

        }



        res.status(201).json({

            success:true,

            message:
            "SOS Alert Sent Successfully",

            alert

        });



    }

    catch(error){


        console.log(
            "SOS ERROR:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};



// Get User Alerts

const getAlerts = async(req,res)=>{


    try{


        const alerts = await Alert.find({

            user:req.user.id

        })
        .sort({
            createdAt:-1
        });



        res.json({

            success:true,

            alerts

        });


    }

    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};



module.exports = {

    createAlert,

    getAlerts

};