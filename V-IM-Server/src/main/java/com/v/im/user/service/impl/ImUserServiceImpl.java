package com.v.im.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.v.im.user.entity.*;
import com.v.im.user.mapper.ImUserMapper;
import com.v.im.user.service.IImChatGroupUserService;
import com.v.im.user.service.IImGroupService;
import com.v.im.user.service.IImUserFriendService;
import com.v.im.user.service.IImUserService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * 服务实现类
 *
 * @author 乐天
 * @since 2018-10-07
 */
@Service
@Qualifier(value = "imUserService")
public class ImUserServiceImpl extends ServiceImpl<ImUserMapper, ImUser> implements IImUserService {

    @Value("${v.im.admin.id}")
    private String adminId;

    @Value("${v.im.default.chat.id}")
    private String defaultChatId;

    @Resource
    @Qualifier(value = "imGroupService")
    private IImGroupService iImGroupService;


    @Resource
    @Qualifier(value = "imUserFriendService")
    private IImUserFriendService imUserFriendService;

    @Resource
    @Qualifier(value = "imChatGroupUserService")
    private IImChatGroupUserService imChatGroupUserService;

    @Override
    public ImUser getByLoginName(String loginName) {
        QueryWrapper<ImUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("login_name", loginName);
        return baseMapper.selectOne(queryWrapper);
    }

    @Override
    public List<ImGroup> getGroupUsers(String userId){
        return baseMapper.getGroupUsers(userId);
    }

    @Override
    public List<ImChatGroup> getChatGroups(String userId) {
        return baseMapper.getUserGroups(userId);
    }

    @Override
    public List<ImUser> getChatUserList(String chatId) {
        return baseMapper.getChatUserList(chatId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void registerUser(ImUser imUser) {
        try {
            save(imUser);
            //添加默认用户分组 我的好友
            ImGroup imGroup = new ImGroup();
            imGroup.preInsert();
            imGroup.setName("我的好友");
            imGroup.setUserId(imUser.getId());
            iImGroupService.save(imGroup);

            //更新默认的用户组
            imUser.setDefaultGroupId(imGroup.getId());
            updateById(imUser);

            //保存用户好友，默认管理员
            ImUserFriend imUserFriend = new ImUserFriend();
            imUserFriend.preInsert();
            imUserFriend.setUserId(imUser.getId());
            imUserFriend.setFriendId(adminId);
            imUserFriend.setUserGroupId(imGroup.getId());
            //默认好友的分组
            ImUser friend = getById(adminId);
            imUserFriend.setFriendGroupId(friend.getDefaultGroupId());
            imUserFriendService.save(imUserFriend);

            //添加默认群
            ImChatGroupUser imChatGroupUser = new ImChatGroupUser();
            imChatGroupUser.setUserId(imUser.getId());
            imChatGroupUser.setChatGroupId(defaultChatId);
            imChatGroupUser.setCreateDate(new Date());
            imChatGroupUserService.save(imChatGroupUser);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }
}
