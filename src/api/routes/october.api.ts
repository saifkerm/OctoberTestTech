import { Request, Response, Router } from "express"
const axios = require('axios');

require("dotenv").config();


export interface CreditInterface {
    success: boolean,
    result: {
        companyName: string;
        productName: string;
        consumedCredits: number;
        maxCredits: number;
        extraCredits: number;
        consumedExtraCredits: number;
        totalAvailableCredits: number
    }
}

export interface ResultInterface {
    creation_date: string;
    name: string;
    address: {
        street: string;
        postalCode: string;
        city: string;
        country: string;
    };
    phoneNumber: string;
    sirent: string;
    siret: string;
    capital: string
}

/**
 * Api pour test technique October de Kermoun Saifeddine
 *
 * @memberOf OctoberApi
 */
export class OctoberApi {

    public router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get("/:name", this.getSocietyInfos);
    }

    /**
     * Get society infos from its SIREN or SIRET code
     *
     * /!\ We can use only 25 times the api with the api key
     *
     * { :name } => SIREN or SIRET code
     *
     * Exemple : https://societeinfo.com/app/rest/api/v2/company.json/80426417400017?key=6meltaq7lojp77sj6s7a18vc3rq0btkrqk8a4r77bivalshs0vl
     *
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<Response>} ResultInterface
     * @memberof OctoberApi
     */
    public async getSocietyInfos(request: Request, response: Response): Promise<Response> {

        try {

            const { name } = request.params;

            const key: string = `?key=${process.env.API_KEY}`;

            let credit: CreditInterface = null;

            // Check my credit
            await axios.get(`https://societeinfo.com/app/rest/api/v2/apikeyinfo.json${key}`)
                .then((result) => {
                    credit = result.data
                });


            // Return message of we have 0 credit
            if (credit.result.totalAvailableCredits === 0) {
                return response.status(200).send("Total Available Credits : 0")
            }

            // Get my society infos
            await axios.get(`https://societeinfo.com/app/rest/api/v2/company.json/${name}/${key}`)
                .then((result) => {
                    // build the result
                    let society: ResultInterface = {
                        creation_date : result.data.result.organization.creation_date,
                        name: result.data.result.organization.name,
                        address: {
                            street: result.data.result.organization.address.street,
                            postalCode: result.data.result.organization.address.postal_code,
                            city: result.data.result.organization.address.city,
                            country: result.data.result.organization.address.country,

                        },
                        phoneNumber: result.data.result.contacts.phones[0].value,
                        sirent: result.data.result.organization.registration_number,
                        siret: result.data.result.organization.full_registration_number,
                        capital: result.data.result.organization.capital
                    };

                    return response.status(200).send(society)
                })
                .catch((error) => {
                    return response.status(400).send(error.data)
                });

        } catch (error) {
            return response.status(500).send(error)
        }
    }

}

const octoberApi = new OctoberApi();
module.exports = octoberApi.router;
