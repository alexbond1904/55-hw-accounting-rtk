export const BASE_URL = "https://webaccounting.herokuapp.com/account";

export const encryptedToken = (user:string,password:string) => {
  return `Basic ${btoa(`${user}:${password}`)}`;
}