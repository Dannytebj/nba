
const validation = (value, rules, form) => {
    let valid = true;

    for( rule in rules) {
        switch (rule) {
            case "isRequired":
                valid = valid && checkRequired(value);
                break;
            case "isEmail":
                valid = valid && checkEmail(value);
                break;
            case "minlength":
                valid = valid && checkMinlength(value, rules[rule]);
                break;
            case "confirmPass":
                valid = valid && confirmPassword(value, form[rules.confirmPass]);
                break;
            default:
                valid = true;
        }
    }
    return valid;
}

checkRequired = value => {
    if(value.trim() !== '') {
        return true
    }
    return false;
}

checkEmail = value => {
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return expression.test(String(value).toLowerCase());
}

checkMinlength = (value, rule) => {
    console.log(rule);
    if(value.length >= rule) {
        return true;
    }
    return false;
}

confirmPassword = (value, password) => {
    if (value === password.value) {
        return true;
    }
    return false;
}
 
export default validation;
