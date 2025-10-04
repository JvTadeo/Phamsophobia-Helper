export { isTrue }

function isTrue(value: any): boolean {
    return value === true || value === 'true' || value === 1 || value !== undefined && value !== null && value !== '';
}