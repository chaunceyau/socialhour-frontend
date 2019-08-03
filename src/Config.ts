export const COLOR_BACKGROUND_GREY = "#e6ecf0"
export const PRIMARY_COLOR = "#F15642"

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
