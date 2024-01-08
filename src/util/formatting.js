const currencyFormatter = () => {
    return new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD'
    })
}

export default currencyFormatter;