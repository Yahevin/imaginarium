import COLOR from "@/constants/Color";
import key from "@/helpers/key";

const getRandomColor = () => {
    const length = Object.keys(COLOR).length;
    const index:number = Math.floor(Math.random() * length);

    return COLOR[key(COLOR,index)];
};

export default getRandomColor;
