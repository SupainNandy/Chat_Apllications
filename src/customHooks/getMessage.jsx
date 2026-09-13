import api from "../api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const getMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) {
                dispatch(setMessages([]));
                return;
            }
            try {
                const result = await api.get(`/api/message/get/${selectedUser._id}`);
                const messagesList = Array.isArray(result.data) 
                    ? result.data 
                    : (result.data?.data || []);
                dispatch(setMessages(messagesList));
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]);
};

export default getMessage;