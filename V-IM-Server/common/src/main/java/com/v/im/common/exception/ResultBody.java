package com.v.im.common.exception;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;

import java.io.Serializable;

/**
 * @author zkp
 */
@Data
public class ResultBody<T> implements Serializable {

    public ResultBody() {
    }

    public ResultBody(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResultBody(BaseErrorInfoInterface errorInfo) {
        this.code = errorInfo.getResultCode();
        this.message = errorInfo.getResultMsg();
    }

    public ResultBody(String message) {
        this.message = message;
    }

    /**
     * 返回消息代码 默认OK，错误自定义
     */
    private String code = "OK";

    /**
     * 消息提醒内容
     */
    private String message;


    private T result;

    /**
     * 成功
     *
     * @return ReturnMessage
     */
    public ResultBody<T> success() {
        return success(null);
    }

    /**
     * 成功
     * @param data res
     * @return ReturnMessage
     */
    public ResultBody<T> success(T data) {
        ResultBody<T> rb = new ResultBody<T>();
        rb.setCode(ResultCodeEnum.SUCCESS.getResultCode());
        rb.setMessage(ResultCodeEnum.SUCCESS.getResultMsg());
        rb.setResult(data);
        return rb;
    }

    /**
     * 失败
     */
    public ResultBody<T> error(BaseErrorInfoInterface errorInfo) {
        ResultBody<T> rb = new ResultBody<T>();
        rb.setCode(errorInfo.getResultCode());
        rb.setMessage(errorInfo.getResultMsg());
        rb.setResult(null);
        return rb;
    }

    /**
     * 失败
     */
    public ResultBody<T> error(String code, String message) {
        ResultBody<T> rb = new ResultBody<>();
        rb.setCode(code);
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    /**
     * 失败
     */
    public ResultBody<T> error(String message) {
        ResultBody<T> rb = new ResultBody<>();
        rb.setCode("-1");
        rb.setMessage(message);
        rb.setResult(null);
        return rb;
    }

    @Override
    public String toString() {
        return JSONObject.toJSONString(this);
    }
}
