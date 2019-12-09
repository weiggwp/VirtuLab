export function deepClone(obj) {
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
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default function deepCloneWithType(obj){
    // Handle and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // deep clone
    const clone = deepClone(obj);

    // create new obj then copy over all attributes
    let copy = new obj.constructor();
    const keys = Object.keys(clone);
    keys.forEach(key => {
        copy[key] = clone[key]
    });
    return copy;
}
