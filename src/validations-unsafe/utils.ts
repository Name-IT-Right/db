export function extractTextBetweenPairsOfColons(text: string) {
  const firstIndex = text.indexOf("::");
  if (firstIndex !== -1) {
    const secondIndex = text.indexOf("::", firstIndex + 2);
    if (secondIndex !== -1) {
      return text.substring(firstIndex + 2, secondIndex);
    }
  }
}

export function extractTextAfterLastColonPair(text: string) {
  const lastColonIndex = text.lastIndexOf("::");
  if (lastColonIndex >= 0) {
    return text.substring(lastColonIndex + 2);
  }
}