/**
 * EXAMPLE
    observe(
        el,
        (inView, intersection) => {
            if (inView && options.triggerOnce) {
                // If it should only trigger once, unobserve the element after it's inView
                unobserve(intersection.target);
            }
        },
        options
    )
 */

    const INSTANCE_MAP = new Map();
    const OBSERVER_MAP = new Map();
    const ROOT_IDS = new Map();
    const defaultOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0
    };
    let consecutiveRootId = 0;
    
    /**
     * Generate a unique ID for the root element
     * @param root
     */
    function getRootId(root = null) {
        if (!root) return "";
        if (ROOT_IDS.has(root)) return ROOT_IDS.get(root);
        consecutiveRootId += 1;
        ROOT_IDS.set(root, consecutiveRootId.toString());
        return `${ROOT_IDS.get(root)}_`;
    }
    
    /**
     * Monitor element, and trigger callback when element becomes inView
     * @param element {HTMLElement} Element to observe
     * @param callback {Function} Called with inView
     * @param options {Object} Intersection observer options
     * @param options.threshold {(number|Array<number>)} Number between 0 and 1, indicating how much of the element should be inView before triggering
     * @param options.root {HTMLElement}
     * @param options.rootMargin {string} The CSS margin to apply to the root element.
     */
    function observe(element = null, callback = () => {}, options = {}) {
        if (!element) return;
    
        // Validate that the element is not being used in another observer instance
        if (INSTANCE_MAP.has(element)) {
            console.error(
                "Trying to observe",
                element,
                "but it's already being observed by another instance.\nMake sure the `element` is only used by a single observer instance.\n"
            );
            return;
        }
    
        // Merge defaultOptions with options
        const { root, rootMargin, threshold } = { ...defaultOptions, ...options };
    
        // Create a unique ID for this observer instance, based on the root, root margin and threshold.
        // An observer with the same options can be reused, so lets use this fact
        const observerId =
            getRootId(root) +
            (rootMargin
                ? `${threshold.toString()}_${rootMargin}`
                : threshold.toString());
    
        let observerInstance = OBSERVER_MAP.get(observerId);
        if (!observerInstance) {
            observerInstance = new IntersectionObserver(onIntersection, options);
            if (observerId) OBSERVER_MAP.set(observerId, observerInstance);
        }
    
        const instance = {
            callback,
            element,
            inView: false,
            observerId,
            observer: observerInstance,
            // Make sure we have the thresholds value. It's undefined on a browser like Chrome 51.
            thresholds:
                observerInstance.thresholds ||
                (Array.isArray(threshold) ? threshold : [threshold])
        };
    
        INSTANCE_MAP.set(element, instance);
        observerInstance.observe(element);
    
        return instance;
    }
    
    /**
     * Stop observing an element. If an element is removed from the DOM or otherwise destroyed,
     * make sure to call this method.
     * @param element {HTMLElement} - Element to unobserve
     */
    function unobserve(element = null) {
        if (!element) return;
    
        const instance = INSTANCE_MAP.get(element);
        if (!instance) return;
    
        const { observerId, observer } = instance;
        const { root } = observer;
    
        observer.unobserve(element);
    
        // Check if we are still observing any elements with the same options.
        let itemsLeft = false;
    
        // Check if we still have observers configured with the same root.
        let rootObserved = false;
        if (observerId) {
            INSTANCE_MAP.forEach((item, key) => {
                if (item && key !== element) {
                    if (item.observerId === observerId) itemsLeft = true;
                    if (item.observer.root === root) rootObserved = true;
                }
            });
        }
    
        if (!rootObserved && root) ROOT_IDS.delete(root);
        if (!itemsLeft && observer) {
            // No more elements to observe for threshold, disconnect observer
            observer.disconnect();
        }
    
        // Remove reference to element
        INSTANCE_MAP.delete(element);
    }
    
    /** Destroy all IntersectionObservers currently connected */
    function destroy() {
        OBSERVER_MAP.forEach(observer => {
            observer.disconnect();
        });
    
        OBSERVER_MAP.clear();
        INSTANCE_MAP.clear();
        ROOT_IDS.clear();
        consecutiveRootId = 0;
    }
    
    /** @param {IntersectionObserverEntry[]} entries */
    function onIntersection(entries = []) {
        entries.forEach(entry => {
            const { isIntersecting, intersectionRatio, target } = entry;
            const instance = INSTANCE_MAP.get(target);
    
            // Firefox can report a negative intersectionRatio when scrolling.
            if (instance && intersectionRatio >= 0) {
                const { thresholds } = instance.observer;
    
                // If threshold is an array, check if any of them intersects.
                // This just triggers the onIntersection event multiple times.
                // eslint-disable-next-line arrow-body-style
                let inView = thresholds.some(threshold => {
                    return instance.inView
                        ? intersectionRatio > threshold
                        : intersectionRatio >= threshold;
                });
    
                if (isIntersecting !== undefined) {
                    // If isIntersecting is defined, ensure that the element is actually intersecting.
                    // Otherwise it reports a threshold of 0
                    inView = inView && isIntersecting;
                }
    
                instance.inView = inView;
                instance.callback(inView, entry);
            }
        });
    }
    
    export { observe, unobserve, destroy };