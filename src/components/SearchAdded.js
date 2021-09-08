import useBackendApi from "../hooks/useBackendApi";
import SearchResult from "./SearchResult";

const SearchAdded = ({ collection, dispatch, isEmpty }) => {
    const [isLoading, fetchedData, fetchData, setFetchedData] = useBackendApi();

    const onDeleteOne = (id) => () => {
        dispatch({ type: "delete-one", payload: { id: id } });
    };

    const onDeleteAll = () => {
        dispatch({ type: "delete-all" });
        setFetchedData(null);
    };

    const onCalculate = (collection) => () => {
        fetchData(collection);
    };
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>功能鍵</th>
                        <th>車票類型</th>
                        <th>出發站</th>
                        <th>抵達站</th>
                        <th>車種</th>
                        <th>票種</th>
                        <th>票數</th>
                    </tr>
                </thead>

                <tbody>
                    {collection.map((element, id) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={onDeleteOne(element.id)}
                                    >
                                        刪除
                                    </button>
                                </td>
                                <td>{element.ticketType}</td>
                                <td>{element.startStaCode}</td>
                                <td>{element.endStaCode}</td>
                                <td>{element.trnclassCode}</td>
                                <td>{element.ticketPriceType}</td>
                                <td>{element.count}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div>
                <button
                    className={`${
                        isLoading || isEmpty
                            ? "primary-button-disabled"
                            : "primary-button"
                    }`}
                    disabled={isLoading || isEmpty}
                    onClick={onCalculate(collection)}
                >
                    {isLoading ? "計算中..." : "試算"}
                </button>
                <button className="empty-button" onClick={onDeleteAll}>
                    清空查詢資料
                </button>
            </div>
            <h2>試算結果</h2>
            <SearchResult fetchedData={fetchedData} />
        </>
    );
};

export default SearchAdded;
