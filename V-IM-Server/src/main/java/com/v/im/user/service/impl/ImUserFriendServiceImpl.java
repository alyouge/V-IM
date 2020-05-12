package com.v.im.user.service.impl;

import com.v.im.user.entity.ImGroup;
import com.v.im.user.entity.ImUserFriend;
import com.v.im.user.mapper.ImUserFriendMapper;
import com.v.im.user.service.IImUserFriendService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  用户关系表
 * </p>
 *
 * @author jobob
 * @since 2018-12-31
 */
@Service
@Qualifier(value = "imUserFriendService")
public class ImUserFriendServiceImpl extends ServiceImpl<ImUserFriendMapper, ImUserFriend> implements IImUserFriendService {


    /**
     * 根据用户的ID 获取 用户好友(双向用户关系)
     *
     * @param userId 用户ID
     * @return 好友分组的列表
     */
   public List<ImGroup> getUserFriends(String userId){
       return this.baseMapper.getUserFriends(userId);
    }
}
