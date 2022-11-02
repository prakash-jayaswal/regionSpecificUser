import data from "../Indian_State_2020.json" assert { type: "json" };
import pointInPolygon from 'point-in-polygon'

export const getRegion = async (lat,lng) => {
    console.log('START getRegion'); //data.features
    if (!lat && !lng) return
    let found
    for (let region of data.features) {
        if (isPointInsidePolugon(region, lat, lng)) {
            console.log('Found region is',region);
            found = region
            break;
        }
    }
    console.log('End getRegion');
    return 'region 1'
}


const isPointInsidePolugon = (region, lat, lng) => {
    // console.log('START isPointInsidePolugon');
    for (let p of region.geometry.coordinates) {
        // console.log('pp', p);
        for (let smp of p) {
            if (pointInPolygon([lat, lng], smp)) {
                console.log('Mil gya');
                return true
        }        
        }
    }
}