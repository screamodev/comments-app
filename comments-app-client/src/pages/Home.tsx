import React from 'react';
import CommentsList from "../components/Comment/CommentList";
import {CommentsProvider} from "../context/CommentsContext";
import TokenButton from "../components/TokenButton/TokenButton";

const Home: React.FC = () => (
    <CommentsProvider>
        <TokenButton />
        <CommentsList />
    </CommentsProvider>
);

export default Home;
