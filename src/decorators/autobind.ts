
// autobind decorator
// method decorator - first parameter contains the class where the method lives, second is method name, last is the property descriptor
export function autobind(_: Object, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            // binds the function to the current class
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}