const formatAddress = (address: string) => {
    //truncate address
    if (address.startsWith ("0x")) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    }
};

const truncateText = (text: string, length: number) => {
    //truncate text
    return text.length > length ? `${text.substring(0, length)}...` : text;
}

export { formatAddress, truncateText };