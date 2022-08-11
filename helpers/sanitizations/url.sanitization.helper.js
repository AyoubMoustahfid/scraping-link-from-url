export const linksRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi

// export const noHttpsRegex = /^(?:https?:\/\/)?(?:www.)?/gim
export function noHttpsRegex(link) {
  return link.replace(/^(?:https?:\/\/)?(?:www.)?/gim, "")
}