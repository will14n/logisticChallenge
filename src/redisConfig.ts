import Redis from 'ioredis';

const redis = new Redis();

function set(key: string, value: string) {
    return redis.set(key, value);
}
function get(key: string) {
    return redis.get(key);
}
export {redis, set, get};