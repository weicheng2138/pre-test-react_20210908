import { useState, useCallback } from "react";

const CODE_MAPPING = {
    ticketType: {
        單程票: "0",
        電子票證: "1",
        "30天期通用定期票": "2",
        "60天期通用定期票": "3",
    },
    trnclassCode: {
        太魯閣: 1,
        普悠瑪: 2,
        自強: 3,
        莒光: 4,
        復興: 5,
        區間快: 10,
        區間: 6,
        普快: 7,
    },
    ticketPriceType: {
        全票: "adultTktPrice",
        孩童: "childTktPrice",
        敬老: "childTktPrice",
        愛心: "childTktPrice",
        愛陪: "childTktPrice",
        愛心孩童: "iChildTktPrice",
    },
};

const newQueryItem = (payload) => {
    return payload.map((el) => {
        return {
            id: el.id,
            ticketType: CODE_MAPPING.ticketType[el.ticketType],
            startStaCode: el.startStaCode,
            endStaCode: el.endStaCode,
            trnclassCode: CODE_MAPPING.trnclassCode[el.trnclassCode],
            ticketPriceType: CODE_MAPPING.ticketPriceType[el.ticketPriceType],
            count: el.count,
        };
    });
};

const useBackendApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    const fetchData = useCallback((payload) => {
        const fetchingData = async () => {
            try {
                const rawResponse = await fetch("http://localhost:4000/post", {
                    method: "POST",
                    headers: {
                        // Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newQueryItem(payload)),
                });
                // console.log(await rawResponse.text());
                const tempContent = await rawResponse.text();
                const sanitized = "[" + tempContent.replace(/}{/g, "},{") + "]";
                const content = JSON.parse(sanitized);
                // console.log(content);
                // console.log(payload);
                content.sort((a, b) => {
                    return a.id - b.id;
                });

                const filteredContent = content.filter((el, index, array) => {
                    if (index % 2 === 0) {
                        return el.price < array[index + 1].price;
                    } else {
                        return el.price < array[index - 1].price;
                    }
                });
                // console.log(filteredContent);
                // console.log(payload);
                setFetchedData(
                    filteredContent.map((el, index) => {
                        return {
                            ticketType: payload[index].ticketType,
                            startStaName: el.startStaCode,
                            endStaName: el.endStaCode,
                            trnclassCode: payload[index].trnclassCode,
                            mileage: el.mileage,
                            ticketPriceType: payload[index].ticketPriceType,
                            price: el.price,
                            count: el.count,
                            subtotal: el.subtotal,
                        };
                    })
                );
                setIsLoading(false);
            } catch (err) {
                alert(err);
                setIsLoading(false);
            }
        };

        setIsLoading(true);
        fetchingData(payload);
    }, []);

    return [isLoading, fetchedData, fetchData, setFetchedData];
};

export default useBackendApi;
