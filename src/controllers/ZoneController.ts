import { Request, Response } from "express";
import { Client, Language } from "@googlemaps/google-maps-services-js";
import { ReverseGeocodingLocationType } from "@googlemaps/google-maps-services-js/dist/geocode/reversegeocode";
import { getCustomRepository } from "typeorm";
import { ZoneRepository } from "../repositories/ZoneRepository";

class ZoneController {
    // boss
    async index(request: Request, response: Response){
        const zoneRepository = getCustomRepository(ZoneRepository);
        const allZones = await zoneRepository.find({relations:["users", "benefiteds"]});
        response.json(allZones);
    }
    // async create(request: Request, response: Response){
    //     const zoneRepository = getCustomRepository(ZoneRepository);

    //     const { 
    //         city, 
    //         sector, 
    //         district, 
    //         street, 
    //         description, 
    //         latitude, 
    //         longitude,
    //         radius
    //      } = request.body;

    //     if (!city || !sector || !district || !latitude || !longitude || !radius) {
    //         return response.status(400).json({
    //             error: "Está faltando dados."
    //         })
    //     }

    //     const client = new Client({});

    //     let addressForm: string;
        
    //     if (street) {
    //         addressForm = `${street} - `;
    //     } else {
    //         addressForm = "";
    //     }

    //     const address = `${addressForm}${district} ,${city} - PB ,Brasil`
       
    //     const full_address = await client.geocode({
    //         params: {
    //             key: "AIzaSyDXYiQ3nVEA-dZSm6I3swzW1-uyxD7iu4c",
    //             language: "pt-BR",
    //             address: address,
    //         }
    //     })

    //     const formatted_address = full_address.data.results[0].formatted_address;

    //     let lat: number = full_address.data.results[0].geometry.location.lat;
    //     let lng: number = full_address.data.results[0].geometry.location.lng;
        
    //     const zone = zoneRepository.create({
    //         city, 
    //         sector, 
    //         district, 
    //         street, 
    //         description, 
    //         formatted_address, 
    //         latitude: !latitude ? lat : latitude, 
    //         longitude: !longitude ? lng : longitude,
    //         radius,
    //     })

    //     await zoneRepository.save(zone);

    //     return response.status(201).json(zone);
        
    // }

    async destroy(request: Request, response: Response) {
        const zoneRepository = getCustomRepository(ZoneRepository);
        const { id } = request.params;
        const zone = await zoneRepository.findOne({id});
        if (!zone) {
            return response.json({
                error: "Localidade não existe."
            })
        }
        await zoneRepository.delete({id});
        response.json(zone);
    }

    async createByCoor(request: Request, response: Response){
        const client = new Client({});

        const { lat, lng, rad } = request.body;

        const coor = { lat, lng };
       
        const res = await client.reverseGeocode({
            params: {
                key: "AIzaSyDXYiQ3nVEA-dZSm6I3swzW1-uyxD7iu4c",
                language: Language.pt_BR,
                latlng: coor,
                location_type: [ReverseGeocodingLocationType.GEOMETRIC_CENTER]
            }
        })

        return response.json({
            local: res.data.results[0].formatted_address,
            lat,
            lng,
            rad,
        })
        
    }
}

export default new ZoneController();