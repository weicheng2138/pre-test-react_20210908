import { useRef } from "react";

const SearchForm = ({ dispatch }) => {
    const ticketTypeRef = useRef(null);
    const trnClassCodeRef = useRef(null);
    const startStaCodeRef = useRef(null);
    const endStaCodeRef = useRef(null);
    const ticketPriceTypeRef = useRef(null);
    const countRef = useRef(null);

    const onAdd = (e) => {
        e.preventDefault();
        dispatch({
            type: "add",
            payload: {
                ticketType: ticketTypeRef.current.value,
                startStaCode: startStaCodeRef.current.value,
                endStaCode: endStaCodeRef.current.value,
                trnclassCode: trnClassCodeRef.current.value,
                ticketPriceType: ticketPriceTypeRef.current.value,
                count: countRef.current.value,
            },
        });
    };

    return (
        <form onSubmit={onAdd}>
            <label htmlFor="ticketTypes">車票類型:</label>
            <select
                id="ticketTypes"
                name="ticketTypes"
                ref={ticketTypeRef}
                defaultValue="0"
            >
                <option value="單程票">單程票</option>
                <option value="電子票證">電子票證</option>
                <option value="30天期通用定期票">30天期通用定期票</option>
                <option value="60天期通用定期票">60天期通用定期票</option>
            </select>
            <label htmlFor="startStaCodeRef">出發站:</label>
            <input
                id="startStaCodeRef"
                type="text"
                ref={startStaCodeRef}
                defaultValue="1000"
            ></input>
            <label htmlFor="endStaCodeRef">抵達站:</label>
            <input
                id="endStaCodeRef"
                type="text"
                ref={endStaCodeRef}
                defaultValue="3300"
            ></input>

            <label htmlFor="trnClassCodeRef">車種:</label>
            <select
                id="trnClassCodeRef"
                name="trnClassCodeRef"
                ref={trnClassCodeRef}
                defaultValue="0"
            >
                <option value="太魯閣">太魯閣</option>
                <option value="普悠瑪">普悠瑪</option>
                <option value="自強">自強</option>
                <option value="莒光">莒光</option>
                <option value="復興">復興</option>
                <option value="區間快">區間快</option>
                <option value="區間">區間</option>
                <option value="普快">普快</option>
            </select>

            <label htmlFor="ticketPriceTypeRef">票種:</label>
            <select
                id="ticketPriceTypeRef"
                name="ticketPriceTypeRef"
                ref={ticketPriceTypeRef}
                defaultValue="0"
            >
                <option value="全票">全票</option>
                <option value="孩童">孩童</option>
                <option value="敬老">敬老</option>
                <option value="愛心">愛心</option>
                <option value="愛陪">愛陪</option>
                <option value="愛心孩童">愛心孩童</option>
            </select>

            <label htmlFor="countRef">張數:</label>
            <input
                id="countRef"
                type="number"
                ref={countRef}
                defaultValue="1"
            ></input>

            <div>
                <input type="submit" value="新增" />
            </div>
        </form>
    );
};

export default SearchForm;
