const key = <T>(obj: T, index: number): keyof T => {
    // @ts-ignore
    return Object.keys(obj)[index];
};

export default key;
