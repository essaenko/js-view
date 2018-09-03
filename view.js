let d = document;
export default class View {
    constructor(params) {
        this.initialize(params);
    }
    /**
     * Инициализация интерфейса
     */
    initialize(params){
        this.$el = d.querySelector(params.$el) || document.body;
        this.bindUIElements(params.ui || {});
        this.bindMethods(params.methods || {});
        this.initEvents(params.events || {});
        this.methods.initialize();
    }

    /**
     * Биндим переданные селекторы UI к экземпляру класса
     * @param ui
     */
    bindUIElements(ui) {
        this.ui = {};
        for(let el in ui){
            this.ui[el] = d.querySelector(ui[el]);
        }
    }

    /**
     * Получаем node элемент из списка UI
     * @param key
     * @returns {*}
     */
    getUI(key) {
        return this.ui[key];
    }
    /**
     * Объявляем слушатели событий представления
     */
    initEvents(events) {
        for (let evData in events) {
            let d = evData.split(" ");

            if (d[1][0] === "@") {
                this.getUI(d[1].substring(1, d[1].length)).addEventListener(d[0], this.methods[events[evData]]);
            } else {
                d.querySelector(d[1]).addEventListener(d[0], this.methods[events[evData]]);
            }
        }
    }

    /**
     * Биндим переданные методы к экземпляру класса
     * @param methods
     */
    bindMethods(methods) {
        this.methods = {
            initialize: () => {
                return null;
            }
        };
        Object.assign(this.methods, methods);
        for (let method in this.methods) {
            this.methods[method] = this.methods[method].bind(this);
        }
    }
}
