export function deepClone(obj, ignore="", ignore2="") {
    let copy;

    // Handle and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        let i = 0, len = obj.length;
        for (; i < len; i++) {
            copy[i] = deepCloneWithType(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        for (const attr in obj) {
            if(attr === ignore) continue;
            if(attr === ignore2) continue;
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default function deepCloneWithType(obj, ignore, ignore2){
    // Handle and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // deep clone
    const clone = deepClone(obj, ignore, ignore2);

    // create new obj then copy over all attributes
    let copy = new obj.constructor();
    const keys = Object.keys(clone);
    keys.forEach(key => {
        copy[key] = clone[key]
    });
    return copy;
}
