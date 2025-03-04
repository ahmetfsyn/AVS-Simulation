export const isValidAmount = (str) => {
    // 1 ila 4 basamaktan oluşan sayı, opsiyonel virgül ve 1-2 basamaktan oluşan ondalıklı kısım
    const regex = /^(?!0)(\d{1,4})(\,\d{1,2})?$/;  // 0 ile başlamaz, 1 ila 4 basamak ve isteğe bağlı virgül ve 1-2 basamaktan oluşan ondalıklı kısım
    return regex.test(str);
};