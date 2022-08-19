function getProperty(target, prop) {
    if (typeof prop !== "string") {
        return target[prop];
    }
    for (const [name, value] of Object.entries(target)) {
        if (prop.toLowerCase() === name.toLowerCase()) {
            return value;
        }
    }
    return undefined;
}
export const proxyHeaders = (target) => new Proxy(target, {
    get: (target, prop) => getProperty(target, prop),
    has: (target, prop) => getProperty(target, prop) !== undefined
});
