import React, { useEffect, useRef, useState } from "react";
import { AppContainer } from "./index.styled";
import { fetchRepos, IParams } from "./service";
import { Form, Select, Spin } from "antd";
import {
    DirectionEnum,
    DirectionTypes,
    InputType,
    SearchType,
    SortEnum,
    SortTypes,
} from "./constant";
import { Input } from "antd";
import { debounce } from "lodash";
import RepoItem from "./RepoItem";

const { Search } = Input;

const { Option } = Select;

function App() {
    const [form] = Form.useForm();
    const [repos, setRepos] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [params, setParams] = useState<IParams>({
        type: SearchType.User,
        query: "",
        page: 1,
        per_page: 10,
        sort: SortEnum.Created,
        direction: DirectionEnum.Desc,
    });
    const [lastElement, setLastElement] = useState<any>(null);

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setParams((prevState) => ({
                    ...prevState,
                    page: prevState.page + 1,
                }));
            }
        })
    );

    const handleChangeSearchType = (value: string) => {
        form.setFieldsValue({ query: "" });
        setParams((prevState) => ({
            ...prevState,
            type: value,
            query: "",
            page: 1,
        }));
    };

    const handleChangeQuery = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setParams((prevState) => ({
                ...prevState,
                query: e.target.value,
                page: 1,
            }));
        },
        500
    );

    const fetchData = () => {
        if (!params.query) {
            setLoading(false);
            setRepos([]);
            return;
        }
        fetchRepos(params)
            .then((res) => {
                if (params.page > 1) {
                    setRepos((prev) => [...prev, ...res.data]);
                    return;
                }
                setRepos(res.data);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [params.type, params.query, params.direction, params.sort]);

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [params]);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    return (
        <AppContainer>
            <div
                className="container d-flex jc-c"
                style={{ position: "sticky", top: 0, background: "white" }}
            >
                <Form
                    form={form}
                    layout="inline"
                    initialValues={{
                        type: SearchType.User,
                        query: "",
                    }}
                >
                    <Form.Item name="type">
                        <Select
                            style={{ width: 120, marginRight: 6 }}
                            onChange={handleChangeSearchType}
                        >
                            {InputType.map((type) => (
                                <Option key={type.value}>{type.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="query">
                        <Search
                            style={{ width: 360 }}
                            onChange={handleChangeQuery}
                            allowClear
                        />
                    </Form.Item>
                </Form>
                <Select
                    value={params.sort}
                    style={{ width: 100, marginRight: 6 }}
                    onChange={(value) => {
                        setParams((prevState) => ({
                            ...prevState,
                            sort: value,
                            page: 1,
                        }));
                    }}
                >
                    {SortTypes.map((type) => (
                        <Option key={type.value}>{type.label}</Option>
                    ))}
                </Select>
                <Select
                    value={params.direction}
                    style={{ width: 120, marginRight: 0 }}
                    onChange={(value) => {
                        setParams((prevState) => ({
                            ...prevState,
                            direction: value,
                            page: 1,
                        }));
                    }}
                >
                    {DirectionTypes.map((type) => (
                        <Option key={type.value}>{type.label}</Option>
                    ))}
                </Select>
            </div>

            {!!repos.length ? (
                repos.map((repo) => (
                    <div key={repo.id} ref={setLastElement}>
                        <RepoItem repo={repo} />
                    </div>
                ))
            ) : (
                <div className="container" style={{ textAlign: "center" }}>
                    No repo found
                </div>
            )}

            {loading && (
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        top: "0",
                        zIndex: "1",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Spin size="large" tip="loading" />
                    </div>
                </div>
            )}
        </AppContainer>
    );
}

export default App;
