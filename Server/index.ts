
import express from "express";

import ejs from "ejs";
import path from "path";
import bodyparser from "body-parser";
import session from "express-session";
import {Mail} from "./../Mail";
import srs from "secure-random-string";
import axios from "axios";
import * as Config from "./../lib/Config";
export class Server {
    public mail: Mail = new Mail();
    public async init(port): Promise<any> {
        let app = express();


        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: true }));
        app.engine("html", ejs.renderFile);
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, "./../views"));
        app.use(express.static(path.join(__dirname, "./../public")));
        app.use(session({
            secret: "mysecret<3",
            resave: false,
            saveUninitialized: false
        }));

        app.get("/", async (req, res) => {
            res.render("index");
        });
        app.get("/contact", async(req, res)=> {
            res.render("contact");
        })
        app.post("/add", async(req, res) => {
            let spid = srs({length:10});
            let name = req.query.name + ''.replace("%20", " ").replace("+", " ");
            let email = req.query.email + ''.replace("%20", " ").replace("+", " ");
            let department = req.query.department + ''.replace("%20", " ").replace("+", " ");
            let message = req.query.message + ''.replace("%20", " ").replace("+", " ");
            let roothtml = "<h2>New Contact Ticket</h2>\n\n\n<p>From Email: " + `${email} Name: ${name} Dep: ${department} Message: ${message}`;
            let emailhtml = `<h2> Hello ${name} </h2>\n\n\n<p>Thank you for reaching out to us.</p>\n<p>Our Average respons time is from 12 hours to 48 hours. Please be patient and we will respond soon.</p>\n\n\n<p>Sincerly JoyBot (Automated Message from our Bot :/ )</p>\n<a href="https://tickets.justbeingabdi.cf/ticket-emails?id=${spid}">Online Version of Email</a>`;

            this.mail.SendMailRoot('JustBeingAbdi', 'contact@justbeingabdi.cf', department, roothtml);
            this.mail.SendMail(email, name, 'RE: Support Ticket | Department: ' + department, emailhtml);


            axios({
                method: 'POST',
                url: 'https://tickets.justbeingabdi.cf/api/tickets.json',
                headers: {
                    "X-API-Key: ": Config.osapikey
                },
                data: {
                    email: email,
                    name: name || 'Unknown',
                    subject: department,
                    message: message
                }
            })
            res.status(200).send({
                message: "Affirmativ"
            });
            
        })

        app.listen(port);

    }
}