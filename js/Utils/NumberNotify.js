
export class NumberNotify {
    constructor() {
        this.element = null;
        this.number = 0;
    }

    getNumber() {
        return this.number;
    }

    getElement() {
        return this.element;
    }

    setElementNumber(number) {
        this.number = number;
        if (this.element != null) {
            this.element.innerHTML = number;
            if (number <= 0) {
                console.log("NumberNotify: number <= 0");
                this.element.classList.add("hidden");
            } else if (this.element.classList.contains("hidden")) {
                console.log("NumberNotify: number > 0");
                this.element.classList.remove("hidden");
            }
        }else {
            console.log("NumberNotify: element is null");
        }
    }
    
    createElement(parentElement) {
        if (parentElement == null || parentElement == undefined) {
            console.log("NumberNotify: parentElement is null or undefined");
            return;
        }

        if (this.element != null) {
            console.log("NumberNotify: element is not null");
            this.element.remove();
            return;
        }

        this.element = document.createElement("span");
        this.element.className = "absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 text-center text-xs text-white";
        this.setElementNumber(this.number);

        parentElement.appendChild(this.element);
        return this.element;
    }
}