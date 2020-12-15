package com.v.im.common.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * @author zkp
 * 全局异常处理函数
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理自定义的业务异常
     * @param e ex
     * @return 错误信息
     */
    @ExceptionHandler(value = VimException.class)
    @ResponseBody
    public ResultBody<String> bizExceptionHandler(VimException e){
        logger.error("发生业务异常！原因是：{}",e.getErrorMsg());
        return new ResultBody<>(e.getErrorCode(), e.getErrorMsg());
    }

    /**
     * 处理空指针的异常
     * @param e ex
     * @return 错误信息
     */
    @ExceptionHandler(value =NullPointerException.class)
    @ResponseBody
    public ResultBody<String> exceptionHandler(NullPointerException e){
        logger.error("发生空指针异常！原因是:",e.getMessage());
        return new ResultBody<>(ResultCodeEnum.BODY_NOT_MATCH);
    }


    /**
     * 处理其他异常
     * @param e ex
     * @return 错误信息
     */
    @ExceptionHandler(value =Exception.class)
    @ResponseBody
    public ResultBody<String> exceptionHandler(Exception e){
        logger.error("未知异常！原因是:",e.getMessage());
        return new ResultBody<>(ResultCodeEnum.INTERNAL_SERVER_ERROR);
    }
}
