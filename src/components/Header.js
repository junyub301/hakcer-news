import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SHeader = styled.header`
    width: 100%;
    height: 35px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Column = styled.div`
    color: ${(props) => (props.select ? "blue" : "black")};
    font-size: ${(props) => (props.select ? "16px" : "14px")}; ;
`;

function Header() {
    const categorys = [
        "topstories",
        "newstories",
        "askstories",
        "showstories",
        "jobstories",
    ];
    const [select, setSelect] = useState("");
    const selectCategory = (e) => {
        const {
            target: { text },
        } = e;
        setSelect(text);
    };
    return (
        <SHeader>
            <Wrapper>
                {categorys.map((category) => {
                    return (
                        <Column
                            onClick={selectCategory}
                            select={select === category}
                            key={category}
                        >
                            <Link to={`/${category}`}>{category}</Link>
                        </Column>
                    );
                })}
            </Wrapper>
        </SHeader>
    );
}
export default Header;
