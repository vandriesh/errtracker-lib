const Utils = {
  toArray: (obj: any): string[] => {
    const arr = [];

    const keys = Object.keys(obj);

    for (const key of keys) {
      arr.push(`${key}: ${obj[key]}`);
    }

    return arr;
  }
};

export default Utils;
