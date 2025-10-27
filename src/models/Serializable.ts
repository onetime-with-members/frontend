export default abstract class Serializable {
  toObject(): Record<string, unknown> {
    const prototype = Object.getPrototypeOf(this);
    const getterNames = Object.getOwnPropertyNames(prototype);

    return getterNames.reduce(
      (object, key) => {
        const descriptor = Object.getOwnPropertyDescriptor(prototype, key);
        if (descriptor && typeof descriptor.get === 'function') {
          object[key] = this[key as keyof this];
        }
        return object;
      },
      {} as Record<string, unknown>,
    );
  }
}
