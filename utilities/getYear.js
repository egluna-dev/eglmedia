const getYear = () => {
    const date = new Date;
    const currentYear = date.getFullYear();
    return currentYear;
}

module.exports = getYear;