// 3 playground entries stored statically for testing purposes
// remember to replace with live data!!
const dummyData = JSON.stringify ({
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

class PlayGround {
    constructor(id, name, coordinatesLong, coordinatesLat){
        this.id = id;
        this.name = name;
        this.long = coordinatesLong;
        this.lat = coordinatesLat;
    }
}
class PlaygroundModel {
    static PG_ID = 1;

    constructor() {
        this.playgrounds = new Map();
    }

    addPlayground(playground) {
        this.playgrounds.set(PlaygroundModel.PG_ID++, playground);
    }

    getPgData() {
        return Array.from(this.playgrounds.values());
    }
}

const model = new PlaygroundModel();

loadPlaygroundData();

module.exports = model;

async function loadPlaygroundData () {
    console.log("getting pg data from webservice...")
    const pgString = await fetchPgData();

    const pgData = JSON.parse(pgString);
    pgData.features.forEach(pg => {
        model.addPlayground(pg.properties.objectId, pg.properties.ANL_NAME,
            pg.geometry.coordinates[0], pg.geometry.coordinates[1]);
    })
}

async function fetchPgData() {
    return dummyData;
}


