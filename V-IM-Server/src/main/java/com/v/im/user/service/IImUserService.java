package com.v.im.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.v.im.user.entity.ImChatGroup;
import com.v.im.user.entity.ImGroup;
import com.v.im.user.entity.ImUser;

import java.util.List;

/**
 * <p>
 * 服务类
 * </p>
 *
 * @author 乐天-im
 * @since 2018-10-07
 */
public interface IImUserService extends IService<ImUser> {

    /**
     * 根据登录名称获取用户
     * @param loginName 登录名
     * @return 用户
     */
    ImUser getByLoginName(String loginName);

    /**
     * 获取用户分组信息
     * @param userId 用户id
     * @return ImGroup
     */
    List<ImGroup> getGroupUsers(String userId);

    /**
     * 根据用户id 获取用户所有的群
     * @param userId 用户
     * @return 群List
     */
    List<ImChatGroup> getChatGroups(String userId);

    /**
     * 获取群组的用户
     * @param chatId 群组id
     * @return 用户List
     */
    List<ImUser> getChatUserList(String chatId);


    /**
     * 注册用户
     * @param imUser 用户对象
     */
    void registerUser(ImUser imUser);
}
