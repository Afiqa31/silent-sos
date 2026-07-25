const nodemailer = require("nodemailer");


const sendSOSMail = async (
    to,
    userName,
    latitude,
    longitude
)=>{


    const transporter = nodemailer.createTransport({

        service:"gmail",

        auth:{

            user:process.env.EMAIL_USER,

            pass:process.env.EMAIL_PASS

        }

    });



    const mapLink =
    `https://www.google.com/maps?q=${latitude},${longitude}`;



    await transporter.sendMail({

        from:process.env.EMAIL_USER,

        to:to,

        subject:"🚨 Silent SOS Emergency Alert",

        html:`

        <h2>Emergency Alert</h2>

        <p>
        <b>${userName}</b> has triggered Silent SOS.
        </p>

        <p>
        Location:
        </p>

        <a href="${mapLink}">
        View Live Location
        </a>

        <br><br>

        <p>
        Please contact immediately.
        </p>

        `

    });


    console.log(
        "SOS Email sent successfully to:",
        to
    );


};


module.exports = sendSOSMail;