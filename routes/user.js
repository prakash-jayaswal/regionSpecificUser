import { Router } from 'express'
import {getRegion} from '../utils/region'
import {User } from '../models/user'

export default function (Router ) {
    Router.post('/signup', async (req, res) => {
        // console.log('args', req.body);
        try {
            req.body.regoion = await getRegion(req.body.lat, req.body.lng)
            if (!req.body.email) throw new Error('Email is mandatory')
            // check for correct message
            let check = await User.exists({ email: req.body.email })
            if (check) throw new Error('Email already exist')
            // lets register in DB
            let user = new User(req.body)
            user = await user.save()
            return res.status(200).json(user)
        } catch (e) {
            return res.status(500).send(e.message)
        }
    })
}