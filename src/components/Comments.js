import styled from "styled-components";
import Comment from "./Comment";

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`;

function Comments({ comments }) {
    return (
        <CommentsContainer>
            {comments?.map((kid) => (
                <Comment key={kid} kid={kid} />
            ))}
        </CommentsContainer>
    );
}

export default Comments;
