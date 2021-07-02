export function GetCurrencyFormat(countryName: string): string {
    let currency = "$";
    switch (countryName) {
        case "India":
            currency = "₹";
            break;
        case "US":
            currency = "$";
            break;
        case "UK":
            currency = "£";
            break;
        default:
            break;
    }
    return currency;
}