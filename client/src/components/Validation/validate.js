export const checkName = (value) => {
    if (value == '') {
        return {
            valid: false,
            message: 'No empty strings'
        };
    }

    return true;
}

export const wholeNumValidation = (value) => {
    if (isNaN(value)) {
        return {
            valid: false,
            message: 'Only numbers '
        };
    }

    if (value < 0) {
        return {
            valid: false,
            message: "Number must be greater than zero"
        }
    }

    var checkResult = /^[0-9]+$/;

    if (!value.match(checkResult)) {
        return {
            valid: false,
            message: 'No symbols '
        }
    }

    return true;
}

export const checkWeight = (value) => {
    if (value.split('.').length > 2) {
        return {
            valid: false,
            message: 'Only one decimal point'
        }
    }

    if (isNaN(value)) {
        return {
            valid: false,
            message: 'Only numbers '
        };
    }

    if (value < 0) {
        return {
            valid: false,
            message: "Number must be greater than zero"
        }
    }

    return true;
}

export const checkMinutes = (value) => {
    if (isNaN(value)) {
        return {
            valid: false,
            message: 'Only numbers '
        };
    }

    if (value < 0) {
        return {
            valid: false,
            message: "Number must be greater than zero"
        }
    }

    if (value > 59) {
        return {
            valid: false,
            message: "Minutes must be less than 60"
        }
    }

    var checkResult = /^[0-9]+$/;

    if (!value.match(checkResult)) {
        return {
            valid: false,
            message: 'No decimals '
        }
    }

    return true;
}
