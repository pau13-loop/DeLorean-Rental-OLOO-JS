var Customer = {
    init: function (
        name, birthDate, dniNumber, dniLetter
    ) {
        this.name = name;
        this.birthDate = birthDate; // format YYYY/MM/DD
        this.dniNumber = dniNumber;
        this.dniLetter = dniLetter;
        return this;
    },
    getName: function () {
        return this.name;
    },
    getBirthDate: function () {
        return this.birthDate;
    },
    getDniNumber() {
        return this.dniNumber;
    },
    getDniLetter() {
        return this.dniLetter;
    },
    checkIsAdult: function () {
        var actualDate = new Date();
        var regexFormatDate = /^(([0-9]{4})\/[0-9]{2})\/([0-9]{2})$/;
        if (this.birthDate && regexFormatDate.test(this.birthDate)) {
            let birthDateParsed = new Date(this.birthDate);
            var age = actualDate.getFullYear() - birthDateParsed.getFullYear();
            let month = actualDate.getMonth() - birthDateParsed.getMonth();
            if (month < 0 || (month === 0 && actualDate.getDate() < birthDateParsed.getDate())) { age--; };
            if (age >= 21) {
                return true;
            }
        }
        return false;
    },
    checkValidDni: function () {
        var letterForDniNum = {
            0: 'T', 1: 'R', 2: 'W', 3: 'A', 4: 'G', 5: 'M', 6: 'Y', 7: 'F', 8: 'P', 9: 'D', 10: 'X', 11: 'B', 12: 'N', 13: 'J', 14: 'Z', 15: 'S', 16: 'Q', 17: 'V', 18: 'H', 19: 'L', 20: 'C', 21: 'K', 22: 'E' 
        };
        var dniNumberInt = parseInt(this.dniNumber);
        if (dniNumberInt && this.dniNumber.toString().length === 8 && !isNaN(dniNumberInt)) {
            let resultDniNum = this.dniNumber % 23; 
            return (letterForDniNum[resultDniNum] === this.dniLetter ? true : false);
        }
        return false;
    }
};

module.exports = Customer;