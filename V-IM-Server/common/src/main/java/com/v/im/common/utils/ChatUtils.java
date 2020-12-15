package com.v.im.common.utils;

import javax.servlet.http.HttpServletRequest;

/**
 *  封装的信息类型 UTILS
 *
 * @author 乐天
 * @since 2018-10-07
 */
public class ChatUtils {

    /**
     * 单聊
     */
    public static final String FRIEND = "0";
    /**
     * 已读
     */
    public static final String READED = "0";

    /**
     * 未读
     */
    public static final String UNREAD = "1";

    /**
     * 心跳
     */
    public static final String MSG_PING = "0";

    /**
     * 链接就绪
     */
    public static final String MSG_READY = "1";

    /**
     * 消息
     */
    public static final String MSG_MESSAGE = "2";


    public static String getHost(HttpServletRequest request) {
        StringBuffer url = request.getRequestURL();
        return url.delete(url.length() - request.getRequestURI().length(), url.length()).toString();
    }
}
