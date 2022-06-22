const BASE_URL = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPIELPLATZPUNKTOGD&srsName=EPSG:4326&outputFormat=json";
const fetch = require('node-fetch');
const fs = require('fs');
const {request} = require("express");

const DUMMY_DATA = JSON.stringify ({
    "type": "FeatureCollection",
    "totalFeatures": 731,
    "features": [
        {
            "type": "Feature",
            "id": "SPIELPLATZPUNKTOGD.fid-3c2bbd1e_1816e48650b_254b",
            "geometry": {
                "type": "Point",
                "coordinates": [16.422416183844728, 48.160243477197334]
            },
            "geometry_name": "SHAPE",
            "properties": {
                "OBJECTID": 928551,
                "ANL_NAME": "PA Am Kanal",
                "BEZIRK": 11,
                "SPIELPLATZ_DETAIL": "Fitness",
                "TYP_DETAIL": "Generationenspielplatz",
                "SE_ANNO_CAD_DATA": null
            }
        },
        {
            "type": "Feature",
            "id": "SPIELPLATZPUNKTOGD.fid-3c2bbd1e_1816e48650b_254c",
            "geometry": {
                "type": "Point",
                "coordinates": [16.313673804381224, 48.20027714142061]
            },
            "geometry_name": "SHAPE",
            "properties": {
                "OBJECTID": 928552,
                "ANL_NAME": "H.-C.-Artmann-Park",
                "BEZIRK": 14,
                "SPIELPLATZ_DETAIL": "Balancieren, Basketball, Fußball, Klettern, Malen, Rutschen, Sandspielen, Schaukeln, Wippen",
                "TYP_DETAIL": "Ballspielkäfig, Kleinkinderspielplatz, Spielplatz, sonstiger Spielplatz",
                "SE_ANNO_CAD_DATA": null
            }
        },
        {
            "type": "Feature",
            "id": "SPIELPLATZPUNKTOGD.fid-3c2bbd1e_1816e48650b_254d",
            "geometry": {
                "type": "Point",
                "coordinates": [16.369198359892074, 48.22630447323446]
            },
            "geometry_name": "SHAPE",
            "properties": {
                "OBJECTID": 928553,
                "ANL_NAME": "PA Gaußplatz",
                "BEZIRK": 20,
                "SPIELPLATZ_DETAIL": "Basketball, Rutschen, Sand-Matsch, Schaukeln, Wasserspiel, Wippen",
                "TYP_DETAIL": "Ballspielkäfig, Kleinkinderspielplatz, Spielplatz",
                "SE_ANNO_CAD_DATA": null
            }
        }
    ]
});

// 3 playground entries stored statically for testing purposes
// TODO: remember to turn on live data!!

class Playground {
    // this constructor is only for testing purposes! production code should use buildFrom()!
    constructor(id, name, coordinatesLong, coordinatesLat){
        this.pgId = id;
        this.name = name;
        this.long = coordinatesLong;
        this.lat = coordinatesLat;
    };

    static buildFrom(raw) {
        const pg = new Playground();
        pg.pgId = raw.properties.OBJECTID;
        pg.name = raw.properties.ANL_NAME;
        pg.long = raw.geometry.coordinates[0]
        pg.lat = raw.geometry.coordinates[1]
        pg.district = raw.properties.BEZIRK;

        return pg;
    }
}

class PlaygroundDetails {
    constructor() {
        this.reviews = [];
        this.nextRevNr = 0;
    }
}

class PlaygroundReview {
    constructor(user, text, revId) {
        this.user = user;
        this.text = text; //text der im kommentar steht
        this.revId = revId; //backend prüfen ob wir wirklich das löschen möchten...bug weil alle gelöscht werden
    }
}

class PlaygroundModel {

    constructor() {
        this.playgrounds = new Map(); //es ist eine ID kein Hash und somit eindeutig
        this.pgDetails = new Map();
        this.dataLoaded = false;
        this.live = false;
        this.loadPgData(); // NOTE: can it cause problems if this is done here??
        this.loadPgDetails();
    }

    addPlayground(playground) {
        this.playgrounds.set(playground.pgId, playground);
    }

    // returns an Array of all loaded playgrounds
    getPgData() {
        if(!this.dataLoaded) {
            this.loadPgData();
        }
        return Array.from(this.playgrounds.values());
    }

    // returns the data for the specific playground identified by its pgId
    getPgDetails(pgId) {
        console.log("pg details request received for pg " + pgId);
        pgId = Number(pgId);
        if(!this.dataLoaded) {
            this.loadPgData();
        }
        const details = [this.playgrounds.get(pgId), this.pgDetails.get(pgId)];
        return details;
    }

    loadPgData() {
        if (!this.live) {
            console.log("loading dummy data");
            const pgData = JSON.parse(DUMMY_DATA);
            pgData.features.forEach(pg => {
                const playground = Playground.buildFrom(pg);
                this.addPlayground(playground);
            })
        } else {
            console.log("loading real data");
            const jData = fetch(BASE_URL)
                .then(response => response.json())
                .then((data) => {
                    return data;
                });

            const saveData = async () => {
                const data = await jData;
                data.features.forEach(pg => {
                    const playground = Playground.buildFrom(pg);

                    // !!IMPORTANT!! maybe next line needs to read "model." rather than "this." to work from
                    // all contexts??
                    // If so: need to move initial loading away from constructor!!
                    this.addPlayground(playground);
                })
            };
            saveData();
        }
        this.dataLoaded = true;
    }

    loadPgDetails() {
        fs.readFile('Data/pgDetails.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }

            // parse JSON object
            const detailsJson = JSON.parse(data.toString());

            // print JSON object
            detailsJson.forEach(det => {
                const pgD = new PlaygroundDetails();
                det.reviews.forEach(rev => {
                    pgD.reviews.push(new PlaygroundReview(rev.user, rev.text, rev.revId));
                    const revNr = Number((rev.revId.slice("-"))[1]);
                    if (pgD.nextRevNr <= revNr) {
                        pgD.nextRevNr = revNr +1;
                    }
                });
                this.pgDetails.set(det.pgId, pgD);
            })
        });
    }

    postReview(req, res) {
        console.log("Review received with:");
        console.log(req.body);
        const pgId = Number(req.body.pgId);//das request was wir geschickt bekommen hat ein body von dem wir zugehörige id holen.
        if(!this.playgrounds.has(pgId)) { //gibts den Spielplatz mit der ID überhaupt?
            // playground doesn't exist in database
            console.log("review entry received for unknown pg " + pgId);
            return res.json({ //wenn es mit review nicht geklappt hat gibt es response zurueck
                statusCde: 404,
                message: "Playground not found!"
            })
        }
        /*
        wir haben im Backend zwei Maps.
        1.) Spielplatzdaten...kommen von Stadt Wien
        2.) Spielplatzdetails...die sammeln wir selber :)


         */
        let pgD = this.pgDetails.get(pgId); //wir holen uns mit der ID die zugehörigen Playgrounddetails
        if (!pgD) { //gibts die? --> wenn nicht pg details
            pgD = new PlaygroundDetails()//wir erstellen neue Details
        }
        pgD.reviews.push(new PlaygroundReview(req.body.user, req.body.revText, pgId + "-" + pgD.nextRevNr));
        //hier fügen wir neues review hinzu weil wir body, Text bekommen
        pgD.nextRevNr++;
        this.pgDetails.set(pgId, pgD);
    }

    editReview(req, res) {
        console.log("Review edit received with:");
        console.log(req.body);
        const pgId = Number(req.body.pgId);
        if(this.pgDetails.has(pgId)) {
            const reviews = this.pgDetails.get(pgId).reviews;
            reviews.forEach(rev => {
                if(rev.revId === req.body.revId && rev.user === req.body.user) {
                    rev.text = req.body.revText;
                    console.log("Review updated!");
                    /*
                    return res.json({
                        statusCde: 200,
                        message: "Review updated!"
                    });

                     */
                }
            });
        }

        // if we got till here the review was not found or from a different user
        // this probably shouldn't happen
        //console.log("Either the review ID was bad or the review was from a different user!");
        //console.log("revID: " + revId + "; user: " + req.body.user);
        /*
        return res.json({
            statusCde: 400,
            message: "Either the review ID was bad or the review was from a different user!"
        })
         */
    }

    deleteReview(req, res) {
        console.log("Review delete request received with:");
        console.log(req.body);
        const pgId = Number(req.body.pgId);
        if(this.pgDetails.has(pgId)) {
            const reviews = this.pgDetails.get(pgId).reviews;
            for (let i = 0; i < reviews.length; i++) {
                if(reviews[i].revId === req.body.revId && reviews[i].user === req.body.user) {
                    const del = reviews.splice(i, 1);
                    console.log("Deleted review: " + del[0]);
                    /*
                    return res.json({
                        statusCde: 200,
                        message: "Review updated!"
                    });

                     */
                }
            }
        }
    }
}

const model = new PlaygroundModel();

module.exports = model;
