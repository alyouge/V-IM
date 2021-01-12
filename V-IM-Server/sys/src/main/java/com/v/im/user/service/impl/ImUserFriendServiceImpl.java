package com.v.im.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.v.im.user.entity.ImGroup;
import com.v.im.user.entity.ImUser;
import com.v.im.user.entity.ImUserFriend;
import com.v.im.user.mapper.ImUserFriendMapper;
import com.v.im.user.service.IImUserFriendService;
import com.v.im.user.service.IImUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * <p>
 * 用户关系表
 * </p>
 *
 * @author jobob
 * @since 2018-12-31
 */
@Service
@Qualifier(value = "imUserFriendService")
public class ImUserFriendServiceImpl extends ServiceImpl<ImUserFriendMapper, ImUserFriend> implements IImUserFriendService {

    @Resource
    @Qualifier(value = "imUserService")
    private IImUserService imUserService;

    /**
     * 根据用户的ID 获取 用户好友(双向用户关系)
     *
     * @param userId 用户ID
     * @return 好友分组的列表
     */
    @Override
    public List<ImUser> getUserFriends(String userId) {
        return baseMapper.getUserFriends(userId);
    }
}
