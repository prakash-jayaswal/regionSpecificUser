import { Router } from 'express'
import {getRegion} from '../utils/region'
import {User } from '../models/user'

export default function (Router ) {
    Router.post('/signup', async (req, res) => {
        // console.log('args', req.body);
        try {
            if (!req.body.email) throw new Error('Email is mandatory')
            // check for correct message
            let check = await User.exists({ email: req.body.email })
            if (check) throw new Error('Email already exist')
            let {regionName,location} = await getRegion(req.body.lat, req.body.lng)
            if (!regionName) throw new Error('Not belongs to indian regions')
            req.body.location = location
            req.body.region = regionName
            // lets register in DB
            let user = new User(req.body)
            user = await user.save()
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    })
}