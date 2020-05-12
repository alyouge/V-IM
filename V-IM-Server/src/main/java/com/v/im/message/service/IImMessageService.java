package com.v.im.message.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.v.im.message.entity.ImMessage;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author 乐天
 * @since 2018-10-08
 */
public interface IImMessageService extends IService<ImMessage> {

    /**
     * 保存消息
     *
     * @param imMessage 消息
     */
    void saveMessage(ImMessage imMessage);

    /**
     * 获取未读消息根据接收人的ID
     *
     * @param toId 接收人的Id
     */
    List<ImMessage> getUnReadMessage(String toId);

}
