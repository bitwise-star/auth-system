const VALIDATOR_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export const isValidEmail = (email: string) => {
    return email.match(VALIDATOR_REGEX) !== null;
}