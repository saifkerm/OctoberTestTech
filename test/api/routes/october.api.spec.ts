import * as bodyParser from "body-parser"
import * as chai from "chai"
import * as express from "express"
import * as supertest from "supertest"
const octoberApi = require("../../../src/api/routes/october.api");

const expect = chai.expect;

describe("October API", () => {

    const expressApp = express();

    before(async () => {
        expressApp.use(bodyParser.json({ limit: '15mb', type: 'application/json' }));
        expressApp.use('/', octoberApi);
    });


    describe("Global test", () => {
        it('Send a 404 if no params', () => {
            return supertest(expressApp)
                .get('/')
                .expect(404)
        });

        it('Send a 400 if wrong param', () => {
            return supertest(expressApp)
                .get('/toto')
                .expect(400)
        });

        it('Send a 200 with the society infos', () => {
            return supertest(expressApp)
                .get('/80426417400017')
                .expect(200)
                .then((result) => {
                    const expected = {
                        "creation_date":"2014-08-19",
                        "name":"OCTOBER",
                        "address":{
                            "street":"94 RUE DE LA VICTOIRE",
                            "postalCode":"75009",
                            "city":"Paris",
                            "country":"FRANCE"
                        },
                        "phoneNumber":"01 82 83 28 00",
                        "sirent":"804264174",
                        "siret":"80426417400017",
                        "capital":"285927"
                    };
                    expect(result.body).to.deep.equal(expected)
                })
        });
    });


    describe("Csv file test", () => {

        it('Send a 200 with the society infos for SA LUBING INTERNATIONAL', () => {
            return supertest(expressApp)
                .get('/301941407')
                .expect(200)
                .then((result) => {

                    expect(result.body.name).to.deep.equal("S.A  LUBING INTERNATIONAL")
                })
        });

        it('Send a 200 with the society infos EXPERDECO', () => {
            return supertest(expressApp)
                .get('/303830244')
                .expect(200)
                .then((result) => {

                    expect(result.body.name).to.deep.equal("EXPERDECO")
                })
        });

        it('Send a 200 with the society infos for CHINA ARTS', () => {
            return supertest(expressApp)
                .get('/310590773')
                .expect(200)
                .then((result) => {

                    expect(result.body.name).to.deep.equal("CHINA ARTS")
                })
        });

        it('Send a 200 with the society infos for HOTEL BELLEVUE', () => {
            return supertest(expressApp)
                .get('/311935241')
                .expect(200)
                .then((result) => {

                    expect(result.body.name).to.deep.equal("HOTEL BELLEVUE")
                })
        });

        it('Send a 200 with the society infos for PARIS ATELIERS', () => {
            return supertest(expressApp)
                .get('/312936875')
                .expect(200)
                .then((result) => {

                    expect(result.body.name).to.deep.equal("PARIS ATELIERS")
                })
        });

    })


});
