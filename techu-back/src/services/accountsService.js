const Account = require('../models/Account');

// Constants
const CBU_ENTITY_NUMBER = "285";
const CBU_LENGTH = 22;

const validateUniqueCbu = async function (subsidiary, accountNumber, userId) {
    let cbu = createCBU(subsidiary, accountNumber);
    let validateIfExistsCbu = await Account.find({ userId: userId, cbu: cbu });

    while (validateIfExistsCbu.length > 0) {
        cbu = createCBU(subsidiary ,accountNumber);
        validateIfExistsCbu = await Account.find({ userId: userId, cbu: cbu });
    }
    return cbu;
}

const createCBU = function (subsidiary, accountNumber) {
    let cbu_start = CBU_ENTITY_NUMBER + subsidiary.toString() + accountNumber.toString();
    let cbu_end = randomFixedInteger(CBU_LENGTH - cbu_start.length);
    return cbu_start + cbu_end;
}

const randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

module.exports = {
    validateUniqueCbu
}
