import number from "lodash";

export function getRandomItem<T>(arr: Array<T>): T {
    const localArr = [...arr];
    const arrLength = localArr.length - 1;
    const randomIndex = number.random(0, arrLength);
    console.log(localArr[randomIndex]);
    return localArr[randomIndex];
}