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