import number from "lodash";

export function getRandomItem<T>(arr: Array<T>): T {
    const localArr = [...arr];
    const arrLength = localArr.length - 1;
    const randomIndex = number.random(0, arrLength);
    console.log(localArr[randomIndex]);
    return localArr[randomIndex];
}

export function newPackingItems<T>(items: Array<T>, num: number): Array<T>[]{
    const array: Array<T> = JSON.parse(JSON.stringify(items));
    const packages: Array<T>[] = [];
    for (let i = 0; i < Math.ceil(array.length / num); i++) {
        packages[i] = array.slice((i * num), (i * num) + num);
    }
    return packages;
}

// export function
