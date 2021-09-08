import { useReducer, useEffect, useState } from "react";

const ACTIONS = {
    ADD: "add",
    DELETE_ONE: "delete-one",
    DELETE_ALL: "delete-all",
    CALCULATE: "calculate",
};

const reducer = (collection, action) => {
    switch (action.type) {
        case ACTIONS.ADD:
            return [...collection, newSearchItem(action.payload)];
        case ACTIONS.DELETE_ONE:
            return collection.filter((el) => el.id !== action.payload.id);
        case ACTIONS.DELETE_ALL:
            return [];
        default:
            console.log("DEFAULT");
    }
};

const newSearchItem = (payload) => {
    return {
        id: Date.now(),
        ticketType: payload.ticketType,
        startStaCode: payload.startStaCode,
        endStaCode: payload.endStaCode,
        trnclassCode: payload.trnclassCode,
        ticketPriceType: payload.ticketPriceType,
        count: payload.count,
    };
};

const useSearchCollection = () => {
    const [collection, dispatch] = useReducer(reducer, []);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        if (collection.length === 0) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [collection]);

    return [collection, dispatch, isEmpty, setIsEmpty];
};

export default useSearchCollection;
