const BASE_URL = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPIELPLATZPUNKTOGD&srsName=EPSG:4326&outputFormat=json";
const fetch = require('node-fetch');

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

class PlayGround {
    // this constructor is only for testing purposes! production code should use buildFrom()!
    constructor(id, name, coordinatesLong, coordinatesLat){
        this.pgId = id;
        this.name = name;
        this.long = coordinatesLong;
        this.lat = coordinatesLat;
    };

    static buildFrom(raw) {
        const pg = new PlayGround();
        pg.pgId = raw.properties.OBJECTID;
        pg.name = raw.properties.ANL_NAME;
        pg.long = raw.geometry.coordinates[0]
        pg.lat = raw.geometry.coordinates[1]
        pg.district = raw.properties.BEZIRK;

        return pg;
    }
}
class PlaygroundModel {

    constructor() {
        this.playgrounds = new Map();
        this.dataLoaded = false;
        this.live = false;
        this.loadPgData(); // NOTE: can it cause problems if this is done here??
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
        if(!this.dataLoaded) {
            this.loadPgData();
        }
        return this.playgrounds.get(pgId);
    }

    loadPgData() {
        if (!this.live) {
            console.log("loading dummy data");
            const pgData = JSON.parse(DUMMY_DATA);
            pgData.features.forEach(pg => {
                const playground = PlayGround.buildFrom(pg);
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
                    const playground = PlayGround.buildFrom(pg);

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
}

const model = new PlaygroundModel();

module.exports = model;
