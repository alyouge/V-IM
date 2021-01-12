package com.v.im.user.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.v.im.common.utils.ChatUtils;
import com.v.im.user.entity.ImUser;
import com.v.im.user.service.IImUserFriendService;
import com.v.im.user.service.IImUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Resource
    @Qualifier(value = "imUserService")
    private IImUserService imUserService;

    @Resource
    @Qualifier(value = "imUserFriendService")
    private IImUserFriendService imUserFriendService;

    /**
     * 用户信息初始化
     *
     * @param request request
     * @return json
     */
    @PostMapping("init")
    public Map<String, Object> list(HttpServletRequest request) {
        logger.debug("init");
        Map<String, Object> objectMap = new HashMap<>();
        //获取好友信息
        String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        ImUser user = imUserService.getByLoginName(username);
        objectMap.put("friends", imUserFriendService.getUserFriends(user.getId()));

        //获取本人信息
        String host = ChatUtils.getHost(request);
        QueryWrapper<ImUser> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("login_name", username);
        user.setAvatar(host + user.getAvatar());
        user.setPassword(null);
        objectMap.put("me", user);

        //用户的群组信息
        objectMap.put("groups", imUserService.getChatGroups(user.getId()));
        return objectMap;
    }


    /**
     * 获取群组的用户
     *
     * @param chatId 群组id
     * @return 用户List
     */
    @PostMapping("chatUserList")
    public List<ImUser> chatUserList(String chatId) {
        return imUserService.getChatUserList(chatId);
    }

    /**
     * 单个用户
     *
     * @param id userId
     * @return ImUser
     */
    @PostMapping("get")
    public ImUser get(String id) {
        return imUserService.getById(id);
    }
}
