import data from "../Indian_State_2020.json" assert { type: "json" };
import PolygonLookup from 'polygon-lookup'

export const getRegion = async (lat, lng) => {
     let date = new Date()
   // console.log('START getRegion');
    if (!lat || !lng) return {}
    // console.log('start0 getRegion',new Date()-date);
    var lookup = new PolygonLookup(data);
    var poly = lookup.search(lng,lat );
    // console.log(poly);
    if (poly) {
    // console.log('start1 getRegion',new Date()-date);
    let regionName = checkInRegion(poly)
    // console.log('start2 getRegion',new Date()-date);
    let location = poly?.properties?.NAME_1
    if(regionName) return {regionName,location}
    }
    return {}
}


const checkInRegion = (polygon) => {
    let date = new Date()
    let featuresIds = []
    for (let feature of data.features)
        featuresIds.push(feature.id)
    // console.log('start1 sliceIntoRegions',new Date()-date);
    let regionsArray = sliceIntoRegions(featuresIds, 8)
    // console.log('start2 sliceIntoRegions',new Date()-date);
    for (let r of regionsArray)
        if(r.includes(polygon.id)) return `region-${regionsArray.indexOf(r)}`;
}

const sliceIntoRegions = (arr, regionSize) => {
    let date = new Date()
    // console.log('before sorting',new Date()-date);
    let sortedArray = bblSort(arr)
    // console.log('after sorting', new Date() - date);
    const res = [];
    for (let i = 0; i < sortedArray.length; i += regionSize) {
        const chunk = sortedArray.slice(i, i + regionSize);
        res.push(chunk);
    }
    // console.log('after split', new Date() - date);
    // for (let i of res) console.log('i',i.length);
    return res;
}


// Creating the bblSort function
const bblSort = (arr)=>{
 for(var i = 0; i < arr.length; i++){    
   for(var j = 0; j < ( arr.length - i -1 ); j++){
     if(arr[j] > arr[j+1]){     
       var temp = arr[j]
       arr[j] = arr[j + 1]
       arr[j+1] = temp
     }
   }
 }
return arr
}