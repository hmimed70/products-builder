/**
 * 
 * @param {string} text 
 * @param {number} length 
 * @returns 
 */
export function txtSlice(text: string, length: number = 50) {
    if (text.length > length) {
        return text.slice(0, length) + "...";
    } else {
        return text;
    }
}
export function formatNumber (num: string | number) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}
