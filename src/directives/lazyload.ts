const lazyload = {
    mounted: (el: HTMLImageElement) => {
        function loadImg() {
            el.src = el.dataset.src as string
        }
        function callback(entries: { isIntersecting: any; }[], observer: { unobserve: (arg0: HTMLImageElement) => void; }) {
            entries.forEach((entry: { isIntersecting: any; }) => {
                if (!entry.isIntersecting) return;
                loadImg()
                observer.unobserve(el)
            });
        }
        function createIntersectionObserver() {
            const options = {
                root: null,
                treshold: 0
            }
            const observer = new IntersectionObserver(callback, options)
            observer.observe(el)
        }
        if (!window["IntersectionObserver"])
            loadImg()
        else {
            createIntersectionObserver()
        }
    }
}
export default lazyload