package com.v.im.common.exception;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.io.Serializable;

/**
 * @author zkp
 */
@Data
public class ResultBody<T> implements Serializable {

    public ResultBody(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResultBody(BaseErrorInfoInterface errorInfo) {
        this.code = errorInfo.getResultCode();
        this.message = errorInfo.getResultMsg();
    }

    public ResultBody(T result) {
        this.result = result;
    }

    /**
     * 返回消息代码 默认OK，错误自定义
     */
    private String code = "200";

    /**
     * 消息提醒内容
     */
    private String message;


    private T result;


    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
