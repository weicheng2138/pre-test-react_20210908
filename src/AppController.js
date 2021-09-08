import "./App.css";
import SearchForm from "./components/SearchForm";
import SearchAdded from "./components/SearchAdded";
import useSearchCollection from "./models/useSearchCollection";

const AppController = () => {
    const [collection, dispatch, isEmpty] = useSearchCollection();

    return (
        <div className="app">
            <header className="app-header">
                <h1>Railway Tip Calculate</h1>
            </header>
            <main className="app-content">
                <div className="search-form">
                    <h2>票價試算</h2>
                    <SearchForm dispatch={dispatch} />
                    <h2>已新增之票價資料</h2>
                    <SearchAdded
                        collection={collection}
                        dispatch={dispatch}
                        isEmpty={isEmpty}
                    />
                </div>
            </main>
        </div>
    );
};

export default AppController;
