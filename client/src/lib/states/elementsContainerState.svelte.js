
let container = $state([]);

const useElementsContainerState = () => {
    return {
        get elements() {
            return container;
        },
        add: (element) => {
            container.push(element);
            return container;
        },
        remove: (id) => {
            return container.filter((e) => e.id !== id);
        },
        get: (id) => {
            return container.find((e) => e.id === id);
        },
        add_sub: (id, subelement) => {
            const element = container.find((e) => e.id === id);
            element.list.push(subelement);
            return element;
        },
    };
};

export { useElementsContainerState };