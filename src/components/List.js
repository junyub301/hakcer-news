import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.ul`
    width: 100%;
    position: relative;
    list-style: none;
`;

const Item = styled.li`
    position: relative;
    height: 100%;
    width: 20%;
    float: left;
    margin-top: 10px;
    a {
        cursor: pointer;
        text-decoration: none;
    }
`;

function List() {
    const { category } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(
                    `https://hacker-news.firebaseio.com/v0/${category}.json?print=pretty`
                );
                setItems(data.sort((a, b) => b - a));
            } catch (error) {}
        };
        fetchItems();
    }, [category]);

    return (
        <Container>
            {items?.map((item) => {
                return (
                    <Item key={item}>
                        <Link to={`item/${item}`}>{item}</Link>
                    </Item>
                );
            })}
        </Container>
    );
}

export default List;
