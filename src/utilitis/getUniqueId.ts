export default function getUniqueId(): string {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }

    const key = new Array(8).fill(undefined).map(() => chr4());

    return `uid-${key.join("-")}`;
}