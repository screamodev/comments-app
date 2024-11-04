import React, { createContext, useContext, useEffect, useState } from 'react';
import { Comment } from "../config/types/comment";
import { fetchComments } from "../api/commentApi";
import { io } from "socket.io-client";
import {SocketEvents} from "../config/enums/socketEvents";
import {SortOrder} from "../config/enums/sortOrder";

interface CommentsContextType {
    comments: Comment[];
    loading: boolean;
    loadComments: (page: number, sortField: string | null, sortOrder: SortOrder.asc | SortOrder.desc) => Promise<void>;
    addComment: (newComment: Comment) => void;
    addReply: (parentId: number, newReply: Comment) => void;
    updateReplies: (parentId: number, newReplies: Comment[]) => void
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const CommentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const socket = io(process.env.REACT_APP_API_KEY, { autoConnect: false });

    useEffect(() => {
        socket.connect();

        socket.on(SocketEvents.newComment, (newComment: Comment) => {
            addComment(newComment);
        });

        socket.on(SocketEvents.newReply, (newReply: Comment) => {
            addReply(newReply.parent.id, newReply);
        });

        return () => {
            socket.off(SocketEvents.newComment);
            socket.off(SocketEvents.newReply);
            socket.disconnect();
        };
    }, []);

    const loadComments = async (page: number, field: string | null, order: SortOrder.asc | SortOrder.desc) => {
        setLoading(true);
        try {
            const data = await fetchComments(page, 25, field, order);
            setComments(data);
        } finally {
            setLoading(false);
        }
    };

    const addComment = (newComment: Comment) => {
        setComments((prevComments) => [newComment, ...prevComments]);
    };

    const addReply = (parentId: number, newReply: Comment) => {
        const updateRepliesRecursively = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply],
                    };
                }

                if (comment.replies) {
                    return {
                        ...comment,
                        replies: updateRepliesRecursively(comment.replies),
                    };
                }
                return comment;
            });
        };

        setComments(prevComments => updateRepliesRecursively(prevComments));
    };

    const updateReplies = (parentId: number, newReplies: Comment[]) => {
        const updateRepliesRecursively = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: newReplies,
                    };
                }
                if (comment.replies) {
                    return {
                        ...comment,
                        replies: updateRepliesRecursively(comment.replies),
                    };
                }
                return comment;
            });
        };

        setComments(prevComments => updateRepliesRecursively(prevComments));
    };

    useEffect(() => {
        console.log("Updated state ", comments);
    },[comments])


    return (
        <CommentsContext.Provider value={{ comments, loading, loadComments, addComment, addReply, updateReplies }}>
            {children}
        </CommentsContext.Provider>
    );
};

export const useComments = () => {
    const context = useContext(CommentsContext);
    if (!context) {
        throw new Error("useComments must be used within a CommentsProvider");
    }
    return context;
};
