import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Comments from "./Comments";

const CommentContainer = styled.div`
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-top: 10px;
`;

const User = styled.div`
    font-size: 12px;
    font-weight: 800;
`;

const CreateDate = styled.div`
    color: #888;
    font-size: 12px;
    margin-top: 2px;
`;

const Text = styled.div`
    margin: 3px;
`;

const Kids = styled.span`
    margin-top: 3px;
    cursor: pointer;
`;

const KidsContainer = styled.div`
    background-color: #fbfcfd;
    padding-left: 15px;
`;

function Comment({ kid }) {
    const [comment, setComment] = useState();
    const [toggelFlag, setToggelFalg] = useState(false);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const { data } = await axios.get(
                    `https://hacker-news.firebaseio.com/v0/item/${kid}.json?print=pretty`
                );
                setComment(data);
            } catch (error) {}
        };
        fetchItem();
    }, [kid]);

    const changeToggle = () => setToggelFalg(!toggelFlag);
    return (
        <>
            {!comment?.deleted ? (
                <CommentContainer>
                    <User>{comment?.by}</User>
                    <CreateDate>
                        {new Date(comment?.time).toLocaleDateString()}
                    </CreateDate>
                    <Text dangerouslySetInnerHTML={{ __html: comment?.text }} />
                    {comment?.kids?.length > 0 ? (
                        <Kids onClick={changeToggle}>
                            <FontAwesomeIcon
                                icon={faComment}
                                size='sm'
                                style={{ marginRight: "3px" }}
                            />
                            {comment.kids.length}
                        </Kids>
                    ) : null}
                </CommentContainer>
            ) : null}
            {toggelFlag ? (
                <KidsContainer>
                    <Comments comments={comment?.kids} />{" "}
                </KidsContainer>
            ) : null}
        </>
    );
}

export default Comment;
