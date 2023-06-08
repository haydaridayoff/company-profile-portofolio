const arrOnClickObserver = [];

export function subscribeOnClickEvent(event, callback) {
    if (event == null || event == undefined || callback == null || callback == undefined) {
        console.log("subscribeOnClickEvent: event or callback is null or undefined");
        return;
    }

    console.log("subscribeOnClickEvent: event = " + event + "");
    arrOnClickObserver.push({ event: event, callback: callback });
}

export function unsubscribeOnClickEvent(event, callback) {
    if (event === null || event === undefined || callback === null || callback === undefined) {
        console.log("unsubscribeOnClickEvent: event or callback is null or undefined");
        return;
    }

    let index = arrOnClickObserver.findIndex(observer => observer.event === event && observer.callback === callback);
    if (index < 0) {
        console.log("unsubscribeOnClickEvent: index < 0");
        return;
    }

    arrOnClickObserver.splice(index, 1);
}

export function notifyOnClickEvent(event) {
    if (event === null || event === undefined) {
        console.log("notifyOnClickEvent: event is null or undefined");
        return;
    }

    arrOnClickObserver.forEach(observer => {
        if (observer.event === event) {
            observer.callback();
        }
    });
}

export function notifyOnClickEventWithData(event, ...data) {
    if (event === null || event === undefined) {
        console.log("notifyOnClickEvent: event is null or undefined");
        return;
    }
    console.log("notifyOnClickEventWithData: event = " + event);
    data.forEach(element => {
        console.log("notifyOnClickEventWithData: data = " + element);
    });
    arrOnClickObserver.forEach(observer => {
        if (observer.event === event) {
            observer.callback(...data);
        }
    });
}

