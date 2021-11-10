import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import Comments from "./Comments";

const Container = styled.div`
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Type = styled.div`
    padding: 5px;
    font-size: 18px;
`;

const Title = styled.div`
    padding: 5px;
    font-size: 30px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid gray;
`;

const CreateDate = styled.div`
    color: #888;
    font-size: 15px;
    margin-top: 8px;
    display: flex;
    align-items: center;
`;

const Button = styled.button`
    margin-left: 3px;
    color: #888888;
    border: 1px solid #dfdfdf;
    padding: 0 5px 0 5px;
    background-color: white;
    cursor: pointer;
`;

const IconContianer = styled.div`
    display: flex;
    margin-top: 5px;
`;
const Icon = styled.div`
    margin-right: 10px;
    font-size: 17px;
`;
const Content = styled.div`
    margin-top: 20px;
`;

function Detail() {
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await axios.get(
                    `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
                );
                setItem(data);
            } catch (error) {}
        };
        fetchItem();
    }, [id]);
    const openNewTab = (e) => {
        const {
            target: { value },
        } = e;
        window.open(value);
    };

    return (
        <Container>
            <Type>{item?.type}</Type>
            <Title>
                {item?.title}
                <CreateDate>
                    {item?.time ? new Date(item.time).toLocaleString() : null}
                    <Button onClick={openNewTab} value={item?.url}>
                        본문보기
                    </Button>
                </CreateDate>

                <IconContianer>
                    <Icon>
                        <FontAwesomeIcon
                            icon={faComment}
                            style={{ marginRight: "5px" }}
                        />
                        {item?.descendants}
                    </Icon>

                    <Icon>
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            style={{ marginRight: "5px" }}
                        />
                        {item?.score}
                    </Icon>
                </IconContianer>
            </Title>
            {item?.text ? (
                <Content dangerouslySetInnerHTML={{ __html: item?.text }} />
            ) : null}
            <span style={{ marginTop: "10px" }}>by : {item?.by}</span>
            {item?.kids ? <Comments comments={item?.kids} /> : null}
        </Container>
    );
}

export default Detail;
