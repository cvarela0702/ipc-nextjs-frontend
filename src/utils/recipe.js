export const isRecipeNew = createdAt => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    // Convert Unix timestamp to milliseconds if needed
    const recipeDate =
        typeof createdAt === 'number'
            ? new Date(createdAt * 1000)
            : new Date(createdAt)

    return recipeDate > oneWeekAgo
}
