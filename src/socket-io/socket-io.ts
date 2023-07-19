import io from "socket.io-client";
export const appSocket = io(`${process.env.NEXT_PUBLIC_BACK_END_URL}`);
