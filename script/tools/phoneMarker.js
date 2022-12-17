const phoneMarker = (phone) => {
    if (!(phone && typeof phone === "string" && phone.length === 11)) return '';
    const reg = /(\d{3})\d{4}(\d{4})/;  //正则表达式
    return phone.replace(reg, "$1****$2")
}
