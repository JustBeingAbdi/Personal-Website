
import express from "express";

import ejs from "ejs";
import path from "path";
import bodyparser from "body-parser";
import session from "express-session";
import * as Config from "./../lib/Config";

export class Server {
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

        app.listen(port);

    }
}