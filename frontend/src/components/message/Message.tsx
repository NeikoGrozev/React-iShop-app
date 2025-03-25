import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getMessage, isShowMessage } from "../../store/message/selector";
import { messageAction } from "../../store/message/slice";
import styles from "./message.module.css";

const Message = () => {
    const dispatch = useAppDispatch();
    let isShow = useAppSelector(isShowMessage);
    const message = useAppSelector(getMessage);

    useEffect(() => {
        if (isShow) {
            setTimeout(() => {
                dispatch(messageAction.hiddenMessage());
            }, 2000);
        }
    }, [isShow, dispatch]);

    return (
        <>
            {isShow && <div className={styles.message}>{message}</div>}
        </>
    )
}

export default Message;