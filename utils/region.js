import data from "../Indian_State_2020.json" assert { type: "json" };
import pointInPolygon from 'point-in-polygon'

export const getRegion = async (lat,lng) => {
    // console.log('START getRegion');
    if (!lat && !lng) return
    let found
    for (let region of data.features) {
        if (isPointInsidePolygon(region, lat, lng)) {
            // console.log('Found region is',region);
            found = region
            break;
        }
    }
    // console.log('End getRegion');
    if(found && found.properties  && found.properties.NAME_1) return `region-${found.properties.NAME_1}`
    return
}


const isPointInsidePolygon = (region, lat, lng) => {
    // console.log('START isPointInsidePolygon');
    for (let coordinate of region.geometry.coordinates) {
        for (let polygon of coordinate) {
            if (pointInPolygon([lat, lng], polygon))
                return true
        }
    }
}


// function inside(point, vs) {
//     console.log('pp',point, vs);
//     // ray-casting algorithm based on
//     // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
//     var x = point[0], y = point[1];
    
//     var inside = false;
//     for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
//         var xi = vs[i][0], yi = vs[i][1];
//         var xj = vs[j][0], yj = vs[j][1];
        
//         var intersect = ((yi > y) != (yj > y))
//             && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
//         if (intersect) inside = !inside;
//     }
    
//     return inside;
// };