package com.v.im.user;

import com.v.im.common.SpringContextHolder;
import com.v.im.user.entity.ImUser;
import com.v.im.user.service.IImUserService;
import com.v.im.user.service.impl.ImUserServiceImpl;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

/**
 * 用户 Utils 类
 * @author zkp
 * @since 2019-01-30
 */
public class UserUtils {

    private static IImUserService userService = SpringContextHolder.getBean(ImUserServiceImpl.class);

    /**
     * 从系统中读取用户
     *
     * @return 用户信息
     */
    public static ImUser getUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        return userService.getByLoginName(userDetails.getUsername());
    }

    /**
     * 获取用户id
     * @param id id
     * @return 结果
     */
    public static ImUser getUser(String id) {
        return userService.getById(id);
    }
}
