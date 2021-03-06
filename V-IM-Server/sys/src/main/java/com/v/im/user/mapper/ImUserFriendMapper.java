package com.v.im.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.v.im.user.entity.ImUser;
import com.v.im.user.entity.ImUserFriend;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author jobob
 * @since 2018-12-31
 */
public interface ImUserFriendMapper extends BaseMapper<ImUserFriend> {

    /**
     * 根据用户的ID 获取 用户好友(双向用户关系)
     * @param userId 用户ID
     * @return 好友分组的列表
     */
    List<ImUser> getUserFriends(String userId);

}
