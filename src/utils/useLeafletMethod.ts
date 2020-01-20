// @ts-ignore
// eslint-disable-next-line import/prefer-default-export
export const useLeafletMethod = <T>(instance) => {
  const bindMethod = (name: T, ...args: any) => {
    if (!instance[name]) {
      // eslint-disable-next-line no-console
      console.warn(`There is no such method ${name} on instance ${instance}`)
      return false
    }

    return instance[name](...args)
  }

  return {
    bindMethod,
  }
}
