import React from 'react';
import CommentsList from "../components/Comment/CommentList";
import {CommentsProvider} from "../context/CommentsContext";

const Home: React.FC = () => (
    <CommentsProvider>
        <CommentsList />
    </CommentsProvider>
);

export default Home;
