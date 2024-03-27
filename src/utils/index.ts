export const isBackspace = (event: KeyboardEvent) => {
    return (
        event.keyCode === 8 || event.key === 'Backspace' ||
        event.keyCode === 46 || event.key === 'Delete'
    )
}

export const isNumber = (event: KeyboardEvent) => {
    return (
        (event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.key >= '0' && event.key <= '9')
    )
}
