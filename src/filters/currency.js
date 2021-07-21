/**
 * filtros Moneda
 */

/**
 * [Valor description]
 * @param {number} value [description]
 */
export function currency(value) {
    if (value) {
        const AMOUNT_FORMAT = new Intl.NumberFormat("de-DE", {
            // currency: "ARS",
            // style: "currency",
            maximumFractionDigits: 0,
            minimumFractionDigits: 0,
        }).format(value);
        return AMOUNT_FORMAT;
    } else {
        return " ";
    }
}