import data from "../Indian_State_2020.json" assert { type: "json" };
import PolygonLookup from 'polygon-lookup'

export const getRegion = async (lat, lng) => {
    // console.log('START getRegion');
    if (!lat || !lng) return {}
    var lookup = new PolygonLookup(data);
    var poly = lookup.search(lng,lat );
    // console.log(poly);
    if (poly) {
    let regionName = checkInRegion(poly)
    let location = poly?.properties?.NAME_1
    if(regionName) return {regionName,location}
    }
    return {}
}


const checkInRegion = (polygon) => {
    let featuresIds = []
    for (let feature of data.features)
        featuresIds.push(feature.id)
    let regionsArray = sliceIntoChunks(featuresIds, 8)
    
    for (let r of regionsArray)
        if(r.includes(polygon.id)) return `region-${regionsArray.indexOf(r)}`;
}

const sliceIntoChunks =(arr, chunkSize)=> {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}




// NOT worked for all test cases
// const isPointInsidePolygon = (region, lat, lng) => {
//     // console.log('START isPointInsidePolygon',region.geometry);
//     for (let coordinate of region.geometry.coordinates) {
//         // for (let polygon of coordinate) {
//                 let ans = classifyPoint(coordinate, [lat, lng])
//                 if(ans == -1 || ans == 0) return true
            
//             // if (pointInPolygon([lat, lng], polygon))
//                 // return true
            
//             //  if (insidePoly(coordinate,lat, lng))
//             //     return true
            
//             // console.log('End polygon');
//         // }
//     }
// }

// // function inside(point, vs) {
// //     console.log('pp',point, vs);
// //     // ray-casting algorithm based on
// //     // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
    
// //     var x = point[0], y = point[1];
    
// //     var inside = false;
// //     for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
// //         var xi = vs[i][0], yi = vs[i][1];
// //         var xj = vs[j][0], yj = vs[j][1];
        
// //         var intersect = ((yi > y) != (yj > y))
// //             && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
// //         if (intersect) inside = !inside;
// //     }
    
// //     return inside;
// // };

// function insidePoly(poly, pointx, pointy) {
//     var i, j;
//     var inside = false;
//     for (i = 0, j = poly.length - 1; i < poly.length; j = i++) {
//         if(((poly[i].y > pointy) != (poly[j].y > pointy)) && (pointx < (poly[j].x-poly[i].x) * (pointy-poly[i].y) / (poly[j].y-poly[i].y) + poly[i].x) ) inside = !inside;
//     }
//     return inside;
// }