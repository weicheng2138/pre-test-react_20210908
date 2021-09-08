const SearchResult = ({ fetchedData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>車票類型</th>
                    <th>出發站</th>
                    <th>抵達站</th>
                    <th>車種</th>
                    <th>里程</th>
                    <th>票種</th>
                    <th>票價</th>
                    <th>票數</th>
                    <th>小計</th>
                </tr>
            </thead>

            <tbody>
                {!fetchedData ||
                    fetchedData.map((el, id) => {
                        return (
                            <tr key={id}>
                                <td>{el.ticketType}</td>
                                <td>{el.startStaName}</td>
                                <td>{el.endStaName}</td>
                                <td>{el.trnclassCode}</td>
                                <td>{el.mileage}</td>
                                <td>{el.ticketPriceType}</td>
                                <td>{el.price}</td>
                                <td>{el.count}</td>
                                <td>{el.subtotal}</td>
                            </tr>
                        );
                    })}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>總計: </td>
                    <td>
                        {!fetchedData ||
                            fetchedData.reduce((total, el) => {
                                return total + el.subtotal;
                            }, 0)}
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default SearchResult;
