import { Router } from 'express'
import {getRegion} from '../utils/region'
import {User } from '../models/user'

export default function (Router ) {
    Router.post('/signup', async (req, res) => {
        // console.log('args', req.body);
        try {
            let date0 = new Date()
            if (!req.body.email) throw new Error('Email is mandatory')
            // check for correct message
            // console.log('route step 1',new Date()-date0);
            let check = await User.exists({ email: req.body.email })
            if (check) throw new Error('Email already exist')
            // console.log('route step 2',new Date()-date0);
            let {regionName,location} = await getRegion(req.body.lat, req.body.lng)
            if (!regionName) throw new Error('Not belongs to indian regions')
            // console.log('route step 3',new Date()-date0);
            req.body.location = location
            req.body.region = regionName
            // lets register in DB
            let user = new User(req.body)
            // console.log('route step 4',new Date()-date0);
            user = await user.save()
            // console.log('route step 5',new Date()-date0);
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    })
}